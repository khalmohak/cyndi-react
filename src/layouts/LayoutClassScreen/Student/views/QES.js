import React from 'react';
import clsx from 'clsx';
import {Box, Button, Card, CardContent, Grid, makeStyles, Typography} from '@material-ui/core';
import staticSVG from "../../../../components/GetStaticSvg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '10px',
    width: '40%'
  },
  cardTitle: {
    fontWeight: '700',
    fontSize: '25px'
  },
  cardDescription: {
    fontWeight: '400',
  },
  cardImage: {
    width: "40px",
    height: "40px"
  },
  cardButton: {
    borderRadius: '20px',
    border: "1px solid green",
    paddingLeft: "20px",
    paddingRight: "20px"
  }

}));

const QESClassCard = ({className, product, ...rest}) => {
  const classes = useStyles();

  return (

    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid container>
          <h4>Pending</h4>
        </Grid>
        <Typography className={classes.cardTitle}>
          Lorem Ipsum
        </Typography>
        <Typography className={classes.cardDescription}>
          Lorem Ipsum is simply dummy text of the printing
          and typeset ting industry. Lorem Ipsum has been the
          industry's standard dummy
        </Typography>

        <Box>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box>
                {staticSVG("Exam")}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box mt={5}>
                <Button className={classes.cardButton}>Project</Button>
                <Box mt={2}>
                  <Typography>
                    Last Date : 28/01/2020
                  </Typography>
                </Box>
              </Box>
            </Grid>

          </Grid>
        </Box>
      </CardContent>

    </Card>
  );
};

export default QESClassCard;
