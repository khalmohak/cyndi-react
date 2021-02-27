import React from 'react';
import {Box, Button, Card, CardContent, Divider, Grid, makeStyles, Typography} from "@material-ui/core";
import {s3Bucket, s3Region} from "../../../constants";

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

const ResourcesDocuments = ({data, ...rest}) => {
  const classes = useStyles();
  let assignData = JSON.parse(data.assigned_to)["assigned_to"];
  let attachedFiles = JSON.parse(data.attached_files)["files"];


  return (
    <Card className={classes.root}
          m={2}>
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            {attachedFiles ? <Box><Button className={classes.downloadBtn}
                                          href={`https://s3.${s3Region}.amazonaws.com/${s3Bucket}/${attachedFiles[0].file_url}?force=true`}
              >Download</Button><Typography>File Name
                - {attachedFiles[0].file_name}</Typography></Box>
              :
              <div><Button className={classes.downloadBtn}>Download</Button><Typography>Not Available</Typography></div>

            }

          </Grid>
          <Grid item xs={6}>
            <Typography>{data.title}</Typography>
            <Typography>{data.type}</Typography>
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
export default ResourcesDocuments;
