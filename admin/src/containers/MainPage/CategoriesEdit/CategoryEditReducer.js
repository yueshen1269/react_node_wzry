import {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAIL,
  fetchCategoryByIDAction,
  fetchCategoriesAction,
  SET_CATEGORY_ITEM,
  setCategoryItem,
} from "./CategoryEditAction"

const categoryObj = {
  isLoading: true,
  items: [],
  err: null,
  item: {},
};


const categoryState = (state = categoryObj, action) => {
  switch(action.type) {
    case FETCH_CATEGORIES :
      return {...state, isLoading: true};
    case FETCH_CATEGORIES_SUCCESS :
      return {...state, isLoading: false, items: action.categories};
    case FETCH_CATEGORIES_FAIL :
      return {...state, isLoading: false, err: action.err};
    case SET_CATEGORY_ITEM :
      return {...state, item: action.item};
    default:
      return state;
  }
}

export default categoryState;
