import React, {useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {AppBar, Box, Hidden, IconButton, makeStyles, Toolbar} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import {LogoLarge, LogoSmall} from 'src/components/Logo';
import {ExitToApp} from '@material-ui/icons'
import {getRoleColor} from "../../utils/GetRoleColor";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  },
  appBar: {
    backgroundColor: theme.palette.colorPrimaryTeacher.main
  }
}));


const TopBar = ({
                  className,
                  onMobileNavOpen,
                  ...rest
                }) => {
  const classes = useStyles();
  const [notifications] = useState([]);
  const removeLoggedInStatus = () => {
    sessionStorage.removeItem('loggedIn');
  }

  return (
    <React.Fragment>
      <AppBar
        className={getRoleColor()}
        position="sticky"
        elevation={4}
        {...rest}
      >
        <Toolbar>
          {/*<Hidden lgUp>*/}
          <IconButton
            edge="start"
            color="inherit"
            style={{
              outline: 'none'
            }}
            onClick={onMobileNavOpen}
          >
            <MenuIcon/>
          </IconButton>
          {/*</Hidden>*/}

          <Box flexGrow={1}/>

          <Hidden mdDown>
            <RouterLink to="/app/dashboard">
              <LogoLarge/>
            </RouterLink>
          </Hidden>
          <Hidden lgUp>
            <RouterLink to="/app/dashboard">
              <LogoSmall/>
            </RouterLink>
          </Hidden>

          <Box flexGrow={1}/>

          <Hidden mdDown>
            <IconButton color="inherit" className={'button_notifi'}>
              <RouterLink to='/'>
                <NotificationsIcon className={'button_notifi'}/></RouterLink>
            </IconButton>

            <IconButton color="inherit" className={'button_notifi'}>
              <RouterLink to='/'>
                <ExitToApp onClick={removeLoggedInStatus} className={'button_notifi'}/>
              </RouterLink>
            </IconButton>
          </Hidden>

        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};


export default TopBar;
