import React, {useState} from 'react';
import {Outlet} from 'react-router-dom';
import {AppBar, Box, Button, createMuiTheme, makeStyles, Toolbar, Typography, withStyles} from '@material-ui/core';
import NavBar from './NavBar';
import TopBar from './TopBar';
import AddIcon from "@material-ui/icons/Add";
import { green, purple } from '@material-ui/core/colors';

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
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
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
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)}/>
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h5" className={classes.title}>
                  Classes
                </Typography>
                <Box flex={1}/>
                <ColorButton
                  className={classes.button}
                  startIcon={<AddIcon/>}
                >
                  Class
                </ColorButton>
              </Toolbar>
            </AppBar>
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
);
};

export default DashboardLayout;
