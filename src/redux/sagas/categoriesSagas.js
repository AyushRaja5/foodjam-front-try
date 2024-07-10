// categoriesSagas.js
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    GET_CATEGORIES_PRODUCT_REQUEST,
  getCategoriesProductSuccess,
  getCategoriesProductFailure,
} from '../actions/categoriesActions';

import { getCategoriesProduct } from '../../services/Shop/ShopServices';


function* getCategoriesProductSaga(action) {
  try {
    const user = JSON.parse(localStorage.getItem('foodjam-user'));
    const token = user ? user.sessionToken : null;
    const accountId = user ? user.account_id : null;
    const {categoriesId}  = action.payload
    const data = yield call(getCategoriesProduct,  token, accountId, categoriesId);
    yield put(getCategoriesProductSuccess(data));
  } catch (error) {
    yield put(getCategoriesProductFailure(error.message));
  }
}

function* categoriesSaga() {
  yield takeLatest(GET_CATEGORIES_PRODUCT_REQUEST, getCategoriesProductSaga);
}

export default categoriesSaga