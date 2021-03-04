import React, {useState} from 'react';
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Fade,
  Grid,
  Input,
  makeStyles,
  Menu,
  MenuItem,
  Modal, Select,
  Switch,
  TextField,
  Typography
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '10px',
    margin: "10px",
    textAlign: "center",
    padding: "10px",
    borderTop: '7px solid #025fa1',
    width: "800px"

  },
  card: {
    width: '400px',
    height: '120px',
    margin: '10px',
    borderLeft: "5px solid green",
  }

}));

const NotificationView = ({className, data, ...rest}) => {
  const classes = useStyles();


  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <b style={{fontSize:18, textTransform:'capitalize'}}>{data.title}</b>
          <br/>
          {data.body}
          <br/>
          <br/>
          <Box
          style={{textAlign:'right'}}
          >
            {data.datetime}
          </Box>
        </CardContent>
      </Card>
    </>
  );

};

export default NotificationView;
