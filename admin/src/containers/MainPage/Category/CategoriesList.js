import {connect} from "react-redux"
import {withRouter} from "react-router-dom"

import CategoriesList from "@/components/Category/CategoriesList_hooks"
import {handleEditAction, handleDeleteAction, fetchCategoriesFromStoreAction} from "./CategoryAction"

const mapStateToProps = (state) => ({
  categoryState: state.categoryState,
});

const mapDispatchToProps = (dispatch) => ({
  handleEdit(...args) {
    dispatch(handleEditAction(...args));
  },
  handleDelete(...args) {
    dispatch(handleDeleteAction(...args));
  },
  fetchCategoriesFromStore(...args) {
    dispatch(fetchCategoriesFromStoreAction(...args));
  },
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoriesList));
