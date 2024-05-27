// src/redux/sagas/userOrderSaga.js

import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_USER_ORDERS_REQUEST,
  fetchUserOrdersSuccess,
  fetchUserOrdersFailure
} from '../actions/userOrderActions';
import { getUserOrders } from '../../services/Profile/UserOrders';

function* fetchUserOrdersSaga(action) {
  try {
    const params = action.payload;
    const token = JSON.parse(localStorage.getItem('foodjam-user')).sessionToken;
    const accountId = JSON.parse(localStorage.getItem('foodjam-user')).account_id;
    const response = yield call(getUserOrders, token, accountId, params);
    yield put(fetchUserOrdersSuccess(response.data));

  } catch (error) {
    yield put(fetchUserOrdersFailure(error));
  }
}

function* userOrderSaga() {
    yield takeLatest(FETCH_USER_ORDERS_REQUEST, fetchUserOrdersSaga);
}
  
export default userOrderSaga;