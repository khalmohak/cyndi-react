import {forgotPasswordConstants, loginConstants, registerConstants} from "../constants/ActionsConstants";

const initState = {
  error: null,
  message: '',
  loading: false,
  done: false,
  failed: false,
  otp: "",
  ifUserExistForForgotPassword: null,
  ifOTPMatched: false,
  name: null,
  dob: null,
  role: null,
  phone: null,
  email: null,
  regErrorExist: null,
  regErrorFailed: null,
  regSuccess:false
}

const userReducer = (state = initState, action) => {

  switch (action.type) {
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
        done: true
      }
      break;
    case loginConstants.LOGIN_FAILURE:
      state = {
        ...state,
        loading: false,
        done: false,
        error: "Username or Password is incorrect",
        failed: true
      }
      break;
    case forgotPasswordConstants.FORGOT_PASSWORD_IF_EXIST:
      state = {
        ...state,
        ifUserExistForForgotPassword: true
      }
      break;
    case registerConstants.SEND_MAIL_OTP:
      state.otp = action.payload.otp
      break;
    case registerConstants.SET_OTP_MATCHED:
      state.ifOTPMatched = true
      break;
    case registerConstants.SET_NAME:
      state.name = action.payload
      break;
    case registerConstants.SET_DOB:
      state.dob = action.payload
      break;
    case registerConstants.SET_ROLE:
      state.role = action.payload
      break;
    case registerConstants.SET_PHONE:
      state.phone = action.payload
      break;
    case registerConstants.SET_EMAIL:
      state.email = action.payload
      break;
    case registerConstants.SET_REG_ERROR_EXIST:
      state.regErrorExist = true
      break;
    case registerConstants.SET_REG_ERROR_FAILED:
      state.regErrorFailed = true
      break;
    case registerConstants.SET_REG_SUCCESS:
      state.regSuccess = true
      break;
    default :
      state = {...state}
  }

  return state;
}
export default userReducer
