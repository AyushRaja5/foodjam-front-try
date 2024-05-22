// authActions.js

export const FETCH_STATS_REQUEST = 'FETCH_STATS_REQUEST';
export const FETCH_STATS_SUCCESS = 'FETCH_STATS_SUCCESS';
export const FETCH_STATS_FAILURE = 'FETCH_STATS_FAILURE';

export const fetchStatsRequest = () => ({
  type: FETCH_STATS_REQUEST,
});

export const fetchStatsSuccess = (data) => ({
  type: FETCH_STATS_SUCCESS,
  payload: data,
});

export const fetchStatsFailure = (error) => ({
  type: FETCH_STATS_FAILURE,
  payload: error,
});
