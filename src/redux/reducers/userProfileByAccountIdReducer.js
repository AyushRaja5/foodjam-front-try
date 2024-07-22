// userProfileByAccountIdReducer.js

import {
  FETCH_USER_PROFILE_BY_ACCOUNT_REQUEST,
  FETCH_USER_PROFILE_BY_ACCOUNT_SUCCESS,
  FETCH_USER_PROFILE_BY_ACCOUNT_FAILURE,

  SAVE_EDIT_PROFILE_REQUEST,
  SAVE_EDIT_PROFILE_SUCCESS,
  SAVE_EDIT_PROFILE_FAILURE,
  } from '../actions/userProfileByAccountIdActions';
  
  const initialState = {
    userProfileInfo: null,
    loading: false,
    error: null,
  };
  
  const userProfileByAccountIdReducer = (userProfile = initialState, action) => {
    switch (action.type) {
      case FETCH_USER_PROFILE_BY_ACCOUNT_REQUEST:
        return { ...userProfile, loading: true, error: null };
      case FETCH_USER_PROFILE_BY_ACCOUNT_SUCCESS:
        return { ...userProfile, userProfileInfo: action.payload, loading: false, error: null };
      case FETCH_USER_PROFILE_BY_ACCOUNT_FAILURE:
        return { ...userProfile, error: action.payload, loading: false };
      case SAVE_EDIT_PROFILE_REQUEST:
        return {
          ...userProfile,
          loading: true,
          error: null,
        };
      case SAVE_EDIT_PROFILE_SUCCESS:
        return {
          ...userProfile,
          userProfileInfo: action.payload,
          loading: false,
        };
      case SAVE_EDIT_PROFILE_FAILURE:
        return {
          ...userProfile,
          loading: false,
          error: action.payload,
        };
      default:
        return userProfile;
    }
  };
  
  export default userProfileByAccountIdReducer;
  