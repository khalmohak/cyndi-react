// import React, {useEffect, useState} from 'react';
// import {Button, CircularProgress, Fade, Modal} from '@material-ui/core';
// import Firebase from 'firebase';
// import '../LayoutClassScreen/Teacher/views/App.css';
// import Message from './Message.js';
// import cryptLib from "@skavinvarnan/cryptlib";
// import {classKey, getCurrentTime, getTodaysDate, usersChatKey} from "../../constants";
// import useSound from 'use-sound';
// import sent from '../../components/sent.mp3';
// import AttachFileIcon from '@material-ui/icons/AttachFile';
// import Backdrop from '@material-ui/core/Backdrop';
// import {makeStyles} from "@material-ui/styles";
// import PermMediaIcon from '@material-ui/icons/PermMedia';
// import DescriptionIcon from '@material-ui/icons/Description';
// import AudiotrackIcon from '@material-ui/icons/Audiotrack';
// import ContactsIcon from '@material-ui/icons/Contacts';
// import S3Uploader from "../../utils/S3Uploader";
// import Audio from "./Audio";
// import Image from "./Image";
// import Documents from "./Document";
// // import {getAudioDurationInSeconds} from 'get-audio-duration';
//
// const useStyles = makeStyles((theme) => ({
//   modal: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   paper: {
//     backgroundColor: theme.palette.background.paper,
//     border: '2px solid #000',
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
//   UploadIcons: {
//     height: "100px",
//     width: "100px",
//   }
// }));
//
// if (sessionStorage.getItem('firebaseToken')) {
//   Firebase.auth().signInWithCustomToken(sessionStorage.getItem('firebaseToken'))
//     .then((userCredential) => {
//       // Signed in
//       let user = userCredential.user;
//     })
//     .catch((error) => {
//       //let errorCode = error.code;
//       let errorMessage = error.message;
//       console.log(errorMessage);
//     });
// }
//
// class ClassBoard extends React.Component {
//   //const classes = useStyles();
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       chat: undefined,
//       userChat: "",
//       open: false,
//       loading: false,
//       success: false
//     };
//   }
//
//   // let [chat, setChat] = useState();
//   // let [userChat, setUserChat] = useState();
//   // const [play] = useSound(sent);
//   // const [open, setOpen] = React.useState(false);
//   // const [loading, setLoading] = React.useState(false);
//   // const [success, setSuccess] = React.useState(false);
//
//
//   handleOpen = () => {
//     // setOpen(true);
//     let open = this.state;
//     open.open = true;
//     this.setState(open)
//   };
//
//   handleClose = () => {
//     //setOpen(false);
//     let open = this.state;
//     open.open = false;
//     this.setState(open)
//   };
//
//   getUserData = () => {
//
//     if (this.props.type === 'class') {
//       let ref = Firebase.database().ref('/ClassBoard');
//       ref.on('value', snapshot => {
//         console.log(snapshot.val());
//         let chat = this.state;
//         chat.chat = snapshot.val();
//         //setChat(snapshot.val());
//         this.setState(chat);
//         setTimeout(() => {
//           this.scrollToBottom();
//         }, 400)
//       });
//     } else if (this.props.type === 'users') {
//       let key = usersChatKey(parseInt(this.props.id), parseInt(sessionStorage.getItem('userId')));
//       let ref = Firebase.database().ref('/Chats').child(key);
//       console.log(key + "   " + ref);
//       ref.on('value', snapshot => {
//         console.log(snapshot.val());
//         let chat = this.state;
//         chat.chat = snapshot.val();
//         //setChat(snapshot.val());
//         this.setState(chat);
//         setTimeout(() => {
//           this.scrollToBottom();
//         }, 400)
//       });
//     }
//
//
//   };
//
//   sendChat = (e, message) => {
//     e.preventDefault();
//     const classId = this.props.id;
//     let classBoard = Firebase.database().ref('/ClassBoard');
//
//     let ref = classBoard.child(classId);
//     ref.push(message);
//     // setUserChat("");
//     this.setState({userChat: ""})
//     //play();
//     this.scrollToBottom();
//   }
//
//   sendTextMessage = (e, message) => {
//     e.preventDefault();
//     const classId = this.props.id;
//     const key = classKey(classId);
//
//     this.sendChat(e, {
//       classId: classId,
//       data: {},
//       date: getTodaysDate(),
//       message: cryptLib.encryptPlainTextWithRandomIV(message, key),
//       messageId: "",
//       sameDate: false,
//       sameUser: false,
//       senderId: sessionStorage.getItem('userId'),
//       senderName: sessionStorage.getItem('userName'),
//       senderProfilePic: sessionStorage.getItem('userPhoto'),
//       time: getCurrentTime()
//     })
//     this.setState({userChat: ""})
//     //play();
//
//     setTimeout(() => {
//       this.scrollToBottom();
//     }, 400)
//   }
//
//   setUserMessage = (e) => {
//     e.preventDefault();
//     //setUserChat(e.target.value)
//     this.setState({userChat: e.target.value})
//   }
//
//   messages = [];
//
//
//   scrollToBottom() {
//     const duration = 2000;
//     const list = document.getElementById("chats");
//
//     if (list !== null) {
//       const to = list.scrollHeight;
//       if (duration <= 0) return;
//       let difference = to - list.scrollTop;
//       let perTick = difference / duration * 10;
//
//       setTimeout(function () {
//         list.scrollTop = list.scrollTop + perTick;
//         if (list.scrollTop === to) return;
//         list.scrollTop = to;
//         // scrollTo(list, to, duration - 10);
//       }, 10);
//     }
//
//     /*if (list.scrollTop === list.scrollHeight) return;
//
//
//     const cosParameter = list.scrollTop / 2;
//     let scrollCount = 0, oldTimestamp = null;
//
//     function step(newTimestamp) {
//       if (oldTimestamp !== null) {
//         scrollCount += Math.PI * (newTimestamp - oldTimestamp) / 2000;
//         if (scrollCount >= Math.PI) return list.scrollTop = list.scrollHeight;
//         list.scrollTop = (cosParameter + cosParameter * Math.cos(scrollCount))+list.scrollHeight;
//       }
//       oldTimestamp = newTimestamp;
//       window.requestAnimationFrame(step);
//     }
//     window.requestAnimationFrame(step);*/
//   }
//
//   audioUpload(e) {
//     let files = e.target.files;
//     let file = files[0]
//     let reader = new FileReader()
//     reader.readAsDataURL(file)
//     reader.onload = () => {
//       console.log(reader.result)
//     };
//     //setLoading(true)
//     this.setState({loading: true})
//     let tempProgress = 0
//     const classId = this.props.id;
//     const key = classKey(classId);
//     for (let i = 0; i < files.length; i++) {
//       S3Uploader(files[i], 'Activity', (progress) => {
//       }, (uri) => {
//         tempProgress++;
//         if (tempProgress === files.length) {
//           //setLoading(false);
//           //setSuccess(true);
//           this.setState({loading: false});
//           this.setState({success: true})
//         }
//         console.log(uri)
//         this.sendChat(e, {
//           classId: classId,
//           data: {
//             dataType: 2,
//             dataUrl: JSON.stringify({
//               "fileName": files[0].name,
//               "fileUrl": uri,
//               "fileType": "mp3",
//               "fileSize": `${(files[0].size / 1024) / 1024} MB`,
//               "fileDuration": "4:10",
//               "fileLocalPath": ""
//             })
//           },
//           date: getTodaysDate(),
//           message: cryptLib.encryptPlainTextWithRandomIV("Audio", key),
//           messageId: "",
//           sameDate: false,
//           sameUser: false,
//           senderId: sessionStorage.getItem('userId'),
//           senderName: sessionStorage.getItem('userName'),
//           senderProfilePic: sessionStorage.getItem('userPhoto'),
//           time: getCurrentTime()
//         })
//
//       })
//     }
//     this.handleClose();
//   }
//
//   imageUpload(e) {
//     let files = e.target.files;
//     let file = files[0]
//     let reader = new FileReader()
//     reader.readAsDataURL(file)
//     reader.onload = () => {
//       console.log(reader.result)
//     };
//     //setLoading(true)
//     this.setState({loading: true});
//     let tempProgress = 0
//     const classId = this.props.id;
//     const key = classKey(classId);
//     for (let i = 0; i < files.length; i++) {
//       S3Uploader(files[i], 'Activity', (progress) => {
//       }, (uri) => {
//         tempProgress++;
//         if (tempProgress === files.length) {
//           //setLoading(false);
//           //setSuccess(true);
//           this.setState({loading: false});
//           this.setState({success: true});
//         }
//         console.log(uri)
//         this.sendChat(e, {
//           classId: classId,
//           data: {
//             dataType: 7,
//             dataUrl: JSON.stringify({
//               "dataUrl": uri,
//               "imageCaption": " "
//             })
//           },
//           date: getTodaysDate(),
//           message: cryptLib.encryptPlainTextWithRandomIV("Audio", key),
//           messageId: "",
//           sameDate: false,
//           sameUser: false,
//           senderId: sessionStorage.getItem('userId'),
//           senderName: sessionStorage.getItem('userName'),
//           senderProfilePic: sessionStorage.getItem('userPhoto'),
//           time: getCurrentTime()
//         })
//
//       })
//     }
//     this.handleClose();
//   }
//
//   documentUpload(e) {
//     let files = e.target.files;
//     let file = files[0]
//     let reader = new FileReader()
//     reader.readAsDataURL(file)
//     reader.onload = () => {
//       console.log(reader.result)
//     };
//     //setLoading(true)
//     this.setState({loading: true});
//     let tempProgress = 0
//     const classId = this.props.id;
//     const key = classKey(classId);
//     for (let i = 0; i < files.length; i++) {
//       S3Uploader(files[i], 'Activity', (progress) => {
//       }, (uri) => {
//         tempProgress++;
//         if (tempProgress === files.length) {
//           //setLoading(false);
//           //setSuccess(true);
//           this.setState({loading: false});
//           this.setState({success: true})
//         }
//         console.log(uri)
//         this.sendChat(e, {
//           classId: classId,
//           data: {
//             dataType: 5,
//             dataUrl: JSON.stringify({
//               "fileName": files[0].name,
//               "fileUrl": uri,
//               "fileType": files[0].type,
//               "fileSize": `${(files[0].size / 1024) / 1024} MB`
//             })
//           },
//           date: getTodaysDate(),
//           message: cryptLib.encryptPlainTextWithRandomIV("Audio", key),
//           messageId: "",
//           sameDate: false,
//           sameUser: false,
//           senderId: sessionStorage.getItem('userId'),
//           senderName: sessionStorage.getItem('userName'),
//           senderProfilePic: sessionStorage.getItem('userPhoto'),
//           time: getCurrentTime()
//         })
//
//       })
//     }
//     this.handleClose();
//   }
//
//   messageSorter = (chat) => {
//     if (chat.data) {
//
//       if (chat.data.dataType === 2) {
//         return (<Audio chat={chat.message}
//                        senderName={chat.senderName}
//                        data={chat.data}
//                        time={chat.time}
//                        senderId={chat.senderId}/>)
//       } else if (chat.data.dataType === 5) {
//         return (
//           <Documents chat={chat.message} senderName={chat.senderName} data={chat.data} time={chat.time}
//                      senderId={chat.senderId}/>
//         )
//       } else if (chat.data.dataType === 7) {
//         return (
//           <Image chat={chat.message} senderName={chat.senderName} data={chat.data} time={chat.time}
//                  senderId={chat.senderId}/>
//         )
//       }
//     } else {
//       return (
//         <Message chat={chat.message} senderName={chat.senderName} data={chat.data} time={chat.time}
//                  senderId={chat.senderId}/>
//       )
//     }
//   }
//
//   componentDidMount() {
//     this.getUserData();
//   }
//
//
//   render() {
//     if (this.state.chat) {
//       const classId = this.props.id;
//       for (let i in this.state.chat[classId]) {
//         const key = classKey(classId);
//         if (this.state.chat[classId][i]['message']) {
//           this.messages.push({
//             message: cryptLib.decryptCipherTextWithRandomIV(this.state.chat[classId][i]['message'], key),
//             senderName: this.state.chat[classId][i]['senderName'],
//             senderId: this.state.chat[classId][i]['senderId'],
//             time: this.state.chat[classId][i]['time'],
//             data: this.state.chat[classId][i]['data']
//           })
//         }
//       }
//     }
//
//     if (this.props)
//       return (
//         <div className="chatroom chat147">
//           <div id="chats" className="chats">
//             {
//               this.messages ?
//                 this.messages.map((chat) =>
//                   this.messageSorter(chat)
//                 ) : <CircularProgress/>
//             }
//           </div>
//
//           <form className="input">
//             <input type="text" value={this.state.userChat} onChange={e => this.setUserMessage(e)}/>
//             {/*<Input type="file"><AttachFileIcon/></Input>*/}
//             <label className="custom-file-upload">
//               <Button onClick={this.handleOpen} style={
//                 {
//                   display: 'none'
//                 }
//               }/>
//               <AttachFileIcon/>
//             </label>
//             <Button type="submit" onClick={e => this.sendTextMessage(e, this.state.userChat)}
//                     value="Submit">Send</Button>
//           </form>
//
//           <Modal
//             aria-labelledby="transition-modal-title"
//             aria-describedby="transition-modal-description"
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center'
//             }}
//             open={this.state.open}
//             onClose={this.handleClose}
//             closeAfterTransition
//             BackdropComponent={Backdrop}
//             BackdropProps={{
//               timeout: 500,
//             }}
//           >
//             <Fade in={this.state.open}>
//               <div
//                 //   style={{
//                 //   backgroundColor: theme.palette.background.paper,
//                 //   border: '2px solid #000',
//                 //   boxShadow: theme.shadows[5],
//                 //   padding: theme.spacing(2, 4, 3),
//                 // }}
//               >
//                 <h2 id="transition-modal-title">Upload File</h2>
//                 <label style={
//                   {
//                     border: "1px solid #ccc",
//                     display: "inline-block",
//                     cursor: 'pointer'
//                   }
//                 }>
//                   <input type="file"
//                          onChange={e => this.imageUpload(e)}
//                          multiple style={
//                     {
//                       display: 'none',
//                     }
//                   }/>
//                   <PermMediaIcon style={{
//                     height: "100px",
//                     width: "100px",
//                   }}/>
//                 </label>
//
//                 <label style={
//                   {
//                     border: "1px solid #ccc",
//                     display: "inline-block",
//                     cursor: 'pointer'
//                   }
//                 }>
//                   <input type="file"
//                          onChange={e => this.documentUpload(e)}
//                          multiple style={
//                     {
//                       display: 'none'
//                     }
//                   }/>
//                   <DescriptionIcon style={{
//                     height: "100px",
//                     width: "100px",
//                   }}/>
//                 </label>
//
//                 <label style={
//                   {
//                     border: "1px solid #ccc",
//                     display: "inline-block",
//                     cursor: 'pointer'
//                   }
//                 }>
//                   <input type="file"
//                          onChange={e => this.audioUpload(e)}
//
//                          multiple
//                          style={
//                            {
//                              display: 'none'
//                            }
//                          }/>
//                   <AudiotrackIcon style={{
//                     height: "100px",
//                     width: "100px",
//                   }}/>
//                 </label>
//               </div>
//             </Fade>
//           </Modal>
//         </div>
//       );
//   }
//
//
// }
// ;
//
// export default ClassBoard;

import React, {useEffect, useState} from 'react';
import {Button, CircularProgress, Fade, Modal} from '@material-ui/core';
import Firebase from 'firebase';
import '../LayoutClassScreen/Teacher/views/App.css';
import Message from './Message.js';
import cryptLib from "@skavinvarnan/cryptlib";
import {classKey, getCurrentTime, getTodaysDate} from "../../constants";
import useSound from 'use-sound';
import sent from '../../components/sent.mp3';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Backdrop from '@material-ui/core/Backdrop';
import {makeStyles} from "@material-ui/styles";
import PermMediaIcon from '@material-ui/icons/PermMedia';
import DescriptionIcon from '@material-ui/icons/Description';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import ContactsIcon from '@material-ui/icons/Contacts';
import S3Uploader from "../../utils/S3Uploader";
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
function generateColor() {

  let hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e"];

  function populate(a) {
    for (var i = 0; i < 6; i++) {
      var x = Math.round(Math.random() * 14);
      var y = hexValues[x];
      a += y;
    }
    return a;
  }

  let newColor1 = populate('#');
  let newColor2 = populate('#');
  let angle = Math.round(Math.random() * 360);

  let gradient = "linear-gradient(" + angle + "deg, " + newColor1 + ", " + newColor2 + ")";


  return gradient;

}
const ClassBoard = (chatID) => {
  const classes = useStyles();
  let [chat, setChat] = useState();
  let [userChat, setUserChat] = useState();
  const [play] = useSound(sent);
  const [open, setOpen] = React.useState(false);
  console.log(chatID.id)
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getUserData = () => {
    let ref = Firebase.database().ref('/ClassBoard');
    ref.on('value', snapshot => {
      console.log(snapshot.val());
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
  if (chat) {
    const classId = chatID.id;
    for (let i in chat[classId]) {
      const key = classKey(classId);
      if (chat[classId][i]['message']) {
        messages.push({
          message: cryptLib.decryptCipherTextWithRandomIV(chat[classId][i]['message'], key),
          senderName: chat[classId][i]['senderName'],
          senderId: chat[classId][i]['senderId'],
          time: chat[classId][i]['time'],
          data: chat[classId][i]['data']
        })
      }
    }
  }

  // let isFirst=true;
  // let generatedColor = generateColor();
  //

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
  }, [])

  return (
    <div className="chatroom chat147">
      <div id="chats" style={
        {
          background: "pink" /*generateColor()*/
        }
      } className="chats">
        {
          messages ?
            messages.map((chat) =>
              messageSorter(chat)
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
        <Button type="submit" style={{
          color:"white"
        }}
                onClick={e => sendTextMessage(e, userChat)} value="Submit">Send</Button>
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

export default ClassBoard;








