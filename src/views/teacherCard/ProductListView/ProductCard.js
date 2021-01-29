import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {Avatar, Box, Card, CardContent, Divider, Grid, Link, makeStyles, Tooltip, Typography, Table, TableBody, TableCell, TableContainer, TableHead,TableRow, Paper} from '@material-ui/core';
import CardHeader from '../../../components/card_header_white';
import MultiSlider, {Progress} from "react-multi-bar-slider";
import '../../product/ProductListView/style.css';
import NotifyMe from '../../NotifyMe';
import {Accessibility, Dashboard, InfoOutlined, AssignmentOutlined } from '@material-ui/icons'



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius:'6px',
    width:"100%"
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  title:{
    position:'relative',
    boxShadow: `5px #808080`,
    
  },
  titleColor:{
    color:'#000',
    marginLeft:'80px',
    fontSize:'17px',
    textTransform:'uppercase'
  },
  teacherName:{
    color:'#808080',
    textTransform:'capitalize',
    fontSize:'15px'
  },
  link:{
    color:'#fff',
    
    '&:hover':{
      
      
      color:'blue'
    }
  },
  
  cardTableHeading:{
      fontWeight:'500'
  },
  
  cardHeaderBackground:{borderRadius:'6px', backgroundColor:'pink'
    
    
    
  },
  classDescription:{
    backgroundColor:'#fff',
    borderRadius:'7px'
  },
  cardContent:{
    backgroundColor:'#e6e7e8', padding:'6px'
  },
  nextClassDate:{
    fontSize:'12px',
    fontWeight:'bold'
  },
  nextClassDateBox:{
    width:'400px',
    marginLeft:'50px',
    
    position:'flex'
  },
  avatar:{
      height:'60px',
      width:'60px'
  },
  notification:{
    height:'5px',
    width:'5px',
    backgroundColor:'#fff',
    color:'#fff'
  },



}));



function createData(name, classes, assignments, projects, test_quiz) {
  return { name, classes, assignments, projects, test_quiz };
}

const rows = [
  createData('Classes', 12, 6, 6, '12/5/'),
  createData('Assignments', 12, 9, 3, '12/5'),
  createData('Projects', 12, 10, 2, '12/5/'),
  createData('Test/Quiz', 12, 3, 9, '12/5/'),

];

var attendancePercent = '40%';


var data=[
  {
    "update":"70 new employees are shifted",
    "timestamp":1596119688264
  },
  {
    "update":"Time to take a Break, TADA!!!",
    "timestamp":1596119686811
  },
  {
    "update":"70 new employees are shifted",
    "timestamp":1596119688264
  },
  {
    "update":"Time to take a Break, TADA!!!",
    "timestamp":1596119686811
  }
]



const TeachersCard = ({ className, product, ...rest }) => {
  const classes = useStyles();
  const handleClassCard = (event)=>{
      console.log('card clicked');
  }




  return (
    <Card
      onClick={handleClassCard}
      className={clsx(classes.root, className)}
      {...rest}

    >
      <CardContent  className={classes.cardContent}
      >
        
        <Box display="flex" justifyContent="left">

          <Box className={'topheader'}>
          <span>dd</span>
          <i>
          
          <Box className={'dkpal'}>
          <Box className={'dkpal2'}> 
        <NotifyMe
              data={data}
              storageKey='notific_key'
              notific_key='timestamp'
              notific_value='update'
              heading='Notifications'
              sortedByKey={false}
              showDate={true}
              size='25'
              color="black"
            />
          </Box> 


        </Box>

          
          <Typography color="inherit" gutterBottom className={'hadding'}>
          {product.name}

          <Box className={'hadding'}>
          {product.name}
          </Box>

          <Box className={'date'}> 
              <Typography className={classes.nextClassDate}>
                <i>Next Class - <b>{'12/12/2020'}</b></i>
              </Typography>
            </Box>
         
        </Typography>

          </i>
          </Box>
        </Box>
        
        
   <Box>
                <Box display="flex" p={1} bgcolor="background.paper" className={'assignment'}>
                <Box p={1} className={'inner'}>Attendance </Box>
                <Box p={1} flexGrow={1} className={'inner'}>
                <Tooltip title={attendancePercent}>
                <MultiSlider 
                width='100%'
                height='20px'
                roundedCorners='true'> 
                <Progress className={'col1'} progress={40} />
                <Progress className={'white-g'} progress={100} />
                </MultiSlider>
                </Tooltip>
                </Box>
                
        </Box>


        
<Box>
          <TableContainer component={Paper}>
            <Table className={'teacher'} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Progress</TableCell>
                  <TableCell align="right">Planned</TableCell>
                  <TableCell align="right" className={classes.done}>Done</TableCell>
                  <TableCell align="right">Remaining</TableCell>
                  <TableCell align="right">Next</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right" >{row.classes}</TableCell>
                    <TableCell align="right" className={classes.done}>{row.assignments}</TableCell>
                    <TableCell align="right" className={classes.remaining}>{row.projects}</TableCell>
                    <TableCell align="right" className={classes.next}>{row.test_quiz}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      {/*Description End*/}

       


        



 
      
        </Box>
      </CardContent>

      <Box flexGrow={1} />
      <Divider />
      <Box className={'bottomColor'}>
        <Grid container justify="space-between" spacing={0}>
          <Grid className={classes.link}>
            <Link className={classes.link}>
              <Dashboard></Dashboard> Board
            </Link>
           </Grid>

          <Grid className={classes.link}>
            <Link className={classes.link}>
               <InfoOutlined></InfoOutlined> Information
            </Link>
          </Grid>

          <Grid className={classes.link}>
            <Link className={classes.link}>
               <AssignmentOutlined></AssignmentOutlined> Activity
            </Link>
          </Grid>
        
        </Grid>
      </Box>
    </Card>
  );
};

TeachersCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default TeachersCard;
