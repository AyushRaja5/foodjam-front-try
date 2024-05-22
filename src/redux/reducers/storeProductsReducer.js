// storeProductsReducer.js
import {
    FETCH_STORE_PRODUCT_REQUEST,
    FETCH_STORE_PRODUCT_SUCCESS,
    FETCH_STORE_PRODUCT_FAILURE,
  } from '../actions/storeProductsActions';
  
  const initialState = {
    loading: false,
    storeProducts: [],
    error: null,
  };
  
  const storeProductsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_STORE_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_STORE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          storeProducts: action.payload,
        };
      case FETCH_STORE_PRODUCT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
          storeProducts: [],
        };
      default:
        return state;
    }
  };
  
  export default storeProductsReducer;
  