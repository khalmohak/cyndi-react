import React from "react";
import {
    Input,
    Button
  } from '@material-ui/core';

function FileUpload() {

  const [file, setFile] = React.useState("");

  function handleUpload(event) {
    setFile(event.target.files[0]);


  }
  function handleUploadRemove() {
    setFile(null);


  }

  return (
    <div id="upload-box">
      <Input type="file" onChange={handleUpload} />
      <p>Filename: {file.name}</p>
      <p>File type: {file.type}</p>
      <p>File size: {file.size} bytes</p>
      
      {/* {file && <ImageThumb image={file} />} */}
      {/* <Button onClick={handleUploadRemove}>Remove</Button> */}
    </div>
  );
}


// const ImageThumb = ({ image }) => {
//   return <img src={URL.createObjectURL(image)} alt={image.name} />;
// };


export default function App() {
  return <FileUpload />;
}
