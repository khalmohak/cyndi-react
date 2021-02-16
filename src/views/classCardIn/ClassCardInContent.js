import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import ClassBoard from './ClassBoard';
import './Style.css'
import {AppBar, Box, Container, Grid, makeStyles, Tab, Tabs, Typography} from '@material-ui/core';
import PandAClassCard from "./PandA";
import QESClassCard from "./QES";
import {apiEndPoint} from '../../constants';
import axios from "axios";
import {current_class_id} from '../product/ClassListView/classCard';
import Pagination from '@material-ui/lab/Pagination';

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
    class_id: sessionStorage.getItem('current_class_id'),
    limit: 10,
    offset: 0
  };
  const headers = {
    'x-access-token': sessionStorage.getItem('token'),
    'user_id': sessionStorage.getItem('userId')
  }
  axios.post(`${apiEndPoint}/get/panda`, dataAPI, {
    headers: headers
  }).then(
    res => {
      pandaData = res.data;
      console.log(pandaData);
    }
  )
};

let qesData = undefined;

const QESAPI = () => {
  let dataAPI = {
    'class_id': sessionStorage.getItem('current_class_id'),
    'limit': 10,
    'offset': 0
  };
  let headers = {
    'x-access-token': sessionStorage.getItem('token'),
    'user_id': sessionStorage.getItem('userId')
  }

  axios.post(`${apiEndPoint}/get/qes`, dataAPI, {
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

        <Container maxWidth={false} className={'np'}>


          <Box mt={1}>
            <Grid container spacing={3}>
              {pandaData ? pandaData.map((panda) => (
                <Grid
                  item
                  key={panda.activity_id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <PandAClassCard data={panda}/>
                </Grid>
              )) : <div>Loading...</div>}

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
              {qesData ? qesData.map((qes) => (
                <Grid
                  item
                  key={qes.activity_id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <QESClassCard/>
                </Grid>
              )) : <div>Loading...</div>}

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
    </div>
  );
};

ClassCardInContent.propTypes = {
  className: PropTypes.string
};

export default ClassCardInContent;

