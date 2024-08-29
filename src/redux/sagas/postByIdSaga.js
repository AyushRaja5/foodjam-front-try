// postByIdSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_POST_BY_ID_REQUEST,
  fetchPostByIdSuccess,
  fetchPostByIdFailure,
} from '../actions/postByIdActions';
import { GetPostByIdService } from '../../services/Profile/postById';

function* fetchPostById(action) {
  try {
    const postparams = action.payload;
    
    const token = JSON.parse(localStorage.getItem('foodjam-user'))?.sessionToken;
    const accountId = JSON.parse(localStorage.getItem('foodjam-user'))?.account_id;
    const response = yield call(GetPostByIdService, token, accountId, postparams);

    yield put(fetchPostByIdSuccess(response.data));
  } catch (error) {
    yield put(fetchPostByIdFailure(error));
  }
}

function* postByIdSaga() {
  yield takeLatest(FETCH_POST_BY_ID_REQUEST, fetchPostById);
}

export default postByIdSaga;
