import React, {useState} from 'react';
import {Outlet} from 'react-router-dom';
import {BottomNavigation, BottomNavigationAction, Box, Button, makeStyles, withStyles} from '@material-ui/core';
import NavBar from './NavBar/navbar';
import TopBar from './TopBar';
import {purple} from '@material-ui/core/colors';
import {Favorite, LocationOn, Restore} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 0,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 0
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    // backgroundColor: purple[500],
    '&:hover': {
      // backgroundColor: purple[700],
    },
  },
}))(Button);

const DashboardLayout = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className={classes.root}>

      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <TopBar onMobileNavOpen={() => setMobileNavOpen(true)}/>
            <Outlet/>
            <Box
              flexDirection="column"
              flex={1}/>
            <BottomNavigation
              showLabels
            >
              <BottomNavigationAction label="Recents" icon={<Restore/>}/>
              <BottomNavigationAction label="Favorites" icon={<Favorite/>}/>
              <BottomNavigationAction label="Nearby" icon={<LocationOn/>}/>
            </BottomNavigation>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
