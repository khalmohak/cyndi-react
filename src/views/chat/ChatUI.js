import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ChatFeed, Message } from 'react-chat-ui';

import ChatShell from './containers/shell/ChatShell';

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
  makeStyles,
  Tooltip
  
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius:'10px'
  },
  chatBox:{
    border:'1px solid #d3d3d3',
    borderRadius:'5px',
    padding:"10px"
    
  }
 

}));



const ChatUI = ({ className, product, ...rest }) => {
  const classes = useStyles();
  const handleClassCard = (event)=>{
      console.log('card clicked');
  }

const [state,setState] = useState({
  messages: [
    new Message({
      id: 1,
      message: "I'm the recipient! (The person you're talking to)",
    }), // Gray bubble
    new Message({ id: 0, message: "I'm you -- the blue bubble!" }), // Blue bubble
  ],
  //...
})


  return (
  //  <Box
  //  className={classes.chatBox}
  //  >

  //   <ChatFeed
  //         messages={state.messages} // Array: list of message objects
          
  //         hasInputField={false} // Boolean: use our input, or use your own
  //         showSenderName // show the name of the user who sent the message
  //         bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
  //         // JSON: Custom bubble styles
  //         bubbleStyles={
  //           {
  //             text: {
  //               fontSize: 15
  //             },
  //             chatbubble: {
  //               borderRadius: 70,
  //               padding: 8
  //             }
  //           }
  //         }
  //       />
  //  </Box>

  <ChatShell />

  );
};

ChatUI.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default ChatUI;
