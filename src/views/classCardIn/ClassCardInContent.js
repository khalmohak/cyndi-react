import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ClassBoard from './ClassBoard';
import './Style.css'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Button,
  Grid,
  Link,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  AppBar,
  Tabs,
  Tab,
  Container
} from '@material-ui/core';
import PandAClassCard from "./PandA";
import QESClassCard from "./QES";
import {apiEndPoint} from '../../constants';
import axios from "axios";
import {current_class_id} from '../product/ClassListView/classCard';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

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
  },
  pandaAddButton:{
      backgroundColor:'#025fa1',
      color:'#ffffff',
    '&:hover':{
      color:'#025fa1',
      borderColor:"#025fa1"
    }
  }

}));

const PandAAPI = ()=>{
  const data = {
    class_id : current_class_id,
    limit : 10,
    offset : 0
  };
  const headers = {
    'x-access-token': sessionStorage.getItem('token'),
    'user_id': sessionStorage.getItem('userId')
  }
  axios.post(`${apiEndPoint}/get/panda`,data,{
    headers:headers
  }).then(
    res => console.log(res)
  )
};

const QESAPI = ()=>{
  const data = {
    class_id : current_class_id,
    limit : 10,
    offset : 0
  };
  const headers = {
    'x-access-token': sessionStorage.getItem('token'),
    'user_id': sessionStorage.getItem('userId')
  }
  axios.post(`${apiEndPoint}/get/qes`,data,{
    headers:headers
  }).then(
    res => console.log(res)
  )
}


const ClassCardInContent = ({className, card, ...rest}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(()=>{
    PandAAPI();
    QESAPI();
  },[])



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
          <Button className={classes.pandaAddButton}>Add</Button>
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
        <QESClassCard/>
      </TabPanel>
    </div>
  );
};

ClassCardInContent.propTypes = {
  className: PropTypes.string
};

export default ClassCardInContent;

