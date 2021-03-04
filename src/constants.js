const apiEndPoint = "http://cyndi-backend.ap-south-1.elasticbeanstalk.com:4000";
const s3Region = `ap-south-1`;
const s3Bucket = `cyndi.primary.bucket`;
const s3URL = (key) => {
  return `https://s3.${s3Region}.amazonaws.com/${s3Bucket}/${key}`;
}
const s3config = {
  bucketName: 'cyndi.primary.bucket',
  dirName: 'Activity/',
  region: 'ap-south-1',
  accessKeyId: 'AKIA5GLSIIS4NFKWWLGC',
  secretAccessKey: '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',
};

function key(id1,id2,partKey){
  if(id1>id2){
    return `${partKey}${id2}_${id1}`
  }
  else{
    return `${partKey}${id1}_${id2}`
  }
}

export {apiEndPoint, s3Bucket, s3Region, s3URL, s3config,key};

