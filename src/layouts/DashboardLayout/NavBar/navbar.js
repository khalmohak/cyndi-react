import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Avatar, Box, Divider, List, makeStyles, SwipeableDrawer, Typography} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  LogOut as LogOutIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
} from 'react-feather';
import NavItem from './NavItem';

const removeLoggedInStatus = () => {
  sessionStorage.removeItem('loggedIn');
}

const items = [
  {
    href: '/app/profile',
    icon: ShoppingBagIcon,
    title: 'Profile'
  },
  {
    href: '/app/class',
    icon: ShoppingBagIcon,
    title: 'Class'
  },
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Settings',
  },
  {
    href: '/login',
    icon: LogOutIcon,
    title: 'Log Out',
    onClick: removeLoggedInStatus
  }
]

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 0,
    height: '100%'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
    borderWidth: 5,
    borderColor: "#ff0"
  }
}));

const NavBar = ({onMobileClose, onMobileNavOpen, openMobile}) => {
  const classes = useStyles();

  const location = useLocation();
  const s3Region = `ap-south-1`;
  const s3Bucket = `cyndi.primary.bucket`;
  const [user, setValues] = useState({
    avatar: `https://s3.${s3Region}.amazonaws.com/${s3Bucket}/${sessionStorage.getItem('userPhoto')}`,
    email: sessionStorage.getItem('userEmail'),
    jobTitle: sessionStorage.getItem('userRole'),
    name: sessionStorage.getItem('userName')
  });

  const returnsProfilePic = () => {
    if (user.avatar) {
      return <Avatar className={classes.avatar} src={user.avatar}/>
    } else {
      return <Avatar className={classes.avatar}>{user.name[0]}</Avatar>
    }
  };

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="start"
        display="flex"
        flexDirection="row"
        p={2}
      >
        {returnsProfilePic()}
        <Box
          alignItems="start"
          display="block"
          flexDirection="column"
          p={1}
          paddingLeft={2}
        >
          <Typography
            className={classes.name}
            color="textPrimary"
            variant="h5"
          >
            {user.name}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {user.jobTitle}
          </Typography>
        </Box>
      </Box>
      <Divider/>
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1}/>
      <Box
        p={2}
        m={2}
        bgcolor="background.dark"
      >
      </Box>
      {/*<BottomNavigation
        //value={value}
        onChange={(event, newValue) => {
          //setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon/>}/>
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon/>}/>
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon/>}/>
      </BottomNavigation>*/}
    </Box>

  );

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({...state, [anchor]: open});
  };

  return (
    <>
      <SwipeableDrawer
        anchor="left"
        classes={{paper: classes.mobileDrawer}}
        onClose={onMobileClose}
        onOpen={onMobileNavOpen}
        open={openMobile}
        variant="temporary"
      >
        {content}
      </SwipeableDrawer>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {
  },
  openMobile: false
};

export default NavBar;
