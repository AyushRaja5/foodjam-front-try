export const FETCH_SINGLE_PRODUCT_REQUEST = 'FETCH_SINGLE_PRODUCT_REQUEST';
export const FETCH_SINGLE_PRODUCT_SUCCESS = 'FETCH_SINGLE_PRODUCT_SUCCESS';
export const FETCH_SINGLE_PRODUCT_FAILURE = 'FETCH_SINGLE_PRODUCT_FAILURE';

export const fetchSingleProductRequest = (productId) => ({
  type: FETCH_SINGLE_PRODUCT_REQUEST,
  payload: { productId }
});

export const fetchSingleProductSuccess = (product) => ({
  type: FETCH_SINGLE_PRODUCT_SUCCESS,
  payload: product
});

export const fetchSingleProductFailure = (error) => ({
  type: FETCH_SINGLE_PRODUCT_FAILURE,
  payload: error
});
