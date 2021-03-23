import React from 'react';
import {Card, CardContent, Typography} from "@material-ui/core";
import {s3URL} from "../../constants";

const Image = ({chat, senderId, time, senderName, data}) => {
  function dataObjects() {
    //console.log(JSON.parse(data.dataUrl))
    return (data.dataUrl)
  }

  const media = dataObjects();
  return (
    <div className={`chat ${senderId === sessionStorage.getItem('userId') ? "right" : "left"}`}>
      <img style={{
        height: 200,
        width: 200,
      }} src={s3URL(media.dataUrl)}/>
    </div>

  )
};

export default Image;
