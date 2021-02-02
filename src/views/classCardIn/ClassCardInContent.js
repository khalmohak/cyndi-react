import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ClassBoard from './ClassBoard'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
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
  Tab
} from '@material-ui/core';
import PandAClassCard from "./PandA";
import QESClassCard from "./QES";

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


}));





const ClassCardInContent = ({className, card, ...rest}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



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
        <PandAClassCard/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <QESClassCard/>
      </TabPanel>
    </div>
  );
};


export default ClassCardInContent;

