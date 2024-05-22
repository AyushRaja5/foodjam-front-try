// storeProductsSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_STORE_PRODUCT_REQUEST,
  fetchStoreProductSuccess,
  fetchStoreProductFailure,
} from '../actions/storeProductsActions';
import { GetStoreMyproductService } from '../../services/Profile/Store';

function* fetchStoreProducts(action) {
  try {
    const params = action.payload;
    
    const token = JSON.parse(localStorage.getItem('foodjam-user')).sessionToken;
    const accountId = JSON.parse(localStorage.getItem('foodjam-user')).account_id;
    const response = yield call(GetStoreMyproductService, token, accountId, params);

    yield put(fetchStoreProductSuccess(response.data));
  } catch (error) {
    yield put(fetchStoreProductFailure(error));
  }
}

function* storeProductsSaga() {
  yield takeLatest(FETCH_STORE_PRODUCT_REQUEST, fetchStoreProducts);
}

export default storeProductsSaga;
