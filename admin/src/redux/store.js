import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import combineReducers from "./reducers.js"

const store = createStore(combineReducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;
