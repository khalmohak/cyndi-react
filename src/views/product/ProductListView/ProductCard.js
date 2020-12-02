import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import MultiSlider, { Progress } from 'react-multi-bar-slider';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import CardHeader from '../../../components/card_header_white';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius:'10px'
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
  bottomColor:{
    backgroundColor:'#1e1f26'
  },
  
  cardHeaderBackground:{
    borderRadius:'10px',
   
    backgroundColor:'pink'
    
    
    
  },
  classDescription:{
    backgroundColor:'#fff',
    borderRadius:'7px'
  },
  cardContent:{
    backgroundColor:'#b0ada4'
  }



}));

const ClassesCard = ({ className, product, ...rest }) => {
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
      <CardContent
      className={classes.cardContent}
      >
        <Box
          display="flex"
          justifyContent="left"
          //ml={-10}
          //className={classes.cardHeaderRound}
          
        >
          {/* <Avatar
            alt="Product"
            src={product.media}
            variant="square" */}
            <Box
            className={classes.cardHeaderBackground}
            mt={-10}
            mb={-7}
            ml={-2}
            >
              <Box 
              //className={classes.cardHeaderRound}
              ml={1}
              mb={-4.1} >
            <CardHeader
             
              className={classes.title}
            ></CardHeader>
            </Box>
            </Box>
        </Box>
        <Typography
          className={classes.titleColor}
          color="inherit"
          gutterBottom
          variant="h4"
          
          
        >
          {product.title}
          <br></br>
          <Box
          className={classes.teacherName}
          >
          {product.teacherName}
          </Box>
          
          
        </Typography>
        <Box
        mt={5}
        mb={2}
        mr={2}
        ml={2}
        >
  {/* Class Description         */}
      <Box
      mb={2}
      pb={1}
      pt={1.5}
      pl={2}
      pr={1.5}
      justify="space-around"
      spacing={5}
      className={classes.classDescription}
      >
        <Grid>
          <Box
          mb={-3.5}
          >
          <Typography>
            Attendance
          </Typography>
          </Box>
        </Grid>
        <Grid>
          <Box
          ml={13}
          >
          <MultiSlider 
            width='100%'
            height='30px'
            roundedCorners='true'
            
          >
            <Progress color="green" progress={10} />
            <Progress color="yellow" progress={45} />
            <Progress color="red" progress={100} />
          </MultiSlider>
          </Box>
        </Grid>
      
      </Box>

      <Box
      mb={2}
      pb={1}
      pt={1.5}
      pl={2}
      pr={1.5}
      justify="space-around"
      spacing={5}
      className={classes.classDescription}
    
      >
        <Grid>
          <Box
          mb={-3.5}
          >
          <Typography>
            Courses
          </Typography>
          </Box>
        </Grid>
        <Grid>
          <Box
          ml={13}
          >
          <MultiSlider 
            width='100%'
            height='30px'
            roundedCorners='true'
            
          >
            <Progress color="green" progress={10} />
            <Progress color="yellow" progress={45} />
            <Progress color="red" progress={100} />
          </MultiSlider>
          </Box>
        </Grid>
      
      </Box>
      <Box
      mb={2}
      pb={1}
      pt={1.5}
      pl={2}
      pr={1.5}
      justify="space-around"
      spacing={5}
      className={classes.classDescription}
            
      >
        <Grid>
          <Box
          mb={-3.5}
          >
          <Typography>
            Classes
          </Typography>
          </Box>
        </Grid>
        <Grid>
          <Box
          ml={13}
          >
          <MultiSlider 
            width='100%'
            height='30px'
            roundedCorners='true'
            
          >
            <Progress color="green" progress={10} />
            <Progress color="yellow" progress={45} />
            <Progress color="red" progress={100} />
          </MultiSlider>
          </Box>
        </Grid>
      
      </Box>
      <Box
      mb={2}
      pb={1}
      pt={1.5}
      pl={2}
      pr={1.5}
      justify="space-around"
      spacing={5}
      className={classes.classDescription}
    
      >
        <Grid>
          <Box
          mb={-3.5}
          >
          <Typography>
            Assignments
          </Typography>
          </Box>
        </Grid>
        <Grid>
          <Box
          ml={13}
          >
          <MultiSlider 
            width='100%'
            height='50px'
            
            
          >
            <Progress color="green" progress={25} />
            <Progress color="yellow" progress={50} />
            <Progress color="red" progress={75} />
            <Progress color="blue" progress={100} />
          </MultiSlider>
          </Box>
        </Grid>
      
      </Box>
      
        </Box>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}
      className={classes.bottomColor}
      >
        <Grid
          container
          justify="space-between"
          spacing={0}
        >
          <Grid
            className={classes.statsItem}
            item
            
          >
            
            <Link
            className={classes.link}
            >
              Board
            </Link>
            
          </Grid>

          <Grid>
          <Link
            className={classes.link}
            >
              Information
            </Link>
            
          </Grid>
          <Grid>
          <Link
            className={classes.link}
            >
              Activity
            </Link>
            
          </Grid>
          

          
        </Grid>
      </Box>
    </Card>
  );
};

ClassesCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default ClassesCard;
