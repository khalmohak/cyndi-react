import React, {useEffect, useState} from 'react';
import {Box, Button, CircularProgress, Container, Grid, makeStyles} from '@material-ui/core';
import {Pagination} from '@material-ui/lab';
import Page from '../../../../components/Page';
import TeachersCard from './TeachersCard';
import axios from "axios";
import {apiEndPoint} from "../../../../constants";
import {useNavigate} from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '80%',
    paddingBottom: 0,
    paddingTop: theme.spacing(3)
  },
  classCard: {
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

const TeacherCard = () => {
  const classes = useStyles();
  const [teacherData, setTeacherData] = useState([]);
  const navigate = useNavigate();
  /**
   * @headers data to post to api in the header
   * @ApiData data to post to the api in the body
   * @type {{user_id: string, "x-access-token": string}}
   */

  const headers = {
    'user_id': sessionStorage.getItem('userId'),
    'x-access-token': sessionStorage.getItem('token')
  };
  const ApiData = {
    university_name: sessionStorage.getItem('universityName'),
    college_name: sessionStorage.getItem('collegeName')
  };

  /**
   * Pings the get/class/teacher api for class data
   */
  const getClassData = () => {
    axios.post(`${apiEndPoint}/get/class/teacher`, ApiData, {
      headers: headers
    }).then(response => {
      const classArray = response.data;
      setTeacherData(classArray);
      sessionStorage.setItem('classData', JSON.stringify(response));

    })
      .catch(err => {
        console.log(err)
      })
  }
  sessionStorage.setItem("currentTab","Class")
  function goToAddClass(){
    navigate('/add/class');
  }

  useEffect(() => {

    getClassData();
  }, []);


  return (
    <Page
      className={classes.root}
      title="Class"
    >

      <Container maxWidth={false}>
        <Button className={classes.pandaAddButton} onClick={goToAddClass}>Add Class</Button>
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >

            {teacherData ? teacherData.map((card) => (
              <Grid
                item
                key={card.class_id}
                lg={4}
                md={6}
                xs={12}
              >
                <TeachersCard
                  className={classes.classCard}
                  card={card}
                />
              </Grid>
            )) : <CircularProgress className={classes.loading}/>}
          </Grid>
        </Box>
        <Box
          mt={1}
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

export default TeacherCard;
