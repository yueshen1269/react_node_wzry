import Request from "../../utils/request"
import to from 'await-to-js';
import customHistory from "../../history"
import {
  fetchStart,
  fetchEndWithFailure,
  fetchEndWithSuccess,
  FETCH_POSTS_SUCCESS,
} from "../../redux/actions"

const UNAUTH_USER = "UNAUTH_USER";

const LOGIN_LOGIN = "LOGIN_LOGIN";
const LOGIN_LOGIN_SUCCESS = "LOGIN_LOGIN_SUCCESS";
const LOGIN_LOGIN_FAIL = "LOGIN_LOGIN_FAIL";


const loginAction = (params = {}) => async dispatch => {
  const {username, password, from} = params;
  if(username && password) {
    dispatch(loginLogin());
    const [ err, res ] = await to(Request.axios('post', '/login', {username, password}));
    if(err) {
      return dispatch(loginLoginFail(err));
    }
    if(res) {
      dispatch(loginLoginSuccess(res));
      localStorage.setItem("token", res.token);
      if(from) {
        customHistory.push(from)
      } else {
        customHistory.push("/");
      }
    }
  }
}

const loginLogin = () => ({
  type: LOGIN_LOGIN
});

const loginLoginSuccess = (res) => ({
  type: LOGIN_LOGIN_SUCCESS,
  res
});

const loginLoginFail = (err) => ({
  type: LOGIN_LOGIN_FAIL,
  err
});

const validateAuthFailed = (from = "/") => ({
  type: UNAUTH_USER,
  from
})

export {
  UNAUTH_USER,
  LOGIN_LOGIN,
  LOGIN_LOGIN_FAIL,
  LOGIN_LOGIN_SUCCESS,
  loginAction,
  validateAuthFailed,
  loginLogin,
  loginLoginFail,
  loginLoginSuccess,
}
