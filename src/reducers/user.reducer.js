import {forgotPasswordConstants, loginConstants} from "../constants/ActionsConstants";

const initState = {
  error: null,
  message: '',
  loading: false,
  done:false,
  failed:false,
  otp:"",
  ifUserExistForForgotPassword:null
}

const userReducer=  (state = initState, action) => {

  switch(action.type){
    case loginConstants.LOGIN_REQUEST:
      state = {
        ...state,
        loading: true
      }

      break;
    case loginConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        loading: false,
        done:true
      }
      break;
    case loginConstants.LOGIN_FAILURE:
      state = {
        ...state,
        loading: false,
        done:false,
        error:"Username or Password is incorrect",
        failed: true
      }
      break;
    case forgotPasswordConstants.FORGOT_PASSWORD_IF_EXIST:
      state = {
        ...state,
        ifUserExistForForgotPassword: true
      }
      break;
    default :state={...state}
  }

  return state;
}
export default userReducer
