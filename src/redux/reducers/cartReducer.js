// src/redux/reducers/cartReducer.js
import {
  FETCH_CART_PRODUCTS_REQUEST,
  FETCH_CART_PRODUCTS_SUCCESS,
  FETCH_CART_PRODUCTS_FAILURE,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILURE,
  UPDATE_CART_PRODUCT_REQUEST,
  UPDATE_CART_PRODUCT_SUCCESS,
  UPDATE_CART_PRODUCT_FAILURE,
  DELETE_CART_PRODUCT_REQUEST,
  DELETE_CART_PRODUCT_SUCCESS,
  DELETE_CART_PRODUCT_FAILURE,
  RESET_RESPONSE_MESSAGE
} from '../actions/cartActions';

const initialState = {
  loading: false,
  cartproducts: [],
  responseMessage : null,
  error: null,
};

const cartReducer = (state = initialState, action) => {
  // console.log(action.payload)
  switch (action.type) {
    case FETCH_CART_PRODUCTS_REQUEST:
    case ADD_TO_CART_REQUEST:
    case UPDATE_CART_PRODUCT_REQUEST:
    case DELETE_CART_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CART_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        cartproducts: action.payload,
      };
    case ADD_TO_CART_SUCCESS:
    case UPDATE_CART_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        responseMessage: action.payload
      };
    case DELETE_CART_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        responseMessage: action.payload,
      };
    case FETCH_CART_PRODUCTS_FAILURE:
    case ADD_TO_CART_FAILURE:
    case UPDATE_CART_PRODUCT_FAILURE:
    case DELETE_CART_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RESET_RESPONSE_MESSAGE:
      return {
        ...state,
        responseMessage: null,
      };
    default:
      return state;
  }
};

export default cartReducer;
