import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import * as serviceWorker from './serviceWorker';
import Register from "./containers/RegisterPage"
import Login from "./containers/LoginPage"
import Main from "./containers/MainPage"
import { Provider } from "react-redux";
import store from "./redux/store"
import Request from "./utils/request"


ReactDOM.render((
  <Provider store={store}>
     <Router>
      <Switch>
        <Route path="/register" exact component={Register}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route component={Main}></Route>
      </Switch>
    </Router>
  </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

Request.axiosConfigInit();
