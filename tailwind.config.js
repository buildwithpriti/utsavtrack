/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef2f7',
          100: '#d5e0ec',
          200: '#a8c1d9',
          300: '#7ba3c6',
          400: '#4f7fa8',
          500: '#2c5d83',
          600: '#1a4569',
          700: '#0f3354',
          800: '#0B2545',
          900: '#081a35',
          950: '#050f24',
        },
        orange: {
          50: '#fef7ec',
          100: '#fcecca',
          200: '#f9d593',
          300: '#f6bf5c',
          400: '#F4A825',
          500: '#e09110',
          600: '#b8730a',
          700: '#8a5608',
          800: '#5c3a06',
          900: '#3a2504',
        },
        crowd: {
          low: '#22c55e',
          medium: '#f59e0b',
          high: '#ef4444',
          severe: '#991b1b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
