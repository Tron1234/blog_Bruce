const colors = require('tailwindcss/colors');
module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/*.vue',
    './pages/**/*.vue',
    './pages/*.vue',
    './plugins/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    colors:{
      white:'#FFF',
      black:'#000',
      gray: colors.trueGray,
      red:colors.red,
      orange:colors.orange,
      amber:colors.amber,
      yellow:colors.yellow,
      green:{
        50:'#ebfced',
        100:'#e0f6e2',
        200:'#cce8cf',
        300:'#93da9c',
        400:'#34D399',
        500:'#10B981',
        600:'#059669',
        700:'#047857',
        800:'#065F46',
        900:'#064E3B',
      },
      blue:colors.lightBlue,
      purple:colors.purple,
      pink:colors.pink,
    },
    extend: {
      width:{
        '12/15':'78%',
        '3/15':'22%'
      },
      fontFamily: ['hover', 'focus']
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
