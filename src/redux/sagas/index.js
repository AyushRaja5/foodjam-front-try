// sagas/index.js
import { all } from 'redux-saga/effects';
import authSaga from './authSaga'
import dashboardStateSaga from './dashboardStateSaga';
import postByIdSaga from './postByIdSaga';
import savedPostsProductsSaga from './savedPostsProductsSaga';
import storeProductsSaga from './storeProductsSaga';
import userProfileByAccountIdSaga from './userProfileByAccountIdSaga';
import userOrderSaga from './userOrderSaga';
import userAddressSaga from './userAddressSaga';
import userNotificationSaga from './userNotificationSaga';
import userPreferencesSaga from './userPreferencesSaga';
import cartSaga from './cartSaga';
import bankUpiSaga from './bankDetailsSaga';
import exploreDataSaga from './exploreSaga';
import contestSaga from './contestSaga';
import rewardsSaga from './rewardsSaga';
import campaignSaga from './campaignSaga';
import brandSaga from './brandSaga';
import shopSaga from './shopSaga';
import productSaga from './productSaga';
export default function* rootSaga() {
  yield all([
    authSaga(),
    dashboardStateSaga(),
    postByIdSaga(),
    savedPostsProductsSaga(),
    storeProductsSaga(),
    userProfileByAccountIdSaga(),
    userOrderSaga(),
    userNotificationSaga(),
    userAddressSaga(),
    userPreferencesSaga(),
    cartSaga(),
    bankUpiSaga(),
    exploreDataSaga(),
    contestSaga(),
    rewardsSaga(),
    campaignSaga(),
    brandSaga(),
    shopSaga(),
    productSaga(),
  ]);
}
