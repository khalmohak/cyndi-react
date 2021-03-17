import React, {useEffect} from 'react';
import {Box, Container, makeStyles, Button, Grid, CircularProgress, List, ListItem} from '@material-ui/core';
import {Pagination} from '@material-ui/lab';
import Page from '../../../../components/Page';

import NotificationView from "./NotificationView";
import {useNavigate} from "react-router-dom";
import {apiEndPoint} from "../../../../constants";
import axios from "axios";
import ResourceCard from "../../../LayoutResourceForm/views/ResourceCard";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  },
  pandaAddButton: {
    backgroundColor: '#025fa1',
    color: '#ffffff',
    '&:hover': {
      color: '#025fa1',
      borderColor: "#025fa1"
    }
  }
}));

const NotificationTeacher = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [notifications, setNotifications] = React.useState([]);

  function addNotification() {
    navigate('/app/addnotification');
  }



  function getNotifications() {
    let apiData = {
      university_name: sessionStorage.getItem('universityName'),
      limit: 10,
      offset: 0
    }
    let header = {
      user_id: sessionStorage.getItem('userId'),
      'x-access-token': sessionStorage.getItem('token')
    }
    axios.post(`${apiEndPoint}/get/notification/education`, apiData, {
        headers: header
      }
    ).then(response => {
      setNotifications(response.data)
    })
      .catch(error => console.log(error))

  }
  sessionStorage.setItem("currentTab","Notifications")
  useEffect(() => {

    getNotifications();

  }, [notifications])

  return (
    <Page
      className={classes.root}
      title="Notifications"
    >
      <Container maxWidth={true}>
        <Button className={classes.pandaAddButton} onClick={addNotification}>Add Notification</Button>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="left" spacing={1}>
              {notifications ? notifications.map((data) => (
                <Grid key={data.class_id} item>
                  <NotificationView data={data}/>
                </Grid>
              )): <CircularProgress/>}
            </Grid>
          </Grid>
        </Grid>

          {/*{notifications ? notifications.map((data) => (
            <ListItem
              item
              key={data.class_id}
            >
              <NotificationView data={data}/>

            </ListItem>
          )) : <CircularProgress/>
          }*/}
          <Box
            mt={3}
            display="flex"
            justifyContent="center"
          >
            <Pagination
              color="primary"
              count={3}
              size="small"
            />
          </Box>
      </Container>
    </Page>
);
};

export default NotificationTeacher;
