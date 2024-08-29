// src/redux/sagas/userAddressSaga.js

import { takeLatest, call, put } from 'redux-saga/effects';
import {
  FETCH_USER_ADDRESS_REQUEST,
  ADD_USER_ADDRESS_REQUEST,
  EDIT_USER_ADDRESS_REQUEST,
  DELETE_USER_ADDRESS_REQUEST,
  fetchUserAddresssSuccess,
  fetchUserAddresssFailure,
  addUserAddressSuccess,
  addUserAddressFailure,
  editUserAddressSuccess,
  editUserAddressFailure,
  deleteUserAddressSuccess,
  deleteUserAddressFailure
} from '../actions/userAddressActions';
import { getUserAddressAPI, addUserAddressAPI, updateUserAddressAPI, deleteUserAddressAPI } from '../../services/Profile/UserAddress';


function* fetchUserAddress(action) {
  try {
    const params = action.payload;
    const token = JSON.parse(localStorage.getItem('foodjam-user'))?.sessionToken;
    const accountId = JSON.parse(localStorage.getItem('foodjam-user'))?.account_id;
    const response = yield call(getUserAddressAPI, token, accountId, params);
    yield put(fetchUserAddresssSuccess(response.data.addresses));
  } catch (error) {
    yield put(fetchUserAddresssFailure(error));
  }
}

function* addUserAddress(action) {
  try {
    const addressData = action.payload;
    const token = JSON.parse(localStorage.getItem('foodjam-user'))?.sessionToken;
    const accountId = JSON.parse(localStorage.getItem('foodjam-user'))?.account_id;
    const response = yield call(addUserAddressAPI, token, accountId, addressData);
    console.log(response,'response')
    yield put(addUserAddressSuccess(response.data))
  } catch (error) {
    console.log(error,'error')
    yield put(addUserAddressFailure(error.response?.data));
  }
}

function* editUserAddress(action) {
  try {
    const { addressId, addressData } = action.payload;
    const token = JSON.parse(localStorage.getItem('foodjam-user'))?.sessionToken;
    const accountId = JSON.parse(localStorage.getItem('foodjam-user'))?.account_id;
    const response = yield call(updateUserAddressAPI, token, accountId, addressId, addressData);
    yield put(editUserAddressSuccess(response.data))
  } catch (error) {
    yield put(editUserAddressFailure(error.message));
  }
}

function* deleteUserAddress(action) {
  try {
    const { addressId } = action.payload;
    const token = JSON.parse(localStorage.getItem('foodjam-user'))?.sessionToken;
    const accountId = JSON.parse(localStorage.getItem('foodjam-user'))?.account_id;
    const response = yield call(deleteUserAddressAPI, token, accountId, addressId);
    yield put(deleteUserAddressSuccess(response.data))
  } catch (error) {
    yield put(deleteUserAddressFailure(error.message));
  }
}

export default function* userAddressSaga() {
  yield takeLatest(FETCH_USER_ADDRESS_REQUEST, fetchUserAddress);
  yield takeLatest(ADD_USER_ADDRESS_REQUEST, addUserAddress);
  yield takeLatest(EDIT_USER_ADDRESS_REQUEST, editUserAddress);
  yield takeLatest(DELETE_USER_ADDRESS_REQUEST, deleteUserAddress);
}
