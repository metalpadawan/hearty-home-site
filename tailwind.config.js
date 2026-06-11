const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#142323',
        teal: {
          950: '#062c31',
          900: '#0b3e45',
          800: '#0f535c',
          700: '#126875',
          600: '#167f8f',
          100: '#d7f1ef',
          50: '#ecfbf9',
        },
        gold: {
          500: '#d5b46a',
          400: '#e6ca86',
          100: '#fff3cf',
        },
        cream: '#fff9eb',
        mist: '#f4faf8',
      },
      boxShadow: {
        glow: '0 24px 80px rgba(12, 92, 104, 0.28)',
        soft: '0 18px 50px rgba(16, 35, 35, 0.12)',
        gold: '0 18px 55px rgba(213, 180, 106, 0.28)',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -14px, 0)' },
        },
        'gold-shine': {
          '0%': { transform: 'translateX(-120%) rotate(8deg)' },
          '100%': { transform: 'translateX(120%) rotate(8deg)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'soft-pulse': {
          '0%, 100%': { opacity: '0.48', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.06)' },
        },
        'line-reveal': {
          '0%': { transform: 'scaleX(0)', transformOrigin: 'left' },
          '100%': { transform: 'scaleX(1)', transformOrigin: 'left' },
        },
      },
      animation: {
        'float-slow': 'float-slow 7s ease-in-out infinite',
        'gold-shine': 'gold-shine 5s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 12s ease-in-out infinite',
        'soft-pulse': 'soft-pulse 6s ease-in-out infinite',
        'line-reveal': 'line-reveal 900ms ease-out both',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.text-balance': { textWrap: 'balance' },
      });
    }),
  ],
};
