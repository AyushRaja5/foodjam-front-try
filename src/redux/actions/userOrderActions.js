// src/redux/actions/userOrderActions.js

export const FETCH_USER_ORDERS_REQUEST = 'FETCH_USER_ORDERS_REQUEST';
export const FETCH_USER_ORDERS_SUCCESS = 'FETCH_USER_ORDERS_SUCCESS';
export const FETCH_USER_ORDERS_FAILURE = 'FETCH_USER_ORDERS_FAILURE';

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
