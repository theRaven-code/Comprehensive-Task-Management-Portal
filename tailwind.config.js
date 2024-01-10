/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
    extend: {
      colors: {
        primary: '#3498db',
        secondary: '#2ecc71',
        accent: '#e74c3c',
        text: '#ffffff',
        background: '#2c3e50',
        border: '#34495e',
      },
    },  
  },
  plugins: [],
}
