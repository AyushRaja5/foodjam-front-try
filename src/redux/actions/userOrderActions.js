// src/redux/actions/userOrderActions.js

export const FETCH_USER_ORDERS_REQUEST = 'FETCH_USER_ORDERS_REQUEST';
export const FETCH_USER_ORDERS_SUCCESS = 'FETCH_USER_ORDERS_SUCCESS';
export const FETCH_USER_ORDERS_FAILURE = 'FETCH_USER_ORDERS_FAILURE';

export const FETCH_USER_ORDER_BY_ID_REQUEST = 'FETCH_USER_ORDER_BY_ID_REQUEST';
export const FETCH_USER_ORDER_BY_ID_SUCCESS = 'FETCH_USER_ORDER_BY_ID_SUCCESS';
export const FETCH_USER_ORDER_BY_ID_FAILURE = 'FETCH_USER_ORDER_BY_ID_FAILURE';

export const fetchUserOrdersRequest = (limit, offset) => ({
  type: FETCH_USER_ORDERS_REQUEST,
  payload: { limit, offset }
});

export const fetchUserOrdersSuccess = (userorders) => ({
  type: FETCH_USER_ORDERS_SUCCESS,
  payload: userorders
});

export const fetchUserOrdersFailure = (error) => ({
  type: FETCH_USER_ORDERS_FAILURE,
  payload: error
});

export const fetchUserOrderByIdRequest = (orderId) => ({
  type: FETCH_USER_ORDER_BY_ID_REQUEST,
  payload: orderId
});

export const fetchUserOrderByIdSuccess = (order) => ({
  type: FETCH_USER_ORDER_BY_ID_SUCCESS,
  payload: order
});

export const fetchUserOrderByIdFailure = (error) => ({
  type: FETCH_USER_ORDER_BY_ID_FAILURE,
  payload: error
});