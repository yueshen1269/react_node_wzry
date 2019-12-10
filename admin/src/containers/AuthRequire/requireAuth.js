import React, { Component } from "react"
import { connect} from "react-redux"
import {Route, Redirect} from 'react-router-dom';
import { message} from "antd"

export default function(ComposedComponent) {
  class RequireAuth extends Component {
    componentWillMount() {
      console.log("token:",window.localStorage.getItem("token"));
      (!window.localStorage.getItem("token")) && message.info("请先登录");
    }
    render() {
      return (
        (!window.localStorage.getItem("token")) ? <Redirect to={{
          pathname: "/login",
          state: {from: this.props.location.pathname},
        }} /> :
        <ComposedComponent {...this.props} />
      )
    }
  }

  function mapStateToProps(state) {
    return {session: state.session};
  }

  return connect(mapStateToProps)(RequireAuth);
}
