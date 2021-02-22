import React, {useEffect, useState} from 'react';
import {Button} from '@material-ui/core';
import Firebase from 'firebase';
import './App.css';
import Message from './Message.js';
import cryptLib from "@skavinvarnan/cryptlib";

//Firebase.initializeApp(firebaseConfig);

if (sessionStorage.getItem('firebaseToken')) {
  Firebase.auth().signInWithCustomToken(sessionStorage.getItem('firebaseToken'))
    // .then((userCredential) => {
    //   // Signed in
    //   let user = userCredential.user;
    // })
    .catch((error) => {
      //let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorMessage);
    });
}

const ClassBoard = () => {
  let [chat, setChat] = useState();
  // const [chats,setChat] = useState( [{
  //   username: "Kevin Hsu",
  //   content: <p>Hello World!</p>,
  //   img: "http://i.imgur.com/Tj5DGiO.jpg",
  // }, {
  //   username: "Alice Chen",
  //   content: <p>Love it! :heart:</p>,
  //   img: "http://i.imgur.com/Tj5DGiO.jpg",
  // }, {
  //   username: "Kevin Hsu",
  //   content: <p>Check out my Github at https://github.com/WigoHunter</p>,
  //   img: "http://i.imgur.com/Tj5DGiO.jpg",
  // }, {
  //   username: "KevHs",
  //   content: <p>Lorem ipsum dolor sit amet, nibh ipsum. Cum class sem inceptos incidunt sed sed. Tempus wisi enim id, arcu sed lectus aliquam, nulla vitae est bibendum molestie elit risus.</p>,
  //   img: "http://i.imgur.com/ARbQZix.jpg",
  // }, {
  //   username: "Kevin Hsu",
  //   content: <p>So</p>,
  //   img: "http://i.imgur.com/Tj5DGiO.jpg",
  // }, {
  //   username: "Kevin Hsu",
  //   content: <p>Chilltime is going to be an app for you to view videos with friends</p>,
  //   img: "http://i.imgur.com/Tj5DGiO.jpg",
  // }, {
  //   username: "Kevin Hsu",
  //   content: <p>You can sign-up now to try out our private beta!</p>,
  //   img: "http://i.imgur.com/Tj5DGiO.jpg",
  // }, {
  //   username: "Alice Chen",
  //   content: <p>Definitely! Sounds great!</p>,
  //   img: "http://i.imgur.com/Tj5DGiO.jpg",
  // }])
  //let messages=[];


  const plainText = "qup1Fc1amKOKn05Q7CAAHKICw57/u/NdoHuBFolG7/nMy+d8JjP1RRjEWC3vmfSF4Ln+7J0zhRw6amPjKuYEsA==";
  const key = "EncryptMessages37";
  const cipherText = cryptLib.encryptPlainTextWithRandomIV(plainText, key);
  console.log('cipherText %s', cipherText);
  const decryptedString = cryptLib.decryptCipherTextWithRandomIV(plainText, key);
  console.log('decryptedString %s', decryptedString);

  const getUserData = () => {
    let ref = Firebase.database().ref('/ClassBoard');
    ref.on('value', snapshot => {
      console.log(snapshot.val());
      //messages=snapshot.val();
      setChat(snapshot.val());

    });

  };
  let messages = [];
  if (chat) {
    for (let i in chat['15']) {
      messages.push(chat['15'][i]['message']);
      //console.log(chat['15'][i]['senderName']);
    }

  }

  useEffect(() => {
    getUserData();

  }, [])


  // function submitMessage(e) {
  //   e.preventDefault();
  //
  //   SetChat({
  //     chats: this.state.chats.concat([{
  //       username: "Kevin Hsu",
  //       content: <p>{ReactDOM.findDOMNode(this.refs.msg).value}</p>,
  //       img: "http://i.imgur.com/Tj5DGiO.jpg",
  //     }])
  //   }, () => {
  //     ReactDOM.findDOMNode(this.refs.msg).value = "";
  //   });
  // }


  const username = "Mohak";
  return (
    <div className="chatroom chat147">
      <h3>Class Chat</h3>
      <ul className="chats">
        {
          messages.map((chat) =>
            <Message chat={chat} user={username}/>
          )
        }
      </ul>
      <form className="input">
        <input type="text"/>
        <Button type="submit" value="Submit">Send</Button>
      </form>
    </div>
  );
};


export default ClassBoard;
