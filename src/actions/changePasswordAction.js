import axios from "../helpers/axios";

const changePasswordAction = (payload)=>{

  return async (dispatch)=>{

    const res = await axios.post('/change/password',{
      ...payload
    })
    console.log(res);
    if(res.status ===200){
    console.log("Password changed");

    }else{
      console.log(res)
    }
  }
}

export default changePasswordAction
