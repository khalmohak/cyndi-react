import axios from "axios";
import store from "../store";
const api = "http://cyndi-backend.ap-south-1.elasticbeanstalk.com:4000";

const token = window.localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL : api,
  headers:{
    "x-access-token": token ? `Bearer ${token}` : ""
  }

})

axiosInstance.interceptors.request.use((req) => {
  const token = store.getState().misc;

  if(token.token){
    req.headers['x-access-token'] = `Bearer ${token.token}`;
  }
  return req;
})

axiosInstance.interceptors.response.use((res) => {
  return res;
}, (error) => {

  console.log(error.response);
  const status = error.response ? error.response.status : 500;
  if(status && status === 500){
    localStorage.clear();
    //store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
  }
  return error.response;
  //return Promise.reject(error);
})

export default axiosInstance;
