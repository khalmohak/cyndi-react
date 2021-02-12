import React from 'react';
import {CardContent, makeStyles, Card, Typography, Grid, Button, Divider, Box} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '20px',
    width: "30%",
    margin:"10px"
  },
  downloadBtn:{
    border:"2px solid red",
    borderRadius:"20px",
    paddingLeft:"25px",
    paddingRight:"25px",
  },
  box:{
    color: "white",
    backgroundColor:"#87ceeb"
  }

}));

export default function ResourcesDocuments() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Button className={classes.downloadBtn}>Download</Button>
          </Grid>
          <Grid item xs={6}>
            <Typography>New Doc</Typography>
            <Typography>Page size 20kb | PDF</Typography>
            <Typography>new doc</Typography>
            <Typography>11-02-2021 01:46 PM</Typography>
          </Grid>
        </Grid>
        <Divider/>
        <Typography>Assigned To</Typography>
        <Box
          className={classes.box}
          m={1}
        >
          <Typography>Maths Class</Typography>
        </Box>
        <Box
          className={classes.box}
          m={1}
        >
          <Typography>Machine learning</Typography>
        </Box>

      </CardContent>
    </Card>
  )


};
