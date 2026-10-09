import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F5B800',
        carbon: '#1B1F23',
        acero: '#4A5560',
        niebla: '#F2F4F6',
        ok: '#1E8E3E',
        aviso: '#B26A00',
        error: '#C62828',
        whatsapp: '#25D366',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-barlow)', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
      },
    },
  },
  plugins: [],
};

export default config;
