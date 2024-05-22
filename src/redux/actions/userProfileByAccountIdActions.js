// userProfileByAccountIdActions.js

export const FETCH_USER_PROFILE_BY_ACCOUNT_REQUEST = 'FETCH_USER_PROFILE_BY_ACCOUNT_REQUEST';
export const FETCH_USER_PROFILE_BY_ACCOUNT_SUCCESS = 'FETCH_USER_PROFILE_BY_ACCOUNT_SUCCESS';
export const FETCH_USER_PROFILE_BY_ACCOUNT_FAILURE = 'FETCH_USER_PROFILE_BY_ACCOUNT_FAILURE';

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
