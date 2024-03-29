import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Avatar, Box, Button, Container, Grid, makeStyles, TextField, Typography} from '@material-ui/core';
import {Alert, ToggleButton, ToggleButtonGroup} from '@material-ui/lab';
import Page from '../../../components/Page';
import {userDetails} from "./saveUserDetails";
import {useDispatch, useSelector} from "react-redux";
import loginUserAction from "../../../actions/loginUserAction";


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
  register: {
    "&:hover":{
      color:"#01509f",
      textDecoration:"underline"
    }
  },
  forgot: {
    "&:hover":{
      color:"red",
      textDecoration:"underline"
    }
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [userPassword, setPassword] = useState();
  const [role, setRole] = useState();
  const dispatch = useDispatch();

  const user = useSelector(state => state.user)

  if (user.done) {
    navigate('/app/class', {replace: true});
  }

  const loginError = () => {
    if (user.failed) {
      return (<Alert severity="error">Login failed check your username or password</Alert>)
    }
  }

  userDetails();


  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(loginUserAction({
      email: userName,
      password: userPassword,
      role: role
    }))
  }


  const roleButton = (event, value) => {
    setRole(value);
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
                    Sign in
                  </Typography>
                </Box>

                <Typography
                  align="center"
                  color="textSecondary"
                  variant="body1" className={classes.color}>
                  or login with email address
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
                      label="Email Address"
                      margin="normal"
                      name="email"

                      onChange={e => setUserName(e.target.value)}
                      type="email"
                      value={userName}
                    />
                    <TextField
                      fullWidth
                      label="Password"
                      margin="normal"
                      name="password"

                      onChange={e => setPassword(e.target.value)}
                      type="password"
                      value={userPassword}
                    />

                    <ToggleButtonGroup className='button_c'
                                       exclusive
                                       value={role}
                                       aria-label="text alignment"
                                       onChange={roleButton}
                    >

                      <ToggleButton value={"Student"}>Student</ToggleButton>
                      <ToggleButton value={"Teacher"}>Teacher</ToggleButton>


                    </ToggleButtonGroup>

                    <Box my={2}>
                      <Button
                        color="primary"
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Sign in now
                      </Button>
                    </Box>
                  </form>
                  <Typography className={classes.register}
                              onClick={e=>navigate('/register')}
                              >Register?</Typography>
                  <Typography className={classes.forgot}
                              onClick={e=>navigate('/forgotpassword')}
                  >Forgot Password?</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {loginError()}
        </Container>
      </Box>
    </Page>
  );
};
export {LoginView};
