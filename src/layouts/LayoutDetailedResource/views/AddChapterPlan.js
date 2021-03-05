import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {green} from '@material-ui/core/colors';
import {
  AppBar,
  Box,
  Button,
  Card, CardContent, CircularProgress,
  Container,
  Grid,
  Input,
  Select,
  TextField,
  Toolbar,
  Typography
} from '@material-ui/core';
import {useNavigate} from 'react-router-dom';
import Page from "../../../components/Page";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import moment from 'moment';
import {apiEndPoint} from "../../../constants";
import axios from "axios";
import S3Uploader from "../../../utils/S3Uploader";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  pandaAddButton: {
    backgroundColor: '#025fa1',
    color: '#ffffff',
    '&:hover': {
      color: '#025fa1',
      borderColor: "#025fa1"
    }
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const AddChapterPlan = ({className, ...rest}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [formDetails, setFormDetails] = useState({
    formTitle: "",
    formDescription: "",
    link: "",
    location: []
  });

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  function fileUpload(e) {
    let files = e.target.files;
    setLoading(true)
     let tempProgress = 0
    for (let i = 0; i < files.length; i++) {
      S3Uploader(files[i], 'Activity', (progress) => {

      }, (uri) => {
        tempProgress++;
        if(tempProgress === files.length){
          setLoading(false);
          setSuccess(true)
        }
        console.log(uri)
        let form = formDetails;
        form.location.push({'filename': files[i].name, 'fileurl': uri});
        setFormDetails(form)
      })
    }


  }

  const handleClick = (event) => {
    event.preventDefault();

    let apiData = {
      'class_id': sessionStorage.getItem('current_class_id'),
      'title': formDetails.formTitle,
      'description': formDetails.formDescription,
      'attached_url': formDetails.link,
      'attached_files': JSON.stringify({
        'files': formDetails.location
      }),
      'dateTime': `${moment().subtract(10, 'days').calendar()} ${moment().format('LT')}`,

    }

    let apiHeader = {
      'user_id': sessionStorage.getItem('userId'),
      'x-access-token': sessionStorage.getItem('token')
    }

    axios.post(`${apiEndPoint}/add/chapter/plan`, apiData, {
      headers: apiHeader
    }).then(response => console.log(response))
      .catch(err => console.log(err))
  };


  const handleFormTitle = (e) => {
    const title = e.target.value;
    let form = formDetails;
    form.formTitle = title;
  };

  const handleFormDescription = (e) => {
    const title = e.target.value;
    let form = formDetails;
    form.formDescription = title;
  };

  const handleFormLink = (e) => {
    const title = e.target.value;
    let form = formDetails;
    form.link = title;
  };

  function back() {
    navigate('/app/teacher/')
  }


  return (

    <Page
      className={classes.root}
      title="Class"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            <AppBar position="fixed">
              <Toolbar>
                <Button onClick={back}><KeyboardBackspaceIcon/></Button>
              </Toolbar>
            </AppBar>
            <Card style={{
              padding: "10px",
              marginTop: "100px",
            }}>
              <CardContent>
                <form className='upload-steps' onSubmit={handleClick}>
                  <TextField
                    label="Title"
                    id="formTitle"
                    onChange={handleFormTitle}
                  />
                  <br/>
                  <TextField
                    label="Description"
                    id="formDescription"
                    onChange={handleFormDescription}
                  />
                  <br/>
                  <TextField
                    label="Add Link"
                    id="formLink"
                    onChange={handleFormLink}
                  />
                  <br/>
                  <br/>
                  <Typography>Choose Files</Typography>
                  <input
                    type='file'
                    onChange={e => fileUpload(e)}
                    multiple
                  />
                  <br/>

                  <div className={classes.wrapper}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={buttonClassname}
                      disabled={loading}
                      type="submit"
                    >
                      Upload
                    </Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress}/>}
                  </div>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Box>
      </Container>
    </Page>


  )

};

export default AddChapterPlan;


