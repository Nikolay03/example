
/*
 * Button palette
 *
 * 50 - ghost hover
 * 100 - ghost active
 * ...
 * 500 - solid default
 * 600 - solid hover
 * 700 - solid active
 *
 * */

const darkGray = '#3A3A3A'

export default {
  gray: {
    50: '#f7f8f9', /* 6% */
    100: '#f4f5f7', /* 8% */
    200: '#e4e7ea', /* 20% */
    300: '#c8cfd5',
    350: '#D8D8D8',
    400: '#9faab5',
    450: '#898989',
    500: '#768695', /* 100% */
    600: '#6a7986',
    650: '#616161', /* 100% */
    700: '#596570',
    800: '#475059',
    900: '#3a4249'
  },
  orange: {
    300: '#E89F71'
  },
  primary: {
    50: '#f3fbfb',
    100: '#e8f7f6',
    150: '#C4EBE8',
    200: '#c4ebe9',
    300: '#a1dfdb',
    400: '#5bc7c1',
    500: '#14afa6',
    600: '#129e95',
    700: '#0f837d',
    800: '#0c6964',
    900: '#0a5651'
  },
  palette: {
    common: {
      blue: '#2f80ed',
      darkGray,
      lightGray: '#f5f5f5',
      green: '#00d7a3',
      white: '#FFFFFF',
      orange: '#f2994a',
      red: '#eb5757',
      yellow: '#f7c71e'
    },
    text: {
      default: darkGray
    }
  }
}
