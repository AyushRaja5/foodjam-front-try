// actions/savedPostsProductsActions.js

export const FETCH_SAVED_POSTS_REQUEST = 'FETCH_SAVED_POSTS_REQUEST';
export const FETCH_SAVED_POSTS_SUCCESS = 'FETCH_SAVED_POSTS_SUCCESS';
export const FETCH_SAVED_POSTS_FAILURE = 'FETCH_SAVED_POSTS_FAILURE';
  
  export const fetchSavedPostsRequest = (limit, offset) => ({
    type: FETCH_SAVED_POSTS_REQUEST,
    payload: { limit, offset },
  });
  
  export const fetchSavedPostsSuccess = (data) => ({
    type: FETCH_SAVED_POSTS_SUCCESS,
    payload: data,
  });
  
  export const fetchSavedPostsFailure = (error) => ({
    type: FETCH_SAVED_POSTS_FAILURE,
    payload: error,
  });
  