import React from 'react';
import {CardContent, makeStyles, Card, Typography, Grid, Button, Divider, Box} from "@material-ui/core";
import {s3Bucket, s3Region, s3URL} from "../../constants";
import fileDownload from 'js-file-download';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '20px',
    width: "350px",
    margin: "10px"
  },
  downloadBtn: {
    border: "2px solid red",
    borderRadius: "20px",
    paddingLeft: "25px",
    paddingRight: "25px",
  },
  box: {
    color: "white",
    backgroundColor: "#87ceeb"
  }

}));

const ResourcesLink = ({data, ...rest}) => {
  const classes = useStyles();
  let assignData = JSON.parse(data.assigned_to)["assigned_to"];
  let attachedFiles = JSON.parse(data.attached_files)["link"];



  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container>
          <Grid item xs={4}>
            {attachedFiles ? <Box></Box>
              :
              <div><Button className={classes.downloadBtn}>Download</Button><Typography>Not Available</Typography></div>

            }

          </Grid>
          <Grid item xs={8}>
            <Typography>{data.title}</Typography>
            <Typography>{data.type}</Typography>
            <a href={attachedFiles}>Link</a>
            <Typography>{data.description}</Typography>
            <Typography>{data.datetime}</Typography>
          </Grid>
        </Grid>
        <Divider/>
        <Typography>Assigned To</Typography>

        {assignData.map(res => {

          return (
            <Box
              className={classes.box}
              m={1}
            >
              <Typography>{res.class_name}</Typography>
            </Box>
          )
        })}


      </CardContent>
    </Card>
  )


};
export default ResourcesLink;
