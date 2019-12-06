
import { combineReducers } from "redux"
import {
  OFFLINE_MESSAGE,
  showOfflineMessageAction,
  canShowOffline,
} from "./actions"

import auth from "../containers/LoginPage/LoginReducer";
import categoryState from "../containers/MainPage/CategoriesEdit/CategoryEditReducer";

const messageObj = {
  offline: false,
}

function message(state = messageObj, action) {
  switch (action.type) {
    case OFFLINE_MESSAGE:
      return {...messageObj, offline: true};

    default:
      return state;
  }
}






export default combineReducers({
  message,
  auth,
  categoryState,
})
