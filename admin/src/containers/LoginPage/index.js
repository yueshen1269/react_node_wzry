import React, { Component } from "react"
import { connect } from 'react-redux';
import {
  withRouter,
} from 'react-router-dom';
import Login from "../../components/login/index_hooks"
import {loginAction} from "./LoginAction"

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  login(...args) {
    dispatch(loginAction(...args));
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
