import moment from 'moment';
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

function usersKey(id1,id2){
  if(id1>id2){
    return `${process.env.REACT_APP_KEY_PART}${id2}_${id1}`
  }
  else{
    return `${process.env.REACT_APP_KEY_PART}${id1}_${id2}`
  }
}

function classKey(id){
    return `EncryptMessages${id}`//${process.env.REACT_APP_KEY_PART}
}

function getTodaysDate(){
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();
  return(`${dd}-${mm}-${yyyy}`);
}
function getCurrentTime(){
  return(moment().format('LT'));
}

export {apiEndPoint, s3Bucket, s3Region, s3URL, s3config,usersKey,classKey,getTodaysDate,getCurrentTime};

