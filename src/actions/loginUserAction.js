import axios from "../helpers/axios";
import {loginConstants, miscConstants} from "../constants/ActionsConstants";

function setter(res){
  sessionStorage.setItem('token',res.data.token)
  sessionStorage.setItem('userId', res.data.id);
  sessionStorage.setItem('userName', res.data.name);
  sessionStorage.setItem('userEmail', res.data.email);
  sessionStorage.setItem('userPhone', res.data.phone_no);
  if (!res.data.photo_url) {
    sessionStorage.setItem('userPhoto', 'null');
  } else {
    sessionStorage.setItem('userPhoto', res.data.photo_url);
  }
  sessionStorage.setItem('token', res.data.token);
  sessionStorage.setItem('firebaseToken', res.data.firebase_auth_token);
  sessionStorage.setItem('userDOB', res.data.dob);
  sessionStorage.setItem('userRole', res.data.role);
  sessionStorage.setItem('loggedIn', true);
};

const loginUserAction = (user)=>{

  return async (dispatch)=>{

    dispatch({
      type:loginConstants.LOGIN_REQUEST
    })

    const res = await axios.post('/login',{
      ...user
    })
    console.log(res)

    if(res.status ===200){
      if(res.data.auth){
        setter(res);
        dispatch({
          type:miscConstants.ADD_TOKEN,
          payload:{
            token:res.data.token
          }
        })
        dispatch({
          type:loginConstants.LOGIN_SUCCESS
        })
      }else{
        dispatch({
          type:loginConstants.LOGIN_FAILURE
        })
      }

    }else{
        dispatch({
          type:loginConstants.LOGIN_FAILURE
        })


    }


  }

}

export default loginUserAction
