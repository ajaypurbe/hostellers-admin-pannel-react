module.exports = {
  mode:'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        hostellersLight:{
          primary: '#4318ff',
          100:"#ece8ff",
          200:"#d9d1ff",
          300:"#c7baff",
          400:"#b4a3ff",
          500:"#a18cff",
          600:"#8e74ff",
          700:"#7b5dff",
          800:"#6946ff",
          900:"#562fff",
          1000:"4318ff",
        },
        hostellersDark: {
          primary: '#191919',
          100:"#1f1f1f",
          200:"#2d2d2d",
          300:"#3a3a3a",
          400:"#474747",
          500:"#545454",
          600:"#616161",
          700:"#6e6e6e",
          800:"#7b7b7b",
          900:"#888888",
          1000:"#959595",
          // primary: '#18191A',
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
