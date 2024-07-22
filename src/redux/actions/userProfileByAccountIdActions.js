// userProfileByAccountIdActions.js

export const FETCH_USER_PROFILE_BY_ACCOUNT_REQUEST = 'FETCH_USER_PROFILE_BY_ACCOUNT_REQUEST';
export const FETCH_USER_PROFILE_BY_ACCOUNT_SUCCESS = 'FETCH_USER_PROFILE_BY_ACCOUNT_SUCCESS';
export const FETCH_USER_PROFILE_BY_ACCOUNT_FAILURE = 'FETCH_USER_PROFILE_BY_ACCOUNT_FAILURE';

export const SAVE_EDIT_PROFILE_REQUEST = 'SAVE_EDIT_PROFILE_REQUEST';
export const SAVE_EDIT_PROFILE_SUCCESS = 'SAVE_EDIT_PROFILE_SUCCESS';
export const SAVE_EDIT_PROFILE_FAILURE = 'SAVE_EDIT_PROFILE_FAILURE';

export const fetchUserProfileByAccountIdRequest = (account_id) => ({
  type: FETCH_USER_PROFILE_BY_ACCOUNT_REQUEST,
  payload: { account_id },
});

export const fetchUserProfileByAccountIdSuccess = (data) => ({
  type: FETCH_USER_PROFILE_BY_ACCOUNT_SUCCESS,
  payload: data,
});

export const fetchUserProfileByAccountIdFailure = (error) => ({
  type: FETCH_USER_PROFILE_BY_ACCOUNT_FAILURE,
  payload: error,
});

export const saveEditProfileRequest = (profileData) => ({
  type: SAVE_EDIT_PROFILE_REQUEST,
  payload: profileData,
});

export const saveEditProfileSuccess = (updatedProfile) => ({
  type: SAVE_EDIT_PROFILE_SUCCESS,
  payload: updatedProfile,
});

export const saveEditProfileFailure = (error) => ({
  type: SAVE_EDIT_PROFILE_FAILURE,
  payload: error,
});