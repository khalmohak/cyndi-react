import React, {useEffect} from 'react';
import {Button, Card, CardContent, Grid, makeStyles, Typography} from "@material-ui/core";
import {apiEndPoint, s3Bucket, s3Region} from "../../constants";
import axios from "axios";
import {useNavigate} from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '20px',
    width: "100%",
    margin: "10px",
  },
  cardTitle: {
    fontSize: '25px'
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
      //console.log(res.data);
      setSyllabus(res.data)
    })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getSyllabus()
    // if (syllabusD) {
    //   console.log(JSON.parse(syllabusD[0].attached_files).files)
    // }
  }, [syllabusD])

  return (
    <>
      <Grid xs={1} sm={1} md={1} lg={1}>
        <Button
          onClick={handleAddSyllabus}
          className={classes.pandaAddButton}>
          Add
        </Button>
      </Grid>
      {syllabusD ? syllabusD.map(data => {
        return (
          <Grid xs={6} sm={6} md={4} lg={3}>
            <Card className={classes.root}>
              <CardContent>
                <Typography className={classes.cardTitle}>{data.title}</Typography>
                {JSON.parse(syllabusD[0].attached_files).files ? JSON.parse(syllabusD[0].attached_files).files.map(
                  data => {
                    return (
                      <div>
                        <a
                          href={`https://s3.${s3Region}.amazonaws.com/${s3Bucket}/${data.fileurl}`}
                        >
                          {data.filename}
                        </a>
                        <divider/>
                      </div>
                    )
                  }
                ) : <div>Waiting..</div>}
              </CardContent>
            </Card>
          </Grid>
        )
      }) : <div>Loading..</div>}

    </>
  )
}
