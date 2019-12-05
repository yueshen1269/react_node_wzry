
import { combineReducers } from "redux"
import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_SUCCESS,
  fetchStart,
  fetchEndWithFailure,
  fetchEndWithSuccess,
} from "./actions"

import auth from "../containers/LoginPage/LoginReducer"

const requestObj = {
  loading: false,
  response: null,
  err: null,
  code: 200,
}

function request(state = requestObj, action) {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return {...requestObj, loading: true};
    case FETCH_POSTS_FAILURE:
      return {...requestObj, error: action.error, loading: false};
    case FETCH_POSTS_SUCCESS:
      return {...requestObj, response: action.response, loading: false};
    default:
      return state;
  }
}






export default combineReducers({
  request,
  auth,
})
