import React, {useEffect, useState} from 'react';
import {AppBar, Box, Container, Grid, makeStyles, Tab, Tabs, Typography} from "@material-ui/core";
import Page from "../../components/Page";
import PropTypes from "prop-types";
import Pagination from "@material-ui/lab/Pagination";
import ResourcesDocuments from "./ResourcesDocuments";
import axios from "axios";
import {apiEndPoint} from "../../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

function TabPanel(props) {
  const {children, value, index, ...other} = props;


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >

      {value === index && (
        <Box p={1}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export const Resources = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  let apiData = undefined;
  let counter = 0;

  function GetResourcesAPI() {
    counter++;
    let apiBody = {
      class_id: sessionStorage.getItem('current_class_id'),
      university_name: sessionStorage.getItem('universityName'),
      college_name: sessionStorage.getItem('collegeName'),
      limit: 10,
      offset: 0
    }
    let headers = {
      'user_id': sessionStorage.getItem('userId'),
      'x-access-token': sessionStorage.getItem('token')
    }

    axios.post(`http://localhost:4000/get/resource/class`, apiBody, {
      headers: headers
    }).then(
      res => {
        console.log(res)
        apiData = res.data;
      }
    )
      .catch(err => console.log(err))
  }

  useEffect(() => {
    //GetResourcesAPI();
    counter++;
    console.log('mounted');
  }, [counter])


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
            <AppBar position="static">
              <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Documents" {...a11yProps(0)} />
                <Tab label="Media" {...a11yProps(1)} />
                <Tab label="Links" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <Container maxWidth={false} className={'np'}>


                <Box>
                  <Grid
                    container
                    spacing={3}
                  >
                    {apiData ? apiData.map((data) => (
                        <Grid
                          item
                          key={data.resource_id}
                          lg={4}
                          md={6}
                          xs={12}
                        >
                          <ResourcesDocuments/>
                        </Grid>
                      ))
                      : <div>Loading...</div>}
                  </Grid>
                </Box>
                <Box
                  mt={6}
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
            </TabPanel>
            <TabPanel value={value} index={1}>

              <Container maxWidth={false} className={'np'}>


                <Box mt={1}>
                  <Grid container spacing={3}>

                  </Grid>
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
            </TabPanel>

            <TabPanel value={value} index={2}>
              <Container maxWidth={false} className={'np'}>


                <Box>
                  <Grid
                    container
                    spacing={3}
                  >


                  </Grid>
                </Box>
                <Box
                  mt={6}
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
            </TabPanel>


          </Grid>
        </Box>
      </Container>
    </Page>
  )
}
