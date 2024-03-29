import {Avatar, Box, Card, CardContent, Divider, List, makeStyles, Typography} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import {useNavigate} from "react-router";


const useStyles = makeStyles((theme) => ({
  card: {
    display: 'block',
    width: '100px',
    height: '100px',
  }
}));

export const SideMenu = ({data, ...rest}) => {
  const classes = useStyles();
  let teachersData = [];
  let studentsData = [];
  let navigate = useNavigate();

  function teachersGather() {
    let teachers = JSON.parse(data.teachers_list).users;
    for (let i = 0; i < teachers.length; i++) {
      teachersData.push(JSON.parse(teachers[i]))
    }

  }

  function studentsGather() {
    let students = JSON.parse(data.students_list).users;
    for (let i = 0; i < students.length; i++) {
      studentsData.push(JSON.parse(students[i]))
    }

  }

  teachersGather();
  studentsGather();
  const s3Region = `ap-south-1`;
  const s3Bucket = `cyndi.primary.bucket`;

  const avatarName = (teacherProfile, teacherName) => {
    const user = {
      avatar: `https://s3.${s3Region}.amazonaws.com/${s3Bucket}/${teacherProfile}`
    }
    if (teacherProfile === 'null') {
      return <Avatar>{teacherName[0]}</Avatar>
    } else {
      return <Avatar src={user.avatar}/>
    }
  };


  return (
    <>
      <Divider/>
      <List>
        <ListItem>
          <Box m={1}>
            <Card
              className={classes.card}
              onClick={() => {
                navigate('/app/teacher/resources')
              }}
            >

              <CardContent>
                <Typography>Resources</Typography>
              </CardContent>
            </Card>
          </Box>
          {/*<Box m={1}>
            <Card
              className={classes.card}
              onClick={() => {
                navigate('/app/teacher/classes')
              }}
            >

              <CardContent>
                <Typography>Classes</Typography>
              </CardContent>
            </Card>
          </Box>*/}
        </ListItem>
        <ListItem>
          <Box m={1}>
            <Card
              className={classes.card}
              onClick={() => {
                navigate('/app/teacher/syllabus')
              }}
            >

              <CardContent>
                <Typography>Syllabus</Typography>
              </CardContent>
            </Card>
          </Box>
          <Box m={1}>
            <Card
              className={classes.card}
              onClick={() => {
                navigate('/app/teacher/chapterplan')
              }}
            >

              <CardContent>
                <Typography>Chapter Plan</Typography>
              </CardContent>
            </Card>
          </Box>
        </ListItem>
      </List>


      <Typography>Class Participants</Typography>
      <List>
        <Typography>Teachers</Typography>
        {teachersData.map(data => (
          <ListItem button>
            <ListItemIcon>{avatarName(data.photo_url, data.name)}</ListItemIcon>
            <ListItemText primary={data.name}/>
          </ListItem>
        ))}
      </List>

      <List>
        <Typography>Students</Typography>
        {studentsData.map(data => (
          <ListItem button>
            <ListItemIcon>{avatarName(data.photo_url, data.name)}</ListItemIcon>
            <ListItemText primary={data.name}/>
          </ListItem>
        ))}
      </List>
    </>
  )
}
