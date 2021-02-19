import React from 'react';
import {Button, makeStyles, withStyles} from '@material-ui/core';
import TopBar from './TopBar';
import {purple} from '@material-ui/core/colors';
import {createBrowserHistory } from "history";

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
  },
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



const AddClass1 = () => {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <TopBar/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClass1;
