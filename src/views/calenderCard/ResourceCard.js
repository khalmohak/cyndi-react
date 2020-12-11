import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
 
  Box,
  Card,
  CardContent,
  Divider,
 
  Link,
  Typography,
  makeStyles,
  
} from '@material-ui/core';
//import AccessTimeIcon from '@material-ui/icons/AccessTime';

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
 
  cardTableHeading:{
      fontWeight:'500'
  },
  bottomColor:{
    backgroundColor:'#4768b1'
  },
  cardTitle:{
    fontWeight:'500'
  }



}));





const ResourceCard = ({ className, product, ...rest }) => {
  const classes = useStyles();
  const handleClassCard = (event)=>{
      console.log('card clicked');
  }
  let linkArr = product.links.toString().split(',');
 console.log("Product links " + product.links.toString().split(',')[0]);

      function nameHandler(link){
        
        var linkStr= link.toString().split('/');
        var name = linkStr[linkStr.length - 1];
        return name;
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
          {product.type}
        </Typography>
        <Box
          ml={38}
          mt={-3.3}
          width={200}
        >
          <Typography>
            Date 12/12/2020
          </Typography>
        </Box>
        <Box
        mt={3}
        mb={2}
        mr={2}
        ml={2}
        >
         <Typography
         className={classes.cardTitle}
         >
           {product.title}
         </Typography>
        </Box>
        <Box
        mt={3}
        mb={2}
        mr={2}
        ml={2}
        >
         <Typography
         
         >
           {product.description}
         </Typography>
        </Box> 
        <Box
        ml={1.9}
        >
          { linkArr.map((link)=>(
            
            <Link
              href={link}
            >
                {nameHandler(link)} 
                &nbsp;&nbsp;&nbsp;&nbsp;
            </Link>
            
            
          ))

          }
          
          
          
        </Box>

      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      {/* <Box p={2}
      className={classes.bottomColor}
      >
       
      </Box> */}
    </Card>
  );
};

ResourceCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default ResourceCard;
