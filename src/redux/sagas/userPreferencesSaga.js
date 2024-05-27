// src/redux/sagas/userPreferencesSaga.js

import { takeLatest, call, put } from 'redux-saga/effects';
import {
  FETCH_USER_PREFERENCES_REQUEST,
  FETCH_USER_PREFERENCES_SUCCESS,
  FETCH_USER_PREFERENCES_FAILURE,
  ADD_USER_PREFERENCE_REQUEST,
  ADD_USER_PREFERENCE_SUCCESS,
  ADD_USER_PREFERENCE_FAILURE,
  fetchUserPreferencesSuccess,
  fetchUserPreferencesFailure,
  addUserPreferenceSuccess,
  addUserPreferenceFailure,
  fetchUserPreferencesRequest
} from '../actions/userPreferencesActions';
import { getUserPreferencesAPI, addUserPreferencesAPI } from '../../services/Profile/UserPreferences';


function* fetchUserPreferences() {
  try {
    const token = JSON.parse(localStorage.getItem('foodjam-user')).sessionToken;
    const accountId = JSON.parse(localStorage.getItem('foodjam-user')).account_id;
    const response = yield call(getUserPreferencesAPI, token, accountId);
    // console.log(response.data?.preferences,' :response from saga')
    yield put(fetchUserPreferencesSuccess(response.data?.preferences));
  } catch (error) {
    yield put(fetchUserPreferencesFailure(error));
  }
}

function* addUserPreferences(action) {
  try {
    const addressData = action.payload;
    const token = JSON.parse(localStorage.getItem('foodjam-user')).sessionToken;
    const accountId = JSON.parse(localStorage.getItem('foodjam-user')).account_id;
    const response = yield call(addUserPreferencesAPI, token, accountId, addressData);
    // console.log(response,'response')
    yield put(addUserPreferenceSuccess(response))
    yield put(fetchUserPreferencesRequest());
  } catch (error) {
    console.log(error,'error')
    yield put(addUserPreferenceFailure(error.response?.data));
  }
}


export default function* userPreferencesSaga() {
  yield takeLatest(FETCH_USER_PREFERENCES_REQUEST, fetchUserPreferences);
  yield takeLatest(ADD_USER_PREFERENCE_REQUEST, addUserPreferences);
}
