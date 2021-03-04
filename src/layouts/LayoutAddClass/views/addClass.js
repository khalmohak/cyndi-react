import React, {useEffect} from 'react';
import {
  Button,
  makeStyles,
  withStyles,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  Typography,
  Container,
  Box,
  Grid
} from '@material-ui/core';
import TopBar from './TopBar';
import {purple} from '@material-ui/core/colors';
import {createBrowserHistory} from "history";
import ClassCardInContent from "../../LayoutClassScreen/Student/views/ClassCardInContent";
import Page from "../../../components/Page";
import {apiEndPoint, s3URL} from "../../../constants";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'auto',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'auto',
    paddingTop: 0,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 0
    },
    marginBottom: 50
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'auto'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  student: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    background: 'grey',
    color: 'white'
  }
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    // backgroundColor: purple[500],
    '&:hover': {
      // backgroundColor: purple[700],
    },
  },
}))(Button);


const AddClass1 = () => {
  const classes = useStyles();
  const [course, setCourse] = React.useState('');
  const [classTitle, setClassTitle] = React.useState('');
  const [year, setYear] = React.useState('');
  const [batch, setBranch] = React.useState('');
  const [semester, setSemester] = React.useState('');
  const [section, setSection] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [strength, setStrength] = React.useState('');
  const [students, setStudents] = React.useState([]);
  const [teachers, setTeachers] = React.useState([]);
  const [studentList, setStudentList] = React.useState();
  const [teacherList, setTeacherList] = React.useState();

  const handleCourse = (event) => {
    setCourse(event.target.value);
  };
  const handleClassTitle = (event) => {
    setClassTitle(event.target.value);
  };
  const handleYear = (event) => {
    setYear(event.target.value);
  };
  const handleBranch = (event) => {
    setBranch(event.target.value);
    getStudents();
  };
  const handleSemester = (event) => {
    setSemester(event.target.value);
  };
  const handleSection = (event) => {
    setSection(event.target.value);
  };
  const handleDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleStrength = (event) => {
    setStrength(event.target.value);
  };

  const handleStudents = (value) => () => {

    let currentIndex = -1;
    for (let i = 0; i < students.length; i++) {
      if (JSON.parse(students[i]).user_id == value.user_id) {
        currentIndex = i;
        break;
      }
    }

    const newChecked = [...students];

    let data = {
      name: value.name,
      photo_url: value.photo_url,
      user_id: value.user_id
    }

    if (currentIndex === -1) {
      newChecked.push(JSON.stringify(data));
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setStudents(newChecked);

  };

  const handleTeachers = (value) => () => {

    let currentIndex = -1;

    for (let i = 0; i < teachers.length; i++) {
      if (JSON.parse(teachers[i]).user_id == value.user_id) {
        currentIndex = i;
        break;
      }
    }
    const newChecked = [...teachers];

    let data = {
      name: value.name,
      photo_url: value.photo_url,
      user_id: value.user_id
    }

    if (currentIndex === -1) {
      newChecked.push(JSON.stringify(data));
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setTeachers(newChecked);

  };

  function getTeachers() {
    let apiData = {
      university_name: sessionStorage.getItem('universityName'),
      college: sessionStorage.getItem('collegeName'),
      limit: 10,
      offset: 0
    }
    let header = {
      user_id: sessionStorage.getItem('userId'),
      'x-access-token': sessionStorage.getItem('token')
    }

    axios.post(`${apiEndPoint}/get/teacher/list`, apiData, {
      headers: header
    }).then(res => console.log(res))
      .catch(err => console.log(err))
  }


  function getStudents() {
    let apiData = {
      university_name: sessionStorage.getItem('universityName'),
      college: sessionStorage.getItem('collegeName'),
      course: course,
      year: year,
      limit: 10,
      offset: 0
    }
    let header = {
      user_id: sessionStorage.getItem('userId'),
      'x-access-token': sessionStorage.getItem('token')
    }

    axios.post(`${apiEndPoint}/get/student/list`, apiData, {
      headers: header
    }).then(res => {

      if (res.data != 'Invalid details, please try again') {

        setStudentList(res.data)
      }
      //studentList = res.data;
    })
      .catch(err => console.log(err))
  }

  function getTeachers() {
    let apiData = {
      university_name: sessionStorage.getItem('universityName'),
      college: sessionStorage.getItem('collegeName'),
      limit: 10,
      offset: 0
    }
    let header = {
      user_id: sessionStorage.getItem('userId'),
      'x-access-token': sessionStorage.getItem('token')
    }

    axios.post(`${apiEndPoint}/get/teacher/list`, apiData, {
      headers: header
    }).then(res => {
      console.log(res.data)
      if (res.data != 'Invalid details, please try again') {

        setTeacherList(res.data)
      }
    })
      .catch(err => console.log(err))
  }

  function apiCall() {
    let apiData = {
      university_name: sessionStorage.getItem('universityName'),
      college_name: sessionStorage.getItem('collegeName'),
      course: course,
      year: year,
      semester: semester,
      batch: batch,
      class_name: classTitle,
      class_description: description,
      class_strength: strength,
      teachers_list: JSON.stringify({
        users: teachers
      }),
      students_list: JSON.stringify({
        users: students
      }),
      section: section
    }

    let header = {
      'user_id': sessionStorage.getItem('userId'),
      'x-access-token': sessionStorage.getItem('token')
    }
    console.log("at least this api is called")
    axios.post(`${apiEndPoint}/add/class`, apiData, {
      headers: header
    }).then(res => {
      console.log(res)
      if (res.status === 200) {
        alert('Class Added')
      }
    })
      .catch(err => console.log(err))
  }

  function handleSubmit() {
    apiCall();
    let apiData = {
      university_name: sessionStorage.getItem('universityName'),
      college_name: sessionStorage.getItem('collegeName'),
      course: course,
      year: year,
      semester: semester,
      batch: batch,
      class_name: classTitle,
      class_description: description,
      class_strength: strength,
      teachers_list: teachers,
      students_list: {
        users: students
      },
      section: section
    }
    console.log(apiData)
  }

  function checkedCheck(array, key) {
    for (let i = 0; i < array.length; i++) {
      if (JSON.parse(array[i]).user_id == key) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    getStudents();
    getTeachers()
  }, [])


  return (

    <Page
      className={classes.root}
      title="Add Class"
    >
      <Container maxWidth={false} minHeight={true}>

        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >

            <div className={classes.wrapper}>
              <div className={classes.contentContainer}>
                <div className={classes.content}>
                  <TopBar/>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="course">Select Course</InputLabel>
                    <Select
                      labelId="course"
                      id="demo-simple-select"
                      value={course}
                      onChange={handleCourse}
                    >
                      <MenuItem value={'B.Tech'}>B.Tech</MenuItem>

                    </Select>

                  </FormControl>
                  <br/>
                  <FormControl className={classes.formControl}>
                    <TextField
                      labelId="title"
                      label="Class Title"
                      onChange={handleClassTitle}
                    >
                    </TextField>
                  </FormControl>
                  <br/>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="year">Select Year</InputLabel>
                    <Select
                      labelId="year"
                      id="demo-simple-select"
                      value={year}
                      onChange={handleYear}
                    >
                      <MenuItem value={'1st year'}>1st year</MenuItem>

                    </Select>
                  </FormControl>
                  <br/>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="batch">Select Batch</InputLabel>
                    <Select
                      labelId="batch"
                      value={batch}
                      onChange={handleBranch}
                    >
                      <MenuItem value={"2015"}>2015</MenuItem>
                      <MenuItem value={"2016"}>2016</MenuItem>
                      <MenuItem value={"2017"}>2017</MenuItem>
                      <MenuItem value={"2018"}>2018</MenuItem>
                      <MenuItem value={"2019"}>2019</MenuItem>
                      <MenuItem value={"2020"}>2020</MenuItem>
                      <MenuItem value={"2021"}>2021</MenuItem>
                    </Select>
                  </FormControl>
                  <br/>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="semester">Select Semester(Optional)</InputLabel>
                    <Select
                      labelId="semester"
                      value={semester}
                      onChange={handleSemester}
                    >
                      <MenuItem value={"1st"}>1st</MenuItem>
                      <MenuItem value={"2nd"}>2nd</MenuItem>
                      <MenuItem value={"3rd"}>3rd</MenuItem>
                      <MenuItem value={"4th"}>4th</MenuItem>
                      <MenuItem value={"5th"}>5th</MenuItem>
                      <MenuItem value={"6th"}>6th</MenuItem>
                      <MenuItem value={"7th"}>7th</MenuItem>
                      <MenuItem value={"8th"}>8th</MenuItem>

                    </Select>
                  </FormControl>
                  <br/>
                  <FormControl className={classes.formControl}>
                    <TextField
                      label="Section(Optional)"
                      onChange={handleSection}
                    >
                    </TextField>
                  </FormControl>
                  <br/>
                  <FormControl className={classes.formControl}>
                    <TextField
                      label="Description"
                      onChange={handleDescription}
                    >
                    </TextField>
                  </FormControl>
                  <br/>
                  <FormControl className={classes.formControl}>
                    <TextField
                      label="Enter class strength"
                      onChange={handleStrength}
                    >
                    </TextField>
                  </FormControl>
                  <Typography>
                    Add Students
                  </Typography>


                  {studentList ? <List dense className={classes.student}>

                    {studentList.map((value) => {
                      const labelId = `checkbox-list-secondary-label-${value.user_id}`;
                      return (
                        <ListItem key={value.name} button>
                          <ListItemAvatar>
                            <Avatar
                              alt={`${value.name}`}
                              src={`${s3URL(value.photo_url)}`}
                            />
                          </ListItemAvatar>
                          <ListItemText id={labelId} primary={`${value.name}`}/>
                          <ListItemSecondaryAction>
                            <Checkbox
                              edge="end"
                              onChange={handleStudents(value)}
                              checked={checkedCheck(students, value.user_id)}
                              inputProps={{'aria-labelledby': labelId}}
                            />
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })}
                  </List> : <div>Loading...</div>}
                  <Typography>
                    Add Teachers
                  </Typography>

                  {teacherList ? <List dense className={classes.student}>
                    {teacherList.map((value) => {
                      const labelId = `checkbox-list-secondary-label-${value.user_id}`;
                      return (
                        <ListItem key={value.name} button>
                          <ListItemAvatar>
                            <Avatar
                              alt={`${value.name}`}
                              src={`${s3URL(value.photo_url)}`}
                            />
                          </ListItemAvatar>
                          <ListItemText id={labelId} primary={`${value.name}`}/>
                          <ListItemSecondaryAction>
                            <Checkbox
                              edge="end"
                              onChange={handleTeachers(value)}
                              checked={checkedCheck(teachers, value.user_id)}
                              inputProps={{'aria-labelledby': labelId}}
                            />
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })}
                  </List> : <div>Loading...</div>}

                  <br/>
                  <Button
                    className={classes.button}
                    onClick={handleSubmit}
                  >Add Class</Button>


                </div>
              </div>
            </div>

          </Grid>
        </Box>
      </Container>
    </Page>

  );
};

export default AddClass1;
