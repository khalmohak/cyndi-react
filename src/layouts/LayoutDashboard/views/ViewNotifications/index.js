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
    navigate('/app/addnotifications');
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
      console.log(response.data);
      setNotifications(response.data)
    })
      .catch(error => console.log(error))

  }

  useEffect(() => {
    getNotifications();

  }, [notifications])

  return (
    <Page
      className={classes.root}
      title="Notifications"
    >
      <Container maxWidth={false}>
        <Button className={classes.pandaAddButton} onClick={addNotification}>Add Notification</Button>

        <Box mt={3}>
          <Box
            container
            spacing={3}
            display="block"
            justifyContent="center"
          >
            {notifications ? notifications.map((data) => (
              <ListItem
                item
                key={data.class_id}
              >
                <NotificationView data={data}/>

              </ListItem>
            )) : <CircularProgress/>
            }
          </Box>
        </Box>
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
