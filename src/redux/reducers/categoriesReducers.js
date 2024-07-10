// categoriesReducers.js
import {
    GET_CATEGORIES_PRODUCT_REQUEST,
    GET_CATEGORIES_PRODUCT_SUCCESS,
    GET_CATEGORIES_PRODUCT_FAILURE,
  } from '../actions/categoriesActions';
  
  const initialState = {
    loading: false,
    data: null,
    error: null,
  };
  
  
  const categoriesReducers = (state = initialState, action) => {
    switch (action.type) {
      case GET_CATEGORIES_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case GET_CATEGORIES_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
      case GET_CATEGORIES_PRODUCT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };

export default categoriesReducers