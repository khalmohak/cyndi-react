import React, {useState} from 'react';
import PropTypes from 'prop-types';
import AWS from 'aws-sdk';
import axios from "axios";
import {
  AppBar,
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Fade,
  Grid,
  Input,
  makeStyles,
  Menu,
  MenuItem,
  Modal, Select,
  Switch,
  TextField, Toolbar,
  Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
//import './App.css';
import {current_class_id} from "../product/ClassListView/classCard";
import {apiEndPoint, s3URL} from "../../constants";
import moment from "moment";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {useNavigate} from "react-router-dom";

const Dropzone = require('react-dropzone');
const upload = require('superagent')
var ReactS3Uploader = require('react-s3-uploader');


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '10px',
    margin: "10px",
    textAlign: "center",
    padding: "10px",
    borderTop: '7px solid #025fa1',
    width: "800px"

  }

}));

const Notification = ({className, ...rest}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [notiType, setNotiType] = React.useState('');
  const [body, setBody] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [link, setLink] = React.useState('');

  const handleChangeType = (event) => {
    setNotiType(event.target.value);
  };

  const handleChangeBody = (event) => {
    setBody(event.target.value);
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeLink = (event) => {
    setLink(event.target.value);
  };

  function back() {
    navigate('/app/notifications')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let apiData = {
      class_id: sessionStorage.getItem('current_class_id'),
      body:body,
      title:title,
      datetime:`${moment().subtract(10, 'days').calendar()} ${moment().format('LT')}`,
      university_name:sessionStorage.getItem('universityName'),
      college_name:sessionStorage.getItem('collegeName'),
      type:notiType,
      link:link
    }

    let header = {
      user_id: sessionStorage.getItem('userId'),
      'x-access-token': sessionStorage.getItem('token')
    }
    console.log(apiData);
    axios.post(`${apiEndPoint}/add/notification/education`, apiData, {
      headers: header
    }).then(response => {
      console.log(response)
    })
      .catch(error => {
        console.log(error)
      })


  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button onClick={back}><KeyboardBackspaceIcon/></Button>
        </Toolbar>
      </AppBar>
      <form>
        <Typography>Select notification type</Typography>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={notiType}
          onChange={handleChangeType}
        >
          <MenuItem value={'College'}>College</MenuItem>
          <MenuItem value={'University'}>University</MenuItem>
          <MenuItem value={'Department'}>Department</MenuItem>
          <MenuItem value={'Branch'}>Branch</MenuItem>
          <MenuItem value={'Class'}>Class</MenuItem>

        </Select>
        <br/>
        <br/>

        <TextField label="Link" variant="outlined" onChange={handleChangeLink}/>
        <br/>
        <TextField label="Title" variant="outlined" onChange={handleChangeTitle}/>
        <br/>
        <TextField label="Description" variant="outlined" onChange={handleChangeBody}/>
        <br/>

        <Button type={"submit"} onClick={handleSubmit}>Send it</Button>
      </form>

    </>
  );

};

export default Notification;