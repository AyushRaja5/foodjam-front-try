// src/redux/sagas/campaignSaga.js

import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_CAMPAIGNS_REQUEST,
  FETCH_CAMPAIGNS_SUCCESS,
  FETCH_CAMPAIGNS_FAILURE,
  FETCH_SINGLE_CAMPAIGN_REQUEST,
  FETCH_SINGLE_CAMPAIGN_SUCCESS,
  FETCH_SINGLE_CAMPAIGN_FAILURE,
  JOIN_CAMPAIGN_REQUEST,
  JOIN_CAMPAIGN_SUCCESS,
  JOIN_CAMPAIGN_FAILURE,
} from '../actions/campaignActions';
import { getCampaignsList, getSingleCampaigns, joinCampaignService } from '../../services/Explore/CampaignService';

function* fetchCampaigns(action) {
  try {
    const { offset, limit } = action.payload;
    const user = JSON.parse(localStorage.getItem('foodjam-user'));
    const token = user ? user.sessionToken : null;
    const accountId = user ? user.account_id : null;
    const campaigns = yield call(getCampaignsList, token, accountId, offset, limit);
    yield put({ type: FETCH_CAMPAIGNS_SUCCESS, payload: campaigns });
  } catch (error) {
    yield put({ type: FETCH_CAMPAIGNS_FAILURE, payload: error.message });
  }
}

function* fetchSingleCampaign(action) {
  try {
    const { campaignId } = action.payload;
    const user = JSON.parse(localStorage.getItem('foodjam-user'));
    const token = user ? user.sessionToken : null;
    const accountId = user ? user.account_id : null;
    const campaign = yield call(getSingleCampaigns, token, accountId, campaignId);
    yield put({ type: FETCH_SINGLE_CAMPAIGN_SUCCESS, payload: campaign });
  } catch (error) {
    yield put({ type: FETCH_SINGLE_CAMPAIGN_FAILURE, payload: error.message });
  }
}

function* joinCampaign(action) {
  try {
    const user = JSON.parse(localStorage.getItem('foodjam-user'));
    const token = user ? user.sessionToken : null;
    const accountId = user ? user.account_id : null;
    const { campaignId, campaignActionType } = action.payload;
    const response = yield call(joinCampaignService, token, accountId, campaignId, campaignActionType);
    yield put({ type: JOIN_CAMPAIGN_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: JOIN_CAMPAIGN_FAILURE, payload: error.message });
  }
}

function* campaignSaga() {
  yield takeLatest(FETCH_CAMPAIGNS_REQUEST, fetchCampaigns);
  yield takeLatest(FETCH_SINGLE_CAMPAIGN_REQUEST, fetchSingleCampaign);
  yield takeLatest(JOIN_CAMPAIGN_REQUEST, joinCampaign);
}

export default campaignSaga;
