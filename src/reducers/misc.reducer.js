import {miscConstants} from "../constants/ActionsConstants";

const initState = {
  token:""
}

const miscReducer=  (state = initState, action) => {

  switch(action.type){
    case miscConstants.ADD_TOKEN:
      state = {
        ...state,
        token: action.payload.token
      }

      break;
    
      break;
    default :state={...state}
  }

  return state;
}
export default miscReducer
