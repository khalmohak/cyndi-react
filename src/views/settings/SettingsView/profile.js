import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import axios from 'axios';
import { ImagePicker } from 'react-file-picker';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import { orange } from '@material-ui/core/colors';


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

  const [user, setValues] = useState({
    avatar: '/static/images/avatars/avatar_6.png',
    city: 'dummt',
    country: 'fagag',
    jobTitle: 'agagag',
    name: 'agasgag',
    timezone: 'aggag'
  });




 
  axios.get(`http://localhost:5000/profile_data`)
  .then(res => {
    setValues({
      ...user,
      avatar: res.data.user.avatar,
      city: res.data.user.city,
      country: res.data.user.country,
      jobTitle: res.data.user.jobTitle,
      name: res.data.user.name,
      timezone: res.data.user.timezone
    });
    
  })
  

 
  
  



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
          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
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
            {`${user.city} ${user.country}`}
          </Typography>
          <Typography
            className={classes.dateText}
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
