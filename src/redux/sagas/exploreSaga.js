// exploreSagas.js
import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_EXPLORE_DATA_REQUEST, fetchExploreSuccess, 
    fetchExploreFailure, FETCH_LEADERBOARD_REQUEST,
    fetchLeaderboardSuccess,
    fetchLeaderboardFailure, 

    FOLLOW_USER_REQUEST,
    followUserSuccess,
    followUserFailure,} from '../actions/ExploreActions';
import {getExploreSequenceService, getLeaderBoardService, followUser} from '../../services/Explore/ExploreService'

function* fetchExploreData() {
  try {
    // const params = action.payload;
    const user = JSON.parse(localStorage.getItem('foodjam-user'));
    const token = user ? user.sessionToken : null;
    const accountId = user ? user.account_id : null;
    const response = yield call(getExploreSequenceService, token, accountId);
    yield put(fetchExploreSuccess(response.data));
  } catch (error) {
    yield put(fetchExploreFailure(error.message));
  }
}

function* fetchLeaderboardSaga(action) {
  try {
    const { filterDate } = action.payload;
    const user = JSON.parse(localStorage.getItem('foodjam-user'));
    const token = user ? user.sessionToken : null;
    const accountId = user ? user.account_id : null;
    const data = yield call(getLeaderBoardService, token, accountId, filterDate);
    yield put(fetchLeaderboardSuccess(data));
  } catch (error) {
    yield put(fetchLeaderboardFailure(error.message));
  }
}

function* handleFollowUser(action) {
  try {
    const user = JSON.parse(localStorage.getItem('foodjam-user'));
    const token = user ? user.sessionToken : null;
    const accountId = user ? user.account_id : null;
    const { accountToFollow } = action.payload;
    const data = yield call(followUser, token, accountId, accountToFollow);
    yield put(followUserSuccess(data));
  } catch (error) {
    yield put(followUserFailure(error.message));
  }
}

function* exploreDataSaga() {
  yield takeLatest(FETCH_EXPLORE_DATA_REQUEST, fetchExploreData);
  yield takeLatest(FETCH_LEADERBOARD_REQUEST, fetchLeaderboardSaga);
  yield takeLatest(FOLLOW_USER_REQUEST, handleFollowUser);
}

export default exploreDataSaga;
