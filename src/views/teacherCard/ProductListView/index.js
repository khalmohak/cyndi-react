import React, {useEffect, useState} from 'react';
import {Box, CircularProgress, Container, Grid, makeStyles} from '@material-ui/core';
import {Pagination} from '@material-ui/lab';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import TeachersCard from './TeacherCard';
import axios from "axios";
import {apiEndPoint} from "../../../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  classCard: {
    height: '100%'
  }
}));

const TeacherCard = () => {
  const classes = useStyles();
  const [teacherData, setTeacherData] = useState();
  const headers = {
    'user_id': sessionStorage.getItem('userId'),
    'x-access-token': sessionStorage.getItem('token')
  };
  const ApiData = {
    university_name: sessionStorage.getItem('universityName'),
    college_name: sessionStorage.getItem('collegeName')
  };


  const getClassData = () => {
    axios.post(`${apiEndPoint}/get/class/teacher`, ApiData, {
      headers: headers
    }).then(response => {
      const classArray = response.data;
      setTeacherData(classArray);
      console.log("TeacherCard")
      console.log(classArray);
    })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getClassData();
  }, []);


  if (teacherData) {
    return (
      <Page
        className={classes.root}
        title="Class"
      >
        <Container maxWidth={false}>
          <Toolbar/>
          <Box mt={3}>
            <Grid
              container
              spacing={3}
            >
              {teacherData.map((card) => (
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
              ))}
            </Grid>
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
  } else {
    return (
      <CircularProgress className={classes.loading}/>
    )
  }
};

export default TeacherCard;
