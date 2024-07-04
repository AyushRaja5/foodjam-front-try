// src/redux/actions/cartActions.js
export const FETCH_CART_PRODUCTS_REQUEST = 'FETCH_CART_PRODUCTS_REQUEST';
export const FETCH_CART_PRODUCTS_SUCCESS = 'FETCH_CART_PRODUCTS_SUCCESS';
export const FETCH_CART_PRODUCTS_FAILURE = 'FETCH_CART_PRODUCTS_FAILURE';

export const ADD_TO_CART_REQUEST = 'ADD_TO_CART_REQUEST';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILURE = 'ADD_TO_CART_FAILURE';

export const UPDATE_CART_PRODUCT_REQUEST = 'UPDATE_CART_PRODUCT_REQUEST';
export const UPDATE_CART_PRODUCT_SUCCESS = 'UPDATE_CART_PRODUCT_SUCCESS';
export const UPDATE_CART_PRODUCT_FAILURE = 'UPDATE_CART_PRODUCT_FAILURE';

export const DELETE_CART_PRODUCT_REQUEST = 'DELETE_CART_PRODUCT_REQUEST';
export const DELETE_CART_PRODUCT_SUCCESS = 'DELETE_CART_PRODUCT_SUCCESS';
export const DELETE_CART_PRODUCT_FAILURE = 'DELETE_CART_PRODUCT_FAILURE';

export const RESET_RESPONSE_MESSAGE = 'RESET_RESPONSE_MESSAGE';
  // Fetch Cart Products
  export const fetchCartProductsRequest = (limit, offset) => ({
    type: FETCH_CART_PRODUCTS_REQUEST,
    payload: { limit, offset },
  });
  
  export const fetchCartProductsSuccess = (products) => ({
    type: FETCH_CART_PRODUCTS_SUCCESS,
    payload: products,
  });
  
  export const fetchCartProductsFailure = (error) => ({
    type: FETCH_CART_PRODUCTS_FAILURE,
    payload: error,
  });
  
  // Add to Cart
  export const addToCartRequest = (product_id, quantity) => ({
    type: ADD_TO_CART_REQUEST,
    payload: { product_id, quantity },
  });
  
  export const addToCartSuccess = (product) => ({
    type: ADD_TO_CART_SUCCESS,
    payload: product,
  });
  
  export const addToCartFailure = (error) => ({
    type: ADD_TO_CART_FAILURE,
    payload: error,
  });
  
  // Update Cart Product
  export const updateCartProductRequest = (cart_id, quantity) => ({
    type: UPDATE_CART_PRODUCT_REQUEST,
    payload: { cart_id : cart_id, quantity : `${quantity}` },
  });
  
  export const updateCartProductSuccess = (product) => ({
    type: UPDATE_CART_PRODUCT_SUCCESS,
    payload: product,
  });
  
  export const updateCartProductFailure = (error) => ({
    type: UPDATE_CART_PRODUCT_FAILURE,
    payload: error,
  });
  
  // Delete Cart Product
  export const deleteCartProductRequest = (product_id) => ({
    type: DELETE_CART_PRODUCT_REQUEST,
    payload: product_id,
  });
  
  export const deleteCartProductSuccess = (product_id) => ({
    type: DELETE_CART_PRODUCT_SUCCESS,
    payload: product_id,
  });
  
  export const deleteCartProductFailure = (error) => ({
    type: DELETE_CART_PRODUCT_FAILURE,
    payload: error,
  });

  export const resetResponseMessage = () => ({
    type: RESET_RESPONSE_MESSAGE,
  });
  