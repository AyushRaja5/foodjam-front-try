// src/redux/reducers/userOrderReducer.js

import {
  FETCH_USER_ORDERS_REQUEST,
  FETCH_USER_ORDERS_SUCCESS,
  FETCH_USER_ORDERS_FAILURE,
  FETCH_USER_ORDER_BY_ID_REQUEST,
  FETCH_USER_ORDER_BY_ID_SUCCESS,
  FETCH_USER_ORDER_BY_ID_FAILURE
} from '../actions/userOrderActions';

const initialState = {
  loading: false,
  userorders: [],
  error: null,
  userorder: null,
  error: null,
};

const userOrderReducer = (state = initialState, action) => {
  // console.log(action.payload)
  switch (action.type) {
    case FETCH_USER_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        userorders: action.payload,
      };
    case FETCH_USER_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_USER_ORDER_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        userorder: action.payload,
      };
    case FETCH_USER_ORDER_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userOrderReducer;
