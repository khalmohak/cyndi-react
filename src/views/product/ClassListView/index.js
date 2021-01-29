import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core';
import {apiEndPoint} from "../../../constants";
import axios from 'axios';
import ClassListGenerator from "./classCardComponentGenerator";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  classCard: {
    height: '100%'
  }
}));



export class ClassList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      classData:"",



    };
  };

   headers = {
    'user_id': sessionStorage.getItem('userId'),
    'x-access-token': sessionStorage.getItem('token')
  };
   ApiData = {
    university_name: sessionStorage.getItem('universityName'),
    college_name: sessionStorage.getItem('collegeName'),
    year: sessionStorage.getItem('userYear'),
    course: sessionStorage.getItem('userCourse')
  };

   getClassData (){
    axios.post(`${apiEndPoint}/get/class/student`, this.ApiData, {
      headers: this.headers
    }).then(response => {
      const classArray = response.data;
      this.setState({
        classData:classArray
      })
      console.log(this.state.classData);
    })
      .catch(err => {
        console.log(err)
      })
  }
  componentDidMount(){
    this.getClassData();
  }
  render(){


    return (
      <>
        <ClassListGenerator classArrayData={this.state.classData}/>
      </>
    )
  }
}

//
// const ClassList = () => {
//   const classes = useStyles();
//   const [classData, setClassData] = useState();
//   const headers = {
//     'user_id': sessionStorage.getItem('userId'),
//     'x-access-token': sessionStorage.getItem('token')
//   };
//   const ApiData = {
//     university_name: sessionStorage.getItem('universityName'),
//     college_name: sessionStorage.getItem('collegeName'),
//     year: sessionStorage.getItem('userYear'),
//     course: sessionStorage.getItem('userCourse')
//   };
//
//
//   const getClassData = () => {
//     axios.post(`${apiEndPoint}/get/class/student`, ApiData, {
//       headers: headers
//     }).then(response => {
//       const classArray = response.data;
//       setClassData(classArray);
//     })
//       .catch(err => {
//         console.log(err)
//       })
//   }
//
//   useEffect(() => {
//     getClassData();
//   }, []);
//
//
//   return (
//     <>
//       <ClassListGenerator classArrayData={classData}/>
//     </>
//   )
// };

export default ClassList;
