import 'react-perfect-scrollbar/dist/css/styles.css';
import React,{useEffect} from 'react';
import { useRoutes} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import route from 'src/routes';
import {isLoggedIn} from "./views/auth/LoginView";
import { ZoomMtg } from "@zoomus/websdk";
import './App.css';
import {zoomMeetConfig} from './views/zoom/index.js';

const App = () => {



  useEffect(() => {




    ZoomMtg.setZoomJSLib("https://source.zoom.us/1.7.10/lib", "/av");
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();

    /**
     * You should not visible api secret key on frontend
     * Signature must be generated on server
     * https://marketplace.zoom.us/docs/sdk/native-sdks/web/essential/signature
     */


  }, []);

  const routing = useRoutes(route(isLoggedIn));
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
