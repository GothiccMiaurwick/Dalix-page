/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px',
        'vsm': '420px',
        'ssm': '520px',
        'smd': '720px',
      },
      fontFamily: {
        'lora': ['Lora', 'serif'],
        'courier': ['Courier New', 'monospace'],
      },
      colors: {
        'dalix-gray': '#e0e0e0',
        'bg-dark': '#333',
      },
    },
  },
  plugins: [],
};
