import React from 'react';
import AWS from 'aws-sdk';

function S3Uploader(file,folder,progress,success){
  AWS.config.update({
    accessKeyId: 'AKIA5GLSIIS4NFKWWLGC',
    secretAccessKey: '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'
  })

  let myBucket = new AWS.S3({
    params: {Bucket: 'cyndi.primary.bucket'},
    region: 'ap-south-1',
  })

  const params = {
    ACL: 'public-read',
    Key: `${folder}/${file.name}`,
    ContentType: file.type,
    Body: file,
  }
  myBucket.putObject(params)
    .on('httpUploadProgress', (evt) => {

      progress(Math.round((evt.loaded / evt.total) * 100));
    })
    .send((err,data) => {
      if (err) {
        console.log(err)
      }
        success(`${folder}/${file.name}`);
    })
}

// class S3Uploader extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {selectedFile: '',progress:""};
//
//     AWS.config.update({
//       accessKeyId: 'AKIA5GLSIIS4NFKWWLGC',
//       secretAccessKey: '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'
//     })
//
//     this.myBucket = new AWS.S3({
//       params: {Bucket: 'cyndi.primary.bucket'},
//       region: 'ap-south-1',
//     })
//
//   }
//
//     uploadFile(file,folder,cb){
//     const params = {
//       ACL: 'public-read',
//       Key: `${folder}/${file.name}`,
//       ContentType: file.type,
//       Body: file,
//     }
//     this.myBucket.putObject(params)
//       .on('httpUploadProgress', (evt) => {
//         this.setState({
//           progress: Math.round((evt.loaded / evt.total) * 100),
//         })
//         cb(Math.round((evt.loaded / evt.total) * 100));
//       })
//       .send((err) => {
//         if (err) {
//           console.log(err)
//         }
//       })
//   }
//
//   onFileChange = event => {
//     // this.setState({selectedFile: event.target.files[0]});
//     // this.uploadFile(event.target.files[0]);
//
//     awsUpload(event.target.files[0],"NewFolder",(progress)=>{
//       console.log(progress)
//     })
//   };
//
//
//   render() {
//     return (
//       <div>
//         <input
//           onChange={this.onFileChange.bind(this)}
//           type="file"/>
//         {/*<CircularProgress variant="determinate" value={this.state.progress} />*/}
//         {/*{this.state.progress=="100"?<div>Uploaded</div>:<div></div>}*/}
//
//       </div>
//     );
//   }
//
// };

export default S3Uploader;
