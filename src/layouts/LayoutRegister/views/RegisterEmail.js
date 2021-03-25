import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Formik} from 'formik';
import {Box, Button, Container, Grid, makeStyles, TextField, Typography} from '@material-ui/core';
import Page from '../../../components/Page';
import {Call, DateRange, Email, PermIdentity, VpnKey} from '@material-ui/icons';
import registerUserAction from "../../../actions/registerUserAction";
import {useDispatch, useSelector} from "react-redux";
import {registerConstants} from "../../../constants/ActionsConstants";
import registerAPICallAction from "../../../actions/registerAPICallAction";
import {Alert} from "@material-ui/lab";


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

const RegisterEmail = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState();
  const [otpBox, setOTPBox] = React.useState(false);
  const [otp, setOTP] = React.useState();
  const res = useSelector(state => state.user)

  const handleClick = (e) => {
    e.preventDefault();
    setOTPBox(true);
    dispatch(registerUserAction({
      name:res.name,
      email:email
    }))
  }

  React.useEffect(() => {
    if(res.otp){
      if(otp == res.otp){
        dispatch(registerAPICallAction({
          name: res.name,
          email: email,
          dob: res.dob,
          phone_no: res.phone,
          role: res.role
        }))
        if(res.regSuccess){
          navigate('/login');
        }
        console.log(res)
      }
    }
  },[otp])
  
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
                                 onChange={e => setEmail(e.target.value)}
                                 value={email}
                                 label="Email"
                                 type="email"
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

                      {/*{*/}
                      {/*  ifOTPMatched?<div>OTP MATCHED</div>:<div>OTP NOT MATCHED</div>*/}
                      {/*}*/}
                    </Grid> : <div></div>
                  }
                  <Grid container spacing={2} alignItems="center" className='font'>
                    <Grid item lg={2}></Grid>
                    {otpBox ?
                      <Grid item lg={10}>
                        <Typography style={{
                          marginTop: "10px"
                        }
                        }>Please enter the OTP sent to your email id</Typography>
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
            {res.regErrorFailed?<Alert severity="error">Registration Failed</Alert>:<div></div>}
            {res.regErrorExist?<Alert severity="error">Same user already exists</Alert>:<div></div>}
          </Grid>
        </Container>
      </Box>
    </Page>
  );
};
export default RegisterEmail;
