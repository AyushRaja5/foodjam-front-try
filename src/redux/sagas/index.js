// sagas/index.js
import { all } from 'redux-saga/effects';
import authSaga from './authSaga'
import dashboardStateSaga from './dashboardStateSaga';
import postByIdSaga from './postByIdSaga';
import savedPostsProductsSaga from './savedPostsProductsSaga';
import storeProductsSaga from './storeProductsSaga';
import userProfileByAccountIdSaga from './userProfileByAccountIdSaga';
export default function* rootSaga() {
  yield all([
    authSaga(),
    dashboardStateSaga(),
    postByIdSaga(),
    savedPostsProductsSaga(),
    storeProductsSaga(),
    userProfileByAccountIdSaga()
  ]);
}
