// sagas/shopSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_SHOP_REQUEST, fetchShopSuccess, fetchShopFailure,  
  GET_SHOP_VIEW_ALL_REQUEST, getShopViewAllSuccess, getShopViewAllFailure, } from '../actions/shopActions';
import { getShopService, getShopViewAllbyTitle } from '../../services/Shop/ShopServices';

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

function* fetchShopViewAllbyTitle(action) {
  try {
    const user = JSON.parse(localStorage.getItem('foodjam-user'));
    const token = user ? user.sessionToken : null;
    const accountId = user ? user.account_id : null;
    const {offset, limit, title}  = action.payload
    const data = yield call(getShopViewAllbyTitle, token, accountId, offset, limit, title);
    yield put(getShopViewAllSuccess(data));
  } catch (error) {
    yield put(getShopViewAllFailure(error.message));
  }
}

function* shopSaga() {
  yield takeLatest(FETCH_SHOP_REQUEST, fetchShopSaga);
  yield takeLatest(GET_SHOP_VIEW_ALL_REQUEST, fetchShopViewAllbyTitle);
}

export default shopSaga;
