
import { combineReducers } from "redux"

function session( state = {isLogged: true}, action) {
  if(action.type === "UNAUTH_USER") {
    state.isLogged = false;
  } else if(action.type === "LOGIN_SUCCESSFULLY") {
    state.isLogged = true;
  }
  return state;
}







export default combineReducers({
  session,
})
