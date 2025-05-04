/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 8s linear infinite', // Slow rotating effect
        'pulse-glow': 'pulse-glow 1.5s infinite ease-in-out', // Pulsating glow
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(255,140,0,0.8)' },
          '50%': { boxShadow: '0 0 20px rgba(255,140,0,1)' },
        },
      },
      colors: {
        'mystic-orange': '#FF8C00', // Doctor Strange magic color
        'mystic-dark': '#1a1a1a', // Dark background theme
      },
    },
  },
  plugins: [],
}
