import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from '@material-ui/core';
import MultiSlider, {Progress} from "react-multi-bar-slider";
import '../../product/ClassListView/style.css';
import NotifyMe from '../../NotifyMe';
import {AssignmentOutlined, Dashboard, InfoOutlined} from '@material-ui/icons'
// import {ZoomMtg} from "@zoomus/websdk";
// import {zoomInitiater} from "../../zoom";
import {current_class_id} from "../../product/ClassListView/classCard";


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


}));


function createData(name, classes, assignments, projects, test_quiz) {
  return {name, classes, assignments, projects, test_quiz};
}

const rows = [
  createData('Classes', 12, 6, 6, '12/5/'),
  createData('Assignments', 12, 9, 3, '12/5'),
  createData('Projects', 12, 10, 2, '12/5/'),
  createData('Test/Quiz', 12, 3, 9, '12/5/'),

];

/**
 * dummy attendance percent
 * @type {string}
 */
var attendancePercent = '40%';

/**
 * dummy data for notifications
 * @type {({update: string, timestamp: number}|{update: string, timestamp: number}|{update: string, timestamp: number}|{update: string, timestamp: number})[]}
 */
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


const TeachersCard = ({className, card, ...rest}) => {
  const classes = useStyles();
  const s3Region = `ap-south-1`;
  const s3Bucket = `cyndi.primary.bucket`;
  let teacherNameTemp = '';
  let teacherPictureTemp = '';
  const navigate = useNavigate();

  /**
   * Function to get the teachers name for a specific class
   */

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

  /**
   * Function that returns avatar on the basis if user has already uploaded picture or not
   * @returns {JSX.Element}
   */

  const avatarName = () => {
    if (teacherPictureTemp === 'null') {
      return <Avatar>{teacherNameTemp[0]}</Avatar>
    } else {
      return <Avatar src={user.avatar}/>
    }
  }

  /**
   * Zoom meeting join function gets called when Join/Create class button is clicked
   */
  // const zoomMeetingStart = () => {
  //   zoomInitiater(function (zoomConfig) {
  //     console.log(zoomConfig);
  //     ZoomMtg.generateSignature(zoomConfig);
  //   })
  //
  // }

  const handleClassCard = (event) => {
    const current_class_id = card.class_id;
    sessionStorage.setItem('current_class_id', current_class_id);
    navigate('/app/teacher', {replace: true});
  }

  return (
    <Card

      className={clsx(classes.root, className)}
      onClick={handleClassCard}
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
                  //onClick={zoomMeetingStart}
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


          <Box>
            <TableContainer component={Paper}>
              <Table className={'teacher'} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Progress</TableCell>
                    <TableCell align="right">Planned</TableCell>
                    <TableCell align="right" className={classes.done}>Done</TableCell>
                    <TableCell align="right">Remaining</TableCell>
                    <TableCell align="right">Next</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.classes}</TableCell>
                      <TableCell align="right" className={classes.done}>{row.assignments}</TableCell>
                      <TableCell align="right" className={classes.remaining}>{row.projects}</TableCell>
                      <TableCell align="right" className={classes.next}>{row.test_quiz}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          {/*Description End*/}


        </Box>
      </CardContent>

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

TeachersCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default TeachersCard;
