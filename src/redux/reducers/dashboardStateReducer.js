// dashboardStateReducer.js

import {
    FETCH_STATS_REQUEST,
    FETCH_STATS_SUCCESS,
    FETCH_STATS_FAILURE,
  } from '../actions/dashboardStateActions';
  
  const initialState = {
    stats: null,
    loading: false,
    error: null,
  };
  
  const dashboardStateReducer = (state = initialState, action) => {
    // console.log(action,'dashboard reducer')
    switch (action.type) {
      case FETCH_STATS_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_STATS_SUCCESS:
        return { ...state, stats: action.payload, loading: false, error: null };
      case FETCH_STATS_FAILURE:
        return { ...state, error: action.payload, loading: false };
      default:
        return state;
    }
  };
  
  export default dashboardStateReducer;
  