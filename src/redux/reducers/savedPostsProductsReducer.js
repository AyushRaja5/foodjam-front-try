// reducers/savedPostsReducer.js

import {
    FETCH_SAVED_POSTS_REQUEST,
    FETCH_SAVED_POSTS_SUCCESS,
    FETCH_SAVED_POSTS_FAILURE,
  } from '../actions/savedPostsProductsActions';
  
  const initialState = {
    savedPosts: [],
    loading: false,
    error: null,
  };
  
  const savedPostsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SAVED_POSTS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_SAVED_POSTS_SUCCESS:
        return {
          ...state,
          savedPosts: action.payload,
          loading: false,
          error: null,
        };
      case FETCH_SAVED_POSTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
          savedPosts : []
        };
      default:
        return state;
    }
  };
  
  export default savedPostsReducer;
  