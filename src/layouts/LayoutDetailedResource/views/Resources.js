import React, {useEffect} from 'react';
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Tab,
  Tabs,
  Toolbar,
  Typography
} from "@material-ui/core";
import Page from "../../../components/Page";
import PropTypes from "prop-types";
import Pagination from "@material-ui/lab/Pagination";
import ResourcesDocuments from "./ResourcesDocuments";
import axios from "axios";
import {apiEndPoint} from "../../../constants";
import ResourceMedia from "./ResourceMedia";
import ResourcesLink from "./ResourcesLink";
import {useNavigate} from "react-router";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {getRoleColor} from "../../../utils/GetRoleColor";
import clsx from "clsx";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  pandaAddButton: {
    backgroundColor: '#025fa1',
    color: '#ffffff',
    '&:hover': {
      color: '#025fa1',
      borderColor: "#025fa1"
    }
  },
  tab: {
    marginTop: "100px"
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
  const [state, setState] = React.useState();
  // const [documents, setDocuments] = React.useState([]);
  // const [media, setMedia] = React.useState([]);
  // const [links, setLinks] = React.useState([]);
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  let apiData = undefined;

  function GetResourcesAPI() {

    let apiBody = {
      class_id: sessionStorage.getItem('current_class_id'),
      university_name: sessionStorage.getItem('universityName'),
      college_name: sessionStorage.getItem('collegeName'),
      limit: 10,
      offset: 1
    }
    let headers = {
      'user_id': sessionStorage.getItem('userId'),
      'x-access-token': sessionStorage.getItem('token')
    }


    axios.post(`${apiEndPoint}/get/resource/class`, apiBody, {
      headers: headers
    }).then(
      res => {
        //console.log(res.data)
        apiData = res.data;
        setState(res.data);
        //console.log(state)

      }
    )
      .catch(err => console.log(err))
  }

  useEffect(() => {
    GetResourcesAPI();

  }, [state])
  let documents = undefined;
  let media = undefined;
  let links = undefined;

  function sortingMedia() {
    if (state) {
      state.map(data => {
        let attachedFiles = JSON.parse(data.attached_files);
        if (attachedFiles.files) {
          if (documents) {
            documents.push(data)
          } else {
            documents = [data]
          }
        }
        if (attachedFiles.link) {
          if (links) {
            links.push(data)
          } else {
            links = [data]
          }
        }
        if (attachedFiles.images) {
          if (media) {
            media.push(data)
          } else {
            media = [data]
          }
        }
      })
    }
  }

  const appBarColor = getRoleColor();
  sortingMedia()

  function handleAddDocs() {
    navigate('/app/teacher/resources/adddocuments')
  }

  function handleAddMedia() {
    navigate('/app/teacher/resources/addmedia')
  }

  function handleAddLink() {
    navigate('/app/teacher/resources/addLink')
  }

  function back() {
    navigate('/app/teacher/')
  }

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
            <AppBar className={clsx(appBarColor)} position="fixed">
              <Toolbar>
                <Button onClick={back} style={{color:'white'}}><KeyboardBackspaceIcon/></Button>
              </Toolbar>
              <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Documents" {...a11yProps(0)} />
                <Tab label="Media" {...a11yProps(1)} />
                <Tab label="Links" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <TabPanel className={classes.tab} value={value} index={0}>
              <Container maxWidth={false} className={'np'}>
                <Grid xs={1} sm={1} md={1} lg={1}>
                  <Button
                    onClick={handleAddDocs}
                    className={classes.pandaAddButton}>
                    Add
                  </Button>
                </Grid>

                <Box>
                  <Grid
                    container
                    spacing={1}
                    justify="left"
                  >
                    {documents ? documents.map((data) => (
                        <Grid
                          item
                          key={data.resource_id}
                        >
                          <ResourcesDocuments data={data}/>
                        </Grid>
                      ))
                      : <CircularProgress className={classes.loading}/>}
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
            <TabPanel className={classes.tab} value={value} index={1}>
              <Container maxWidth={false} className={'np'}>
                <Grid xs={1} sm={1} md={1} lg={1}>
                  <Button
                    onClick={handleAddMedia}
                    className={classes.pandaAddButton}>
                    Add
                  </Button>
                </Grid>

                {/*<Box mt={1}>*/}
                <Grid


                >
                  {media ? media.map((data) => (
                      <Grid

                        key={data.resource_id}
                        xs={6}
                      >

                        <div>
                          <ResourceMedia data={data}/>
                        </div>

                      </Grid>
                    ))
                    : <CircularProgress className={classes.loading}/>}
                </Grid>
                {/*</Box>*/}

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

            <TabPanel className={classes.tab} value={value} index={2}>
              <Container maxWidth={true} className={'np'}>
                <Grid xs={1} sm={1} md={1} lg={1}>
                  <Button
                    onClick={handleAddLink}
                    className={classes.pandaAddButton}>
                    Add
                  </Button>
                </Grid>

                <Grid container justify="left" spacing={1}>
                  {links ? links.map((data) => (
                    <Grid key={data.resource_id} item>
                      <ResourcesLink data={data}/>
                    </Grid>
                  )) : <CircularProgress/>}
                </Grid>


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
