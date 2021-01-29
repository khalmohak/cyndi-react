import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { ImagePicker } from 'react-file-picker';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  },
  uploadButton: {
      height:20,
      width:40,
      backgroundColor:'#ff9800',
      color:'#fff',
      marginTop:-20,
      "&:hover":{
        backgroundColor:'#fff',
          color :'#ff9800'
      }
  }
}));

  const Profile = ({ className, ...rest }) => {
  const classes = useStyles();
  const s3Region = `ap-south-1`;
  const s3Bucket = `cyndi.primary.bucket`;
  const [user] = useState({
    avatar: `https://s3.${s3Region}.amazonaws.com/${s3Bucket}/${sessionStorage.getItem('userPhoto')}` ,
    email: sessionStorage.getItem('userEmail'),
    jobTitle: sessionStorage.getItem('userRole'),
    name: sessionStorage.getItem('userName'),
    timezone: 'GMT-5:30'
  });

  const avatarName = ()=>{
    if(user.avatar === 'null'){
      return <Avatar className={classes.avatar}>{user.name[0]}</Avatar>
    }else{
      return <Avatar className={classes.avatar} src={user.avatar}/>
    }
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >


          {avatarName()};
          <ImagePicker
            extensions={['jpg', 'jpeg', 'png']}
            dims={{minWidth: 100, maxWidth: 500, minHeight: 100, maxHeight: 500}}
            
        >
          <Button className = {classes.uploadButton}
          color="primary"
          fullWidth
          variant="text"
        >
          Edit
        </Button>
        </ImagePicker>

          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user.name}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {`${user.email}`}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {`${moment().format('hh:mm A')} ${user.timezone}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};
export default Profile;
