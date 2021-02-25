import 'react-perfect-scrollbar/dist/css/styles.css';
import React, {useEffect} from 'react';
import {useRoutes} from 'react-router-dom';
import {ThemeProvider} from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import route from './routes';
// import {ZoomMtg} from "@zoomus/websdk";
 import './App.css';

const App = () => {

  // useEffect(() => {
  //   ZoomMtg.setZoomJSLib("https://source.zoom.us/1.7.10/lib", "/av");
  //   ZoomMtg.preLoadWasm();
  //   ZoomMtg.prepareJssdk();
  // }, []);

  // const routing = useRoutes(route(isLoggedIn));
  const routing = useRoutes(route());

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
      {routing}
    </ThemeProvider>
  );
};

export default App;
