import React, { Component } from "react"
import { connect} from "react-redux"
import {Route, Redirect} from 'react-router-dom';

export default function(ComposedComponent) {
  class RequireAuth extends Component {

    // componentWillMount() {
    //   if(this.props.session.isLogged) {
    //     this.logged = true;
    //   } else {
    //     this.logged = false;
    //   }
    // }
    // componentWillUpdate(nextProps) {
    //   if(nextProps.session.isLogged) {
    //     this.logged = true;
    //   } else {
    //     this.logged = false;
    //   }
    // }

    // componentWillUpade(nextProps) {
    //   if(nextProps.session.isLogged) {
    //     this.logged = true;
    //   } else {
    //     this.logged = false;
    //   }
    // }

    render() {
      console.log("session.isLogged", this.props.session.isLogged, this.logged);
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
