/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
    './public/static/js/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B00',
        accent: '#00C4FF',
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
