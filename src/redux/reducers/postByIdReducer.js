// postByIdReducer.js
import {
    FETCH_POST_BY_ID_REQUEST,
    FETCH_POST_BY_ID_SUCCESS,
    FETCH_POST_BY_ID_FAILURE,
  } from '../actions/postByIdActions';
  
  const initialState = {
    loading: false,
    posts: [],
    error: null,
  };
  
  const postByIdReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_POST_BY_ID_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_POST_BY_ID_SUCCESS:
        return {
          ...state,
          loading: false,
          post: action.payload,
        };
      case FETCH_POST_BY_ID_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
          posts: [],
        };
      default:
        return state;
    }
  };
  
  export default postByIdReducer;
  