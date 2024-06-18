// src/redux/reducers/contestReducer.js

import {
    FETCH_CONTESTS_REQUEST,
    FETCH_CONTESTS_SUCCESS,
    FETCH_CONTESTS_FAILURE,
    FETCH_SINGLE_CONTEST_REQUEST,
    FETCH_SINGLE_CONTEST_SUCCESS,
    FETCH_SINGLE_CONTEST_FAILURE,
    JOIN_CONTEST_REQUEST,
    JOIN_CONTEST_SUCCESS,
    JOIN_CONTEST_FAILURE,
    RESET_SUCCESS_MESSAGE,
  } from '../actions/contestActions';
  
  const initialState = {
    loading: false,
    contests: [],
    singleContest: null,
    successMessage: null,
    error: null,
  };
  
  const contestReducer = (state = initialState, action) => {
    // console.log(action.payload,'actions payload')
    switch (action.type) {
      case FETCH_CONTESTS_REQUEST:
      case FETCH_SINGLE_CONTEST_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_CONTESTS_SUCCESS:
        return {
          ...state,
          loading: false,
          contests: action.payload,
        };
      case FETCH_SINGLE_CONTEST_SUCCESS:
        return {
          ...state,
          loading: false,
          singleContest: action.payload,
        };
      case FETCH_CONTESTS_FAILURE:
      case FETCH_SINGLE_CONTEST_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case JOIN_CONTEST_REQUEST:
        return { ...state, loading: true, error: null };
      case JOIN_CONTEST_SUCCESS:
        return { ...state, loading: false, successMessage: action.payload };
      case JOIN_CONTEST_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case RESET_SUCCESS_MESSAGE:
        return { ...state, successMessage: null };
      default:
        return state;
    }
  };
  
  export default contestReducer;
  