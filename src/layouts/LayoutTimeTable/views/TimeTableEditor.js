import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card, CardActions,
  CardContent,
  CardHeader, Container,
  Divider,
  FormControl, FormControlLabel, FormLabel, Grid,
  makeStyles, Radio, RadioGroup,
  TextField
} from '@material-ui/core';
import Page from "../../../components/Page";
import WeekDay from "./WeekDay";

const useStyles = makeStyles(() => ({
  root: {
    overflow: "true"
  }
}));


const TimeTableEditor = ({className, ...rest}) => {

  function getData(data) {
    console.log(data);
  }
  return (
    <div>
      {
        ["Monday"].map(data =>{
        return(
          <WeekDay day={data} callback={getData}/>
        )
      })
      }

    </div>
  )
}


TimeTableEditor.propTypes = {
  className: PropTypes.string
};

export default TimeTableEditor;
