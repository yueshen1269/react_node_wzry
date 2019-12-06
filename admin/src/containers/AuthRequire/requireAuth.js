import React, { Component } from "react"
import { connect} from "react-redux"
import {Route, Redirect} from 'react-router-dom';
import MainPage from "../MainPage"

export default function(ComposedComponent) {
  class RequireAuth extends Component {

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
