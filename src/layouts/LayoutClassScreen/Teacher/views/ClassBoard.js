import React, {useEffect, useState} from 'react';
import {Button, CircularProgress} from '@material-ui/core';
import Firebase from 'firebase';
import './App.css';
import Message from './Message.js';
import cryptLib from "@skavinvarnan/cryptlib";
import {classKey, getCurrentTime, getTodaysDate} from "../../../../constants";
import useSound from 'use-sound';
import sent from '../../../../components/sent.mp3';
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
      setTimeout(() => {
        scrollToTop();
      }, 400)
    });
  };

  const sendChat = (e, message) => {
    e.preventDefault();
    const classId = sessionStorage.getItem('current_class_id');
    const key = classKey(classId);

    let classBoard = Firebase.database().ref('/ClassBoard');
    let ref = classBoard.child(classId);
    ref.push({
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
      scrollToTop();
    }, 400)
  }

  const setUserMessage = (e) => {
    e.preventDefault();
    setUserChat(e.target.value)
  }

  let messages = [];
  console.log(process.env.REACT_APP_KEY_PART)
  if (chat) {
    const classId = sessionStorage.getItem('current_class_id');
    for (let i in chat[classId]) {
      const key = classKey(classId);
      messages.push({
        message: cryptLib.decryptCipherTextWithRandomIV(chat[classId][i]['message'], key),
        senderName: chat[classId][i]['senderName'],
        senderId: chat[classId][i]['senderId'],
        time: chat[classId][i]['time'],
        data: chat[classId][i]['data']
      })
    }
  }

  function scrollToTop() {
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


  useEffect(() => {
    getUserData();
  }, [])

  return (
    <div className="chatroom chat147">
      <ul id="chats" className="chats">
        {

          messages ?
            messages.map((chat) =>
              <Message chat={chat.message} senderName={chat.senderName} data={chat.data} time={chat.time}
                       senderId={chat.senderId}/>
            ) : <CircularProgress/>
        }

      </ul>

      <form className="input">
        <input type="text" value={userChat} onChange={e => setUserMessage(e)}/>
        {/*<Input type="file"><AttachFileIcon/></Input>*/}
        <label className="custom-file-upload">
          <input type="file" multiple style={
            {
              display: 'none'
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
