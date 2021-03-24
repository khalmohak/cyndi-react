import {combineReducers} from 'redux'
import userReducer from './user.reducer';
import miscReducer from './misc.reducer';

const rootReducer = combineReducers({
  user:userReducer,
  misc:miscReducer,

})

export default rootReducer
