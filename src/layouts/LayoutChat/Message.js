import React from 'react';
import {Typography} from "@material-ui/core";
import {s3URL} from "../../constants";
import {getRoleColor} from "../../utils/GetRoleColor";
import {getRoleColorPrimary} from "../../theme";

const Message = ({chat, senderId, time, senderName, data}) => {
  function dataObjects() {
    if (data) {
      // console.log(data)
      if (data.dataType == '5') {
        return (JSON.parse(data.dataUrl))
      }
    }
  }



  const media = dataObjects();
  const bgColor =getRoleColorPrimary();
  const messageBackground = ()=>{
    if(senderId === sessionStorage.getItem('userId')){
      return bgColor;
    }
    else{
      return "#e7e7e7";
    }
  }

  const messageColor = ()=>{
    if(senderId === sessionStorage.getItem('userId')){
      return "white";
    }
    else{
      return "#1d1d1d";
    }
  }


  return (
    <li
      style={{
        backgroundColor:messageBackground()
      }}
      className={`chat ${senderId === sessionStorage.getItem('userId') ? "right" : "left"}`}>
      {senderId === sessionStorage.getItem('userId') ? <Typography  style={{
      color:"white"}
      }>You</Typography> : <Typography style={{
        color:"#1d1d1d"}
      }>{senderName}</Typography>}
      <br/>
      <Typography
      style={{
        color:messageColor()
      }}
      >{chat}</Typography>
      <br/>
      <Typography
        style={{
          fontSize: "11px",
          color: "gray"
        }}
      >
        {time}
      </Typography>
    </li>
  )
};

export default Message;
