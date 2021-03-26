import axios from "../helpers/axios";
import {miscConstants} from "../constants/ActionsConstants";

const checkPasswordAction = (user)=>{

  return async (dispatch)=>{


    const res = await axios.post('/login',{
      ...user
    })

    console.log(res)

    if(res.status ===200){
      dispatch({
        type:miscConstants.CHECK_PASSWORD
      })


    }else{

    }
  }
}

export default checkPasswordAction;
