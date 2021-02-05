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
import examSVG from "../../components/exam.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '6px',
    width: "100%"
  },
    
  cardImage:{
    width:"40px",
    height:"40px"
  },
 
}));

const PandAClassCard = ({ className, product, ...rest }) => {
  const classes = useStyles();

  return (

    <Grid container spacing={3}>
        <Grid item xs={12} sm={4} className='card_bg'>
        <h4>Pending</h4>
        <Typography className={classes.cardTitle}>
              Lorem Ipsum
          </Typography>
          <Typography className='card_body'>
            Lorem Ipsum is simply dummy text of the printing
            and typeset ting industry. Lorem Ipsum has been the
            industry's standard dummy
          </Typography>


          <Box>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Box>
                  {examSVG}
                </Box>
              </Grid>
              <Grid item xs={6} className='flot_card'>
                <Box>
                  <Button >Project</Button>
                  <Box>
                    <Typography className='card_date'>
                      Last Date : 28/01/2020
                    </Typography>
                  </Box>
                </Box>
              </Grid>

            </Grid>
          </Box>
      </Grid>
    </Grid>
   


  );
};

PandAClassCard.propTypes = {
  className: PropTypes.string
};

export default PandAClassCard;