import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Avatar, Box, Button, Container, Grid, makeStyles, TextField, Typography} from '@material-ui/core';
import {Alert, ToggleButton, ToggleButtonGroup} from '@material-ui/lab';
import Page from '../../../components/Page';
import {useDispatch, useSelector} from "react-redux";
import forgotPasswordAction from "../../../actions/forgotPasswordAction";
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
  login: {
    backgroundColor: '#ffffff',
    padding: '0 30px',
    borderBottomRightRadius: '10px',
    borderBottomLeftRadius: '10px'
  },
  mainlogin: {backgroundColor: '#e0e0e0', padding: '30px', borderRadius: '10px',},
  color: {color: '#ffffff'},
  flot1: {float: 'right'},
}));

const ForgotPassword = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [phone, setPhone] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordAction({
      type: "Phone",
      phone_no: phone
    }))
  }

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center" className='m-a'
      >
        <Container maxWidth="xs" className={classes.mainlogin}>
          <Grid container spacing={3} className={classes.dkpal}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                ><Avatar className={classes.large} src="../static/avtor2.png"> </Avatar>
                </Grid>

                <Box mb={1}>
                  <Typography
                    align="center"
                    color="textPrimary"
                    variant="h2" className={classes.color}>
                    Forgot Password
                  </Typography>
                </Box>

                <Typography
                  align="center"
                  color="textSecondary"
                  variant="body1" className={classes.color}>
                  Please enter your registered phone number
                </Typography>

              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={3} className={classes.login}>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12}>

                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      label="Enter your phone number"
                      margin="normal"
                      name="phone"
                      onChange={e => setPhone(e.target.value)}
                      type="phone"
                      value={phone}
                    />

                    <Box my={2}>
                      <Button
                        color="primary"
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        SEND OTP
                      </Button>
                    </Box>
                  </form>

                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Page>
  );
};
export default ForgotPassword;
