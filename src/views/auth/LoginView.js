import React, {useState} from 'react';
import {Link as RouterLink, Navigate, useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { Formik } from 'formik';
import {useCookies} from 'react-cookie'
import {apiEndPoint} from "../../constants";
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
  Avatar
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
  },
  large:{ height:'100px', width:'100px', marginBottom:'10px'},
  dkpal:{backgroundColor:'#01509f', padding:'50px 0',borderTopLeftRadius:'10px' ,borderTopRightRadius:'10px'},
  login:{backgroundColor:'#ffffff', padding:'0 30px',borderBottomRightRadius:'10px' ,borderBottomLeftRadius:'10px'},
  mainlogin:{backgroundColor:'#e0e0e0', padding:'30px' ,borderRadius:'10px' ,},
  color:{color:'#ffffff'},
  flot1:{float:'right'}

}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [userPassword, setPassword] = useState();
  const [role, setRole] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(['auth']);

  async function loginUser(credentials) {
    return axios.post(`${apiEndPoint}/login`, credentials)
      .then(data => {
        if(data.data.auth === true){
          auth = 1;
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
          sessionStorage.setItem('firebaseToken',data.data.firebase_auth_token);
          sessionStorage.setItem('userDOB',data.data.dob);
          sessionStorage.setItem('userRole',data.data.role);
          sessionStorage.setItem('loggedIn',true);
          navigateDashboard();
          userDetails();
        }
        else{
          logErr = 1;
          navigateLogin();
        }
      })
  }
  async function userDetails(){
    let headers = {

      'user_id':sessionStorage.getItem('userId'),
      'x-access-token':sessionStorage.getItem('token')
    };
    let data={
      'role':sessionStorage.getItem('userRole')
    }
    axios.post(`${apiEndPoint}/get/role/details`,data, {
      headers:headers
    }).then((response)=>{

      sessionStorage.setItem('universityName',response.data[0].university_name);
      sessionStorage.setItem('collegeName',response.data[0].college_name);
      sessionStorage.setItem('userYear',response.data[0].year);
      sessionStorage.setItem('userCourse',response.data[0].course);
      sessionStorage.setItem('userSemester',response.data[0].semester);
    })
      .catch(err=>{
        console.log(err);
      })
  }

  const navigateLogin = ()=>{
      navigate('/login',{replace:true})
  };

  const navigateDashboard = ()=>{
    if(auth===1){
      navigate('/app/class', { replace: true });
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
 const roleButton= (event, value)=>{
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
               
                
                
                <TextField
                  fullWidth
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={e=>setUserName(e.target.value)}
                  type="email"
                  value={userName}
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
                />

                <ToggleButtonGroup  className='button_c'
                exclusive
                value={role}
                aria-label="text alignment"
                onChange={roleButton}
                >

                  <ToggleButton value={"Student"} >Student</ToggleButton>
                  <ToggleButton value={"Teacher"} >Teacher</ToggleButton>

                  

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
export {LoginView,isLoggedIn};
