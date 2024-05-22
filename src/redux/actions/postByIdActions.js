// postByIdActions.js

export const FETCH_POST_BY_ID_REQUEST = 'FETCH_POST_BY_ID_REQUEST';
export const FETCH_POST_BY_ID_SUCCESS = 'FETCH_POST_BY_ID_SUCCESS';
export const FETCH_POST_BY_ID_FAILURE = 'FETCH_POST_BY_ID_FAILURE';

  export const fetchPostByIdRequest = (account_id, limit, offset) => ({
    type: FETCH_POST_BY_ID_REQUEST,
    payload: {account_id, limit, offset},
  });
  
  export const fetchPostByIdSuccess = post => ({
    type: FETCH_POST_BY_ID_SUCCESS,
    payload: post,
  });
  
  export const fetchPostByIdFailure = error => ({
    type: FETCH_POST_BY_ID_FAILURE,
    payload: error,
  });
  