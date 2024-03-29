import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Card, CardActionArea,
  CardActions,
  CardContent, CardMedia,
  Container,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import Page from '../../../../components/Page';
import {apiEndPoint, s3URL} from "../../../../constants";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PeopleIcon from '@material-ui/icons/People';
import PostAddIcon from '@material-ui/icons/PostAdd';
import {useNavigate} from "react-router-dom";
import axios from "axios";


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
  },
  card: {
    width: '50%'
  },
  avatar: {

    height: '150px',
    width: '150px'
  },
  info: {
    paddingTop:'0px'
  },
  profilePic:{
    marginTop: '-100px',
    marginBottom:'-20px'
  },
  editProfile:{
    marginTop:'-70px',
    marginLeft:'48px',
    height: 20,
    width: 40,
    backgroundColor: '#ff9800',
    color: '#fff',
    "&:hover": {
      backgroundColor: '#fff',
      color: '#ff9800'
    }
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  function handleEdit(){
    navigate('/edit/profile',{replace:true})
  }
  function getTeacherData() {
    let body = {
      role: 'Teacher'
    }
    let header = {
      user_id: sessionStorage.getItem('userId'),
      'x-access-token': sessionStorage.getItem('token')
    }
    axios.post(`${apiEndPoint}/get/role/details`, body, {
      headers: header
    }).then((response) => {
      sessionStorage.setItem('employee_id', response.data[0].employee_id);
      sessionStorage.setItem('gender', response.data[0].gender);
      sessionStorage.setItem('subject_expertise', response.data[0].subject_expertise);
      sessionStorage.setItem('teacher_rank', response.data[0].teacher_rank);
      sessionStorage.setItem('dob', response.data[0].dob);
    })
      .catch(error => console.log(error));
  }

  getTeacherData();


  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Box
          container
          spacing={3}
          display="flex"
          justifyContent="center"
        >

          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                component="img"
                //alt="Contemplative Reptile"
                height="200"
                image='https://picsum.photos/200/300'
                //title="Contemplative Reptile"
              />
              <CardContent>
                <Box className={classes.profilePic}>
                  <Avatar
                    className={classes.avatar}
                    src={`${s3URL(sessionStorage.getItem('userPhoto'))}`}
                  />

                  <Button className={classes.editProfile} onClick={handleEdit}>Edit</Button>
                </Box>

                <Box className={classes.info}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {sessionStorage.getItem('userName')}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                    {sessionStorage.getItem('collegeName')}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                    {sessionStorage.getItem('universityName')}
                  </Typography>

                </Box>

              </CardContent>
            </CardActionArea>
            <CardActions>

              <Button size="small" color="primary">
                <PeopleIcon/> 200 Following
              </Button>

              <Button size="small" color="primary">
                <GroupAddIcon/> 50 Followers
              </Button>

              <Button size="small" color="primary">
                <PostAddIcon/> 20 Posts
              </Button>
            </CardActions>
          </Card>

        </Box>
      </Container>
    </Page>
  );
};

export default Dashboard;
