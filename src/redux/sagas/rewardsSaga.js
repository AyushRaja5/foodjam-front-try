// src/redux/sagas/rewardsSagas.js

import { call, put, takeLatest } from 'redux-saga/effects';
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
} from '../actions/rewardsActions';
import { getRewardsList, getSingleReward, joinRewardService } from '../../services/Explore/RewardsService';

function* fetchRewards(action) {
  try {
    const user = JSON.parse(localStorage.getItem('foodjam-user'));
    const token = user ? user.sessionToken : null;
    const accountId = user ? user.account_id : null;
    const rewards = yield call(getRewardsList, token, accountId);
    yield put({ type: FETCH_REWARDS_SUCCESS, payload: rewards });
  } catch (error) {
    yield put({ type: FETCH_REWARDS_FAILURE, payload: error.message });
  }
}

function* fetchSingleReward(action) {
  try {
    const { rewardId } = action.payload;
    const user = JSON.parse(localStorage.getItem('foodjam-user'));
    const token = user ? user.sessionToken : null;
    const accountId = user ? user.account_id : null;
    const reward = yield call(getSingleReward, token, accountId, rewardId);
    yield put({ type: FETCH_SINGLE_REWARD_SUCCESS, payload: reward });
  } catch (error) {
    yield put({ type: FETCH_SINGLE_REWARD_FAILURE, payload: error.message });
  }
}

function* joinReward(action) {
  try {
    const user = JSON.parse(localStorage.getItem('foodjam-user'));
    const token = user ? user.sessionToken : null;
    const accountId = user ? user.account_id : null;
    const { rewardId, rewardActionType } = action.payload;
    const response = yield call(joinRewardService, token, accountId, rewardId, rewardActionType);
    yield put({ type: JOIN_REWARD_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: JOIN_REWARD_FAILURE, payload: error.message });
  }
}

function* rewardsSagas() {
  yield takeLatest(FETCH_REWARDS_REQUEST, fetchRewards);
  yield takeLatest(FETCH_SINGLE_REWARD_REQUEST, fetchSingleReward);
  yield takeLatest(JOIN_REWARD_REQUEST, joinReward);
}

export default rewardsSagas;
