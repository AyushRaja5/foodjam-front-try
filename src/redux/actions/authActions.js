// src/redux/actions/authActions.js

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const CLEAR_AUTH_TOKEN = 'CLEAR_AUTH_TOKEN';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const loginRequest = credentials => ({
  type: LOGIN_REQUEST,
  payload: credentials,
});

export const loginSuccess = token => ({
  type: LOGIN_SUCCESS,
  payload: token,
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const setAuthToken = token => ({
  type: SET_AUTH_TOKEN,
  payload: token,
});

export const clearAuthToken = () => ({
  type: CLEAR_AUTH_TOKEN,
});


// Sign Up Form :

export const signupRequest = userData => ({
  type: SIGNUP_REQUEST,
  payload: userData,
});

export const signupSuccess = (responseData) => ({
  type: SIGNUP_SUCCESS,
  payload: responseData
});

export const signupFailure = error => ({
  type: SIGNUP_FAILURE,
  payload: error,
});