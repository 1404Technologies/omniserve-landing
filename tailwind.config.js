/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1E2A5E',
          2: '#162050',
          3: '#253470',
          deep: '#0F1A40',
        },
        ink: {
          DEFAULT: '#0F1B3A',
          soft: '#4A5B7B',
          mute: '#7A8AAB',
        },
        line: {
          DEFAULT: '#E4ECF7',
          strong: '#CFDBED',
        },
        surface: {
          tint: '#F5F8FF',
          tint2: '#F8FAFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 27, 58, 0.04), 0 8px 28px rgba(15, 27, 58, 0.06)',
        'card-lift': '0 2px 4px rgba(15, 27, 58, 0.06), 0 18px 44px rgba(15, 27, 58, 0.10)',
      },
    },
  },
  plugins: [],
}
