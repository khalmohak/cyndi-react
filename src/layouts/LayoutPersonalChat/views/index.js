import React, {useEffect, useState} from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Fade,
  Grid,
  Modal,
  Paper,
  Tab,
  Tabs,
  Toolbar, Typography
} from '@material-ui/core';
import Firebase from 'firebase';
import {makeStyles} from "@material-ui/styles";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {useNavigate} from "react-router";
import {s3URL, usersChatKey} from "../../../constants";
import UsersChat from "./ChatBoard";


const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatHeader: {
    border: "1px solid grey",
    marginBottom: "1px",
    height: "60px",
    "&:hover": {
      backgroundColor: "grey",
      cursor: "pointer"
    },
  }
}));

function loginFirebase() {
  if (sessionStorage.getItem('firebaseToken')) {
    Firebase.auth().signInWithCustomToken(sessionStorage.getItem('firebaseToken'))
      .then((userCredential) => {
        // Signed in
        let user = userCredential.user;
        console.log("success")
      })
      .catch((error) => {
        //let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorMessage);
      });
  }
}


const PersonalChat = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [otherUser, setOtherUser] = React.useState(60);
  const [friends, setFriends] = React.useState(null);

  const getUserData = async () => {

    if (Firebase.auth().currentUser == null) {
      await loginFirebase();

    }
    let ref = Firebase.database().ref('/Users').child(sessionStorage.getItem("userId")).child("/Chats");
    ref.on('value', snapshot => {
      //console.log(snapshot.val());
      setFriends(snapshot.val());
    });

  };


  function JSONToArray() {
    let arr = [];
    const key = usersChatKey(parseInt(sessionStorage.getItem('userId')), parseInt(otherUser))
    for (let i in friends) {
      arr.push({
        date: friends[i].date,
        lastMessage: "cryptLib.decryptCipherTextWithRandomIV(friends[i].lastMessage, key)",
        name: friends[i].name,
        otherUserId: friends[i].otherUserId,
        profilePic: s3URL(friends[i].profilePic),
        time: friends[i].time
      })
    }
    return arr;
  }


  function back() {
    navigate('/app/teacher/')
  }

  function changeChat(id) {
    setOtherUser(id);
  }

  useEffect(() => {
    getUserData();
  }, [])

  return (
    <div className="chatroom chat147" style={{marginTop: "40px"}}>
      <Paper>
        <AppBar position="fixed">
          <Toolbar>
            <Button onClick={back}><KeyboardBackspaceIcon/></Button>
          </Toolbar>
        </AppBar>

        <Grid
          container
          style={{marginTop: "40px"}}
        >
          <Grid
            item xs={3}
          >
            {JSONToArray().length > 0 ?
              JSONToArray().map(data => {
                return (<Box className={classes.chatHeader}
                             onClick={e => changeChat(data.otherUserId)}>
                    <Grid container>
                      <Grid
                        item
                        xs={2}
                        style={{marginTop: "8px"}}
                        direction="column"
                        justify="center"
                        alignItems="flex-start"
                      >
                        <Avatar src={data.profilePic}/>
                      </Grid>
                      <Grid
                        item
                        xs={10}
                        style={{marginTop: "10px"}}
                        direction="column"
                        justify="center"
                        alignItems="flex-start"
                      >
                        <Typography
                          style={{fontSize: "22px"}}
                        >
                          {data.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                )
              })
              : <CircularProgress/>
            }

          </Grid>
          <Grid
            item xs={9}>
            {() => {
              console.log(otherUser);
            }}
            <UsersChat
              id={otherUser}
              type="class"
            />
          </Grid>

        </Grid>
      </Paper>


    </div>
  );
};

export default PersonalChat;
