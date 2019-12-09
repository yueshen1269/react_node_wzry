import Request from "../../../utils/request"
import to from 'await-to-js';
import customHistory from "../../../history"

const FETCH_CATEGORIES = "FETCH_CATEGORIES";
const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS";
const FETCH_CATEGORIES_FAIL = "FETCH_CATEGORIES_FAILS";

const EDIT_CATEGORY = "EDIT_CATEGORY";
const EDIT_CATEGORY_SUCCESS = "EDIT_CATEGORY_SUCCESS";
const EDIT_CATEGORY_FAIL = "EDIT_CATEGORY_FAIL";
const SET_CATEGORY_ITEM = "SET_CATEGORY_ITEM";

const MODIFY_CATEGORY = "MODIFY_CATEGORY";
const DELETE_CATEGORY = "DELETE_CATEGORY";

const editCategoryAction = (id) => dispatch => ({
  type: EDIT_CATEGORY,
  id,
});

const deleteCategoryAction = (id) => dispatch => ({
  type: DELETE_CATEGORY,
  id,
});

const fetchCategoriesFromStoreAction = () => (dispatch, getState) => {
  const categoryState = getState().categoryState;
  if(categoryState.items.length) {
    return true;
  }
  dispatch(fetchAndSaveCategoriesAction());
  return true;
};

const handleEditAction = (id) => (dispatch) => {
  dispatch(modifyCategoryAction());
  customHistory.push(`/categories/edit/${id}`)
};

const handleDeleteAction = (id) => async (dispatch) => {
  dispatch(deleteCategoryAction());
  const [err, res] = await to(Request.axios('delete', `/rest/categories/${id}`));
  if(err) return;
  if(res) {
    dispatch(fetchAndSaveCategoriesAction());
  }
};

const modifyCategoryAction = () => ({
  type: MODIFY_CATEGORY,
});
const editCategorySuccessAction = (newCategory) => ({
  type: EDIT_CATEGORY_SUCCESS,
  newCategory,
});
const editCategoryFailAction = (err) => ({
  type: EDIT_CATEGORY_FAIL,
  err,
});
const fetchCategoriesAction = () => ({
  type: FETCH_CATEGORIES,
});
const fetchCategoriesSuccessAction = (categories) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  categories,
});
const fetchCategoriesFailAction = (err) => ({
  type: FETCH_CATEGORIES_FAIL,
  err,
});
const setCategoryItemAction = (item) => ({
  type: SET_CATEGORY_ITEM,
  item,
});

const fetchCategoryByIDAction = (id) => async (dispatch, getState) => {
  const categories = getState().categoryState;
  const category =  categories.items.find(category => category._id === id) || {};
  console.log("id^^^",category);
  dispatch(setCategoryItemAction(category));
}

const fetchAndSaveCategoriesAction = () => async dispatch => {
  dispatch(fetchCategoriesAction());
  dispatch(setCategoryItemAction({}));
  const [err, categories] = await to(Request.axios('get', '/rest/categories'));
  if(err) {
    return dispatch(fetchCategoriesFailAction(err));
  }
  if(categories) {
    return dispatch(fetchCategoriesSuccessAction(categories));
  }
};

const addAndUpdateCategoryAction = (values, id) => async dispatch => {
  dispatch(editCategoryAction());
  let res, err;
  if(id) {
    [err, res] = await to(Request.axios('put', `/rest/categories/${id}`, values));
  } else {
    [err, res] = await to(Request.axios('post', '/rest/categories', values));
  }
  if(err) {
    return dispatch(editCategoryFailAction(err));
  }
  if(res) {
    dispatch(editCategorySuccessAction(res));
    dispatch(fetchAndSaveCategoriesAction());
    customHistory.push("/categories/list");
  }
}

export {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAIL,
  EDIT_CATEGORY,
  EDIT_CATEGORY_SUCCESS,
  EDIT_CATEGORY_FAIL,
  SET_CATEGORY_ITEM,
  fetchAndSaveCategoriesAction,
  fetchCategoryByIDAction,
  addAndUpdateCategoryAction,
  handleEditAction,
  handleDeleteAction,
  fetchCategoriesFromStoreAction,
}
