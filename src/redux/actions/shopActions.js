// actions/shopActions.js
export const FETCH_SHOP_REQUEST = 'FETCH_SHOP_REQUEST';
export const FETCH_SHOP_SUCCESS = 'FETCH_SHOP_SUCCESS';
export const FETCH_SHOP_FAILURE = 'FETCH_SHOP_FAILURE';

export const fetchShopRequest = () => ({
  type: FETCH_SHOP_REQUEST,
});

export const fetchShopSuccess = (data) => ({
  type: FETCH_SHOP_SUCCESS,
  payload: data,
});

export const fetchShopFailure = (error) => ({
  type: FETCH_SHOP_FAILURE,
  payload: error,
});
