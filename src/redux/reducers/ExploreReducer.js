// ExploreReducer.js
import {
  FETCH_EXPLORE_DATA_REQUEST, FETCH_EXPLORE_DATA_SUCCESS,
  FETCH_EXPLORE_DATA_FAILURE,
  RESET_SUCCESS_MESSAGE
} from '../actions/ExploreActions';
import {
  FETCH_LEADERBOARD_REQUEST,
  FETCH_LEADERBOARD_SUCCESS,
  FETCH_LEADERBOARD_FAILURE,

  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
} from '../actions/ExploreActions';

const initialState = {
  exploredata: [],
  leaderboardData: [],
  loading: false,
  successMessage: null,
  error: null,
};

const exploreReducer = (state = initialState, action) => {
  // console.log(action.payload)
  switch (action.type) {
    case FETCH_EXPLORE_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_EXPLORE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        exploredata: action.payload,
      };
    case FETCH_EXPLORE_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_LEADERBOARD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_LEADERBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        leaderboardData: action.payload,
      };
    case FETCH_LEADERBOARD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FOLLOW_USER_REQUEST:
      return { ...state, loading: true, successMessage: null, error: null };
    case FOLLOW_USER_SUCCESS:
      return { ...state, loading: false, successMessage: action.payload, error: null };
    case FOLLOW_USER_FAILURE:
      return { ...state, loading: false, successMessage: null, error: action.payload };
    case RESET_SUCCESS_MESSAGE:
      return { ...state, successMessage: null };
    default:
      return state;
  }
};

export default exploreReducer;
