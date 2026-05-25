/**
 * POST /api/waitlist
 * Body: { email, segment, _hp? }  (_hp is a honeypot field — must be empty)
 *
 * Env vars (set in Vercel dashboard):
 *   BREVO_API_KEY          — your Brevo API key
 *   BREVO_LIST_APPS        — list ID for Mivio Apps
 *   BREVO_LIST_CLOUD       — list ID for Mivio Cloud
 *   BREVO_LIST_B2B         — list ID for Mivio B2B
 *   BREVO_LIST_MARKETPLACE — list ID for Marketplace
 *
 * Validation layers:
 *   1. Honeypot field (_hp) — bots fill it, humans don't
 *   2. Strict email regex (RFC 5322 simplified)
 *   3. Disposable email domain blocklist (common throwaway providers)
 *   4. Rate limiting by IP (10 req / 15 min via in-memory store, resets on cold start)
 *   5. Brevo double opt-in (set via Brevo dashboard on the list — no code needed here)
 */

/* ── Segment → Brevo list ID map ─────────────────────────────── */
function getListId(segment) {
  const key = (segment ?? '').toLowerCase().trim();
  const map = {
    'mivio apps':             process.env.BREVO_LIST_APPS,
    'mivio apps — apple':     process.env.BREVO_LIST_APPS,
    'mivio apps — android':   process.env.BREVO_LIST_APPS,
    'mivio apps — smart tv':  process.env.BREVO_LIST_APPS,
    'mivio apps — windows':   process.env.BREVO_LIST_APPS,
    'mivio apps — linux':     process.env.BREVO_LIST_APPS,
    'mivio apps — vr':        process.env.BREVO_LIST_APPS,
    'mivio cloud':            process.env.BREVO_LIST_CLOUD,
    'mivio b2b':              process.env.BREVO_LIST_B2B,
    'mivio marketplace':      process.env.BREVO_LIST_MARKETPLACE,
    'newsletter':             process.env.BREVO_LIST_NEWSLETTER,
  };
  return map[key] ?? null;
}

/* ── Disposable email domains blocklist ──────────────────────── */
const DISPOSABLE = new Set([
  'mailinator.com','guerrillamail.com','10minutemail.com','throwam.com',
  'trashmail.com','yopmail.com','tempmail.com','dispostable.com',
  'maildrop.cc','sharklasers.com','guerrillamailblock.com','grr.la',
  'guerrillamail.info','guerrillamail.biz','guerrillamail.de',
  'guerrillamail.net','guerrillamail.org','spam4.me','fake-box.com',
  'mailnull.com','spamgourmet.com','trashmail.at','trashmail.io',
  'spamgourmet.net','getairmail.com','filzmail.com','throwaway.email',
  'discard.email','spambox.us','spoofmail.de','throwam.com',
]);

/* ── Simple in-memory rate limiter (resets on cold start) ────── */
const rateLimitMap = new Map(); // ip -> { count, resetAt }
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

/* ── Main handler ────────────────────────────────────────────── */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  /* 1. Rate limiting */
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() ?? req.socket?.remoteAddress ?? 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Try again later.' });
  }

  const { email, segment, _hp } = req.body ?? {};

  /* 2. Honeypot — bots fill hidden fields, humans leave them empty */
  if (_hp) {
    return res.status(200).json({ ok: true }); // silent success to fool bots
  }

  /* 3. Email format validation */
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
  if (!email || !emailRegex.test(email.trim())) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const cleanEmail = email.trim().toLowerCase();

  /* 4. Disposable email check */
  const domain = cleanEmail.split('@')[1];
  if (DISPOSABLE.has(domain)) {
    return res.status(400).json({ error: 'Disposable email addresses are not allowed.' });
  }

  /* 5. Segment → list ID */
  const listId = getListId(segment);
  if (!listId) {
    const inMap = ['mivio apps','mivio cloud','mivio b2b','mivio marketplace','newsletter']
      .includes((segment ?? '').toLowerCase().trim());
    return res.status(inMap ? 500 : 400).json({
      error: inMap ? 'Server configuration error: list ID not set.' : `Unknown segment: ${segment}`,
    });
  }

  if (!process.env.BREVO_API_KEY) {
    return res.status(500).json({ error: 'Server configuration error: API key not set.' });
  }

  /* 6. Subscribe via Brevo */
  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        email: cleanEmail,
        listIds: [Number(listId)],
        updateEnabled: true,
        attributes: {
          WAITLIST_SEGMENT: segment,
          PLATFORM: (segment ?? '').split('—')[1]?.trim() ?? '',
          SIGNUP_SOURCE: 'mivio-web',
        },
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      /* Brevo returns 400 "duplicate_parameter" when contact already exists — that's fine */
      if (response.status === 400 && err?.code === 'duplicate_parameter') {
        return res.status(200).json({ ok: true });
      }
      throw new Error(err?.message ?? response.statusText);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[waitlist]', err.message);
    return res.status(500).json({ error: 'Could not subscribe. Please try again later.' });
  }
}
