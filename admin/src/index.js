import React from "react"
import ReactDOM from "react-dom"
import {
  // BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom"
import { Router } from "react-router"
import * as serviceWorker from "./serviceWorker";
import Register from "./containers/RegisterPage"
import LoginPage from "./containers/LoginPage"
import Main from "./containers/MainPage"
import { Provider } from "react-redux";
import store from "./redux/store"
import Request from "./utils/request"
import AuthRequire from "./containers/AuthRequire/requireAuth"
import customHistory from "./history"

Request.axiosConfigInit(store);

ReactDOM.render((
  <Provider store={store}>
     <Router history={customHistory}>
      <Switch>
        <Route path="/register" exact component={Register}></Route>
        <Route path="/login" exact component={LoginPage}></Route>
        <Route component={AuthRequire(Main)}></Route>
      </Switch>
    </Router>
  </Provider>
), document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
