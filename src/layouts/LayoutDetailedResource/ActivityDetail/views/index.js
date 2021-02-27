import React from 'react';
import {Box, Container, Grid, makeStyles} from '@material-ui/core';
import Page from '../../../../components/Page';
import ActivityCard from "./ActivityCard";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));


const ActivityDetail = () => {
  const classes = useStyles();
  let data = {
    class_name: "OPERATING SYSTEM"
  }


  return (

    <Page
      className={classes.root}
      title="Class"
    >
      <Container maxWidth={false}>

        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            <ActivityCard activity={data}/>
          </Grid>
        </Box>

      </Container>
    </Page>


  );
};
ActivityDetail.propTypes = {
  className: PropTypes.string
};

export default ActivityDetail;
