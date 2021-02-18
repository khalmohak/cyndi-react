import {colors, createMuiTheme} from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';


export const getRoleColorPrimary = () => {
  const role = sessionStorage.getItem('userRole');
  let color;
  switch (role) {
    case "Student":
      color = '#0070c0';
      break;
    case "Teacher":
      color = '#203a43';
      break;
    case "Expert":
      color = '#44546A';
      break;
    case "Guest":
      color = '#FF8B00';
      break;
    case "Alumnus":
      color = '#56CBBE'
      break;
    case "CompanyHR":
      color = '#7F7D83';
      break;
    case "Employee":
      color = '#F8C842'
      break;
    default:
      color = '#0070c0';
      break;
  }
  return color;
};

export const getRoleColorSecondary = () => {
  const role = sessionStorage.getItem('userRole');
  let color;
  switch (role) {
    case "Student":
      color = '#015696';
      break;
    case "Teacher":
      color = '#152D35';
      break;
    case "Expert":
      color = '#243245';
      break;
    case "Guest":
      color = '#D28A29';
      break;
    case "Alumnus":
      color = '#078A80'
      break;
    case "CompanyHR":
      color = '#434147';
      break;
    case "Employee":
      color = '#B89125'
      break;
    default:
      color = '#015696';
      break;
  }
  return color;
};

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
      main: '#0070c0'
    },
    secondary: {
      main: '#0070c0'
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
