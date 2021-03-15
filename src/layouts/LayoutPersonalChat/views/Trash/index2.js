import React, {useEffect, useState} from 'react';
import {AppBar, Avatar, Button, CircularProgress, Fade, Modal, Tab, Tabs, Toolbar} from '@material-ui/core';
import Firebase from 'firebase';
import './Design.css';
import {makeStyles} from "@material-ui/styles";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import cryptLib from "@skavinvarnan/cryptlib";
import {classKey, getCurrentTime, getTodaysDate, s3URL, usersChatKey, usersKey} from "../../../../constants";
import {getRoleColorPrimary} from "../../../../theme";
import sendBtnImage from "./send-btn.png";
import emoji from "./emoji.png";
import mic from "./mic.png";
import Picker from 'emoji-picker-react';
import ReactAudioPlayer from "react-audio-player";
import Audio from "../../../LayoutChat/Audio";
import Documents from "../../../LayoutChat/Document";
import Image from "../../../LayoutChat/Image";
import Message from "../../../LayoutChat/Message";

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

Firebase.analytics();

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

const PersonalChat2 = () => {
    const classes = useStyles();
    const [chosenEmoji, setChosenEmoji] = useState(null);

    const onEmojiClick = (event, emojiObject) => {
      setChosenEmoji(emojiObject);
    };


    //const [currentOtherId, setCurrentOtherId] = useState(0);
    let enteredMessage = "";
    //let currentOtherId;
    const userId = sessionStorage.getItem('userId');
    const usersRef = Firebase.database().ref("/Users").child(userId).child("/Chats");
    const [currentMessages, setCurrentMessages] = useState([])

    let [currentUserId, setCurrentUserId] = useState();

    //const chatsRef = Firebase.database().ref("/Chats/").child()

    function back() {
      //navigate('/app/teacher/')
    }

    function onInputChange(e) {
      // setEnteredMessage(e.target.value);
      enteredMessage = e.target.value;
      if (e.target.value.trim() === "")
        document.querySelector(".mic").src = mic;
      else
        document.querySelector(".mic").src = sendBtnImage;
    }

    function sendMessage(id1, id2) {
      if (enteredMessage.trim() !== "") {
        document.querySelector(".text-input").focus();
        console.log(usersChatKey(id1, id2))
        const reference = Firebase.database().ref("/Chats").child(usersChatKey(parseInt(id1), parseInt(id2))).push()
        const uniqueKey = reference.key
        console.log(reference.key)
        reference.set({
          data: {dataType: 1},
          date: getTodaysDate(),
          receiverId: currentUserId,
          message: cryptLib.encryptPlainTextWithRandomIV(enteredMessage, usersKey(id1, id2)),
          messageId: uniqueKey,
          sameDate: false,
          sameUser: false,
          seen: false,
          senderId: sessionStorage.getItem('userId'),
          sent: true,
          time: getCurrentTime()
        }).then(success => console.log(success))
          .catch(err =>
            console.log(err));
        //setEnteredMessage("");
        enteredMessage = "";
      }
    }

    function searchList(e) {
      let i = 0;
      document.querySelectorAll(".chat").forEach((elem, index) => {
        i++;
        if (!document.querySelector(".chat:nth-child(" + i + ") .chat-info .title").innerHTML.toLowerCase().includes(e.target.value.toLowerCase())) {
          document.querySelector(".chat:nth-child(" + i + ")").style.display = "none";
        } else {
          document.querySelector(".chat:nth-child(" + i + ")").style.display = "block";
        }
      });
    }


    function resize() {
      if (window.innerWidth > 768)
        document.querySelector(".chat-box").style.transform = "translateX(0px)";
      if (window.innerWidth < 768)
        document.querySelector(".menu-btn").src = "./menu-btn-mobile.png"
      else
        document.querySelector(".menu-btn").src = "./menu-btn.png";
    }

    //console.log(currentUserId)
    //let chatRef2 = Firebase.database().ref("/Chats").child(usersChatKey(parseInt(userId), parseInt(currentUserId)));
    //console.log(chatRef2)
    function setTheme(theme) {
      if (theme) {
        //document.querySelector(".menu").classList.toggle("closed")
        document.querySelector(".theme-toggle").textContent = "Light Theme";
        document.documentElement.style.setProperty(
          "--background-color",
          "white"
        );
        document.documentElement.style.setProperty(
          "--header-footer-color",
          "#EEEEEE"
        );
        document.documentElement.style.setProperty(
          "--input-color",
          "#FFFFFF"
        );
        document.documentElement.style.setProperty(
          "--input-inside-color",
          "#FFFFFF"
        );
        document.documentElement.style.setProperty(
          "--search-box-color",
          "#FCFCFC"
        );
        document.documentElement.style.setProperty(
          "--text-color",
          "#000000"
        );
        document.documentElement.style.setProperty(
          "--their-text-chats-side-color",
          "#FFFFFF"
        );
        document.documentElement.style.setProperty(
          "--my-text-chats-side-color",
          "#DAF9C7"
        );
        document.documentElement.style.setProperty(
          "--chat-bg-opacity",
          "0.4"
        );
        theme = false;
      } else {
        document.querySelector(".menu").classList.toggle("closed")
        document.querySelector(".theme-toggle").textContent = "Dark Theme";
        document.documentElement.style.setProperty(
          "--background-color",
          "#0D1418"
        );
        document.documentElement.style.setProperty(
          "--header-footer-color",
          "#2A2F32"
        );
        document.documentElement.style.setProperty(
          "--input-color",
          "#131C21"
        );
        document.documentElement.style.setProperty(
          "--input-inside-color",
          "#323739"
        );
        document.documentElement.style.setProperty(
          "--search-box-color",
          "#1E2428"
        );
        document.documentElement.style.setProperty(
          "--text-color",
          "#FFF"
        );
        document.documentElement.style.setProperty(
          "--their-text-chats-side-color",
          "#1E2428"
        );
        document.documentElement.style.setProperty(
          "--my-text-chats-side-color",
          "#054740"
        );
        document.documentElement.style.setProperty(
          "--chat-bg-opacity",
          "0.1"
        );
        theme = true;
      }
    }
  let [currentChat, setCurrentChat] = useState();

    useEffect(() => {
        getUserData()
        console.log(currentChat)
        let peopleArr = [];
        let i = 0;

        function generate() {

          var hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e"];

          function populate(a) {
            for (var i = 0; i < 6; i++) {
              var x = Math.round(Math.random() * 14);
              var y = hexValues[x];
              a += y;
            }
            return a;
          }

          var newColor1 = populate('#');
          var newColor2 = populate('#');
          var angle = Math.round(Math.random() * 360);

          var gradient = "linear-gradient(" + angle + "deg, " + newColor1 + ", " + newColor2 + ")";

          return gradient;
          // document.getElementById("container").style.background = gradient;
          // document.getElementById("output").innerHTML = gradient;

        }

        document.querySelector(".my-profile-picture").src = s3URL(sessionStorage.getItem("userPhoto"));

        usersRef
          .on('child_added', function (snap) {

              let data = snap.val();
              const userKey = usersKey(parseInt(userId), parseInt(data.otherUserId));

              const main_element = document.querySelector(".chats-side");
              const chat = document.createElement("div");
              const chat_info = document.createElement("div");
              const img = document.createElement("img");
              const title = document.createElement("div");
              const last_text = document.createElement("div");

              chat.className = "chat";
              chat.id = "mohak" + i;
              i++;
              img.className = "profile-picture";
              chat_info.className = "chat-info";
              title.className = "title";
              last_text.className = "last-text";

              img.src = s3URL(data.profilePic);
              title.textContent = data.name;
              last_text.textContent = cryptLib.decryptCipherTextWithRandomIV(data.lastMessage, userKey)
              last_text.classList.add(snap.key);

              chat.addEventListener('click', function () {
                document.querySelector(".chat-body-bg").style.background = generate()
                let currentSelectedUser = peopleArr.indexOf(data.otherUserId);
                document.getElementById(`mohak${currentSelectedUser}`).style.backgroundColor = "rgba(00,00,00,0.3)";
                for (let i = 0; i < peopleArr.length; i++) {
                  if (i != currentSelectedUser) {
                    document.getElementById(`mohak${i}`).style.backgroundColor = "";
                  }

                }
                openChat(data.profilePic, data.name, data.otherUserId, userId);
                document.querySelector(".chat-box").style.transform = "translateX(0)";
              })

              chat.appendChild(img);
              chat.appendChild(chat_info);
              chat_info.appendChild(title);
              chat_info.appendChild(last_text);
              main_element.appendChild(chat);

              function openChat(their_profile_picture, their_name, other_id, my_id) {
                // currentOtherId = other_id;
                //console.log(other_id)
                setCurrentUserId(other_id);
               // getUserData(other_id);
                let chatRef = Firebase.database().ref("/Chats").child(usersChatKey(parseInt(my_id), parseInt(other_id)));
                document.querySelector(".chat-body").style.scrollBehavior = "auto";
                //document.querySelector(".login-page").style.transform = "translateY(-100%)";
                //chat_updater.off("child_added", callback);
                //document.querySelector(".chat-body").innerHTML = "";

                document.querySelector(".chat-header .profile-picture").src = s3URL(their_profile_picture);
                document.querySelector(".chat-header .title").textContent = their_name;

                // chatRef.on("child_added", function (snapshot) {
                //
                //   const chat_body = document.querySelector(".chat-body");
                //   const message_holder = document.createElement("div");
                //   const text = document.createElement("div");
                //   const time_stamp = document.createElement("div");
                //   const triangle = document.createElement("svg");
                //
                //   message_holder.className = "message-holder";
                //   text.className = "text";
                //   time_stamp.className = "time-stamp";
                //   triangle.className = "triangle";
                //
                //   const data = snapshot.val();
                //
                //   if (data.senderId === userId) {
                //     if (data.data.dataType === 1) {
                //       triangle.classList.add("my");
                //       triangle.innerHTML = '<svg width="20" height="20" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg"><path id="triangleColor" d="M58.5129 26.9913C59.9147 24.9949 58.4742 22.249 56.0349 22.2675L4.35559 22.6596C2.10991 22.6766 0.678455 25.0644 1.72168 27.0531L23.7032 68.957C24.7464 70.9457 27.5246 71.1252 28.8151 69.2873L58.5129 26.9913Z" /></svg>';
                //       triangle.style.fill = getRoleColorPrimary()
                //       text.classList.add("my-msg");
                //       text.style.setProperty("background-color", getRoleColorPrimary())
                //       text.textContent = cryptLib.decryptCipherTextWithRandomIV(data.message, usersKey(parseInt(my_id), parseInt(other_id)));
                //       time_stamp.textContent = data.date + " " + data.time;
                //     } else if (data.data.dataType === 2) {
                //       triangle.classList.add("my");
                //       triangle.innerHTML = '<svg width="20" height="20" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg"><path id="triangleColor" d="M58.5129 26.9913C59.9147 24.9949 58.4742 22.249 56.0349 22.2675L4.35559 22.6596C2.10991 22.6766 0.678455 25.0644 1.72168 27.0531L23.7032 68.957C24.7464 70.9457 27.5246 71.1252 28.8151 69.2873L58.5129 26.9913Z" /></svg>';
                //       triangle.style.fill = getRoleColorPrimary()
                //       text.classList.add("my-msg");
                //       text.style.setProperty("background-color", getRoleColorPrimary())
                //       //text.textContent = cryptLib.decryptCipherTextWithRandomIV(data.message, usersKey(parseInt(my_id), parseInt(other_id)));
                //       time_stamp.textContent = data.date + " " + data.time;
                //       // text.appendChild(
                //       // <ReactAudioPlayer
                //       //   controls
                //       // />)
                //     }
                //
                //
                //   } else {
                //     triangle.classList.add("their");
                //     triangle.innerHTML = '<svg width="20" height="20" viewBox="0 0 71 72" xmlns="http://www.w3.org/2000/svg"><path d="M12.5977 27.0302C11.1894 25.0383 12.6209 22.2878 15.0603 22.2983L66.7406 22.522C68.9863 22.5317 70.4255 24.9148 69.3888 26.9069L47.544 68.8822C46.5072 70.8743 43.7297 71.0628 42.4332 69.2291L12.5977 27.0302Z"/></svg>';
                //     triangle.style.fill = "#e7e7e7";
                //     text.classList.add("their-msg");
                //     text.style.setProperty("background-color", "#e7e7e7")
                //     text.textContent = cryptLib.decryptCipherTextWithRandomIV(data.message, usersKey(parseInt(my_id), parseInt(other_id)));
                //     time_stamp.textContent = data.date + " " + data.time;
                //   }//Show the chat heads, ie the chat-sides text messages
                //
                //   chat_body.appendChild(message_holder);
                //   message_holder.appendChild(text);
                //   text.appendChild(time_stamp);
                //   text.appendChild(triangle);
                //
                //
                //   chat_body.scrollTop = chat_body.scrollHeight;
                //
                //   setTimeout(() => {
                //     chat_body.style.scrollBehavior = "smooth";
                //   }, 300)
                // })
              }

              peopleArr.push(data.otherUserId);
              openChat(data.profilePic, data.name, data.otherUserId, userId);

            }
          );

        const chat_body = document.querySelector(".chat-body");
        chat_body.scrollTop = chat_body.scrollHeight;

        setTimeout(() => {
          chat_body.style.scrollBehavior = "smooth";
        }, 300)

        document.querySelector(".text-input").addEventListener('keypress', function (e) {
          console.log(currentUserId)
          if (e.key === "Enter") {
            sendMessage(currentUserId, userId);
          }
        });

        document.querySelector(".back-btn").addEventListener("click", () => {
          document.querySelector(".chat-box").style.transform = "translateX(100%)"
        });

        document.querySelector(".menu-btn").addEventListener("click", () => {
          document.querySelector(".menu").classList.toggle("closed")
        });


        setTheme(true);
        resize();
        window.addEventListener('resize', function () {
          resize();
        })
      },
      []
    )


    let [userChat, setUserChat] = useState();
    let messages = [];
    // const [messages,setMessages] = useState([]);
    const [isMessageChanged,setValue] = useState(false);
    const getUserData = () => {

      let key = usersChatKey(parseInt(userId), parseInt(currentUserId))
      console.log(key)
      let ref = Firebase.database().ref('/Chats').child(key);
      ref.on('child_added', snapshot => {
        setValue(true);
        messages.push(snapshot.val());
        setValue(false);
      });
    };

    getUserData()



    if (messages) {
      //console.log(messages);
      // const classId = sessionStorage.getItem('current_class_id');
      // for (let i in chat[classId]) {
      //   const key = classKey(classId);
      //   if (chat[classId][i]['message']) {
      //     messages.push({
      //       message: cryptLib.decryptCipherTextWithRandomIV(chat[classId][i]['message'], key),
      //       senderName: chat[classId][i]['senderName'],
      //       senderId: chat[classId][i]['senderId'],
      //       time: chat[classId][i]['time'],
      //       data: chat[classId][i]['data']
      //     })
      //   }
      // }
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


function sendPressed(){
      console.log(enteredMessage)
      sendMessage(sessionStorage.getItem('userId'),currentUserId)
}
    return (
      <>
        <div>
          <div className="container">
            <div className="sidebar">
              <div className="header" style={{backgroundColor: getRoleColorPrimary()}}>
                <div className="whatsapp">WhatsApp</div>
                <Avatar
                  style={{position: 'absolute'}}
                  src={s3URL(sessionStorage.getItem("userPhoto"))}
                  className="my-profile-picture"/>
                <div className="header-stuff">
                  <img src="message-btn.png" alt="" className="create-message"/>
                  <img src="menu-btn.png" alt="" className="menu-btn"/>
                </div>
                <div className="menu closed">
                  <div className="theme-toggle">Dark Theme</div>
                  <div className="log-out">Log Out</div>
                </div>
              </div>
              <div className="search-box">
                <img src="search-btn.png" alt="" className="search-btn"/>
                <input type="text" placeholder="Search People" className="search" onChange={e => searchList}/>
              </div>
              <div className="chats-side

              "/>
            </div>
            <div className="chat-box">
              <div className="chat-header">
                <img src="go-back.png" alt="" className="back-btn"/>
                <img
                  src="https://media-exp1.licdn.com/dms/image/C5603AQFySN0ieZxyPA/profile-displayphoto-shrink_100_100/0?e=1604534400&v=beta&t=7HZaHUTsz2q_9gdK5JMeEeC3J8cQNd9jj9_bLM3gxP4"
                  alt="" className="profile-picture"/>
                <div className="chat-info">
                  <div className="title">Chat Name</div>
                  <div className="last-seen-at"/>
                </div>
              </div>
              <div className="chat-body-bg"/>
              <div className="chat-body">
                {/*<div className="message-holder">*/}
                {/*  <div className="text">*/}
                {/*    <div className="time-stamp">*/}

                {/*    </div>*/}
                {/*    <svg className="triangle">*/}

                {/*    </svg>*/}
                {/*  </div>*/}
                {/*</div>*/}
                {
                  /*messages ?
                    messages.map((chat) =>
                      //messageSorter(chat)
                      console.log(chat)
                    ) : <CircularProgress/>*/
                }
                {
                  isMessageChanged ?
                    messages.map( (data, index) => {
                      let key = usersKey(parseInt(userId), parseInt(currentUserId));
                      console.log(key+"  "+index);

                      if (data.senderId === userId) {

                        if (data.data.dataType === 1) {
                          console.log(data.message);
                          console.log(key);
                          return (
                            <div className="message-holder">
                              <div className="text my-msg" style={{backgroundColor: getRoleColorPrimary()}}>
                                  {cryptLib.decryptCipherTextWithRandomIV(data.message, key)}
                                <div className="time-stamp">
                                  {data.date + " " + data.time}
                                </div>
                                {/*<svg className="triangle my" style={{fill: getRoleColorPrimary()}}>*/}
                                {/*  <svg width="20" height="20" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">*/}
                                {/*    <path id="triangleColor"*/}
                                {/*          d="M58.5129 26.9913C59.9147 24.9949 58.4742 22.249 56.0349 22.2675L4.35559 22.6596C2.10991 22.6766 0.678455 25.0644 1.72168 27.0531L23.7032 68.957C24.7464 70.9457 27.5246 71.1252 28.8151 69.2873L58.5129 26.9913Z"/>*/}
                                {/*  </svg>*/}
                                {/*</svg>*/}
                              </div>
                            </div>

                          )
                        }
                      } else {
                        if (data) {
                          return (
                            <div className="message-holder">
                              <div className="text their-msg" style={{backgroundColor: "#e7e7e7"}}>
                                {cryptLib.decryptCipherTextWithRandomIV(data.message, key)}
                                <div className="time-stamp">
                                  {data.date + " " + data.time}
                                </div>
                                {/*<svg className="triangle their" style={{fill: "#e7e7e7"}}>*/}
                                {/*  <svg width="20" height="20" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">*/}
                                {/*    <path id="triangleColor"*/}
                                {/*          d="M58.5129 26.9913C59.9147 24.9949 58.4742 22.249 56.0349 22.2675L4.35559 22.6596C2.10991 22.6766 0.678455 25.0644 1.72168 27.0531L23.7032 68.957C24.7464 70.9457 27.5246 71.1252 28.8151 69.2873L58.5129 26.9913Z"/>*/}
                                {/*  </svg>*/}
                                {/*</svg>*/}
                              </div>
                            </div>

                          )
                        }
                      }
                    }) : <CircularProgress/>
                }

              </div>
              <div className="chat-footer">
                <img src={emoji} alt="" className="emoji"/>

                <input type="text"
                  //value={enteredMessage}
                       onChange={e => onInputChange(e)}
                       className="text-input"
                       placeholder="Type a message"/>
                {/*<Button onClick={sendPressed}>Send</Button>*/}
                <img src={mic} alt="" onClick={sendPressed} className="mic"/>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
;

export default PersonalChat2;
