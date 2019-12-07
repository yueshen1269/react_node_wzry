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
// const CLEAR_CATEGORY_ITEM = "CLEAR_CATEGORY_ITEM";

const editCategory = () => ({
  type: EDIT_CATEGORY,
});
const editCategorySuccess = (newCategory) => ({
  type: EDIT_CATEGORY_SUCCESS,
  newCategory,
});
const editCategoryFail = (err) => ({
  type: EDIT_CATEGORY_FAIL,
  err,
});
const fetchCategories = () => ({
  type: FETCH_CATEGORIES,
});
const fetchCategoriesSuccess = (categories) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  categories,
});
const fetchCategoriesFail = (err) => ({
  type: FETCH_CATEGORIES_FAIL,
  err,
});
const setCategoryItem = (item) => ({
  type: SET_CATEGORY_ITEM,
  item,
});
// const clearCategoryItem = () => ({
//   type: CLEAR_CATEGORY_ITEM,
//   item: {},
// });
const fetchCategoryByIDAction = (id) => async (dispatch, getState) => {
  const categories = getState().categoryState;
  const category =  categories.items.find(category => category._id === id) || {};
  console.log("id^^^",category);
  dispatch(setCategoryItem(category));
}

const fetchCategoriesAction = () => async dispatch => {
  dispatch(fetchCategories());
  dispatch(setCategoryItem({}));
  const [err, categories] = await to(Request.axios('get', '/rest/categories'));
  if(err) {
    return dispatch(fetchCategoriesFail(err));
  }
  if(categories) {
    return dispatch(fetchCategoriesSuccess(categories));
  }
};

const addAndUpdateCategoryAction = (values, id) => async dispatch => {
  dispatch(editCategory());
  let res, err;
  if(id) {
    [err, res] = await to(Request.axios('put', `/rest/categories/${id}`, values));
  } else {
    [err, res] = await to(Request.axios('post', '/rest/categories', values));
  }
  if(err) {
    return dispatch(editCategoryFail(err));
  }
  if(res) {
    dispatch(editCategorySuccess(res));
    dispatch(fetchCategoriesAction());
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
  fetchCategoriesAction,
  fetchCategoryByIDAction,
  addAndUpdateCategoryAction,
  SET_CATEGORY_ITEM,
  setCategoryItem,
}
