import React from 'react';
import {Box, Divider,CardContent, Card, Container, Grid, makeStyles, Typography} from '@material-ui/core';
import Page from 'src/components/Page';
import {Assignment} from '@material-ui/icons';
import UploadWork from "./uploadWork";
import PropTypes from "prop-types";
import ClassCardInContent from "../classCardIn/ClassCardInContent";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  title:{
    color:'#31b1ef'
  },
  assignmentIcon:{
    width:"30px"
  }
}));


const ActivityCard = ({activity, ...rest}) => {
  const classes = useStyles();

  return (

    <Box>
      <Grid container>
        <Grid item>
          <Box>
          <Typography
          variant={'h2'}
          className={classes.title}
          >
            <Assignment
            className={classes.assignmentIcon}
            fontSize={'large'}
            />{activity.class_name}
          </Typography>
            <Typography
            variant={'h6'}
            >
              Shivi Garg • 8 Apr 2020 (Edited 8 Apr 2020)
            </Typography>
          </Box>
        </Grid>

        <Grid item>
          <UploadWork/>
        </Grid>

      </Grid>
      <Box>
        <Typography
          variant={'h6'}
        >
          Due 8 Apr 2020, 19:00
        </Typography>
      </Box>
      <Divider/>
      <Box>
        Attached files links
      </Box>

    </Box>

  );
};
ActivityCard.propTypes = {
  className: PropTypes.string
};

export default ActivityCard;
