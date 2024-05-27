// src/redux/reducers/userAddressReducer.js

import {
    FETCH_USER_ADDRESS_REQUEST,
    FETCH_USER_ADDRESS_SUCCESS,
    FETCH_USER_ADDRESS_FAILURE,
    ADD_USER_ADDRESS_REQUEST,
    ADD_USER_ADDRESS_SUCCESS,
    ADD_USER_ADDRESS_FAILURE,
    EDIT_USER_ADDRESS_REQUEST,
    EDIT_USER_ADDRESS_SUCCESS,
    EDIT_USER_ADDRESS_FAILURE,
    DELETE_USER_ADDRESS_REQUEST,
    DELETE_USER_ADDRESS_SUCCESS,
    DELETE_USER_ADDRESS_FAILURE
  } from '../actions/userAddressActions';
  
  const initialState = {
    addresses: [],
    loading: false,
    error: null,
    response: null
  };
  
  const userAddressReducer = (state = initialState, action) => {
    // console.log(action.payload,'from reducer')
    switch (action.type) {
      case FETCH_USER_ADDRESS_REQUEST:
      case ADD_USER_ADDRESS_REQUEST:
      case EDIT_USER_ADDRESS_REQUEST:
      case DELETE_USER_ADDRESS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case FETCH_USER_ADDRESS_SUCCESS:
        return {
          ...state,
          addresses: action.payload,
          loading: false,
          error: null,
          response: null
        };
      case ADD_USER_ADDRESS_SUCCESS:
      case EDIT_USER_ADDRESS_SUCCESS:
      case DELETE_USER_ADDRESS_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
          response: action.payload
        };
      case FETCH_USER_ADDRESS_FAILURE:
      case ADD_USER_ADDRESS_FAILURE:
      case EDIT_USER_ADDRESS_FAILURE:
      case DELETE_USER_ADDRESS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
          response: null
        };
      default:
        return state;
    }
  };
  
  export default userAddressReducer;
  