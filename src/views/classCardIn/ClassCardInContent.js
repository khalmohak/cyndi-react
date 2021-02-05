import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import ClassBoard from './ClassBoard';
import './Style.css'
import {AppBar, Box, Button, Container, Grid, makeStyles, Tab, Tabs, Typography} from '@material-ui/core';
import PandAClassCard from "./PandA";
import QESClassCard from "./QES";
import {apiEndPoint} from '../../constants';
import axios from "axios";
import {current_class_id} from '../product/ClassListView/classCard';
import AddPandA from "./AddPandA";
import AddQandA from "./AddQandA";

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
        <Box p={3}>
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

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '6px',
    width: "100%"
  }

}));
let pandaData = undefined;

const PandAAPI = () => {
  const dataAPI = {
    class_id: current_class_id,
    limit: 10,
    offset: 0
  };
  const headers = {
    'x-access-token': sessionStorage.getItem('token'),
    'user_id': sessionStorage.getItem('userId')
  }
  axios.post(`http://localhost:4000/get/panda`, dataAPI, {
    headers: headers
  }).then(
    res => {
      pandaData = res.data;
    }
  )
};

let qesData = undefined;

const QESAPI = () => {
  let dataAPI = {
    'class_id': current_class_id,
    'limit': 10,
    'offset': 0
  };
  let headers = {
    'x-access-token': sessionStorage.getItem('token'),
    'user_id': sessionStorage.getItem('userId')
  }

  axios.post(`http://localhost:4000/get/qes`, dataAPI, {
    headers: headers
  }).then(
    res => {
      qesData = res.data;

    }
  )
    .catch(err => console.log(err));
}

const ClassCardInContent = ({className, card, ...rest}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  useEffect(() => {
    PandAAPI();
    QESAPI();
    if (qesData && pandaData) {
      console.log(qesData);
      console.log(pandaData);
    }
  }, [qesData, pandaData])

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Class Board" {...a11yProps(0)} />
          <Tab label="P&A" {...a11yProps(1)} />
          <Tab label="Q.E.S" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ClassBoard/>
      </TabPanel>
      <TabPanel value={value} index={1}>

        <Container maxWidth={false}>

          <AddPandA/>
          <Box mt={3}>
            <Grid
              container
              spacing={3}
            >
              {/*{products.map((product) => (*/}
              {/*  <Grid*/}
              {/*    item*/}
              {/*    key={product.id}*/}
              {/*    lg={4}*/}
              {/*    md={6}*/}
              {/*    xs={12}*/}
              {/*  >*/}
              {/*    <PandAClassCard/>*/}
              {/*  </Grid>*/}
              {/*))}*/}
              <PandAClassCard/>
            </Grid>
          </Box>
          {/*<Box*/}
          {/*  mt={3}*/}
          {/*  display="flex"*/}
          {/*  justifyContent="center"*/}
          {/*>*/}
          {/*  <Pagination*/}
          {/*    color="primary"*/}
          {/*    count={3}*/}
          {/*    size="small"*/}
          {/*  />*/}
          {/*</Box>*/}
        </Container>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Container maxWidth={false}>

          <AddQandA/>
          <Box mt={3}>
            <Grid
              container
              spacing={3}
            >
              {/*{products.map((product) => (*/}
              {/*  <Grid*/}
              {/*    item*/}
              {/*    key={product.id}*/}
              {/*    lg={4}*/}
              {/*    md={6}*/}
              {/*    xs={12}*/}
              {/*  >*/}
              {/*    <PandAClassCard/>*/}
              {/*  </Grid>*/}
              {/*))}*/}
              <QESClassCard/>
            </Grid>
          </Box>
          {/*<Box*/}
          {/*  mt={3}*/}
          {/*  display="flex"*/}
          {/*  justifyContent="center"*/}
          {/*>*/}
          {/*  <Pagination*/}
          {/*    color="primary"*/}
          {/*    count={3}*/}
          {/*    size="small"*/}
          {/*  />*/}
          {/*</Box>*/}
        </Container>
      </TabPanel>
    </div>
  );
};

ClassCardInContent.propTypes = {
  className: PropTypes.string
};

export default ClassCardInContent;
