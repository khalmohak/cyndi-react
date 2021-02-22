import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import MultiSlider, {Progress} from 'react-multi-bar-slider';
import {useNavigate} from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  makeStyles,
  Tooltip,
  Typography
} from '@material-ui/core';
import NotifyMe from '../../../../utils/NotifyMe';
import {AssignmentOutlined, Dashboard, InfoOutlined} from '@material-ui/icons'
//import './style.css';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '6px',
    width: "100%"
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  title: {
    position: 'relative',
    boxShadow: `5px #808080`,

  },
  titleColor: {
    color: '#000',
    marginLeft: '80px',
    fontSize: '17px',
    textTransform: 'uppercase'
  },
  teacherName: {
    color: '#808080',
    textTransform: 'capitalize',
    fontSize: '15px'
  },
  link: {
    color: '#fff',

    '&:hover': {


      color: 'blue'
    }
  },

  cardTableHeading: {
    fontWeight: '500'
  },
  bottomColor: {
    backgroundColor: '#1e1f26'
  },

  cardHeaderBackground: {
    borderRadius: '6px', backgroundColor: 'pink'


  },
  classDescription: {
    backgroundColor: '#fff',
    borderRadius: '7px'
  },
  cardContent: {
    backgroundColor: '#e6e7e8', padding: '6px'
  },
  nextClassDate: {
    fontSize: '12px',
    fontWeight: 'bold'
  },
  nextClassDateBox: {
    width: '400px',
    marginLeft: '50px',

    position: 'flex'
  },
  avatar: {
    height: '60px',
    width: '60px'
  },
  notification: {
    height: '5px',
    width: '5px',
    backgroundColor: '#fff',
    color: '#fff'
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },


}));

var attendancePercent = '40%';


var data = [
  {
    "update": "70 new employees are shifted",
    "timestamp": 1596119688264
  },
  {
    "update": "Time to take a Break, TADA!!!",
    "timestamp": 1596119686811
  },
  {
    "update": "70 new employees are shifted",
    "timestamp": 1596119688264
  },
  {
    "update": "Time to take a Break, TADA!!!",
    "timestamp": 1596119686811
  }
]

let current_class_id = 0;

const ClassesCard = ({className, card, ...rest}) => {
  const classes = useStyles();
  const [teacherName, setTeacherName] = useState(0);
  const s3Region = `ap-south-1`;
  const s3Bucket = `cyndi.primary.bucket`;
  let teacherNameTemp = '';
  let teacherPictureTemp = '';
  const navigate = useNavigate();

  const handleClassCard = (event) => {
    current_class_id = card.class_id;
    sessionStorage.setItem('current_class_id', current_class_id);
    navigate('/app/student', {replace: true});
  }

  function getTeacherName() {
    const teachersList = JSON.parse(card.teachers_list);
    const teacherId = card.user_id;
    for (let i = 0; i < teachersList.users.length; i++) {
      const teacherDetails = JSON.parse(teachersList.users[i]);
      if (teacherDetails.user_id === teacherId) {
        //setTeacherName(teacherDetails.name);
        teacherNameTemp = teacherDetails.name;
        teacherPictureTemp = teacherDetails.photo_url;
      }
    }
  };
  getTeacherName();
  //setTeacherName(teacherNameTemp);
  const user = {
    avatar: `https://s3.${s3Region}.amazonaws.com/${s3Bucket}/${teacherPictureTemp}`
  }

  const avatarName = () => {
    if (teacherPictureTemp === 'null') {
      return <Avatar>{teacherNameTemp[0]}</Avatar>
    } else {
      return <Avatar src={user.avatar}/>
    }
  }

  const zoomMeetingStart = {};


  return (
    <Card
      onClick={handleClassCard}
      className={clsx(classes.root, className)}
      {...rest}

    >
      <CardContent className={classes.cardContent}
      >

        <Box display="flex" justifyContent="left">

          <Box className={'topheader'}>
            <span>{avatarName()}</span>
            <i>

              <Box className={'dkpal'}>
                <Button
                  onClick={zoomMeetingStart}
                >Join Class</Button>
                <Box className={'dkpal2'}>
                  <NotifyMe
                    data={data}
                    storageKey='notific_key'
                    notific_key='timestamp'
                    notific_value='update'
                    heading='Notifications'
                    sortedByKey={false}
                    showDate={true}
                    size='25'
                    color="black"
                  />
                </Box>


              </Box>


              <Typography color="inherit" gutterBottom className={'hadding'}>
                {card.class_name}

                <Box className={'hadding'}>
                  {/*{card.class_description}*/}
                  {teacherNameTemp}
                </Box>

                <Box className={'date'}>
                  <Typography className={classes.nextClassDate}>
                    <i>Next Class - <b>{'12/12/2020'}</b></i>
                  </Typography>
                </Box>

              </Typography>

            </i>
          </Box>
        </Box>


        <Box>
          <Box display="flex" p={1} bgcolor="background.paper" className={'assignment'}>
            <Box p={1} className={'inner'}>Attendance </Box>
            <Box p={1} flexGrow={1} className={'inner'}>
              <Tooltip title={attendancePercent}>
                <MultiSlider
                  width='100%'
                  height='20px'
                  roundedCorners='true'>
                  <Progress className={'col1'} progress={40}/>
                  <Progress className={'white-g'} progress={100}/>
                </MultiSlider>
              </Tooltip>
            </Box>

          </Box>


          <Box display="flex" p={1} bgcolor="background.paper" className={'assignment'}>
            <Box p={1} className={'inner'}>Courses </Box>
            <Box p={1} flexGrow={1} className={'inner'}>
              <Tooltip title="20%">
                <MultiSlider
                  width='100%'
                  height='20px'
                  roundedCorners='true'>
                  <Progress className={'col2'} progress={20}/>
                  <Progress className={'white-g'} progress={100}/>
                </MultiSlider>
              </Tooltip>
            </Box>
          </Box>

          <Box display="flex" p={1} bgcolor="background.paper" className={'assignment'}>
            <Box p={1} className={'inner'}>Courses </Box>
            <Box p={1} flexGrow={1} className={'inner'}>
              <Tooltip title="100%">
                <MultiSlider
                  width='100%'
                  height='20px'
                  roundedCorners='true'>
                  <Progress className={'white-g'} progress={100}/>
                  <Progress className={'col1'} progress={70}/>
                </MultiSlider>
              </Tooltip>
            </Box>
          </Box>


          <Box display="flex" p={1} bgcolor="background.paper" className={'assignment2'}>
            <Box p={1} className={'inner3'}>Courses </Box>
            <Box p={1} flexGrow={1} className={'inner2'}>
              <MultiSlider width='100%' height='20px'>
                <Progress className={'curve'} color="#a1d9cc" progress={25}/>
                <Progress className={'curve'} color="#95c7bc" progress={50}/>
                <Progress className={'curve'} color="#88b7ad" progress={75}/>
                <Progress className={'curve'} color="#7ca79d" progress={100}/>
              </MultiSlider>
            </Box>
          </Box>


        </Box>
      </CardContent>

      <Box flexGrow={1}/>
      <Divider/>
      <Box flexGrow={1}/>
      <Divider/>
      <Box className={'bottomColor'}>
        <Grid container justify="space-between" spacing={0}>
          <Grid className={classes.link}>
            <Link className={classes.link}>
              <Dashboard></Dashboard> Board
            </Link>
          </Grid>

          <Grid className={classes.link}>
            <Link className={classes.link}>
              <InfoOutlined></InfoOutlined> Information
            </Link>
          </Grid>

          <Grid className={classes.link}>
            <Link className={classes.link}>
              <AssignmentOutlined></AssignmentOutlined> Activity
            </Link>
          </Grid>

          <Grid className={classes.link}>
            <Link className={classes.link}>
              <InfoOutlined></InfoOutlined>
            </Link>
          </Grid>

        </Grid>
      </Box>
    </Card>
  );
};

ClassesCard.propTypes = {
  className: PropTypes.string,
  card: PropTypes.object.isRequired
};

export {ClassesCard, current_class_id};
