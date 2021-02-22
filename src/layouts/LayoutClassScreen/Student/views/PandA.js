import React from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import {Box, Button, Grid, makeStyles, Typography} from '@material-ui/core';
import staticSVG from "../../../../components/GetStaticSvg";

const useStyles = makeStyles((theme) => ({

  cardImage: {
    width: "40px",
    height: "40px"
  },

}));


const PandAClassCard = ({className, data, ...rest}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate('/app/activity_detail', {replace: true})
  };
  return (


    <Box item className='card_bg'>
      <h4>{data.activity_type}</h4>
      <Typography className={classes.cardTitle}>
        {data.title}
      </Typography>
      <Typography className='card_body'>
        {data.description}
      </Typography>

      <Box>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Box>
              {staticSVG("Exam")}
            </Box>
          </Grid>
          <Grid item xs={6} className='flot_card'>
            <Box>
              <Button>Project</Button>
              <Box>
                <Typography className='card_date'>
                  Last Date : 28/01/2020
                </Typography>
              </Box>
            </Box>
          </Grid>

        </Grid>
      </Box>
    </Box>


  );
};

PandAClassCard.propTypes = {
  className: PropTypes.string
};

export default PandAClassCard;
