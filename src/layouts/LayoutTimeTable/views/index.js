import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card, CardActions,
  CardContent,
  CardHeader, Container,
  Divider,
  FormControl, FormControlLabel, FormLabel,

  makeStyles, Radio, RadioGroup,
  TextField
} from '@material-ui/core';
import Page from "../../../components/Page";
import TimeTableEditor from "./TimeTableEditor";

const useStyles = makeStyles(() => ({
  root: {
    marginTop:"10px",


  }
}));


const TimeTable = ({className, ...rest}) => {
  const classes = useStyles();


  return (
    <Page
      className={classes.root}
      title="Timetable"
    >
      <Container maxWidth={false}>
          <TimeTableEditor/>
      </Container>
    </Page>
  );
};

TimeTable.propTypes = {
  className: PropTypes.string
};

export default TimeTable;
