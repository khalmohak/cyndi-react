import React from 'react';
import {Card, CardContent, Typography} from "@material-ui/core";
import {s3URL} from "../../constants";
// import AudioPlayer from 'react-h5-audio-player';
// import 'react-h5-audio-player/lib/styles.css';

import ReactAudioPlayer from 'react-audio-player';
import {getRoleColorPrimary} from "../../theme";

const Audio = ({chat, senderId, time, senderName, data}) => {
  function dataObjects() {
    return (JSON.parse(data.dataUrl))
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
  return (

    <Card style={{
      backgroundColor:messageBackground()
    }} className={`chat ${senderId === sessionStorage.getItem('userId') ? "right" : "left"}`}>
      <CardContent

      >
        {senderId === sessionStorage.getItem('userId') ? <Typography  style={{
          color:"white"}
        }>You</Typography> : <Typography style={{
          color:"#1d1d1d"}
        }>{senderName}</Typography>}
        <br/>
        {/*{media ?*/}
        {/*  <div><a href={s3URL(media.fileUrl)}>{media.fileName}</a></div>*/}
        {/*  : chat}*/}
        <ReactAudioPlayer
          src={s3URL(media.fileUrl)}
          controls
        />
        <br/>
        <Typography
          style={{
            fontSize: "11px",
            color: "gray"
          }}
        >
          {time}
        </Typography>
      </CardContent>
    </Card>
  )
};

export default Audio;
