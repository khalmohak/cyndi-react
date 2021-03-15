import React, {useEffect, useState} from 'react';
import {AppBar, Button, CircularProgress, Fade, Modal, Tab, Tabs, Toolbar} from '@material-ui/core';
import Firebase from 'firebase';
import {makeStyles} from "@material-ui/styles";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {useNavigate} from "react-router";
import ClassBoard from "../../LayoutChat/ClassBoard";


const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

if (sessionStorage.getItem('firebaseToken')) {
  Firebase.auth().signInWithCustomToken(sessionStorage.getItem('firebaseToken'))
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
    })
    .catch((error) => {
      //let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorMessage);
    });
}

const PersonalChat = () => {
  const classes = useStyles();
  const navigate = useNavigate();


  function back() {
    navigate('/app/teacher/')
  }

  useEffect(() => {

  }, [])

  return (
    <div className="chatroom chat147" style={{marginTop: "40px"}}>
      <AppBar position="fixed">
        <Toolbar>
          <Button onClick={back}><KeyboardBackspaceIcon/></Button>
        </Toolbar>
      </AppBar>
      <div>
        <ClassBoard />
      </div>

    </div>
  );
};

export default PersonalChat;
