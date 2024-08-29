// sagas/savedPostsProductsSaga.js

import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_SAVED_POSTS_REQUEST,
  fetchSavedPostsSuccess,
  fetchSavedPostsFailure,
} from '../actions/savedPostsProductsActions';
import { GetSavedPostProductByAccountIdService } from '../../services/Profile/postById';

function* fetchSavedPosts(action) {
  try {
    const { limit, offset } = action.payload;

    const token = JSON.parse(localStorage.getItem('foodjam-user'))?.sessionToken;
    const accountId = JSON.parse(localStorage.getItem('foodjam-user'))?.account_id;
    const response = yield call(GetSavedPostProductByAccountIdService, token, accountId, action.payload);

    yield put(fetchSavedPostsSuccess(response.data));
  } catch (error) {
    yield put(fetchSavedPostsFailure(error));
  }
}

function* savedPostsSaga() {
  yield takeLatest(FETCH_SAVED_POSTS_REQUEST, fetchSavedPosts);
}

export default savedPostsSaga;
