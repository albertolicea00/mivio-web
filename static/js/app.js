/* ================================================================
   MIVIO — Alpine.js application
   Stores: theme
   Components: showcase()
================================================================ */

function initAlpineStores() {

  /* ── Theme store ─────────────────────────────────────────────── */
  Alpine.store('theme', {
    dark: true,

    toggle() {
      this.dark = !this.dark;
      document.documentElement.classList.toggle('light', !this.dark);
      localStorage.setItem('mivio-theme', this.dark ? 'dark' : 'light');
    },

    init() {
      const saved = localStorage.getItem('mivio-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.dark = saved ? saved === 'dark' : prefersDark;
      document.documentElement.classList.toggle('light', !this.dark);
    },
  });

}

/* Register stores whenever alpine:init fires — or immediately if Alpine
   is already loaded (e.g. script order changed). */
if (window.Alpine) {
  initAlpineStores();
} else {
  document.addEventListener('alpine:init', initAlpineStores);
}

/* ── Showcase carousel component ─────────────────────────────── */
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
}
