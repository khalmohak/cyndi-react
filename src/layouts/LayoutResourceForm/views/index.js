import React from 'react';
import {Box, Container, makeStyles} from '@material-ui/core';
import {Pagination} from '@material-ui/lab';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import ResourceCard from './ResourceCard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

const ResourcesListView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Resources"
    >
      <Container maxWidth={false}>
        <Toolbar/>
        <Box mt={3}>
          <Box
            container
            spacing={3}
            display="flex"
            justifyContent="center"
          >
            {/* {products.map((product) => (
              <Grid
                item
                key={product.id}
                lg={4}
                md={6}
                xs={12}
              >
                <ResourceCard
                  className={classes.productCard}
                  product={product}
                />
              </Grid>
            ))} */}
            <ResourceCard/>
          </Box>
        </Box>
        <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box>
      </Container>
    </Page>
  );
};

export default ResourcesListView;
