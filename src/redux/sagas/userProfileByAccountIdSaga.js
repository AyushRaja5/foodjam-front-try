// userProfileByAccountIdSaga.js

import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_USER_PROFILE_BY_ACCOUNT_REQUEST,
  fetchUserProfileByAccountIdSuccess,
  fetchUserProfileByAccountIdFailure,
} from '../actions/userProfileByAccountIdActions';
import { GetUserProfilebyAccountIdService } from '../../services/Profile/dashboardStates';

function* fetchUserProfileByAccountId(action) {
  try {
    const userParams = action.payload
    const token = JSON.parse(localStorage.getItem('foodjam-user')).sessionToken;
    const accountId = JSON.parse(localStorage.getItem('foodjam-user')).account_id;
    const response = yield call(GetUserProfilebyAccountIdService, token, accountId, userParams);

    yield put(fetchUserProfileByAccountIdSuccess(response.data));
  } catch (error) {
    yield put(fetchUserProfileByAccountIdFailure(error));
  }
}

function* userProfileByAccountIdSaga() {
  yield takeLatest( FETCH_USER_PROFILE_BY_ACCOUNT_REQUEST, fetchUserProfileByAccountId);
}

export default userProfileByAccountIdSaga;
