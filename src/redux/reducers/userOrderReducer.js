// src/redux/reducers/userOrderReducer.js

import {
  FETCH_USER_ORDERS_REQUEST,
  FETCH_USER_ORDERS_SUCCESS,
  FETCH_USER_ORDERS_FAILURE
} from '../actions/userOrderActions';

const initialState = {
  loading: false,
  userorders: [],
  error: null,
};

const userOrderReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};

export default userOrderReducer;
