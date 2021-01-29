import React, { useState,useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles, Typography
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import ClassesCard from './classCard';
import data from './data';
import {apiEndPoint} from "../../../constants";
import axios from 'axios';
import {func} from "prop-types";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  classCard: {
    height: '100%'
  }
}));

const ClassListGenerator = (props) => {
  const classes = useStyles();
  const [products] = useState(data);
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
      <div>Loading...</div>
    )
  }

}

export default ClassListGenerator;
