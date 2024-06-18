// exploreActions.js
export const FETCH_EXPLORE_DATA_REQUEST = 'FETCH_EXPLORE_DATA_REQUEST';
export const FETCH_EXPLORE_DATA_SUCCESS = 'FETCH_EXPLORE_DATA_SUCCESS';
export const FETCH_EXPLORE_DATA_FAILURE = 'FETCH_EXPLORE_DATA_FAILURE';
export const FETCH_LEADERBOARD_REQUEST = 'FETCH_LEADERBOARD_REQUEST';
export const FETCH_LEADERBOARD_SUCCESS = 'FETCH_LEADERBOARD_SUCCESS';
export const FETCH_LEADERBOARD_FAILURE = 'FETCH_LEADERBOARD_FAILURE';

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE';

export const RESET_SUCCESS_MESSAGE = 'RESET_SUCCESS_MESSAGE';

export const fetchExploreRequest = () => ({
  type: FETCH_EXPLORE_DATA_REQUEST,
});

export const fetchExploreSuccess = (data) => ({
  type: FETCH_EXPLORE_DATA_SUCCESS,
  payload: data,
});

export const fetchExploreFailure = (error) => ({
  type: FETCH_EXPLORE_DATA_FAILURE,
  payload: error,
});

export const fetchLeaderboardRequest = (filterDate) => ({
  type: FETCH_LEADERBOARD_REQUEST,
  payload: { filterDate },
});

export const fetchLeaderboardSuccess = (data) => ({
  type: FETCH_LEADERBOARD_SUCCESS,
  payload: data,
});

export const fetchLeaderboardFailure = (error) => ({
  type: FETCH_LEADERBOARD_FAILURE,
  payload: error,
});

export const followUserRequest = (accountToFollow) => ({
  type: FOLLOW_USER_REQUEST,
  payload: { accountToFollow },
});

export const followUserSuccess = (data) => ({
  type: FOLLOW_USER_SUCCESS,
  payload: data,
});

export const followUserFailure = (error) => ({
  type: FOLLOW_USER_FAILURE,
  payload: error,
});

export const resetSuccessMessage = () => ({
  type: RESET_SUCCESS_MESSAGE,
});