
import React from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"

import CategoryEdit from "@/components/Category/CategoryEdit"
import {fetchCategoryByIDAction, fetchAndSaveCategoriesAction, addAndUpdateCategoryAction} from "./CategoryAction"
const mapStateToProps = (state) => ({
  categoryState: state.categoryState,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategoryByID(...args) {
    dispatch(fetchCategoryByIDAction(...args));
  },
  fetchCategories(...args) {
    dispatch(fetchAndSaveCategoriesAction(...args));
  },
  addAndUpdateCategory(...args) {
    dispatch(addAndUpdateCategoryAction(...args));
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryEdit));
