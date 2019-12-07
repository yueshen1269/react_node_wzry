
import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"

import CategoryEdit from "../../../components/Category/CategoryEdit"
import {fetchCategoryByIDAction, fetchCategoriesAction, addAndUpdateCategoryAction} from "./CategoryEditAction"
const mapStateToProps = (state) => ({
  categoryState: state.categoryState,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategoryByIDDispatch(...args) {
    dispatch(fetchCategoryByIDAction(...args));
  },
  fetchCategoriesDispatch(...args) {
    dispatch(fetchCategoriesAction(...args));
  },
  addAndUpdateCategoryDispatch(...args) {
    dispatch(addAndUpdateCategoryAction(...args));
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryEdit));
