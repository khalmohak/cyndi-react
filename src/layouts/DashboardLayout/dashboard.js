import React, {useState} from 'react';
import {Outlet} from 'react-router-dom';
import {BottomNavigation, BottomNavigationAction, Box, Button, Fab, makeStyles, withStyles} from '@material-ui/core';
import NavBar from './NavBar/navbar';
import TopBar from './TopBar';
import {purple} from '@material-ui/core/colors';
import {Description, Home, Message, Notifications, Person} from '@material-ui/icons'
import {getRoleColor} from "../../utils/GetRoleColor";
import {useNavigate} from "react-router";

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
    overflow: 'scroll'
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
  const classes2 = useStyles;
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const navigate = useNavigate();

  const [selection, setSelection] = useState(2);

  return (
    <div className={classes.root}>
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        onMobileNavOpen={() => setMobileNavOpen(true)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <TopBar onMobileNavOpen={() => setMobileNavOpen(true)}/>

            <Outlet/>
            <Box
              display={'flex'}
              width='100%'
              justifyContent='center'>

              <Fab style={{
                position: 'absolute',
                bottom: 28,
                zIndex: 1,
                backgroundColor: '#ff5354',
                color: selection === 2 ? '#ffffff' : '#bfbfbf',
                outline: 'none'
              }} onClick={() => {
                setSelection(2);
                navigate('/app/class')
              }}>
                <Home/>
              </Fab>

              <BottomNavigation
                showLabels
                className={getRoleColor()}
                style={{
                  borderTopLeftRadius: '30px',
                  borderTopRightRadius: '30px',
                  position: 'fixed',
                  bottom: 0,
                  flex: '1 1 auto',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingHorizontal: 0,
                  paddingVertical: 0,
                  color: '#fff'
                }}
              >
                <BottomNavigationAction style={{color: selection === 0 ? '#ffffff' : '#bfbfbf', outline: 'none'}}
                                        label="Resources" icon={<Description/>}
                                        onClick={() => {
                                          setSelection(0);
                                          navigate('/app/resources')
                                        }}/>
                <BottomNavigationAction style={{color: selection === 1 ? '#ffffff' : '#bfbfbf', outline: 'none'}}
                                        label="Messaging" icon={<Message/>}
                                        onClick={() => {
                                          setSelection(1);
                                          navigate('/app/messaging')
                                        }}/>
                <BottomNavigationAction style={{color: selection === 2 ? '#ffffff' : '#bfbfbf', outline: 'none'}}
                                        label="Class" icon={<Home/>}
                                        onClick={() => {
                                          setSelection(2);
                                          navigate('/app/class')
                                        }}/>
                <BottomNavigationAction style={{color: selection === 3 ? '#ffffff' : '#bfbfbf', outline: 'none'}}
                                        label="Notifications" icon={<Notifications/>}
                                        onClick={() => {
                                          setSelection(3);
                                          navigate('/app/notifications')
                                        }}/>
                <BottomNavigationAction style={{color: selection === 4 ? '#ffffff' : '#bfbfbf', outline: 'none'}}
                                        label="Profile" icon={<Person/>}
                                        onClick={() => {
                                          setSelection(4);
                                          navigate('/app/dashboard')
                                        }}/>
              </BottomNavigation>

            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
