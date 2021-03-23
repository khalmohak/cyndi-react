
import React, {useEffect, useState} from 'react';
import {Button, CircularProgress, Fade, Modal} from '@material-ui/core';
import Firebase from 'firebase';
// import '../LayoutClassScreen/Teacher/views/App.css';
import Message from './Message.js';
import cryptLib from "@skavinvarnan/cryptlib";
import {classKey, getCurrentTime, getTodaysDate, usersChatKey, usersKey} from "../../../constants";
import useSound from 'use-sound';
import sent from '../../../components/sent.mp3';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Backdrop from '@material-ui/core/Backdrop';
import {makeStyles} from "@material-ui/styles";
import PermMediaIcon from '@material-ui/icons/PermMedia';
import DescriptionIcon from '@material-ui/icons/Description';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import ContactsIcon from '@material-ui/icons/Contacts';
import S3Uploader from "../../../utils/S3Uploader";
import Audio from "./Audio";
import Image from "./Image";
import Documents from "./Document";
// import {getAudioDurationInSeconds} from 'get-audio-duration';

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
  UploadIcons: {
    height: "100px",
    width: "100px",
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

const UsersChat = (chatID) => {
  const classes = useStyles();
  let [chat, setChat] = useState([]);
  let [userChat, setUserChat] = useState();
  const [play] = useSound(sent);
  const [open, setOpen] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getUserData = () => {
    let key = usersChatKey(parseInt(chatID.id),parseInt(sessionStorage.getItem('userId')));
    let ref = Firebase.database().ref('/Chats').child(key);
    ref.on('value', snapshot => {
      //console.log(snapshot.val());
      // let data = chat;
      // chat.push(snapshot.val());
      setChat(snapshot.val());
      setTimeout(() => {
        scrollToBottom();
      }, 400)
    });
  };

  const sendChat = (e, message) => {
    e.preventDefault();
    const classId = chatID.id;
    let classBoard = Firebase.database().ref('/ClassBoard');
    let ref = classBoard.child(classId);
    ref.push(message);
    setUserChat("");
    play();
    scrollToBottom();
  }


  const sendTextMessage = (e, message) => {
    e.preventDefault();
    const classId = chatID.id;
    const key = classKey(classId);

    sendChat(e, {
      classId: classId,
      data: {},
      date: getTodaysDate(),
      message: cryptLib.encryptPlainTextWithRandomIV(message, key),
      messageId: "",
      sameDate: false,
      sameUser: false,
      senderId: sessionStorage.getItem('userId'),
      senderName: sessionStorage.getItem('userName'),
      senderProfilePic: sessionStorage.getItem('userPhoto'),
      time: getCurrentTime()
    })
    setUserChat("");
    play();

    setTimeout(() => {
      scrollToBottom();
    }, 400)
  }

  const setUserMessage = (e) => {
    e.preventDefault();
    setUserChat(e.target.value)
  }

  let messages = [];


  function scrollToBottom() {
    const duration = 2000;
    const list = document.getElementById("chats");

    if (list !== null) {
      const to = list.scrollHeight;
      if (duration <= 0) return;
      let difference = to - list.scrollTop;
      let perTick = difference / duration * 10;

      setTimeout(function () {
        list.scrollTop = list.scrollTop + perTick;
        if (list.scrollTop === to) return;
        list.scrollTop = to;
        // scrollTo(list, to, duration - 10);
      }, 10);
    }

    /*if (list.scrollTop === list.scrollHeight) return;
    const cosParameter = list.scrollTop / 2;
    let scrollCount = 0, oldTimestamp = null;
    function step(newTimestamp) {
      if (oldTimestamp !== null) {
        scrollCount += Math.PI * (newTimestamp - oldTimestamp) / 2000;
        if (scrollCount >= Math.PI) return list.scrollTop = list.scrollHeight;
        list.scrollTop = (cosParameter + cosParameter * Math.cos(scrollCount))+list.scrollHeight;
      }
      oldTimestamp = newTimestamp;
      window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);*/
  }

  function audioUpload(e) {
    let files = e.target.files;
    let file = files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      console.log(reader.result)
    };
    setLoading(true)
    let tempProgress = 0
    const classId = chatID.id;
    const key = classKey(classId);
    for (let i = 0; i < files.length; i++) {
      S3Uploader(files[i], 'Activity', (progress) => {
      }, (uri) => {
        tempProgress++;
        if (tempProgress === files.length) {
          setLoading(false);
          setSuccess(true)
        }
        console.log(uri)
        sendChat(e, {
          classId: classId,
          data: {
            dataType: 2,
            dataUrl: JSON.stringify({
              "fileName": files[0].name,
              "fileUrl": uri,
              "fileType": "mp3",
              "fileSize": `${(files[0].size / 1024) / 1024} MB`,
              "fileDuration": "4:10",
              "fileLocalPath": ""
            })
          },
          date: getTodaysDate(),
          message: cryptLib.encryptPlainTextWithRandomIV("Audio", key),
          messageId: "",
          sameDate: false,
          sameUser: false,
          senderId: sessionStorage.getItem('userId'),
          senderName: sessionStorage.getItem('userName'),
          senderProfilePic: sessionStorage.getItem('userPhoto'),
          time: getCurrentTime()
        })

      })
    }
    handleClose();
  }

  function imageUpload(e) {
    let files = e.target.files;
    let file = files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      console.log(reader.result)
    };
    setLoading(true)
    let tempProgress = 0
    const classId = chatID.id;
    const key = classKey(classId);
    for (let i = 0; i < files.length; i++) {
      S3Uploader(files[i], 'Activity', (progress) => {
      }, (uri) => {
        tempProgress++;
        if (tempProgress === files.length) {
          setLoading(false);
          setSuccess(true)
        }
        console.log(uri)
        sendChat(e, {
          classId: classId,
          data: {
            dataType: 7,
            dataUrl: JSON.stringify({
              "dataUrl": uri,
              "imageCaption": " "
            })
          },
          date: getTodaysDate(),
          message: cryptLib.encryptPlainTextWithRandomIV("Audio", key),
          messageId: "",
          sameDate: false,
          sameUser: false,
          senderId: sessionStorage.getItem('userId'),
          senderName: sessionStorage.getItem('userName'),
          senderProfilePic: sessionStorage.getItem('userPhoto'),
          time: getCurrentTime()
        })

      })
    }
    handleClose();
  }

  function documentUpload(e) {
    let files = e.target.files;
    let file = files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      console.log(reader.result)
    };
    setLoading(true)
    let tempProgress = 0
    const classId = chatID.id;
    const key = classKey(classId);
    for (let i = 0; i < files.length; i++) {
      S3Uploader(files[i], 'Activity', (progress) => {
      }, (uri) => {
        tempProgress++;
        if (tempProgress === files.length) {
          setLoading(false);
          setSuccess(true)
        }
        console.log(uri)
        sendChat(e, {
          classId: classId,
          data: {
            dataType: 5,
            dataUrl: JSON.stringify({
              "fileName": files[0].name,
              "fileUrl": uri,
              "fileType": files[0].type,
              "fileSize": `${(files[0].size / 1024) / 1024} MB`
            })
          },
          date: getTodaysDate(),
          message: cryptLib.encryptPlainTextWithRandomIV("Audio", key),
          messageId: "",
          sameDate: false,
          sameUser: false,
          senderId: sessionStorage.getItem('userId'),
          senderName: sessionStorage.getItem('userName'),
          senderProfilePic: sessionStorage.getItem('userPhoto'),
          time: getCurrentTime()
        })

      })
    }
    handleClose();
  }

  const messageSorter = (chat) => {
    if (chat.data) {

      if (chat.data.dataType === 2) {
        return (<Audio chat={chat.message}
                       senderName={chat.senderName}
                       data={chat.data}
                       time={chat.time}
                       senderId={chat.senderId}/>)
      } else if (chat.data.dataType === 5) {
        return (
          <Documents chat={chat.message} senderName={chat.senderName} data={chat.data} time={chat.time}
                     senderId={chat.senderId}/>
        )
      } else if (chat.data.dataType === 7) {
        return (
          <Image chat={chat.message} senderName={chat.senderName} data={chat.data} time={chat.time}
                 senderId={chat.senderId}/>
        )
      }
    } else {
      return (
        <Message chat={chat.message} senderName={chat.senderName} data={chat.data} time={chat.time}
                 senderId={chat.senderId}/>
      )
    }
  }

  useEffect(() => {
    getUserData();
    if (chat) {
      const key = usersKey(parseInt(chatID.id),parseInt(sessionStorage.getItem('userId')));
      console.log(key)
      for (let i in chat) {
        console.log(chat[i])
        if (chat[i]['message']) {
          //console.log(cryptLib.decryptCipherTextWithRandomIV(chat[i]['message'], key))
          // messages.push({
          //    message: cryptLib.decryptCipherTextWithRandomIV(chat[i]['message'], key),
          //   //message:chat[i]['message'],
          //   senderId: chat[i]['senderId'],
          //   time: chat[i]['time'],
          //   data: chat[i]['data']
          // })
        }
      }
    }
  }, [chatID])

  return (
    <div className="chatroom chat147">
      <div id="chats" className="chats">
        {
          messages ?
            messages.map((chat) =>
              //messageSorter(chat)
              console.log(chat)
            ) : <CircularProgress/>
        }
      </div>

      <form className="input">
        <input type="text" value={userChat} onChange={e => setUserMessage(e)}/>
        {/*<Input type="file"><AttachFileIcon/></Input>*/}
        <label className="custom-file-upload">
          <Button onClick={handleOpen} style={
            {
              display: 'none'
            }
          }/>
          <AttachFileIcon/>
        </label>
        <Button type="submit" onClick={e => sendTextMessage(e, userChat)} value="Submit">Send</Button>
      </form>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Upload File</h2>
            <label style={
              {
                border: "1px solid #ccc",
                display: "inline-block",
                cursor: 'pointer'
              }
            }>
              <input type="file"
                     onChange={e => imageUpload(e)}
                     multiple style={
                {
                  display: 'none',
                }
              }/>
              <PermMediaIcon className={classes.UploadIcons}/>
            </label>

            <label style={
              {
                border: "1px solid #ccc",
                display: "inline-block",
                cursor: 'pointer'
              }
            }>
              <input type="file"
                     onChange={e => documentUpload(e)}
                     multiple style={
                {
                  display: 'none'
                }
              }/>
              <DescriptionIcon className={classes.UploadIcons}/>
            </label>

            <label style={
              {
                border: "1px solid #ccc",
                display: "inline-block",
                cursor: 'pointer'
              }
            }>
              <input type="file"
                     onChange={e => audioUpload(e)}

                     multiple
                     style={
                       {
                         display: 'none'
                       }
                     }/>
              <AudiotrackIcon className={classes.UploadIcons}/>
            </label>


          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default UsersChat;
