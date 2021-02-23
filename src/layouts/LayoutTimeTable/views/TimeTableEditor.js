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

const useStyles = makeStyles(() => ({
  root: {
    overflow:"true"
  },
  course: {
    marginTop: "120px"
  },
  sub:{
    marginLeft:"-130px"
  }
}));


const TimeTableEditor = ({className, ...rest}) => {
  const classes = useStyles();


  return (
    <Grid container
    className={classes.root}>
      <Grid item lg={3}>
        <Grid>
          <Button>
            Add
          </Button>
        </Grid>
        <Grid>
          <TextField
            value={"Monday"}
            variant="outlined"
          >
          </TextField>
        </Grid>

      </Grid>
      <Grid item lg={3}
            className={classes.sub}>
        <Button>
          Add
        </Button>
        <Grid>
          <TextField
            value={"B.Tech"}
            variant="outlined"
          >

          </TextField>
        </Grid>
        <Grid className={classes.course}>
          <TextField
            value={"BSc"}
            variant="outlined"
          >

          </TextField>
        </Grid>
        <Grid className={classes.course}>
          <TextField
            value={"MBA"}
            variant="outlined"
          >

          </TextField>
        </Grid>
      </Grid>
      <Grid item lg={3}
            className={classes.sub}
      >
        <Grid>
          <Grid>
            <Grid>

              <Button>
                Add
              </Button>
            </Grid>
            <Grid>
              <TextField
                value={"9AM"}
                variant="outlined"
              ></TextField>
              <TextField
                value={"Teacher"}
                variant="outlined"
              ></TextField>
              <TextField
                value={"Subject"}
                variant="outlined"
              ></TextField>
            </Grid>
          </Grid>

        </Grid>
        <Grid>

        </Grid>
        <Grid>

        </Grid>

      </Grid>
      <Grid item lg={3}
      className={classes.sub}
      >
        <Grid>
          <Grid>
            <Grid>

              <Button>
                Add
              </Button>
            </Grid>
            <Grid>
              <TextField
                value={"9AM"}
                variant="outlined"
              ></TextField>
              <TextField
                value={"Teacher"}
                variant="outlined"
              ></TextField>
              <TextField
                value={"Subject"}
                variant="outlined"
              ></TextField>
            </Grid>
          </Grid>

        </Grid>
        <Grid>

        </Grid>
        <Grid>

        </Grid>

      </Grid>
      <Grid item lg={3}
            className={classes.sub}
      >
        <Grid>
          <Grid>
            <Grid>

              <Button>
                Add
              </Button>
            </Grid>
            <Grid>
              <TextField
                value={"9AM"}
                variant="outlined"
              ></TextField>
              <TextField
                value={"Teacher"}
                variant="outlined"
              ></TextField>
              <TextField
                value={"Subject"}
                variant="outlined"
              ></TextField>
            </Grid>
          </Grid>

        </Grid>
        <Grid>

        </Grid>
        <Grid>

        </Grid>

      </Grid>
      <Grid item lg={3}
            className={classes.sub}
      >
        <Grid>
          <Grid>
            <Grid>

              <Button>
                Add
              </Button>
            </Grid>
            <Grid>
              <TextField
                value={"9AM"}
                variant="outlined"
              ></TextField>
              <TextField
                value={"Teacher"}
                variant="outlined"
              ></TextField>
              <TextField
                value={"Subject"}
                variant="outlined"
              ></TextField>
            </Grid>
          </Grid>

        </Grid>
        <Grid>

        </Grid>
        <Grid>

        </Grid>

      </Grid>

    </Grid>
  );
};

TimeTableEditor.propTypes = {
  className: PropTypes.string
};

export default TimeTableEditor;
