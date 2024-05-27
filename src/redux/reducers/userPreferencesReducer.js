// src/redux/reducers/userPreferencesReducer.js

import {
  FETCH_USER_PREFERENCES_REQUEST,
  FETCH_USER_PREFERENCES_SUCCESS,
  FETCH_USER_PREFERENCES_FAILURE,
  ADD_USER_PREFERENCE_REQUEST,
  ADD_USER_PREFERENCE_SUCCESS,
  ADD_USER_PREFERENCE_FAILURE
} from '../actions/userPreferencesActions';

const initialState = {
  preferences: [],
  loading: false,
  error: null,
  response: null
};

const userPreferencesReducer = (state = initialState, action) => {
    // console.log(action.payload)
  switch (action.type) {
      case FETCH_USER_PREFERENCES_REQUEST:
      case ADD_USER_PREFERENCE_REQUEST:
          return {
              ...state,
              loading: true,
              error: null
          };
      case FETCH_USER_PREFERENCES_SUCCESS:
          return {
              ...state,
              preferences: action.payload,
              loading: false,
              error: null
          };
      case FETCH_USER_PREFERENCES_FAILURE:
      case ADD_USER_PREFERENCE_FAILURE:
          return {
              ...state,
              loading: false,
              error: action.payload
          };
      case ADD_USER_PREFERENCE_SUCCESS:
          return {
              ...state,
              response: action.payload,
              loading: false,
              error: null
          };
      default:
          return state;
  }
};

export default userPreferencesReducer;
