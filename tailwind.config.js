/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          light: '#DBEAFE',
        },
        accent: {
          DEFAULT: '#F59E0B',
          hover: '#D97706',
        },
        success: '#10B981',
        danger: '#EF4444',
        info: '#06B6D4',
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        'surface-alt': 'rgb(var(--color-surface-alt) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        'text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
        'text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
        'text-muted': 'rgb(var(--color-text-muted) / <alpha-value>)',
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        prose: '65ch',
      },
      boxShadow: {
        'primary-glow': '0 10px 25px -5px rgb(37 99 235 / 0.2)',
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(135deg, #2563EB 0%, #4F46E5 50%, #7C3AED 100%)',
        'cta-gradient': 'linear-gradient(135deg, #1D4ED8 0%, #7C3AED 100%)',
      },
    },
  },
  plugins: [],
};
