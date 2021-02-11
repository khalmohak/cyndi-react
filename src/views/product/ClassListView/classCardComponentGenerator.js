import React, {useState} from 'react';
import {Box, CircularProgress, Container, Grid, makeStyles} from '@material-ui/core';
import {Pagination} from '@material-ui/lab';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import {ClassesCard} from './classCard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  classCard: {
    height: '100%'
  },
  loading:{

  }
}));



const ClassListGenerator = (props) => {
  const classes = useStyles();

  if (props.classArrayData) {

      return (
        <Page
          className={classes.root}
          title="Class"
        >
          <Container maxWidth={false}>
            <Toolbar/>
            <Box mt={3}>

            </Box>
            <Box
              mt={3}
              display="flex"
              justifyContent="center"
            >
              <Grid
                container
                spacing={3}
              >
                {props.classArrayData.map((card) => (
                  <Grid
                    item
                    key={card.class_id}
                    lg={4}
                    md={6}
                    xs={12}
                  >
                    <ClassesCard
                      className={classes.classCard}
                      card={card}
                    />
                  </Grid>
                ))}
              </Grid>

            </Box>
            <Pagination
              color="primary"
              count={3}
              size="small"
            />
          </Container>
        </Page>
      );



  }
  else{
    return(
      <CircularProgress className={classes.loading}/>
    )
  }

}

export default ClassListGenerator;
