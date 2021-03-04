import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Formik} from 'formik';
import {Box, Button, Container, Grid, makeStyles, TextField} from '@material-ui/core';
import Page from '../../../components/Page';
import {Call, DateRange, Email, PermIdentity, VpnKey} from '@material-ui/icons';
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import axios from "axios";
import {apiEndPoint} from "../../../constants";
// import '../product/ViewClassStudent/style.css';


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

const Register = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [name, setName] = React.useState();
  const [phone, setPhone] = React.useState();
  const [email, setEmail] = React.useState();
  const [dob, setDOB] = React.useState();
  const [password, setPassword] = React.useState();
  const [role, setRole] = React.useState();


  function changeName(e) {
    setName(e.target.value)
  }

  function changePhone(e) {
    setPhone(e.target.value)
  }

  function changeEmail(e) {
    setEmail(e.target.value)
  }

  function changeDOB(e) {
    setDOB(e.target.value)
  }

  function changePassword(e) {
    setPassword(e.target.value)
  }

  function roleButton(e, value) {
    setRole(value)
  }

  function register() {
    let apiBody = {
      name: name,
      email: email,
      dob: dob,
      password: password,
      phone_no: phone,
      role: role
    }
    axios.post(`${apiEndPoint}/register/user`, apiBody)
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          alert("User Registered")
          navigate('/login', {replace: true})
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <Page className={classes.root} title="Register">


      <Box display="flex" flexDirection="column" height="100%" justifyContent="center">

        <Container spacing={2} maxWidth="md">

          <Grid container item xs={12} spacing={3} className='shadow-box'>
            <Grid item lg={5} className='bg' justifyContent="center"><img src='/static/register2.png'/></Grid>
            <Grid item lg={7} className='bg2' alignItems="flex-start">


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


                  <form>

                    <Box display="flex" flexDirection="column" height="100%" justifyContent="center">

                      <Grid container item xs={12} spacing={5} className='mar'>

                        <h2>Register</h2>

                        <Grid container spacing={2} alignItems="flex-end" className='font'>
                          <Grid item lg={1}>
                            <PermIdentity/>
                          </Grid>
                          <Grid item lg={11} alignItems="flex-start">
                            <TextField id="input-with-icon-grid"
                                       onChange={e => changeName(e)}
                                       value={name}
                                       label="Name"
                                       className={classes.wfull}/>
                          </Grid>
                        </Grid>


                        <Grid container spacing={2} alignItems="flex-end" className='font'>
                          <Grid item lg={1}>
                            <Call/> </Grid>
                          <Grid item lg={11} alignItems="flex-start">
                            <TextField id="input-with-icon-grid"
                                       onChange={e => changePhone(e)}
                                       value={phone}
                                       label="Phone"
                                       className={classes.wfull}/>
                          </Grid>
                        </Grid>

                        <Grid container spacing={2} alignItems="flex-end" className='font'>
                          <Grid item lg={1}>
                            <Email/>
                          </Grid>
                          <Grid item lg={11} alignItems="flex-start">
                            <TextField id="input-with-icon-grid"
                                       onChange={e => changeEmail(e)}
                                       value={email}
                                       label="Email"
                                       className={classes.wfull}/>
                          </Grid>
                        </Grid>

                        <Grid container spacing={2} alignItems="flex-end" className='font'>
                          <Grid item lg={1}>
                            <DateRange/>
                          </Grid>
                          <Grid item lg={11} alignItems="flex-start">
                            <TextField id="input-with-icon-grid"
                                       onChange={e => changeDOB(e)}
                                       value={dob}
                                       type="date"
                                       label="Date of Birth"
                                       className={classes.wfull}/>
                          </Grid>
                        </Grid>

                        <Grid container spacing={2} alignItems="flex-end" className='font'>
                          <Grid item lg={1}>
                            <VpnKey/>
                          </Grid>
                          <Grid item lg={11} alignItems="flex-start">
                            <TextField id="input-with-icon-grid"
                                       type="password"
                                       value={password}
                                       onChange={e => changePassword(e)}
                                       label="Password"
                                       className={classes.wfull}/>
                          </Grid>
                        </Grid>


                        <Grid container spacing={2} alignItems="flex-end" className='font'>
                          <Grid item lg={1}>
                            Role
                          </Grid>
                          <Grid item lg={11} alignItems="flex-start">
                            <ToggleButtonGroup className='button_c'
                                               exclusive
                                               value={role}
                                               aria-label="text alignment"
                                               onChange={roleButton}
                                               className={classes.wfull}
                                               style={{backgroundColor: "white"}}
                            >

                              <ToggleButton value={"Student"}>Student</ToggleButton>
                              <ToggleButton value={"Teacher"}>Teacher</ToggleButton>


                            </ToggleButtonGroup>
                          </Grid>
                        </Grid>


                        <Button color="primary"
                                fullWidth size="large"
                                type="submit"
                                variant="contained"
                                onClick={register}
                                className='white-btn'>
                          Register</Button>


                      </Grid>


                    </Box>

                  </form>
                )}
              </Formik>


            </Grid>
          </Grid>

        </Container>

      </Box>

    </Page>
  );
};
export {Register};
