import {miscConstants} from "../constants/ActionsConstants";

const initState = {
  token:"",
  checkPassword:false,
  passwordValidated:false
}

const miscReducer=  (state = initState, action) => {

  switch(action.type){
    case miscConstants.ADD_TOKEN:
      state = {
        ...state,
        token: action.payload.token
      }
      break;
    case miscConstants.CHECK_PASSWORD:
      state.checkPassword = true;
      break;
    case miscConstants.PASSWORD_VALIDATE:
      state.passwordValidated = true;
      break;
    

    default :state={...state}
  }

  return state;
}
export default miscReducer
