import {colors, createMuiTheme} from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      default: colors.common.white,
      paper: colors.common.white
    },
    colorPrimaryStudent: {
      main: '#0070c0'
    },
    colorSecondaryStudent: {
      main: '#015696'
    },
    colorPrimaryTeacher: {
        main: '#203a43'
    },
    colorSecondaryTeacher: {
      main: '#152D35'
    },
    colorPrimaryExpert: {
      main: '#44546A'
    },
    colorSecondaryExpert: {
      main: '#243245'
    },
    colorPrimaryAlumnus: {
      main: '#56CBBE'
    },
    colorSecondaryAlumnus: {
      main: '#078A80'
    },
    colorPrimaryGuest: {
      main: '#FF8B00'
    },
    colorSecondaryGuest: {
      main: '#D28A29'
    },
    colorPrimaryCompanyHR: {
      main: '#7F7D83'
    },
    colorSecondaryCompanyHR: {
      main: '#434147'
    },
    colorPrimaryEmployee: {
      main: '#F8C842'
    },
    colorSecondaryEmployee: {
      main: '#B89125'
    },
    primary: {
      main: '#025fa1'
    },
    secondary: {
      main: '#025fa1'
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600]
    },
    textWhite: {
      primary: colors.common.white,
      secondary: colors.blueGrey[100]
    }
  },
  shadows,
  typography
});

export default theme;
