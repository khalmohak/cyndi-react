import React from 'react';
import {Box, Container, Grid, makeStyles} from '@material-ui/core';
import Page from '../../../../components/Page';
import ClassCardInContent from "./ClassCardInContent";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));


const TeacherClassCardIn = () => {
  const classes = useStyles();

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
            <ClassCardInContent></ClassCardInContent>
          </Grid>
        </Box>
      </Container>
    </Page>

  );
};

export default TeacherClassCardIn;
