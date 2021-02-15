import React from 'react';
import {Button, Card, CardContent, makeStyles, Typography} from '@material-ui/core';
import S3 from 'react-aws-s3';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }

}));


const UploadWork = () => {
  const classes = useStyles();

  const fileInput = React.useRef();
  const handleClick = event => {
    event.preventDefault();
    console.log(fileInput.current);
    let file = fileInput.current.files[0];
    let newFileName = fileInput.current.files[0].name;
    console.log(file, newFileName);
    const config = {
      bucketName: 'cyndi.primary.bucket',
      dirName: 'Activity/',
      region: 'ap-south-1',
      accessKeyId: 'AKIA5GLSIIS4NFKWWLGC',
      secretAccessKey: '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',
    };
    const ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(file, newFileName).then(data => {
      console.log(data);
    })
      .catch(err => console.log(err))
  }

  return (

    <Card>
      <Typography
        variant={"h3"}
      >
        Your Work
      </Typography>
      <CardContent>
        <form onSubmit={handleClick}>
          <input
            type="file"
            ref={fileInput}
          />


          <Button
            type={"submit"}
          >
            Submit
          </Button>
        </form>

      </CardContent>
    </Card>

  );
};

export default UploadWork;
