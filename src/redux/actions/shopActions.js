// actions/shopActions.js
export const FETCH_SHOP_REQUEST = 'FETCH_SHOP_REQUEST';
export const FETCH_SHOP_SUCCESS = 'FETCH_SHOP_SUCCESS';
export const FETCH_SHOP_FAILURE = 'FETCH_SHOP_FAILURE';

export const GET_SHOP_VIEW_ALL_REQUEST = 'GET_SHOP_VIEW_ALL_REQUEST';
export const GET_SHOP_VIEW_ALL_SUCCESS = 'GET_SHOP_VIEW_ALL_SUCCESS';
export const GET_SHOP_VIEW_ALL_FAILURE = 'GET_SHOP_VIEW_ALL_FAILURE';

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


export const getShopViewAllRequest =  (limit, offset, title) => ({
  type: GET_SHOP_VIEW_ALL_REQUEST,
  payload: { limit, offset, title },
});

export const getShopViewAllSuccess = (data) => ({
  type: GET_SHOP_VIEW_ALL_SUCCESS,
  payload: data,
});

export const getShopViewAllFailure = (error) => ({
  type: GET_SHOP_VIEW_ALL_FAILURE,
  payload: error,
});