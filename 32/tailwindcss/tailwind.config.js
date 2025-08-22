/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/*.{js, jsx, ts, tsx}'
  ],
  theme: {
    fontFamily : {
      sans : 'Roboto, monospace'
    },
    extend: {
      colors : {
        pizza : 'red'
      }
    },
  },
  plugins: [],
}

