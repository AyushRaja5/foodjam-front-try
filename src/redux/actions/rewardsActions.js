// src/redux/actions/rewardsActions.js

export const FETCH_REWARDS_REQUEST = 'FETCH_REWARDS_REQUEST';
export const FETCH_REWARDS_SUCCESS = 'FETCH_REWARDS_SUCCESS';
export const FETCH_REWARDS_FAILURE = 'FETCH_REWARDS_FAILURE';

export const FETCH_SINGLE_REWARD_REQUEST = 'FETCH_SINGLE_REWARD_REQUEST';
export const FETCH_SINGLE_REWARD_SUCCESS = 'FETCH_SINGLE_REWARD_SUCCESS';
export const FETCH_SINGLE_REWARD_FAILURE = 'FETCH_SINGLE_REWARD_FAILURE';

export const JOIN_REWARD_REQUEST = 'JOIN_REWARD_REQUEST';
export const JOIN_REWARD_SUCCESS = 'JOIN_REWARD_SUCCESS';
export const JOIN_REWARD_FAILURE = 'JOIN_REWARD_FAILURE';

export const RESET_SUCCESS_MESSAGE = 'RESET_SUCCESS_MESSAGE';

export const fetchRewardsRequest = () => ({
  type: FETCH_REWARDS_REQUEST,
});

export const fetchRewardsSuccess = (rewards) => ({
  type: FETCH_REWARDS_SUCCESS,
  payload: rewards
});

export const fetchRewardsFailure = (error) => ({
  type: FETCH_REWARDS_FAILURE,
  payload: error
});

export const fetchSingleRewardRequest = (rewardId) => ({
  type: FETCH_SINGLE_REWARD_REQUEST,
  payload: { rewardId }
});

export const fetchSingleRewardSuccess = (reward) => ({
  type: FETCH_SINGLE_REWARD_SUCCESS,
  payload: reward
});

export const fetchSingleRewardFailure = (error) => ({
  type: FETCH_SINGLE_REWARD_FAILURE,
  payload: error
});

export const joinRewardRequest = (rewardId) => ({
  type: JOIN_REWARD_REQUEST,
  payload: { rewardId },
});

export const joinRewardSuccess = (response) => ({
  type: JOIN_REWARD_SUCCESS,
  payload: response,
});

export const joinRewardFailure = (error) => ({
  type: JOIN_REWARD_FAILURE,
  payload: error,
});

export const resetSuccessMessage = () => ({
  type: RESET_SUCCESS_MESSAGE,
});