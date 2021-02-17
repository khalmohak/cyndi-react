import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import ClassBoard from './ClassBoard';
import './Style.css'
import {
  AppBar,
  Box, Button,
  Container,
  Drawer,
  Grid,
  makeStyles,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useTheme
} from '@material-ui/core';
import PandAClassCard from "./PandA";
import QESClassCard from "./QES";
import {apiEndPoint} from '../../constants';
import axios from "axios";
import {current_class_id} from '../product/ClassListView/classCard';
import AddPandA from "./AddPandA";
import AddQandA from "./AddQandA";
import Pagination from '@material-ui/lab/Pagination';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {SideMenu} from './SideMenu';
import {getRoleColor} from "../../utils/GetRoleColor";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {useNavigate} from "react-router-dom";

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


const drawerWidth = 300;

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
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  backButton:{
    color:'#ffffff'
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
  const theme = useTheme();
  const appBarColor = getRoleColor();
  const navigate = useNavigate();
  //const [teacherData, setTeacherData] = useState({});

  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const headers = {
    'user_id': sessionStorage.getItem('userId'),
    'x-access-token': sessionStorage.getItem('token')
  };
  const ApiData = {
    university_name: sessionStorage.getItem('universityName'),
    college_name: sessionStorage.getItem('collegeName')
  };
  let teacherData = JSON.parse(sessionStorage.getItem('classData')).data;
  for (let i = 0; i < teacherData.length; i++) {
    if (teacherData[i].class_id == sessionStorage.getItem('current_class_id')) {
      teacherData = teacherData[i];
      break;
    }
  }

  function back() {
    navigate('/app/class/')
  }

console.log(window.location.href);
  useEffect(() => {
    PandAAPI();
    QESAPI();

    // if (qesData && pandaData) {
    //   console.log(qesData);
    //   console.log(pandaData);
    //
    // }
  }, [qesData, pandaData])

  return (
    <div className={classes.root}>
      <AppBar position="static"

              className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
              }, appBarColor)}>
        <Toolbar>
          <Button onClick={back}><KeyboardBackspaceIcon className={classes.backButton}/></Button>
          <Typography variant="h6" noWrap className={classes.title}>
            Class Board
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon/>
          </IconButton>
        </Toolbar>


        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Class Board" {...a11yProps(0)} />
          <Tab label="P&A" {...a11yProps(1)} />
          <Tab label="Q.E.S" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
          </IconButton>
        </div>

        {teacherData ? <SideMenu data={teacherData}/> : <div>Loading</div>}

      </Drawer>
      <TabPanel value={value} index={0}>
        <ClassBoard/>
      </TabPanel>
      <TabPanel value={value} index={1}>

        <Container maxWidth={false} className={'np'}>

          <AddPandA/>
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

          <AddQandA/>
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

