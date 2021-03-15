import React from 'react';
import {Typography} from "@material-ui/core";
import {s3URL} from "../../constants";

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

  return (
    <li className={`chat ${senderId === sessionStorage.getItem('userId') ? "right" : "left"}`}>
      {senderId === sessionStorage.getItem('userId') ? <b>You</b> : <b>{senderName}</b>}
      <br/>
      {media ?
        <div><a href={s3URL(media.fileUrl)}>{media.fileName}</a></div>
        : chat}
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
