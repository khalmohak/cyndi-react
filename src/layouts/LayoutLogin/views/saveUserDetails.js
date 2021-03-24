import axios from "axios";
import {apiEndPoint} from "../../../constants";

export async function userDetails() {
  let headers = {

    'user_id': sessionStorage.getItem('userId'),
    'x-access-token': sessionStorage.getItem('token')
  };

  let data = {
    'role': sessionStorage.getItem('userRole')
  }
  axios.post(`${apiEndPoint}/get/role/details`, data, {
    headers: headers
  }).then((response) => {
    sessionStorage.setItem('universityName', response.data[0].university_name);
    sessionStorage.setItem('collegeName', response.data[0].college_name);
    sessionStorage.setItem('userYear', response.data[0].year);
    sessionStorage.setItem('userCourse', response.data[0].course);
    sessionStorage.setItem('userSemester', response.data[0].semester);
  })
    .catch(err => {
      console.log(err);
    })
}
