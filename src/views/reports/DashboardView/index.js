import React, {useState} from 'react';
import {
  Container,
  Grid,
  makeStyles, Typography
} from '@material-ui/core';
import Page from 'src/components/Page';
import axios from "axios";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const [user,setUser] = useState({
    name:"Mohak"
  });


  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Typography>Hello {user.name}, Good Morning :-) </Typography>
      </Container>
    </Page>
  );
};

export default Dashboard;
