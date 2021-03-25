import axios from "../helpers/axios";
import {loginConstants, registerConstants} from "../constants/ActionsConstants";



const registerAPICallAction = (data)=>{

  return async (dispatch)=>{

    dispatch({
      type:loginConstants.LOGIN_REQUEST
    })

    const res = await axios.post('/register/user',{
      ...data
    })
    console.log(res);
    if(res.status ===200){
      dispatch({
        type:registerConstants.SET_REG_SUCCESS
      })

    }else{
      dispatch({
        type:registerConstants.SET_REG_ERROR_FAILED
      })
    }


  }

}

export default registerAPICallAction
