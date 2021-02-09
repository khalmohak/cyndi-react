import {ZoomMtg} from "@zoomus/websdk";
import axios from 'axios';
import {apiEndPoint} from "../../constants";
import moment from "moment";

let date = moment().format('L');
let time = moment().format('LT');

let apiData = {
  class_id: sessionStorage.getItem('current_class_id'),
  start_time: `${date} ${time}`
}


let header = {
  'user_id': sessionStorage.getItem('userId'),
  'x-access-token': sessionStorage.getItem('token')
}

export function zoomInitiater(callback) {
  axios.post(`${apiEndPoint}/initialize/zoom`, apiData, {
      headers: header
    }
  ).then(res => {

      let apiKeys = {
        apiKey: 'w3MjIv7zTYar3bU7v_QdaA',
        apiSecret: 'g0jGP9LHG9M5illAZgGzjHIaPyx8dkDz4le6',
      };

      let meetConfig = {
        apiKey: apiKeys.apiKey,
        meetingNumber: res.data.meeting_no,
        userName: sessionStorage.getItem('userName'),
        userEmail: sessionStorage.getItem('userEmail'), // must be the attendee email address
        passWord: "BzQ8n3",
        role: 1,
      };
      let zoomMeetConfig = {
        meetingNumber: meetConfig.meetingNumber,
        apiKey: meetConfig.apiKey,
        apiSecret: apiKeys.apiSecret,
        role: meetConfig.role,
        success: function (res) {
          console.log("res", res);

          setTimeout(() => {

            joinMeeting(res.result, meetConfig);

          }, 1000);
        },
      }
      callback(zoomMeetConfig);


    }
  )
    .catch(err => {

    })


}


function joinMeeting(signature, meetConfig) {
  console.log(apiData)
  ZoomMtg.init({
    leaveUrl: "http:localhost:3000/",
    isSupportAV: true,
    success: function (success) {
      console.log("Init Success ", success);
      ZoomMtg.join({
        meetingNumber: meetConfig.meetingNumber,
        userName: meetConfig.userName,
        signature: signature,
        apiKey: meetConfig.apiKey,
        passWord: meetConfig.passWord,

        success: (success) => {
          document.getElementById('zmmtg-root').style.display = 'block';
          console.log(success);
        },

        error: (error) => {
          console.log(error);
        },
      });
    },
  });
}




