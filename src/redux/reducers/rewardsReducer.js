// src/redux/reducers/rewardReducer.js

import {
  FETCH_REWARDS_REQUEST,
  FETCH_REWARDS_SUCCESS,
  FETCH_REWARDS_FAILURE,
  FETCH_SINGLE_REWARD_REQUEST,
  FETCH_SINGLE_REWARD_SUCCESS,
  FETCH_SINGLE_REWARD_FAILURE,
  JOIN_REWARD_REQUEST,
  JOIN_REWARD_SUCCESS,
  JOIN_REWARD_FAILURE,
  RESET_SUCCESS_MESSAGE,
} from '../actions/rewardsActions';

const initialState = {
  loading: false,
  rewards: [],
  singleReward: null,
  successMessage: null,
  error: null,
};

const rewardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REWARDS_REQUEST:
    case FETCH_SINGLE_REWARD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_REWARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        rewards: action.payload,
      };
    case FETCH_SINGLE_REWARD_SUCCESS:
      return {
        ...state,
        loading: false,
        singleReward: action.payload,
      };
    case FETCH_REWARDS_FAILURE:
    case FETCH_SINGLE_REWARD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case JOIN_REWARD_REQUEST:
      return { ...state, loading: true, error: null };
    case JOIN_REWARD_SUCCESS:
      return { ...state, loading: false, successMessage: action.payload };
    case JOIN_REWARD_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case RESET_SUCCESS_MESSAGE:
      return { ...state, successMessage: null };
    default:
      return state;
  }
};

export default rewardReducer;
