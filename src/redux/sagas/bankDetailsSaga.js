// src/redux/sagas/bankUpiSaga.js

import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_BANK_UPI_DETAILS_REQUEST,
  ADD_BANK_UPI_DETAILS_REQUEST,
  DELETE_BANK_UPI_DETAILS_REQUEST,
  FETCH_PAYOUT_HISTORY_REQUEST,
  WITHDRAW_REQUEST,
  withdrawSuccess,
  withdrawFailure,
  fetchBankUpiDetailsSuccess,
  fetchBankUpiDetailsFailure,
  addBankUpiDetailsSuccess,
  fetchBankUpiDetailsRequest,
  deleteBankUpiDetailsSuccess,
  addBankUpiDetailsFailure,
  deleteBankUpiDetailsFailure,
  fetchPayoutHistorySuccess,
  fetchPayoutHistoryFailure
} from '../actions/bankDetailsActions';
import { addBankDetailsService, deleteBankDetailsService, getBankDetailsService, getPayoutHistoryService,  withdrawFromUPIService, withdrawFromBankService  } from '../../services/Bank/BankService';

function* fetchBankUpiDetails() {
    try {
      const token = JSON.parse(localStorage.getItem('foodjam-user')).sessionToken;
      const accountId = JSON.parse(localStorage.getItem('foodjam-user')).account_id;
      const response = yield call(getBankDetailsService, token, accountId);
      yield put(fetchBankUpiDetailsSuccess(response.data));
    } catch (error) {
      yield put(fetchBankUpiDetailsFailure(error));
    }
  }

function* addBankUpiDetails(action) {
  try {
    const bankDetail = action.payload;
    const token = JSON.parse(localStorage.getItem('foodjam-user')).sessionToken;
    const accountId = JSON.parse(localStorage.getItem('foodjam-user')).account_id;
    const response = yield call(addBankDetailsService, token, accountId, bankDetail);
    // console.log(response,'response')
    yield put(addBankUpiDetailsSuccess(response))
    yield put(fetchBankUpiDetailsRequest());
  } catch (error) {
    // console.log(error,'error')
    yield put(addBankUpiDetailsFailure(error.response?.data));
  }
}

// Delete Bank or UPI Details
function* deleteBankUpiDetails(action) {
  try {
    const bankDeleteDetail = action.payload;
    const token = JSON.parse(localStorage.getItem('foodjam-user')).sessionToken;
    const accountId = JSON.parse(localStorage.getItem('foodjam-user')).account_id;
    const response = yield call(deleteBankDetailsService, token, accountId, bankDeleteDetail);
    yield put(deleteBankUpiDetailsSuccess(response))
    yield put(fetchBankUpiDetailsRequest());
  } catch (error) {
    yield put(deleteBankUpiDetailsFailure(error?.response?.data));
  }
}

// Fetch Payout History
function* fetchPayoutHistory(action) {
  try {
      const payoutHistory = action.payload;
      const token = JSON.parse(localStorage.getItem('foodjam-user')).sessionToken;
      const accountId = JSON.parse(localStorage.getItem('foodjam-user')).account_id;
      const response = yield call(getPayoutHistoryService, token, accountId, payoutHistory);
      yield put(fetchPayoutHistorySuccess(response.data));
  } catch (error) {
    yield put(fetchPayoutHistoryFailure(error));
  }
}


function* withdraw(action) {
  try {
    const withdrawDetail = action.payload;
    const token = JSON.parse(localStorage.getItem('foodjam-user')).sessionToken;
    const accountId = JSON.parse(localStorage.getItem('foodjam-user')).account_id;
    const response = yield call(
      withdrawDetail.mode === 'upi' ? withdrawFromUPIService : withdrawFromBankService,
      token,
      accountId,
      withdrawDetail
    );
    yield put(withdrawSuccess(response));
  } catch (error) {
    yield put(withdrawFailure(error));
  }
}

// Watcher Saga
function* bankUpiSaga() {
  yield takeLatest(FETCH_BANK_UPI_DETAILS_REQUEST, fetchBankUpiDetails);
  yield takeLatest(ADD_BANK_UPI_DETAILS_REQUEST, addBankUpiDetails);
  yield takeLatest(DELETE_BANK_UPI_DETAILS_REQUEST, deleteBankUpiDetails);
  yield takeLatest(FETCH_PAYOUT_HISTORY_REQUEST, fetchPayoutHistory);
  yield takeLatest(WITHDRAW_REQUEST, withdraw);
}

export default bankUpiSaga;
