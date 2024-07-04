// sagas/shopSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_SHOP_REQUEST, fetchShopSuccess, fetchShopFailure } from '../actions/shopActions';
import { getShopService } from '../../services/Shop/ShopServices';

function* fetchShopSaga() {
  try {
    const user = JSON.parse(localStorage.getItem('foodjam-user'));
    const token = user ? user.sessionToken : null;
    const accountId = user ? user.account_id : null;

    const data = yield call(getShopService, token, accountId);
    yield put(fetchShopSuccess(data));
  } catch (error) {
    yield put(fetchShopFailure(error.message));
  }
}

function* shopSaga() {
  yield takeLatest(FETCH_SHOP_REQUEST, fetchShopSaga);
}

export default shopSaga;
