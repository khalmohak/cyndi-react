import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Formik} from 'formik';
import {Avatar, Box, Button, Container, Grid, makeStyles, TextField, Typography} from '@material-ui/core';
import Page from 'src/components/Page';
import {Call, DateRange, Email, PermIdentity, VpnKey} from '@material-ui/icons';


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
  color2: {color: '#999', fontsize: '20px !important'},
  flot1: {float: 'right'},
  inputdata: {padding: '5px', margin: '0px'},
  wfull: {width: '100%'}


}));

const Register = () => {
  const classes = useStyles();
  const navigate = useNavigate();

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
        <Container maxWidth="xs" className={classes.mainlogin}>


          <Grid container spacing={3} className={classes.dkpal}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                ><Avatar className={classes.large} src="../static/register.png"> </Avatar>
                </Grid>

                <Box mb={1}>
                  <Typography
                    color="textPrimary"
                    variant="h2" className={classes.color}>
                    Register
                  </Typography>
                </Box>


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
                      <form>

                        <Grid
                          container
                          spacing={3}
                        >
                        </Grid>
                        <Box
                          mt={3}
                          mb={1}
                        >

                        </Box>

                        <Grid
                          container
                          spacing={3}
                        >
                        </Grid>


                        <Grid container spacing={1} alignItems="flex-end">
                          <Grid item lg={1}>
                            <PermIdentity/>
                          </Grid>
                          <Grid item lg={11} alignItems="flex-start">
                            <TextField id="input-with-icon-grid" label="Name" className={classes.wfull}/>
                          </Grid>
                        </Grid>


                        <Grid container spacing={1} alignItems="flex-end">
                          <Grid item lg={1}>
                            <Call/>
                          </Grid>
                          <Grid item lg={11} alignItems="flex-start">
                            <TextField id="input-with-icon-grid" label="Phome" className={classes.wfull}/>
                          </Grid>
                        </Grid>


                        <Grid container spacing={1} alignItems="flex-end">
                          <Grid item lg={1}>
                            <Email/>
                          </Grid>
                          <Grid item lg={11} alignItems="flex-start">
                            <TextField id="input-with-icon-grid" label="Email" className={classes.wfull}/>
                          </Grid>
                        </Grid>

                        <Grid container spacing={1} alignItems="flex-end">
                          <Grid item lg={1}>
                            <DateRange/>
                          </Grid>
                          <Grid item lg={11} alignItems="flex-start">
                            <TextField id="input-with-icon-grid" label="Date of Birth" className={classes.wfull}/>
                          </Grid>
                        </Grid>

                        <Grid container spacing={1} alignItems="flex-end">
                          <Grid item lg={1}>
                            <VpnKey/>
                          </Grid>
                          <Grid item lg={11} alignItems="flex-start">
                            <TextField id="input-with-icon-grid" label="Password" className={classes.wfull}/>
                          </Grid>
                        </Grid>

                        <Grid container spacing={1} alignItems="flex-end">
                          <Grid item lg={1}>
                            <VpnKey/>
                          </Grid>
                          <Grid item lg={11} alignItems="flex-start">
                            <TextField id="input-with-icon-grid" label="Confirm Passwor" className={classes.wfull}/>
                          </Grid>
                        </Grid>


                        <Box my={2}>
                          <Button
                            color="primary"
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                          >
                            Register
                          </Button>
                        </Box>
                      </form>
                    )}
                  </Formik>
                </Grid>
              </Grid>

            </Grid>
          </Grid>


        </Container>
      </Box>
    </Page>
  );
};
export {Register};
