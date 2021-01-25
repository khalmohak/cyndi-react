import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import route from 'src/routes';
import {isLoggedIn} from "./views/auth/LoginView";
import {useCookies} from "react-cookie";



const App = () => {

  const routing = useRoutes(route(isLoggedIn));
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
