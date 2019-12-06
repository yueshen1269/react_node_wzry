import {
  UNAUTH_USER,
  LOG_IN,
  LOGIN_LOGIN,
  LOGIN_LOGIN_FAIL,
  LOGIN_LOGIN_SUCCESS,
  loginAction,
  validateAuthFailed,
  loginLogin,
  loginLoginFail,
  loginLoginSuccess,
} from "./LoginAction"

const authObj = {
  isLoading: false,
  res: null,
  err: null,
  // code: 200,
  fromPage: "/",
  isLogged: false,
}

function auth(state = authObj, action) {
  switch(action.type) {
    case LOGIN_LOGIN:
      return {...state, isLoading: true};
    case LOGIN_LOGIN_SUCCESS:
      return {...state, isLoading: false, res: action.res, isLogged: true};
    case LOGIN_LOGIN_FAIL:
      return {...state, isLoading: false, err: action.err};
    case UNAUTH_USER:
      return {...state, isLogged: false,};
    default:
      return state;
  }
}


export default auth;
