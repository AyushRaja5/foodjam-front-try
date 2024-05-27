// src/redux/sagas/userNotificationSaga.js

import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_USER_NOTIFICATION_REQUEST,
  fetchUserNotificationsSuccess,
  fetchUserNotificationsFailure
} from '../actions/userNotificationActions';
import { getUserNotification } from '../../services/Profile/UserNotification';

function* fetchUserNotificationsSaga(action) {
  try {
    const params = action.payload;
    const token = JSON.parse(localStorage.getItem('foodjam-user')).sessionToken;
    const accountId = JSON.parse(localStorage.getItem('foodjam-user')).account_id;
    const response = yield call(getUserNotification, token, accountId, params);
    yield put(fetchUserNotificationsSuccess(response.data));

  } catch (error) {
    yield put(fetchUserNotificationsFailure(error));
  }
}

function* userNotificationSaga() {
    yield takeLatest(FETCH_USER_NOTIFICATION_REQUEST, fetchUserNotificationsSaga);
}
  
export default userNotificationSaga;