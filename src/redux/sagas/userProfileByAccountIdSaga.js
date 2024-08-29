// userProfileByAccountIdSaga.js

import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_USER_PROFILE_BY_ACCOUNT_REQUEST,
  fetchUserProfileByAccountIdSuccess,
  fetchUserProfileByAccountIdFailure,

  SAVE_EDIT_PROFILE_REQUEST,
  saveEditProfileSuccess,
  saveEditProfileFailure,
} from '../actions/userProfileByAccountIdActions';
import { GetUserProfilebyAccountIdService, EditUserProfileService } from '../../services/Profile/dashboardStates';

function* fetchUserProfileByAccountId(action) {
  try {
    const userParams = action.payload
    const token = JSON.parse(localStorage.getItem('foodjam-user'))?.sessionToken || null;
    const accountId = JSON.parse(localStorage.getItem('foodjam-user'))?.account_id || null;
    const response = yield call(GetUserProfilebyAccountIdService, token , accountId, userParams);

    yield put(fetchUserProfileByAccountIdSuccess(response.data));
  } catch (error) {
    yield put(fetchUserProfileByAccountIdFailure(error));
  }
}

function* saveEditProfile(action) {
  const token = JSON.parse(localStorage.getItem('foodjam-user'))?.sessionToken;
  const accountId = JSON.parse(localStorage.getItem('foodjam-user'))?.account_id;
  try {
    const response = yield call(EditUserProfileService, token, accountId, action.payload);
    yield put(saveEditProfileSuccess(response.data));
  } catch (error) {
    yield put(saveEditProfileFailure(error.message));
  }
}

function* userProfileByAccountIdSaga() {
  yield takeLatest( FETCH_USER_PROFILE_BY_ACCOUNT_REQUEST, fetchUserProfileByAccountId);
  yield takeLatest(SAVE_EDIT_PROFILE_REQUEST, saveEditProfile);
}

export default userProfileByAccountIdSaga;
