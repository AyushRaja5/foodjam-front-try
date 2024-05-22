// src/redux/sagas/authSaga.js

import { call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST, loginSuccess, loginFailure, SIGNUP_REQUEST, signupSuccess, signupFailure } from '../actions/authActions';
import { VerifyOTP, RegisterWithOTP } from '../../services/LoginService';

function* loginUser(action) {
  try {
    const { phone, otp } = action.payload;
    const response = yield call(VerifyOTP, { phone, otp });

    const userData = response.data;
    yield put(loginSuccess(userData));
    console.log(userData, 'data from response authSaga')
    // Store user information in localStorage
    yield call([localStorage, 'setItem'], 'foodjam-user',  JSON.stringify(userData));
    // yield call([localStorage, 'setItem'], 'account_id', userData.account_id);
    // yield call([localStorage, 'setItem'], 'email', userData.email);
    // yield call([localStorage, 'setItem'], 'phone', userData.phone);
    // yield call([localStorage, 'setItem'], 'sessionToken', userData.sessionToken);
    
  } catch (error) {
      console.error('Error setting up request:', error.message);
    yield put(loginFailure(error.message));
  }
}

function* signupUser(action) {
  try {
    console.log(action, 'actions from Auth Saga')
    const { login_type, phone, first_name, email, otp } = action.payload;
    const response = yield call(RegisterWithOTP, {login_type, phone, first_name, email, otp });
    console.log(response, 'response from Sign Up AuthSagaa')
    const userData = response.data;
    yield put(signupSuccess(userData));
    yield call([localStorage, 'setItem'], 'foodjam-user', JSON.stringify(userData));
    
  } catch (error) {
    console.error('Error setting up request:', error.message);
    yield put(signupFailure(error.message));
  }
}

function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, loginUser);
  yield takeLatest(SIGNUP_REQUEST, signupUser);
}

export default authSaga;
