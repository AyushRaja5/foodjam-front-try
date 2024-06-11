// exploreSagas.js
import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_EXPLORE_DATA_REQUEST, fetchExploreSuccess, 
    fetchExploreFailure, FETCH_LEADERBOARD_REQUEST,
    fetchLeaderboardSuccess,
    fetchLeaderboardFailure, } from '../actions/ExploreActions';
import {getExploreSequenceService, getLeaderBoardService} from '../../services/Explore/ExploreService'

function* fetchExploreData() {
  try {
    // const params = action.payload;
    const token = JSON.parse(localStorage.getItem('foodjam-user')).sessionToken;
    const accountId = JSON.parse(localStorage.getItem('foodjam-user')).account_id;
    const response = yield call(getExploreSequenceService, token, accountId);
    yield put(fetchExploreSuccess(response.data));
  } catch (error) {
    yield put(fetchExploreFailure(error.message));
  }
}

function* fetchLeaderboardSaga(action) {
  try {
    const { filterDate } = action.payload;
    const token = JSON.parse(localStorage.getItem('foodjam-user')).sessionToken;
    const accountId = JSON.parse(localStorage.getItem('foodjam-user')).account_id;
    const data = yield call(getLeaderBoardService, token, accountId, filterDate);
    yield put(fetchLeaderboardSuccess(data));
  } catch (error) {
    yield put(fetchLeaderboardFailure(error.message));
  }
}


function* exploreDataSaga() {
  yield takeLatest(FETCH_EXPLORE_DATA_REQUEST, fetchExploreData);
  yield takeLatest(FETCH_LEADERBOARD_REQUEST, fetchLeaderboardSaga);
}

export default exploreDataSaga;
