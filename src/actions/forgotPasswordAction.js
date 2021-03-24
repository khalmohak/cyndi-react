import axios from "../helpers/axios";
import {forgotPasswordConstants, loginConstants, miscConstants} from "../constants/ActionsConstants";
import store from "../store";


const forgotPasswordAction = (payload)=>{

  return async (dispatch)=>{

    const res = await axios.post('/check/user/existence',{
      ...payload
    })

    if(res.status ===200){
      dispatch({
        type:forgotPasswordConstants.FORGOT_PASSWORD_IF_EXIST
      })


    }else{
      console.log(res)
    }
  }
}

export default forgotPasswordAction
