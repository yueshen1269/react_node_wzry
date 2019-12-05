import {
  UNAUTH_USER,
  LOG_IN,
  LOGIN_LOGIN,
  LOGIN_LOGIN_FAIL,
  LOGIN_LOGIN_SUCCESS,
  login,
  validateAuthFailed,
  loginLogin,
  loginLoginFail,
  loginLoginSuccess,
} from "./LoginAction"

const authObj = {
  isloading: false,
  res: null,
  err: null,
  // code: 200,
  fromPage: "/",
  isLogged: false,
}

function auth(state = authObj, action) {
  switch(action.type) {
    case LOGIN_LOGIN:
      return {...authObj, isloading: true};
    case LOGIN_LOGIN_SUCCESS:
      return {...authObj, isloading: false, res: action.res, isLogged: true};
    case LOGIN_LOGIN_FAIL:
      return {...authObj, isloading: false, err: action.err};
    case UNAUTH_USER:
      return {...authObj, isLogged: false,};
    default:
      return authObj;
  }
}


export default auth;
