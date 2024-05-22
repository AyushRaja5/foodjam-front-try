// src/redux/reducers/authReducer.js

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SET_AUTH_TOKEN, CLEAR_AUTH_TOKEN,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../actions/authActions';

const initialState = {
  token: null,
  loading: false,
  error: null,
};
const initialSignUpState = {
  token: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_AUTH_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case CLEAR_AUTH_TOKEN:
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};

const signupReducer = (state = initialSignUpState, action) => {
  // console.log(action,'actions from signup')
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export { authReducer, signupReducer };
