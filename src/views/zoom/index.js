import React, {useState} from 'react';
import { ZoomMtg } from '@zoomus/websdk';

const Zoom = () => {
  const zoomMeeting = document.getElementById("zmmtg-root");
  ZoomMtg.setZoomJSLib('node_modules/@zoomus/websdk/dist/lib', '/av');
  ZoomMtg.preLoadWasm();
  //ZoomMtg.prepareJssdk;

  function generateSignature(apiKey, apiSecret, meetingNumber, role) {

    const timestamp = new Date().getTime() - 30000
    const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64')
    const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64')
    const signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64')

    return signature
  }

  console.log(generateSignature('5J2ab1iXRvqySf6cjgeQPA', 'KEig4vjEma9CMx4QlZopPY72DKqulWxW', 123456789, 0))


  return (
    <>
      <div>ZOoooooom</div>
      <div id="zmmtg-root"></div>
      <div id="aria-notify-area"></div>
    </>
  )
};

export default Zoom;
