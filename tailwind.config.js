module.exports = {
  mode: 'jit',
  content: ["./src/pages/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}"],
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
  theme: {
    extend: {
      colors: {
        bgBlue: '#111827',
        bgGrey: '#374151',
      },
      boxShadow: "0 0 10px #29d, 0 0 5px #29d"
    },
  },
}