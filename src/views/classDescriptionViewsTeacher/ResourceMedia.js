import React from 'react';
import {Box, Card, CardContent, Divider, Grid, makeStyles, Typography} from "@material-ui/core";
import {s3URL} from "../../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '20px',
    width: "350px",
    margin: "10px"
  },
  box: {
    color: "white",
    backgroundColor: "#87ceeb"
  },
  mediaImg: {
    height: "200px",
    width: "350px",
  }

}));

const ResourceMedia = ({data, ...rest}) => {
  const classes = useStyles();
  let assignData = JSON.parse(data.assigned_to)["assigned_to"];
  let attachedFiles = JSON.parse(data.attached_files)["images"];
  //console.log(attachedFiles)
  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container>
          {s3URL(attachedFiles[0].file_url) ?
            <img className={classes.mediaImg} src={s3URL(attachedFiles[0].file_url)}/> :
            <img className={classes.mediaImg}/>
          }

        </Grid>
        <Typography>{data.title}</Typography>
        <Typography>{data.type}</Typography>
        <Typography>{data.description}</Typography>
        <Typography>{data.datetime}</Typography>
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
export default ResourceMedia;
