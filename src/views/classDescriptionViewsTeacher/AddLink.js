import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  AppBar,
  Backdrop,
  Box,
  Button, Container,
  Fade, FormControlLabel, FormGroup, Grid, Input,
  Menu,
  MenuItem,
  Modal, Select,
  TextField,
  Toolbar,
  Typography
} from '@material-ui/core';
import {useNavigate} from 'react-router-dom';
import S3 from "react-aws-s3";
import Page from "../../components/Page";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import moment from 'moment';
import {apiEndPoint} from "../../constants";
import axios from "axios";
import {func} from "prop-types";

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

const AddMedia = ({className, ...rest}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const fileInput = React.useRef();
  const [formDetails, setFormDetails] = useState({
    formTitle: "",
    formDescription: "",
    classes: [],
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



  const handleClick = (event) => {
    event.preventDefault();
    console.log(formDetails);

    let apiData = {
      'university_name': sessionStorage.getItem('universityName'),
      'college_name': sessionStorage.getItem('collegeName'),
      'title': formDetails.formTitle,
      'description': formDetails.formDescription,
      'assigned_to': JSON.stringify({
        'assigned_to': formDetails.classes
      }),
      'attached_files': JSON.stringify({
        'link': formDetails.location
      }),
      'datetime': `${moment().subtract(10, 'days').calendar()} ${moment().format('LT')}`,
      'type': 'Media'
    }
    console.log(apiData)
    let apiHeader = {
      'user_id': sessionStorage.getItem('userId'),
      'x-access-token': sessionStorage.getItem('token')
    }

    axios.post(`${apiEndPoint}/add/resource`, apiData, {
      headers: apiHeader
    }).then(response => console.log(response))
      .catch(err => console.log(err))


  };




  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

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
  const handleFormLink = (e)=>{
    const link = e.target.value;
    let form = formDetails;
    form.location = link;
  }

  function back() {
    navigate('/app/teacher/resources')
  }

  function handleChangeClasses(event) {
    const class_id = event.target.value;
    let form = formDetails;
    form.classes = [...form.classes, {'class_name': class_id[0].class_name, 'class_id': class_id[0].class_id}];
    setFormDetails(form);

  }

  const classData = JSON.parse(sessionStorage.getItem('classData')).data;


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
              <TextField
                label="Add Link"
                id="formDescription"
                onChange={handleFormLink}
              />
              <br/>






              <Typography>Assigned To-</Typography>
              <Select
                labelId="demo-mutiple-name-label"
                id="demo-mutiple-name"
                multiple
                value={formDetails.classes}
                onChange={handleChangeClasses}
                input={<Input/>}
                MenuProps={MenuProps}
              >
                {classData.map((data) => (
                  <option key={data.class_id} value={data}>
                    {data.class_name}
                  </option>
                ))}
              </Select>
              <br/>
              <br/>
              <Button className={classes.pandaAddButton} type='submit'>Upload</Button>
            </form>

          </Grid>
        </Box>
      </Container>
    </Page>


  )

};

export default AddMedia;


