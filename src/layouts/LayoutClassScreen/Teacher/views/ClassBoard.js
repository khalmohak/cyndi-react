import React, {useEffect, useState} from 'react';
import {Button, CircularProgress, Input} from '@material-ui/core';
import Firebase from 'firebase';
import './App.css';
import Message from './Message.js';
import cryptLib from "@skavinvarnan/cryptlib";
import {classKey, getCurrentTime, getTodaysDate} from "../../../../constants";
import S3 from 'aws-sdk/clients/s3';
import useSound from 'use-sound';
import sent from '../../../../components/sent.mp3';
import S3Uploader from "../../../../utils/S3Uploader";
import AttachFileIcon from '@material-ui/icons/AttachFile';

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

const ClassBoard = () => {
  let [chat, setChat] = useState();
  let [userChat, setUserChat] = useState();
  const [play] = useSound(sent);
  const messagesEndRef = React.useRef(null)


  const getUserData = () => {
    let ref = Firebase.database().ref('/ClassBoard');
    ref.on('value', snapshot => {
      console.log(snapshot.val());
      setChat(snapshot.val());
    });
  };

  const sendChat = (e, message) => {
    e.preventDefault();
    const key = classKey('37', 'EncryptMessage');
    let classBoard = Firebase.database().ref('/ClassBoard');
    let ref = classBoard.child('37');
    ref.push({
      classId: sessionStorage.getItem('current_class_id'),
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
  }

  const setUserMessage = (e) => {
    e.preventDefault();
    setUserChat(e.target.value)
  }

  let messages = [];
  console.log(process.env.REACT_APP_KEY_PART)
  if (chat) {
    for (let i in chat['37']) {
      const key = "EncryptMessages37";
      messages.push({
        message: cryptLib.decryptCipherTextWithRandomIV(chat['37'][i]['message'], key),
        senderName: chat['37'][i]['senderName'],
        senderId: chat['37'][i]['senderId'],
        time:chat['37'][i]['time'],
        data:chat['37'][i]['data']
      })
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current.scroll({behavior: "smooth"})
  }


  useEffect(() => {
    getUserData();

  }, [])

  return (
    <div className="chatroom chat147">
      <h3>Class Chat</h3>
      <ul id="chats" className="chats">
        {
          messages ?
            messages.map((chat) =>
              <Message chat={chat.message} senderName={chat.senderName} data={chat.data} time={chat.time} senderId={chat.senderId}/>
            ) : <CircularProgress/>
        }
        <div ref={messagesEndRef}/>

      </ul>

      <form className="input">
        <input type="text" value={userChat} onChange={e => setUserMessage(e)}/>
        {/*<Input type="file"><AttachFileIcon/></Input>*/}
        <label className="custom-file-upload">
          <input type="file" multiple style={
            {
              display:'none'
            }
          }/>
          <AttachFileIcon/>
        </label>
        <Button type="submit" onClick={e => sendChat(e, userChat)} value="Submit">Send</Button>
      </form>

    </div>
  );
};

export default ClassBoard;
