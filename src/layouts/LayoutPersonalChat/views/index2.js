import React, {useEffect, useState} from 'react';
import {AppBar, Button, CircularProgress, Fade, Modal, Tab, Tabs, Toolbar} from '@material-ui/core';
import Firebase from 'firebase';
import './Design.css';
import {makeStyles} from "@material-ui/styles";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import cryptLib from "@skavinvarnan/cryptlib";
import {classKey, getCurrentTime, getTodaysDate, s3URL, usersChatKey, usersKey} from "../../../constants";


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
    let [chat, setChat] = useState();
    const [key, setKey] = React.useState("");
    const [date, setDate] = React.useState("");
    const [lastMessage, setLastMessage] = React.useState("");
    const [profilePic, setProfilePic] = React.useState("");
    const [otherUserId, setOtherUserid] = React.useState("");
    const [name, setName] = React.useState("");
    const [time, setTime] = React.useState("");
    const [enteredMessage, setEnteredMessage] = React.useState("");

    const userId = sessionStorage.getItem('userId');
    const usersRef = Firebase.database().ref("/Users").child(userId).child("/Chats");
    const chatsRef = Firebase.database().ref("/Chats/" + key);

    function back() {
      //navigate('/app/teacher/')
    }

    function onInputChange(e) {
      setEnteredMessage(e.target.value);
      if (e.target.value.trim() === "")
        document.querySelector(".mic").src = "./mic.png";
      else
        document.querySelector(".mic").src = "./send-btn.png";
    }

    function sendMessage() {
      if (enteredMessage.trim() !== "") {
        document.querySelector(".text-input").focus();
        const reference = chatsRef.push()
        const uniqueKey = reference.key
        reference.set({
          data: {},
          date: getTodaysDate(),
          message: cryptLib.encryptPlainTextWithRandomIV(enteredMessage, key),
          messageId: uniqueKey,
          sameDate: false,
          sameUser: false,
          seen: false,
          senderId: sessionStorage.getItem('userId'),
          sent: true,
          time: getCurrentTime()
        })
          .catch(err =>
            console.log(err));
        setEnteredMessage("");
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

    useEffect(() => {
        usersRef
          .on('child_added', function (snap) {

              let data = snap.val();
             const userKey = usersKey(parseInt(userId), parseInt(data.otherUserId));

              const main_element = document.querySelector(".chats");
              const chat = document.createElement("div");
              const chat_info = document.createElement("div");
              const img = document.createElement("img");
              const title = document.createElement("div");
              const last_text = document.createElement("div");

              chat.className = "chat";
              img.className = "profile-picture";
              chat_info.className = "chat-info";
              title.className = "title";
              last_text.className = "last-text";

              img.src = s3URL(data.profilePic);
              title.textContent = data.name;
              last_text.textContent = data.lastMessage;
              last_text.classList.add(snap.key);

               chat.addEventListener('click', function () {
                 console.log(data)
                 openChat(data.profilePic, data.name, data.otherUserId, userId);
                 document.querySelector(".chat-box").style.transform = "translateX(0)";
               })

              chat.appendChild(img);
              chat.appendChild(chat_info);
              chat_info.appendChild(title);
              chat_info.appendChild(last_text);
              main_element.appendChild(chat);



              function openChat(their_profile_picture, their_name, other_id, my_id) {
                let chatRef = Firebase.database().ref("/Chats").child(usersChatKey(parseInt(my_id), parseInt(other_id)));
                document.querySelector(".chat-body").style.scrollBehavior = "auto";
                //document.querySelector(".login-page").style.transform = "translateY(-100%)";
                //chat_updater.off("child_added", callback);
                document.querySelector(".chat-body").innerHTML = "";

                document.querySelector(".chat-header .profile-picture").src = their_profile_picture;
                document.querySelector(".chat-header .title").textContent = their_name;



                chatRef.on("child_added", function (snapshot) {
                  //console.log(snapshot.val())

                  const chat_body = document.querySelector(".chat-body");
                  const message_holder = document.createElement("div");
                  const text = document.createElement("div");
                  const time_stamp = document.createElement("div");
                  const triangle = document.createElement("svg");

                  message_holder.className = "message-holder";
                  text.className = "text";
                  time_stamp.className = "time-stamp";
                  triangle.className = "triangle";

                  const data = snapshot.val();

                  if (data.senderId === userId) {
                    triangle.classList.add("my");
                    triangle.innerHTML = '<svg width="20" height="20" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M58.5129 26.9913C59.9147 24.9949 58.4742 22.249 56.0349 22.2675L4.35559 22.6596C2.10991 22.6766 0.678455 25.0644 1.72168 27.0531L23.7032 68.957C24.7464 70.9457 27.5246 71.1252 28.8151 69.2873L58.5129 26.9913Z" fill="#DAF9C7"/></svg>';
                    text.classList.add("my-msg");
                  } else {
                    triangle.classList.add("their");
                    triangle.innerHTML = '<svg width="20" height="20" viewBox="0 0 71 72" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5977 27.0302C11.1894 25.0383 12.6209 22.2878 15.0603 22.2983L66.7406 22.522C68.9863 22.5317 70.4255 24.9148 69.3888 26.9069L47.544 68.8822C46.5072 70.8743 43.7297 71.0628 42.4332 69.2291L12.5977 27.0302Z" fill="white"/></svg>';
                    text.classList.add("their-msg");
                  }//Show the chat heads, ie the chat-sides text messages

                  text.textContent = cryptLib.decryptCipherTextWithRandomIV(data.message, usersKey(parseInt(my_id), parseInt(other_id)));
                  time_stamp.textContent = data.date + " " + data.time;

                  chat_body.appendChild(message_holder);
                  message_holder.appendChild(text);
                  text.appendChild(time_stamp);
                  text.appendChild(triangle);

                  chat_body.scrollTop = chat_body.scrollHeight;
                  setTimeout(() => {
                    chat_body.style.scrollBehavior = "smooth";
                  }, 300)
                })
              }

              openChat(profilePic, name, data.otherUserId, userId);

            }
          );


        document.querySelector(".text-input").addEventListener('keypress', function (e) {
          if (e.key === "Enter") {
            sendMessage();
          }
        });

        document.querySelector(".back-btn").addEventListener("click", () => {
          document.querySelector(".chat-box").style.transform = "translateX(100%)"
        });

        document.querySelector(".menu-btn").addEventListener("click", () => {
          document.querySelector(".menu").classList.toggle("closed")
        });

        let theme = true;
        document.querySelector(".theme-toggle").addEventListener('click', function () {
          if (theme) {
            document.querySelector(".menu").classList.toggle("closed")
            document.querySelector(".theme-toggle").textContent = "Light Theme";
            document.documentElement.style.setProperty(
              "--background-color",
              "#E5DDD5"
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
              "--their-text-chats-color",
              "#FFFFFF"
            );
            document.documentElement.style.setProperty(
              "--my-text-chats-color",
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
              "--their-text-chats-color",
              "#1E2428"
            );
            document.documentElement.style.setProperty(
              "--my-text-chats-color",
              "#054740"
            );
            document.documentElement.style.setProperty(
              "--chat-bg-opacity",
              "0.1"
            );
            theme = true;
          }
        })
        resize();

        window.addEventListener('resize', function () {
          resize();
        })
      },
      []
    )


    return (
      <>

        <div style={{marginTop: "200px"}}>
          <div className="container">
            <div className="sidebar">
              <div className="header">
                <div className="whatsapp">WhatsApp</div>
                <img
                  src="https://media-exp1.licdn.com/dms/image/C5603AQFySN0ieZxyPA/profile-displayphoto-shrink_100_100/0?e=1604534400&v=beta&t=7HZaHUTsz2q_9gdK5JMeEeC3J8cQNd9jj9_bLM3gxP4"
                  className="my-profile-picture"/>
                <div className="header-stuff">
                  <img src="./message-btn.png" alt="" className="create-message"/>
                  <img src="./menu-btn.png" alt="" className="menu-btn"/>
                </div>
                <div className="menu closed">
                  <div className="theme-toggle">Dark Theme</div>
                  <div className="log-out">Log Out</div>
                </div>
              </div>
              <div className="search-box">
                <img src="./search-btn.png" alt="" className="search-btn"/>
                <input type="text" placeholder="Search People" className="search" onChange={e => searchList}/>
              </div>
              <div className="chats"/>
            </div>
            <div className="chat-box">
              <div className="chat-header">
                <img src="./go-back.png" alt="" className="back-btn"/>
                <img
                  src="https://media-exp1.licdn.com/dms/image/C5603AQFySN0ieZxyPA/profile-displayphoto-shrink_100_100/0?e=1604534400&v=beta&t=7HZaHUTsz2q_9gdK5JMeEeC3J8cQNd9jj9_bLM3gxP4"
                  alt="" className="profile-picture"/>
                <div className="chat-info">
                  <div className="title">Chat Name</div>
                  <div className="last-seen-at"/>
                </div>
              </div>
              <div className="chat-body-bg"/>
              <div className="chat-body"/>
              <div className="chat-footer">
                <img src="./emoji.png" alt="" className="emoji"/>
                <input type="text" value={enteredMessage} onChange={e => onInputChange(e)} className="text-input"
                       placeholder="Type a message"/>
                <img src="./mic.png" alt="" onClick={sendMessage} className="mic"/>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
;

export default PersonalChat2;
