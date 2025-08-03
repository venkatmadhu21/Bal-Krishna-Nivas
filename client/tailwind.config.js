/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        secondary: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        orange: {
          50: '#fff8f1',
          100: '#feecdc',
          150: '#fde2c7',
          200: '#fcd9bd',
          250: '#fccfa8',
          300: '#fdba8c',
          350: '#fea76e',
          400: '#ff8a4c',
          500: '#ff6b35',
          600: '#e85d2a',
          700: '#c44d24',
          800: '#9c3d20',
          900: '#7a2e1a',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
        'serif': ['Merriweather', 'ui-serif', 'Georgia'],
      }
    },
    animation: {
      'spin-slow': 'spin 20s linear infinite',
      'pulse': 'pulse 3s ease-in-out infinite',
    },
  },
  plugins: [],
}