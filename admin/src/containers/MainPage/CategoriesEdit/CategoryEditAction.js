import Request from "../../../utils/request"
import to from 'await-to-js';
import customHistory from "../../../history"

const FETCH_CATEGORIES = "FETCH_CATEGORIES";
const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES";
const FETCH_CATEGORIES_FAIL = "FETCH_CATEGORIES";
const SET_CATEGORY_ITEM = "SET_CATEGORY_ITEM";

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
const fetchCategoryByIDAction = (id) => async (dispatch, getState) => {
  const categories = getState().category;
  const category =  categories.items.find(category => category.id === id);
  dispatch(setCategoryItem(category));
}

const fetchCategoriesAction = () => async dispatch => {
  dispatch(fetchCategories());
  const [err, categories] = await to(Request.axios('get', '/rest/categories'));
  if(err) {
    return dispatch(fetchCategoriesFail(err));
  }
  if(categories) {
    return dispatch(fetchCategoriesSuccess(categories));
  }
};

const addAndUpdateCategoryAction = (values, id) => async dispatch => {
  dispatch(fetchCategories());
  let res, err;
  if(id) {
    [err, res] = await to(Request.axios('put', `/rest/categories/${id}`, values));
  } else {
    [err, res] = await to(Request.axios('post', '/rest/categories', values));
  }
  if(err) {
    return dispatch(fetchCategoriesFail(err));
  }
  if(res) {
    return dispatch(fetchCategoriesAction());
  }
}

export {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAIL,
  fetchCategoriesAction,
  fetchCategoryByIDAction,
  addAndUpdateCategoryAction,
  SET_CATEGORY_ITEM,
  setCategoryItem,
}
