import {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAIL,
  EDIT_CATEGORY,
  EDIT_CATEGORY_SUCCESS,
  EDIT_CATEGORY_FAIL,
  SET_CATEGORY_ITEM,
} from "./CategoryEditAction"

const categoryObj = {
  isLoading: true,
  items: [],
  err: null,
  item: {},
  newItem: {},
  edit: false,
};


const categoryReducer = (state = categoryObj, action) => {
  switch(action.type) {
    case FETCH_CATEGORIES :
      return {...state, isLoading: true};
    case EDIT_CATEGORY :
      return {...state, edit: true};
    case EDIT_CATEGORY_FAIL :
      return {...state, edit: false, err: action.err};
    case EDIT_CATEGORY_SUCCESS :
      return {...state, edit: false, newItem: action.newCategory};
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

export default categoryReducer;
