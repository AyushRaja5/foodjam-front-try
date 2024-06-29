// src/redux/sagas.js
import { call, put, takeLatest } from 'redux-saga/effects';
import { getSingleBrand, followBrandsService } from '../../services/Explore/BrandService';
import {
  FETCH_SINGLE_BRAND_REQUEST,
  FETCH_SINGLE_BRAND_SUCCESS,
  FETCH_SINGLE_BRAND_FAILURE,
  FOLLOW_BRAND_REQUEST,
  FOLLOW_BRAND_SUCCESS,
  FOLLOW_BRAND_FAILURE,
} from '../actions/brandActions';

function* fetchSingleBrandSaga(action) {

  try {
    const { brandId } = action.payload;
    const user = JSON.parse(localStorage.getItem('foodjam-user'));
    const token = user ? user.sessionToken : null;
    const accountId = user ? user.account_id : null;
    const brand = yield call(getSingleBrand, token, accountId, brandId);
    yield put({ type: FETCH_SINGLE_BRAND_SUCCESS, payload: brand });
  } catch (error) {
    yield put({ type: FETCH_SINGLE_BRAND_FAILURE, payload: error.message });
  }
}

function* followBrandSaga(action) {
  try {
    const user = JSON.parse(localStorage.getItem('foodjam-user'));
    const token = user ? user.sessionToken : null;
    const accountId = user ? user.account_id : null;
    const { brandId } = action.payload;
    const response = yield call(followBrandsService, token, accountId, brandId);
    yield put({ type: FOLLOW_BRAND_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: FOLLOW_BRAND_FAILURE, payload: error.message });
  }
}

function* brandSaga() {
  yield takeLatest(FETCH_SINGLE_BRAND_REQUEST, fetchSingleBrandSaga);
  yield takeLatest(FOLLOW_BRAND_REQUEST, followBrandSaga);
}

export default brandSaga;
