/* ================================================================
   MIVIO — Alpine.js application
   Stores: theme, i18n
   Components: showcase()
================================================================ */

document.addEventListener('alpine:init', () => {

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

  /* ── i18n store ──────────────────────────────────────────────── */
  Alpine.store('i18n', {
    lang: 'en',

    toggle() {
      this.lang = this.lang === 'en' ? 'es' : 'en';
      document.documentElement.lang = this.lang;
      localStorage.setItem('mivio-lang', this.lang);
    },

    t(key) {
      return this.strings[this.lang]?.[key] ?? key;
    },

    init() {
      const saved   = localStorage.getItem('mivio-lang');
      const browser = navigator.language?.slice(0, 2);
      this.lang = saved ?? (browser === 'es' ? 'es' : 'en');
      document.documentElement.lang = this.lang;
    },

    strings: {

      /* ── English (primary) ───────────────────────────────────── */
      en: {
        /* nav */
        nav_features : 'Features',
        nav_design   : 'Platforms',
        nav_download : 'Download',
        nav_cta      : 'Download free',
        /* hero */
        hero_badge   : 'Available now · Free for Android',
        hero_h1_a    : 'All your multimedia',
        hero_h1_b    : 'content,',
        hero_h1_c    : 'in one place.',
        hero_sub     : 'Discover Mivio, the ultimate Android media player. Connect your local servers, <strong>SMB</strong> or <strong>WebDAV</strong>, and enjoy your movies and series with automatic artwork and built-in subtitles.',
        hero_cta1    : 'Download APK (Free)',
        hero_cta2    : 'See features',
        /* stats bar */
        stat_smb     : 'Samba / NAS',
        stat_webdav  : 'Local network',
        stat_tmdb    : 'Metadata',
        stat_opensubs: 'Subtitles',
        /* features section */
        feat_label   : 'Features',
        feat_h2_a    : 'Everything you need,',
        feat_h2_b    : "nothing you don't.",
        /* feature 1 */
        f1_tag       : 'Network support',
        f1_title     : 'Your files, your rules',
        f1_body      : 'No matter where you store your videos. Mivio supports local storage and network connections via <strong>SMB</strong> and <strong>WebDAV</strong>. Connect your NAS or server in seconds.',
        /* feature 2 */
        f2_tag       : 'Magic metadata',
        f2_title     : 'Automatic organization',
        f2_body      : 'Forget searching for names. Mivio scans your files and automatically downloads artwork, synopses, cast, and ratings from <strong>TMDB</strong> so your library looks spectacular.',
        /* feature 3 */
        f3_tag       : 'OpenSubtitles',
        f3_title     : 'Subtitles instantly',
        f3_body      : 'Missing subtitles? Search and download them directly from the app thanks to our <strong>OpenSubtitles</strong> integration.',
        /* feature 4 */
        f4_tag       : 'ExoPlayer',
        f4_title     : 'High-performance playback',
        f4_body      : 'Enjoy maximum performance and support for almost all video formats thanks to the <strong>ExoPlayer</strong>-based engine. Your progress is saved automatically.',
        /* showcase */
        show_label   : 'Design',
        show_h2_a    : 'A premium',
        show_h2_b    : 'visual experience.',
        show_desc    : 'Built with the latest Android technology (<strong>Material Design 3</strong>), Mivio delivers smooth, fast, and beautiful navigation — putting what really matters front and center: your content.',
        s1_title     : 'Home screen',
        s1_desc      : 'Poster grid with your movies and series.',
        s2_title     : 'Movie detail',
        s2_desc      : 'Synopsis, cast, and ratings from TMDB.',
        s3_title     : 'Player',
        s3_desc      : 'ExoPlayer full-screen with subtitles.',
        /* cta */
        cta_h2_a     : 'Ready to transform your',
        cta_h2_b     : 'home cinema experience?',
        cta_desc     : "Join the users who already organize their movies and series the best way. It's fast, beautiful, and easy to use.",
        cta_btn      : 'Download Mivio for Android',
        cta_sub      : 'Free · No account · No limits',
        /* compatibility */
        compat_label : 'Compatibility',
        compat_h2_a  : 'Works on every',
        compat_h2_b  : 'screen you own.',
        compat_sub   : 'One app, the entire Android ecosystem. Whether you\'re on the couch, at the desk, or on the road — Mivio adapts to your screen.',
        compat_note  : 'One APK. Every form factor. Zero compromises.',
        dev_mobile_name  : 'Android Mobile',
        dev_mobile_desc  : 'The full experience in your pocket.',
        dev_tablet_name  : 'Android Tablet',
        dev_tablet_desc  : 'Optimized layouts for large screens.',
        dev_tv_name      : 'Android TV',
        dev_tv_desc      : 'Lean-back browsing from your sofa.',
        dev_chrome_name  : 'Chromebook',
        dev_chrome_desc  : 'Full app via Chrome OS / Play Store.',
        dev_auto_name    : 'Android Auto',
        dev_auto_desc    : 'Audio and media controls on the road.',
        /* footer */
        ft_support   : 'Support',
        ft_contact   : 'Contact',
        ft_privacy   : 'Privacy',
        ft_made      : 'Made with ❤️ by',
      },

      /* ── Spanish ─────────────────────────────────────────────── */
      es: {
        /* nav */
        nav_features : 'Funciones',
        nav_design   : 'Plataformas',
        nav_download : 'Descargar',
        nav_cta      : 'Descargar gratis',
        /* hero */
        hero_badge   : 'Disponible ahora · Gratis para Android',
        hero_h1_a    : 'Todo tu contenido',
        hero_h1_b    : 'multimedia,',
        hero_h1_c    : 'en un solo lugar.',
        hero_sub     : 'Descubre Mivio, el reproductor definitivo para Android. Conecta tus servidores locales, <strong>SMB</strong> o <strong>WebDAV</strong>, y disfruta de tus películas y series con carátulas automáticas y subtítulos integrados.',
        hero_cta1    : 'Descargar APK (Gratis)',
        hero_cta2    : 'Ver funciones',
        /* stats bar */
        stat_smb     : 'Samba / NAS',
        stat_webdav  : 'Red local',
        stat_tmdb    : 'Metadatos',
        stat_opensubs: 'Subtítulos',
        /* features section */
        feat_label   : 'Funcionalidades',
        feat_h2_a    : 'Todo lo que necesitas,',
        feat_h2_b    : 'nada de lo que no.',
        /* feature 1 */
        f1_tag       : 'Soporte de red',
        f1_title     : 'Tus archivos, tus reglas',
        f1_body      : 'No importa dónde guardes tus videos. Mivio soporta almacenamiento local y conexiones de red <strong>SMB</strong> y <strong>WebDAV</strong>. Conecta tu NAS o servidor en segundos.',
        /* feature 2 */
        f2_tag       : 'Metadatos mágicos',
        f2_title     : 'Organización automática',
        f2_body      : 'Olvídate de buscar nombres. Mivio escanea tus archivos y descarga carátulas, sinopsis, reparto y valoraciones desde <strong>TMDB</strong> para que tu biblioteca luzca espectacular.',
        /* feature 3 */
        f3_tag       : 'OpenSubtitles',
        f3_title     : 'Subtítulos al instante',
        f3_body      : '¿Faltan los subtítulos? Búscalos y descárgalos directamente desde la aplicación gracias a nuestra integración con <strong>OpenSubtitles</strong>.',
        /* feature 4 */
        f4_tag       : 'ExoPlayer',
        f4_title     : 'Reproducción de alto rendimiento',
        f4_body      : 'Disfruta del máximo rendimiento y soporte para casi todos los formatos de video gracias al motor basado en <strong>ExoPlayer</strong>. Tu progreso se guarda automáticamente.',
        /* showcase */
        show_label   : 'Diseño',
        show_h2_a    : 'Una experiencia',
        show_h2_b    : 'visual premium.',
        show_desc    : 'Diseñada con la última tecnología de Android (<strong>Material Design 3</strong>), Mivio ofrece una navegación fluida, rápida y hermosa, resaltando lo que realmente importa: tu contenido.',
        s1_title     : 'Pantalla de inicio',
        s1_desc      : 'Cuadrícula de pósters con tus películas y series.',
        s2_title     : 'Detalle de película',
        s2_desc      : 'Sinopsis, reparto y valoraciones desde TMDB.',
        s3_title     : 'Reproductor',
        s3_desc      : 'ExoPlayer a pantalla completa con subtítulos.',
        /* cta */
        cta_h2_a     : '¿Listo para transformar tu',
        cta_h2_b     : 'experiencia de cine en casa?',
        cta_desc     : 'Únete a los usuarios que ya organizan sus películas y series de la mejor manera. Es rápida, hermosa y fácil de usar.',
        cta_btn      : 'Descargar Mivio para Android',
        cta_sub      : 'Gratis · Sin cuenta · Sin límites',
        /* compatibility */
        compat_label : 'Compatibilidad',
        compat_h2_a  : 'Funciona en cada',
        compat_h2_b  : 'pantalla que tienes.',
        compat_sub   : 'Una sola app, todo el ecosistema Android. En el sofá, en el escritorio o en el coche — Mivio se adapta a tu pantalla.',
        compat_note  : 'Un APK. Cada factor de forma. Sin compromisos.',
        dev_mobile_name  : 'Android Mobile',
        dev_mobile_desc  : 'La experiencia completa en tu bolsillo.',
        dev_tablet_name  : 'Android Tablet',
        dev_tablet_desc  : 'Layouts optimizados para pantallas grandes.',
        dev_tv_name      : 'Android TV',
        dev_tv_desc      : 'Navega desde el sofá con tu control remoto.',
        dev_chrome_name  : 'Chromebook',
        dev_chrome_desc  : 'App completa vía Chrome OS / Play Store.',
        dev_auto_name    : 'Android Auto',
        dev_auto_desc    : 'Controles de audio y multimedia al volante.',
        /* footer */
        ft_support   : 'Soporte',
        ft_contact   : 'Contacto',
        ft_privacy   : 'Privacidad',
        ft_made      : 'Hecho con ❤️ por',
      },
    },
  });

});

/* ── Showcase carousel component ─────────────────────────────── */
function showcase() {
  return {
    current: 0,
    total: 3,

    get slides() {
      const t = (k) => Alpine.store('i18n').t(k);
      return [
        { title: t('s1_title'), desc: t('s1_desc'), img: 'static/images/showcase1.png', emoji: '🎬' },
        { title: t('s2_title'), desc: t('s2_desc'), img: 'static/images/showcase2.png', emoji: '🎞️' },
        { title: t('s3_title'), desc: t('s3_desc'), img: 'static/images/showcase3.png', emoji: '▶️' },
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
