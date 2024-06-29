// src/redux/brandReducer.js
import {
  FETCH_SINGLE_BRAND_REQUEST,
  FETCH_SINGLE_BRAND_SUCCESS,
  FETCH_SINGLE_BRAND_FAILURE,
  FOLLOW_BRAND_REQUEST,
  FOLLOW_BRAND_SUCCESS,
  FOLLOW_BRAND_FAILURE,
} from '../actions/brandActions';

const initialState = {
  brand: null,
  loading: false,
  error: null,
  followResponse: null,
};

const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SINGLE_BRAND_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_SINGLE_BRAND_SUCCESS:
      return { ...state, loading: false, brand: action.payload };
    case FETCH_SINGLE_BRAND_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FOLLOW_BRAND_REQUEST:
      return { ...state, loading: true, error: null };
    case FOLLOW_BRAND_SUCCESS:
      return { ...state, loading: false, followResponse: action.payload };
    case FOLLOW_BRAND_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default brandReducer;
