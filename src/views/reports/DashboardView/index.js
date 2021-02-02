import React from 'react';
import {Box, Container, makeStyles, Typography} from '@material-ui/core';
import Page from 'src/components/Page';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    fontSize: '40px'
  },
  details: {
    fontSize: '20px',
    color: 'blue'
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Box>
          <Typography className={classes.root}>Hello {sessionStorage.getItem('userName')}, Good Morning
            :-) </Typography>
          <Typography>User Details</Typography>

          <Typography>Name </Typography> <Typography
          className={classes.details}>{sessionStorage.getItem('userName')}</Typography>
          <Typography>Email </Typography> <Typography
          className={classes.details}>{sessionStorage.getItem('userEmail')}</Typography>
          <Typography>Role </Typography> <Typography
          className={classes.details}>{sessionStorage.getItem('userRole')}</Typography>
          <Typography>Phone Number </Typography> <Typography
          className={classes.details}>{sessionStorage.getItem('userPhone')}</Typography>
          <Typography>Semester </Typography> <Typography
          className={classes.details}>{sessionStorage.getItem('userSemester')}</Typography>
          <Typography>College </Typography> <Typography
          className={classes.details}>{sessionStorage.getItem('collegeName')}</Typography>
          <Typography>University </Typography> <Typography
          className={classes.details}>{sessionStorage.getItem('universityName')}</Typography>
          <Typography>Year </Typography> <Typography
          className={classes.details}>{sessionStorage.getItem('userYear')}</Typography>
          <Typography>ID </Typography> <Typography
          className={classes.details}>{sessionStorage.getItem('userId')}</Typography>

        </Box>
      </Container>
    </Page>
  );
};

export default Dashboard;
