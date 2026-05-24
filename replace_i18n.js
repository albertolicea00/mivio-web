const fs = require('fs');

function extractDict() {
  const appJs = fs.readFileSync('static/js/app.js', 'utf8');
  const enMatch = appJs.match(/en:\s*\{([\s\S]*?)\},\s*\/\* ── Spanish/);
  if (!enMatch) {
    console.log("Could not find en dictionary");
    process.exit(1);
  }
  const dictStr = enMatch[1];
  const dict = {};
  const lines = dictStr.split('\n');
  for (const line of lines) {
    const match = line.match(/^\s*([a-zA-Z0-9_]+)\s*:\s*['"](.*)['"],?$/);
    if (match) {
      dict[match[1]] = match[2];
    } else {
      const match2 = line.match(/^\s*([a-zA-Z0-9_]+)\s*:\s*"(.*)",?$/);
      if(match2) dict[match2[1]] = match2[2];
    }
  }
  // Hardcoded fixes for strings with special quotes
  dict['feat_h2_b'] = "nothing you don't.";
  dict['cta_desc'] = "Join the users who already organize their movies and series the best way. It's fast, beautiful, and easy to use.";
  dict['compat_sub'] = "One app, the entire ecosystem. Whether you're on the couch, at the desk, or on the road — Mivio adapts to your screen.";
  return dict;
}

const dict = extractDict();

function processHtml(file) {
  let html = fs.readFileSync(file, 'utf8');
  
  // Replace <tag ... x-text="$store.i18n.t('key')"></tag>
  // or <tag ... x-html="$store.i18n.t('key')"></tag>
  const regexText = /<([a-zA-Z0-9_-]+)([^>]*?)x-(?:text|html)="\$store\.i18n\.t\('([^']+)'\)"([^>]*?)>[\s\S]*?<\/\1>/g;
  html = html.replace(regexText, (match, tag, before, key, after) => {
    const text = dict[key] || key;
    // reconstruct tag
    return `<${tag}${before}${after}>${text}</${tag}>`;
  });

  // There is one self-closing case or case without inner text: 
  // <button ... x-text="$store.i18n.lang === 'en' ? 'ES' : 'EN'"></button>
  // Let's manually remove the language toggles
  
  // Desktop language toggle
  const desktopToggle = `        <!-- Language toggle -->
        <button @click="$store.i18n.toggle()"
                class="toggle-pill rounded-full px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
          </svg>
          <span x-text="$store.i18n.lang === 'en' ? 'ES' : 'EN'"></span>
        </button>`;
  html = html.replace(desktopToggle, '');

  // Mobile language toggle
  const mobileToggle = `        <button @click="$store.i18n.toggle()"
                class="toggle-pill rounded-full px-2.5 py-1 text-xs font-semibold"
                x-text="$store.i18n.lang === 'en' ? 'ES' : 'EN'"></button>`;
  html = html.replace(mobileToggle, '');

  // Remove $store.i18n.init()
  html = html.replace('$store.i18n.init()', '');
  // Clean up empty x-init if left over: x-init="$store.theme.init(); "
  html = html.replace('x-init="$store.theme.init(); "', 'x-init="$store.theme.init()"');
  
  // Remove "lang" script if there's any or remove extra spaces
  
  // Add favicons
  const faviconTags = `  <link rel="icon" type="image/png" href="static/images/favicon.png" />
  <link rel="apple-touch-icon" href="static/images/apple-touch-icon.png" />`;
  if (!html.includes('favicon.png')) {
    html = html.replace('</title>', '</title>\n\n' + faviconTags);
  }

  // Ensure mivio-icon.webp is used instead of mivio-icon.png
  html = html.replace(/mivio-icon\.png/g, 'mivio-icon.webp');

  fs.writeFileSync(file, html);
  console.log(`Processed ${file}`);
}

processHtml('index.html');
processHtml('manual.html');

// Now we can clean up app.js to remove i18n completely
let appJs = fs.readFileSync('static/js/app.js', 'utf8');
// Keep only theme store and showcase()
const themeStoreEnd = appJs.indexOf("/* ── i18n store ──────────────────────────────────────────────── */");
const showcaseStart = appJs.indexOf("/* ── Showcase carousel component ─────────────────────────────── */");

let newAppJs = appJs.substring(0, themeStoreEnd) + "\n});\n\n" + appJs.substring(showcaseStart);

// However, showcase uses Alpine.store('i18n').t(k), let's hardcode that
const showcaseReplacement = `/* ── Showcase carousel component ─────────────────────────────── */
function showcase() {
  return {
    current: 0,
    total: 3,

    get slides() {
      return [
        { title: 'Home screen', desc: 'Poster grid with your movies and series.', img: 'static/images/showcase1.png', emoji: '🎬' },
        { title: 'Movie detail', desc: 'Synopsis, cast, and ratings from TMDB.', img: 'static/images/showcase2.png', emoji: '🎞️' },
        { title: 'Player', desc: 'ExoPlayer full-screen with subtitles.', img: 'static/images/showcase3.png', emoji: '▶️' },
      ];
    },

    next() { this.current = (this.current + 1) % this.total; },
    prev() { this.current = (this.current - 1 + this.total) % this.total; },

    init() {
      this._timer = setInterval(() => this.next(), 4000);
    },
    destroy() {
      clearInterval(this._timer);
    },
  };
}`;
newAppJs = newAppJs.replace(/\/\* ── Showcase carousel component[\s\S]*/, showcaseReplacement);
fs.writeFileSync('static/js/app.js', newAppJs);
console.log('Processed app.js');

