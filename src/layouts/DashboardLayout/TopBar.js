import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {AppBar, Badge, Box, Hidden, IconButton, Toolbar, makeStyles}from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from 'src/components/Logo';
import {ExitToApp} from '@material-ui/icons'

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  }
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();
  const [notifications] = useState([]);
  const removeLoggedInStatus = ()=>{
    sessionStorage.removeItem('loggedIn');
  }
  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/app/dashboard">
          <Logo />
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden mdDown>
          
          
         
          <IconButton color="inherit" className={'button_notifi'}>
          <RouterLink to='/'>
              <NotificationsIcon onClick={removeLoggedInStatus} className={'button_notifi'}/>
              </RouterLink>
            </IconButton>

            <IconButton color="inherit" className={'button_notifi'}>
          <RouterLink to='/'>
              <ExitToApp onClick={removeLoggedInStatus} className={'button_notifi'}/>
              </RouterLink>
            </IconButton>
           





        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};


export default TopBar;
