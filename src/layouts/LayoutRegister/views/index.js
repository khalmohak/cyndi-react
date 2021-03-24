import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Formik} from 'formik';
import {Box, Button, Container, Grid, makeStyles, TextField, Typography} from '@material-ui/core';
import Page from '../../../components/Page';
import {Call, DateRange, Email, PermIdentity, VpnKey} from '@material-ui/icons';
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import axios from "axios";
import {apiEndPoint} from "../../../constants";
// import '../product/ViewClassStudent/style.css';

import firebase from 'firebase';

firebase.auth().useDeviceLanguage();

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },

  large: {height: '100px', width: '100px', marginBottom: '10px'},
  dkpal: {backgroundColor: '#01509f', padding: '50px 0', borderTopLeftRadius: '10px', borderTopRightRadius: '10px'},

}));

const RegisterPhone = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [phone, setPhone] = React.useState();
  const [otpBox, setOTPBox] = React.useState(false);
  const [otp, setOTP] = React.useState();

  const handleClick = (e) => {
    e.preventDefault();
    //navigate('/register/email');
    setOTPBox(true)
  }

  React.useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'normal',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        //onSignInSubmit();
        console.log("recapthja")
      }
    });
  }, [])
  return (
    <Page className={classes.root} title="Register">
      <Box display="flex" flexDirection="column" height="100%" justifyContent="center">
        <Container spacing={2} maxWidth="md">
          <Grid container item xs={12} spacing={3} className='shadow-box'>
            <Grid item lg={5} className='bg' justifyContent="center"><img src='/static/register2.png'/></Grid>
            <Grid item lg={7} className='bg2' alignItems="flex-start">
              <form>
                <Box display="flex" flexDirection="column" height="100%" justifyContent="center">
                  <Grid container item xs={12} spacing={5} className='mar'>
                    <h2>Register</h2>
                    <Grid container spacing={2} alignItems="flex-end" className='font'>
                      <Grid item lg={1}>
                        <Call/> </Grid>
                      <Grid item lg={11} alignItems="flex-start">
                        <TextField id="input-with-icon-grid"
                                   onChange={e => setPhone(e.target.value)}
                                   value={phone}
                                   label="Phone"
                                   type="phone"
                                   className={classes.wfull}/>
                      </Grid>
                    </Grid>
                    {
                      otpBox ? <Grid container spacing={2} alignItems="flex-end" className='font'>
                        <Grid item lg={1}>
                          <Call/> </Grid>
                        <Grid item lg={11} alignItems="flex-start">
                          <TextField id="input-with-icon-grid"
                                     onChange={e => setOTP(e.target.value)}
                                     value={otp}
                                     label="OTP"
                                     type="phone"
                                     className={classes.wfull}/>
                        </Grid>
                      </Grid> : <div></div>
                    }
                    <Grid container spacing={2} alignItems="center" className='font'>
                      <Grid item lg={2}></Grid>
                      {otpBox ?
                        <Grid item lg={10}>
                          <Typography style={{
                            marginTop: "10px"
                          }
                          }>Please enter the OTP sent to your phone number</Typography>
                        </Grid>

                        : <div></div>}
                    </Grid>
                    <Button color="primary"
                            fullWidth size="large"
                            type="submit"
                            variant="contained"
                            onClick={handleClick}
                            className='white-btn'>
                      SEND OTP</Button>
                  </Grid>
                </Box>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Page>
  );
};
export default RegisterPhone;
