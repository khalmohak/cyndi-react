import React, {useEffect} from 'react';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  makeStyles,
  Toolbar,
  Typography
} from "@material-ui/core";
import {apiEndPoint, s3Bucket, s3Region} from "../../constants";
import axios from "axios";
import {useNavigate} from "react-router";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import LinkPreview from 'react-native-link-preview';



const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '20px',
    width: "100%",
    margin: "10px",
    display: 'block',
    textAlign: 'left',
    height: "100%",
  },
  cardTitle: {
    fontSize: '25px'
  },
  cardDescription: {
    fontSize: '13px',
    color: 'grey'
  },
  cardLink: {
    paddingBottom: '5px',
  },
  datetime: {
    paddingBottom: '5px',
    fontSize: '12px'
  },
  attachments: {
    paddingBottom: '5px',
    fontSize: '20px'
  },

  pandaAddButton: {
    backgroundColor: '#025fa1',
    color: '#ffffff',
    margin: '5px',
    '&:hover': {
      color: '#025fa1',
      borderColor: "#025fa1"
    }
  }

}));

export const Syllabus = () => {
  const classes = useStyles();
  const [syllabusD, setSyllabus] = React.useState(0)
  const navigate = useNavigate();

  function handleAddSyllabus() {
    navigate('/app/teacher/syllabus/addsyllabus')
  }

  function getSyllabus() {
    let data = {
      class_id: sessionStorage.getItem('current_class_id')
    }
    let header = {
      'user_id': sessionStorage.getItem('userId'),
      'x-access-token': sessionStorage.getItem('token')
    }
    axios.post(`${apiEndPoint}/get/syllabus`, data, {
      headers: header
    }).then(res => {
      setSyllabus(res.data)
    })
      .catch(err => console.log(err))
  }

  function getTitle() {
    LinkPreview.getPreview('https://www.youtube.com/')
      .then(data => console.log(data));
  }

  function back() {
    navigate('/app/teacher/')
  }

  useEffect(() => {
    getSyllabus();
    getTitle();
    // if (syllabusD) {
    //   console.log(JSON.parse(syllabusD[0].attached_files).files)
    // }
  }, [syllabusD])

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button onClick={back}><KeyboardBackspaceIcon/></Button>

        </Toolbar>
      </AppBar>
      <Grid xs={1} sm={1} md={1} lg={1}>
        <Button
          onClick={handleAddSyllabus}
          className={classes.pandaAddButton}>
          Add
        </Button>
      </Grid>
      {syllabusD ? syllabusD.map(data => {
        return (
          <Box
            container
            spacing={3}
            display="flex"
            justifyContent="center"
          >
            <Grid xs={6} sm={6} md={4} lg={3}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography className={classes.cardTitle}>{data.title}</Typography>
                  <Typography className={classes.cardDescription}>{data.description}</Typography>
                  <a className={classes.cardLink} href={data.attached_url}>Attached Link Here</a>
                  <Typography className={classes.datetime}>{data.datetime}</Typography>
                  <Divider/>
                  <Typography className={classes.attachments}>Attachments</Typography>
                  {JSON.parse(syllabusD[0].attached_files).files ? JSON.parse(syllabusD[0].attached_files).files.map(
                    data => {
                      return (
                        <div>
                          <Box
                            pb={1}
                          >
                            <a
                              href={`https://s3.${s3Region}.amazonaws.com/${s3Bucket}/${data.fileurl}`}
                            >
                              {data.filename}
                            </a>
                          </Box>

                          <Divider/>
                        </div>
                      )
                    }
                  ) : <div>Waiting..</div>}
                </CardContent>
              </Card>
            </Grid>
          </Box>
        )
      }) : <div>Loading..</div>}

    </>
  )
}
