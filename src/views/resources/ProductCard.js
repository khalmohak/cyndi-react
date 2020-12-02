import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import CardHeader from '../../components/card_header';

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
    
  },
  titleColor:{
    color:'#fff'
  },
  assignment:{
    backgroundColor:'blue',
    borderRadius:'10px',
    paddingLeft:'15px',
    paddingRight:'15px',
    color:'#fff',
    '&:hover':{
      backgroundColor:'#fff',
      borderRadius:'10px',
      paddingLeft:'15px',
      paddingRight:'15px',
      color:'blue'
    }
  },
  pending:{
    backgroundColor:'red',
    borderRadius:'10px',
    paddingLeft:'15px',
    paddingRight:'15px',
    color:'#fff',
    '&:hover':{
      backgroundColor:'#fff',
      borderRadius:'10px',
      paddingLeft:'15px',
      paddingRight:'15px',
      color:'red'
    }
  },
  missed:{
    backgroundColor:'yellow',
    borderRadius:'10px',
    paddingLeft:'15px',
    paddingRight:'15px',
    color:'#fff',
    '&:hover':{
      backgroundColor:'#fff',
      borderRadius:'10px',
      paddingLeft:'15px',
      paddingRight:'15px',
      color:'yellow'
    }
  },
  submitted:{
    backgroundColor:'green',
    borderRadius:'10px',
    paddingLeft:'15px',
    paddingRight:'15px',
    color:'#fff',
    '&:hover':{
      backgroundColor:'#fff',
      borderRadius:'10px',
      paddingLeft:'15px',
      paddingRight:'15px',
      color:'green'
    }
  },
  cardTableHeading:{
      fontWeight:'500'
  },
  bottomColor:{
    backgroundColor:'#4768b1'
  }



}));

const ResourceCard = ({ className, product, ...rest }) => {
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
      <CardContent>
        <Box
          display="flex"
          justifyContent="left"
          ml={-10}
          mt={-16}
          mb={-7}
        >
          {/* <Avatar
            alt="Product"
            src={product.media}
            variant="square" */}
            <Box>
            <CardHeader
             
              className={classes.title}
            ></CardHeader>
            </Box>
        </Box>
        <Typography
          className={classes.titleColor}
          color="inherit"
          gutterBottom
          variant="h5"
          
          
        >
          {product.title}
        </Typography>
        <Box
        mt={5}
        mb={2}
        mr={2}
        ml={2}
        >
         <Grid
         container
         justify="space-between"
         spacing={0}
         
         >
           <Grid
           >
            <Typography
            className={classes.cardTableHeading}
            >
              Pending
            </Typography>
           </Grid>
           <Grid>
           <Typography
          className={classes.cardTableHeading}
           >
              Last Date
            </Typography>
           </Grid>
           <Grid>
           <Typography
           className={classes.cardTableHeading}
           >
              Time Left
            </Typography>
           </Grid>
           
         </Grid>
         </Box>
         <Divider/>
         <Box
         mt={2}
         mb={2}
         mr={2}
        ml={2}
         >
         
         <Grid
         container
         justify="space-between"
         spacing={0}
         ml={20}
         mr={20}
         >
           <Grid
           >
            <Typography
            
            >
              Pending
            </Typography>
           </Grid>
           <Grid>
           <Typography
           
           >
              Last Date
            </Typography>
           </Grid>
           <Grid>
           <Typography
           
           >
              Time Left
            </Typography>
           </Grid>
           
         </Grid>
         </Box>
         <Divider/>
         <Box
         mt={2}
         mb={2}
         mr={2}
        ml={2}
         >
         <Grid
         container
         justify="space-between"
         spacing={0}
         ml={20}
         mr={20}
         >
           <Grid
           >
            <Typography
            
            >
              Pending
            </Typography>
           </Grid>
           <Grid>
           <Typography
           
           >
              Last Date
            </Typography>
           </Grid>
           <Grid>
           <Typography
           
           >
              Time Left
            </Typography>
           </Grid>
           
         </Grid>
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
            
            <Button
            className={classes.assignment}
            >
              Assignment
            </Button>
            
          </Grid>

          <Grid>
          <Button
          className={classes.submitted}
          >
              Submited
            </Button>
            
          </Grid>
          <Grid>
          <Button
          className={classes.pending}
          >
              Pending
            </Button>
            
          </Grid>
          <Grid>
          <Button
          className={classes.missed}
          >
              Missed
            </Button>
            
          </Grid>

          
        </Grid>
      </Box>
    </Card>
  );
};

ResourceCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default ResourceCard;
