// src/redux/sagas/userOrderSaga.js

import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_USER_ORDERS_REQUEST,
  fetchUserOrdersSuccess,
  fetchUserOrdersFailure,
  FETCH_USER_ORDER_BY_ID_REQUEST,
  fetchUserOrderByIdSuccess,
  fetchUserOrderByIdFailure
} from '../actions/userOrderActions';
import { getUserOrders, getOrdersByOrderID } from '../../services/Profile/UserOrders';

function* fetchUserOrdersSaga(action) {
  try {
    const params = action.payload;
    const token = JSON.parse(localStorage.getItem('foodjam-user'))?.sessionToken;
    const accountId = JSON.parse(localStorage.getItem('foodjam-user'))?.account_id;
    const response = yield call(getUserOrders, token, accountId, params);
    yield put(fetchUserOrdersSuccess(response.data));

  } catch (error) {
    yield put(fetchUserOrdersFailure(error));
  }
}

function* fetchUserOrderByIdSaga(action) {
  try {
    const orderId = action.payload;
    const token = JSON.parse(localStorage.getItem('foodjam-user'))?.sessionToken;
    const accountId = JSON.parse(localStorage.getItem('foodjam-user'))?.account_id;
    const response = yield call(getOrdersByOrderID, token, accountId, orderId);
    yield put(fetchUserOrderByIdSuccess(response.data));
  } catch (error) {
    yield put(fetchUserOrderByIdFailure(error?.response?.data?.message || error?.message));
  }
}
function* userOrderSaga() {
    yield takeLatest(FETCH_USER_ORDERS_REQUEST, fetchUserOrdersSaga);
    yield takeLatest(FETCH_USER_ORDER_BY_ID_REQUEST, fetchUserOrderByIdSaga);
}
  
export default userOrderSaga;