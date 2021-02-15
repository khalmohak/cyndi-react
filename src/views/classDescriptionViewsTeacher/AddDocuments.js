import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  AppBar,
  Backdrop,
  Box,
  Button, Container,
  Fade, Grid,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Toolbar,
  Typography
} from '@material-ui/core';
import {useNavigate} from 'react-router-dom';
import S3 from "react-aws-s3";
import Page from "../../components/Page";


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
  }

}));

const AddDocuments = ({className, ...rest}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  //const [pandaType, setPandaType] = useState();
  const navigate = useNavigate();
  const fileInput = React.useRef();


  const config = {
    bucketName: 'cyndi.primary.bucket',
    dirName: 'Activity/',
    region: 'ap-south-1',
    accessKeyId: 'AKIA5GLSIIS4NFKWWLGC',
    secretAccessKey: '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',
  };

  const handleClick = (event) => {
    event.preventDefault();
    let newArr = fileInput.current.files;
    for (let i = 0; i < newArr.length; i++) {
      handleUpload(newArr[i]);
    }
  };

  const handleUpload = (file) => {
    let newFileName = file.name.replace(/\..+$/, "");
    const ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(file, newFileName).then((data) => {
      console.log(data)
      if (data.status === 204) {
        console.log("success");
      } else {
        console.log("fail");
      }
    });
  };

  const [formDetails, setFormDetails] = useState({
    formTitle: "",
    formDescription: "",

  });


  const handleOpenModal = (e) => {
    setAnchorEl(null);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
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


  const nextButton = () => {
    let form = formDetails;
    form.pandaType = sessionStorage.getItem('pandaType');
    setFormDetails(form);
    sessionStorage.setItem('formDetails', JSON.stringify(formDetails));
    navigate('/app/resources', {replace: true});
  };

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
                  <Button>Back</Button>

                </Toolbar>
              </AppBar>

              <form lassName='upload-steps' onSubmit={handleClick}>
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

                <input type='file' multiple ref={fileInput}/>

                <br/>
                <button type='submit'>Upload</button>



              </form>

            </Grid>
          </Box>
        </Container>
      </Page>






  )

};

export default AddDocuments;


