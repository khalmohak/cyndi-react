import React, {useState} from 'react';
import {Link as RouterLink, Navigate, useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { Formik } from 'formik';
import {useCookies} from 'react-cookie'
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles,
  Select,
  MenuItem,
} from '@material-ui/core';
import {Alert,
  ToggleButton,
  ToggleButtonGroup
} from '@material-ui/lab';
import Page from 'src/components/Page';

let auth = 0;
let logErr = 0;
let isLoggedIn = false;



const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [userPassword, setPassword] = useState();
  const [role, setRole] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(['auth']);

  async function loginUser(credentials) {
    return axios.post('http://localhost:4000/login', credentials)
      .then(data => {
        if(data.data.auth === true){
          auth = 1;
          console.log(data.data);
          isLoggedIn = true;
          sessionStorage.setItem('userId',data.data.id);
          sessionStorage.setItem('userName',data.data.name);
          sessionStorage.setItem('userEmail',data.data.email);
          sessionStorage.setItem('userPhone',data.data.phone_no);
          if(!data.data.photo_url){
            sessionStorage.setItem('userPhoto','null');
          }else{
            sessionStorage.setItem('userPhoto',data.data.photo_url);
          }
          sessionStorage.setItem('token',data.data.token);
          sessionStorage.setItem('userDOB',data.data.dob);
          sessionStorage.setItem('userRole',data.data.role);


          sessionStorage.setItem('loggedIn',true);
          navigateDashboard();
        }
        else{
          logErr = 1;
          navigateLogin();
        }
      })
  }

  const navigateLogin = ()=>{
      navigate('/login',{replace:true})
  };

  const navigateDashboard = ()=>{
    if(auth===1){
      navigate('/app/dashboard', { replace: true });
    }
  }
  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email:userName,
      password:userPassword,
      role:role
    });
  }
  
 const loginError = ()=>{
    if(logErr===1){
      return(<Alert severity="error">Login failed check your username or password</Alert>
      )
    }
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
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
          >
            {({
              handleBlur,
              handleChange,

            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                  
                </Box>
                <Grid
                  container
                  spacing={3}
                >
                </Grid>
                <Box
                  mt={3}
                  mb={1}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    or login with email address
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={e=>setUserName(e.target.value)}
                  type="email"
                  value={userName}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={e=>setPassword(e.target.value)}
                  type="password"
                  value={userPassword}
                  variant="outlined"
                />

                <ToggleButtonGroup
                fullwidth
                value={role}
                onClick={e=>{setRole(e.target.value)}}
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
            )}
          </Formik>
          {loginError()}
        </Container>
      </Box>
    </Page>
  );
};
console.log("LoginView "+isLoggedIn);
export {LoginView,isLoggedIn};
