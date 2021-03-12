import React from 'react';
import {Card, CardContent, Typography} from "@material-ui/core";
import {s3URL} from "../../../constants";
// import AudioPlayer from 'react-h5-audio-player';
// import 'react-h5-audio-player/lib/styles.css';

import ReactAudioPlayer from 'react-audio-player';

const Audio = ({chat, senderId, time, senderName, data}) => {
  function dataObjects() {
    return (JSON.parse(data.dataUrl))
  }

  const media = dataObjects();

  return (

    <Card className={`chat ${senderId === sessionStorage.getItem('userId') ? "right" : "left"}`}>
      <CardContent>
        {senderId === sessionStorage.getItem('userId') ? <b>You</b> : <b>{senderName}</b>}
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
