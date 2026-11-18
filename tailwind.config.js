import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        hand: ['Caveat', 'cursive'], // texto de la carta
        title: ['Pacifico', 'cursive'], // títulos y firma
      },
      colors: {
        blush: {
          50: '#fff7f7',
          100: '#ffeceb',
          200: '#ffd9d9',
          300: '#ffbfc3',
          400: '#ff9fab',
          500: '#f77f93',
        },
        salmon: {
          100: '#ffe8df',
          200: '#ffcfbf',
          300: '#ffb09a',
          400: '#fb8c72',
          500: '#f2705a',
        },
        paper: {
          50: '#fffaf0',
          100: '#fff3dc',
          200: '#fbe7c3',
        },
      },
      keyframes: {
        'float-up': {
          '0%': {
            transform: 'translate3d(0,0,0) rotate(0deg) scale(0.6)',
            opacity: '0',
          },
          '12%': { opacity: 'var(--op, 0.7)' },
          '85%': { opacity: 'var(--op, 0.7)' },
          '100%': {
            transform:
              'translate3d(var(--drift, 0px), -115vh, 0) rotate(var(--rot, 0deg)) scale(1.1)',
            opacity: '0',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(-2deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(0.85) translateY(24px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '15%': { transform: 'scale(1.18)' },
          '30%': { transform: 'scale(1)' },
          '45%': { transform: 'scale(1.12)' },
        },
        burst: {
          '0%': { transform: 'translate(-50%, -50%) scale(0.3)', opacity: '1' },
          '100%': {
        transform:
          'translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(1.2) rotate(var(--rot))',
        opacity: '0',
  },
},
      },
      animation: {
        'float-up': 'float-up linear infinite',
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float 5.5s ease-in-out infinite',
        'pop-in': 'pop-in 0.9s cubic-bezier(0.2, 0.9, 0.3, 1.2) both',
        'pulse-ring': 'pulse-ring 1.8s ease-out infinite',
        heartbeat: 'heartbeat 1.6s ease-in-out infinite',
        burst: 'burst 1.6s ease-out forwards',
      },
    },
  },
  plugins: [
    // Utilidades 3D que Tailwind no trae de fábrica
    plugin(({ addUtilities }) => {
      addUtilities({
        '.perspective-900': { perspective: '900px' },
        '.perspective-1200': { perspective: '1200px' },
        '.preserve-3d': { 'transform-style': 'preserve-3d' },
        '.backface-hidden': { 'backface-visibility': 'hidden' },
      })
    }),
  ],
}
