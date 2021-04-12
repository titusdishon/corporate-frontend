import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';

const palette= {
  black,
  white,
  primary: {
    contrastText: white,
    dark: colors.green[999],
    main: colors.green[500],
    light: colors.green[100]
  },
  secondary: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green['A400'],
    light: colors.green['A400']
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
    link: colors.blue[600]
  },
  link: colors.blue[800],
  icon: colors.blueGrey[600],
  background: {
    default: '#F4F6F8',
    paper: '#F4F6F8'
  },
  divider: colors.grey[200],
};
 export default palette;