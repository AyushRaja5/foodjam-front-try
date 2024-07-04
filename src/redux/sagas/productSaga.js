import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_SINGLE_PRODUCT_REQUEST,
  fetchSingleProductSuccess,
  fetchSingleProductFailure
} from '../actions/productActions';
import { getSingleProduct} from '../../services/Shop/ProductServices';

function* fetchSingleProductSaga(action) {
  try {
    const { productId } = action.payload;
    const user = JSON.parse(localStorage.getItem('foodjam-user'));
    const token = user ? user.sessionToken : null;
    const accountId = user ? user.account_id : null;
    const product = yield call(getSingleProduct, token, accountId, productId);
    yield put(fetchSingleProductSuccess(product));
  } catch (error) {
    yield put(fetchSingleProductFailure(error.message));
  }
}

function* productSaga() {
    yield takeLatest(FETCH_SINGLE_PRODUCT_REQUEST, fetchSingleProductSaga);
  }
  
export default productSaga;