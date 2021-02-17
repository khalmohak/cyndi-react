import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Box, Button, Container, Grid, Input, Select, TextField, Toolbar, Typography} from '@material-ui/core';
import {useNavigate} from 'react-router-dom';
import S3 from "react-aws-s3";
import Page from "../../components/Page";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import moment from 'moment';
import {apiEndPoint} from "../../constants";
import axios from "axios";

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
  }

}));

const AddSyllabus = ({className, ...rest}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  //const [pandaType, setPandaType] = useState();
  const navigate = useNavigate();
  const fileInput = React.useRef();
  const [formDetails, setFormDetails] = useState({
    formTitle: "",
    formDescription: "",
    link: "",
    location: []

  });
  let successUploadCount = 0;
  const config = {
    bucketName: 'cyndi.primary.bucket',
    dirName: 'Activity/',
    region: 'ap-south-1',
    accessKeyId: 'AKIA5GLSIIS4NFKWWLGC',
    secretAccessKey: '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',
  };

  function fileUpload() {
    let newArr = fileInput.current.files;
    for (let i = 0; i < newArr.length; i++) {
      let extension = fileInput.current.files[i].name;
      extension = extension.split(".");
      extension = extension[extension.length - 1];
      let size = fileInput.current.files[i].size;
      console.log(size / (1024 * 1024));
      handleUpload(newArr[i], extension, size);
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

    axios.post(`${apiEndPoint}/add/syllabus`, apiData, {
      headers: apiHeader
    }).then(response => console.log(response))
      .catch(err => console.log(err))


  };

  const handleUpload = (file, extension, size) => {
    let newFileName = file.name.replace(/\..+$/, "");
    const ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(file, newFileName).then((data) => {
      console.log(data)

      console.log(data.progress);
      if (data.status === 204) {
        console.log("success");
        successUploadCount++;
        let form = formDetails;

        let res = data.location.split("/");
        const last = res.length;
        res = res.slice(3, last);
        res = res.join("/");

        form.location.push({'filename': `${newFileName}.${extension}`, 'fileurl': res});
        let h1 = document.createElement('h5');
        let t = document.createTextNode(`File ${newFileName} Uploaded`);

        h1.appendChild(t);
        document.getElementById('checker').appendChild(h1);
        setFormDetails(form)

      } else {
        console.log("fail");
      }
    });
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
            <AppBar position="static">
              <Toolbar>
                <Button onClick={back}><KeyboardBackspaceIcon/></Button>

              </Toolbar>
            </AppBar>

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
                onChange={fileUpload}
                multiple ref={fileInput}
              />
              <div id="checker"></div>
              <br/>
              <Button className={classes.pandaAddButton} type='submit'>Upload</Button>
            </form>

          </Grid>
        </Box>
      </Container>
    </Page>


  )

};

export default AddSyllabus;


