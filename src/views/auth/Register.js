import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Formik} from 'formik';
import {Box, Button, Container, Grid, makeStyles, TextField} from '@material-ui/core';
import Page from 'src/components/Page';
import {Call, DateRange, Email, PermIdentity, VpnKey} from '@material-ui/icons';
import '../product/ClassListView/style.css';


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

  return (
    <Page className={classes.root} title="Login">


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
                            <TextField id="input-with-icon-grid" label="Name" className={classes.wfull}/>
                          </Grid>
                        </Grid>


                        <Grid container spacing={2} alignItems="flex-end" className='font'>
                          <Grid item lg={1}>
                            <Call/> </Grid>
                          <Grid item lg={11} alignItems="flex-start">
                            <TextField id="input-with-icon-grid" label="Phome" className={classes.wfull}/>
                          </Grid>
                        </Grid>

                        <Grid container spacing={2} alignItems="flex-end" className='font'>
                          <Grid item lg={1}>
                            <Email/>
                          </Grid>
                          <Grid item lg={11} alignItems="flex-start">
                            <TextField id="input-with-icon-grid" label="Email" className={classes.wfull}/>
                          </Grid>
                        </Grid>

                        <Grid container spacing={2} alignItems="flex-end" className='font'>
                          <Grid item lg={1}>
                            <DateRange/>
                          </Grid>
                          <Grid item lg={11} alignItems="flex-start">
                            <TextField id="input-with-icon-grid" label="Date of Birth" className={classes.wfull}/>
                          </Grid>
                        </Grid>

                        <Grid container spacing={2} alignItems="flex-end" className='font'>
                          <Grid item lg={1}>
                            <VpnKey/>
                          </Grid>
                          <Grid item lg={11} alignItems="flex-start">
                            <TextField id="input-with-icon-grid" label="Password" className={classes.wfull}/>
                          </Grid>
                        </Grid>

                        <Grid container spacing={2} alignItems="flex-end" className='font'>
                          <Grid item lg={1}>
                            <VpnKey/>
                          </Grid>
                          <Grid item lg={11} alignItems="flex-start">
                            <TextField id="input-with-icon-grid" label="Confirm Passwor" className={classes.wfull}/>
                          </Grid>
                        </Grid>

                        <Button color="primary" fullWidth size="large" type="submit" variant="contained"
                                className='white-btn text-lowercase'>Register</Button>


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
