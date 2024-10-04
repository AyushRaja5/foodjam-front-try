// src/redux/sagas/contestSaga.js

import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_CONTESTS_REQUEST,
  fetchContestsSuccess,
  fetchContestsFailure,

  FETCH_SINGLE_CONTEST_REQUEST,
  fetchSingleContestSuccess,
  fetchSingleContestFailure,

  JOIN_CONTEST_REQUEST,
  joinContestSuccess,
  joinContestFailure,
} from '../actions/contestActions';
import { getContestsList, getSingleContests, joinContestService } from '../../services/Explore/ContestService';

function* fetchContestsSaga(action) {
  try {
    const { limit, offset } = action.payload;
    const user = JSON.parse(localStorage.getItem('foodjam-user'));
    const token = user ? user.sessionToken : null;
    const accountId = user ? user.account_id : null;
    const contests = yield call(getContestsList, token, accountId, limit, offset);
    yield put(fetchContestsSuccess(contests));
  } catch (error) {
    yield put(fetchContestsFailure(error.message));
  }
}

function* fetchSingleContestSaga(action) {
  try {
    const { contestId, offset, limit } = action.payload;
    const user = JSON.parse(localStorage.getItem('foodjam-user'));
    const token = user ? user.sessionToken : null;
    const accountId = user ? user.account_id : null;
    const contest = yield call(getSingleContests, token, accountId, contestId, offset, limit);
    yield put(fetchSingleContestSuccess(contest));
  } catch (error) {
    yield put(fetchSingleContestFailure(error.message));
  }
}

function* joinContestSaga(action) {
  try {
    const user = JSON.parse(localStorage.getItem('foodjam-user'));
    const token = user ? user.sessionToken : null;
    const accountId = user ? user.account_id : null;
    const { contestId, contestActionType } = action.payload;
    const response = yield call(joinContestService, token, accountId, contestId, contestActionType);
    yield put(joinContestSuccess(response));
  } catch (error) {
    yield put(joinContestFailure(error.message));
  }
}

function* contestSaga() {
    yield takeLatest(FETCH_CONTESTS_REQUEST, fetchContestsSaga);
    yield takeLatest(FETCH_SINGLE_CONTEST_REQUEST, fetchSingleContestSaga);
    yield takeLatest(JOIN_CONTEST_REQUEST, joinContestSaga);
}
  
export default contestSaga;
  