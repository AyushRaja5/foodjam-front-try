// dashboardStateSaga.js

import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_STATS_REQUEST,
  fetchStatsSuccess,
  fetchStatsFailure,
} from '../actions/dashboardStateActions';
import { GetDashboardStatesService } from '../../services/Profile/dashboardStates';

function* fetchStats() {
  try {
    const token = JSON.parse(localStorage.getItem('foodjam-user'))?.sessionToken;
    const accountId = JSON.parse(localStorage.getItem('foodjam-user'))?.account_id;

    // const response = yield call(
    //   axios.get,
    //   'https://development-api.commeat.com/users/v2/users/stats',
    //   {
    //     headers: {
    //       'x-access-token': token,
    //       'x-access-user': accountId,
    //     },
    //   }
    // );
    const response = yield call(GetDashboardStatesService, token, accountId);


    yield put(fetchStatsSuccess(response.data));
  } catch (error) {
    yield put(fetchStatsFailure(error));
  }
}

function* dashboardStateSaga() {
  yield takeLatest(FETCH_STATS_REQUEST, fetchStats);
}

export default dashboardStateSaga;
