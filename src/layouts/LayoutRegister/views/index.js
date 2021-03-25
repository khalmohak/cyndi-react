import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, Button, Container, Grid, makeStyles, TextField, Typography} from '@material-ui/core';
import Page from '../../../components/Page';
import firebase from 'firebase';
import * as firebaseui from "firebaseui";
import {registerConstants} from "../../../constants/ActionsConstants";
import {useDispatch, useSelector} from "react-redux";

firebase.auth().useDeviceLanguage();

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
}));

const RegisterPhone = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(()=>{
    const uiConfig = {
      //signInSuccessUrl: "http://localhost:3000/register/email", //This URL is used to return to that page when we got success response for phone authentication.
      signInOptions: [ {
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        // The default selected country.
        defaultCountry: 'IN'
      }],
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          dispatch({
            type:registerConstants.SET_PHONE,
            payload:authResult.user.phoneNumber
          })
          navigate('/register/email');

          return false;
        },
        signInFailure: function(error) {

          if (error.code !== 'firebaseui/anonymous-upgrade-merge-conflict') {
            return Promise.resolve();
          }
          }}

            // tosUrl: "https://netflix-clone-ankur.herokuapp.com/"
    };
    let ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);
  },[])


  return (
    <Page className={classes.root} title="Register">
      <Box display="flex" flexDirection="column" height="100%" justifyContent="center">
        <Container spacing={2} maxWidth="md">
          <div id="firebaseui-auth-container"></div>
        </Container>
      </Box>
    </Page>
  );
};
export default RegisterPhone;
