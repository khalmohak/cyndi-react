import axios from "../helpers/axios";
import {registerConstants} from "../constants/ActionsConstants";
import store from "../store";


const registerUserAction = (info)=>{

  return async (dispatch)=>{

    const res = await axios.post('/email/otp',{
      ...info
    })

    if(res.status ===200){
      dispatch({
        type:registerConstants.SEND_MAIL_OTP,
        payload:res.data
      })



    }else{
      console.log(res)
    }
  }
}

export default registerUserAction
