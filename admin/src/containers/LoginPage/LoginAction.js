import Request from "../../utils/request"
import {
  fetchStart,
  fetchEndWithFailure,
  fetchEndWithSuccess,
  FETCH_POSTS_SUCCESS,
} from "../../redux/actions"

const UNAUTH_USER = "UNAUTH_USER";
const LOG_IN = "LOG_IN";

const login = (params = {}) => async dispatch => {
  const {username, password, from} = params;
  if(username && password) {
    dispatch(fetchStart());
    const res = await Request.axios("post", "/login", {username, password});
    if(res) {
      dispatch(FETCH_POSTS_SUCCESS(res));
      localStorage.setItem("token", res.token);
      const _history = this.props.history;
      const _location = this.props.location;
      if(_location.state) {
        _history.push(_location.state.from)
      } else {
        _history.push("/");
      }
    } else {

    }
  }
}

const validateAuthFailed = (from = "/") => ({
  type: UNAUTH_USER,
  from
})

export {
  UNAUTH_USER,
  LOG_IN,
  login,
  validateAuthFailed,
}
