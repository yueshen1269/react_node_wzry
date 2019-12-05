import Request from "../../utils/request"
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


const login = (params = {}) => async dispatch => {
  const {username, password, from} = params;
  if(username && password) {
    dispatch(loginLogin());
    const res = await Request.axios("post", "/login", {username, password});
    try {
      if(res) {
        dispatch(loginLoginSuccess(res));
        localStorage.setItem("token", res.token);
        if(from) {
          _history.push(from)
        } else {
          _history.push("/");
        }
      } else {

      }
    } catch(e) {
        dispatch(loginLoginFail(e));
      }
  }
}

const loginLogin = () => ({
  type: LOGIN_LOGIN
});

const loginLoginSuccess = (res) => ({
  type: LOGIN_LOGIN,
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
  login,
  validateAuthFailed,
  loginLogin,
  loginLoginFail,
  loginLoginSuccess,
}
