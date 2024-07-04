import {
    FETCH_SINGLE_PRODUCT_REQUEST,
    FETCH_SINGLE_PRODUCT_SUCCESS,
    FETCH_SINGLE_PRODUCT_FAILURE
  } from '../actions/productActions';
  
  const initialState = {
    loading: false,
    product: null,
    error: null
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SINGLE_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case FETCH_SINGLE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          product: action.payload,
          error: null
        };
      case FETCH_SINGLE_PRODUCT_FAILURE:
        return {
          ...state,
          loading: false,
          product: null,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default productReducer;
  