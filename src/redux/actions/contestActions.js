// src/redux/actions/contestActions.js

export const FETCH_CONTESTS_REQUEST = 'FETCH_CONTESTS_REQUEST';
export const FETCH_CONTESTS_SUCCESS = 'FETCH_CONTESTS_SUCCESS';
export const FETCH_CONTESTS_FAILURE = 'FETCH_CONTESTS_FAILURE';

export const FETCH_SINGLE_CONTEST_REQUEST = 'FETCH_SINGLE_CONTEST_REQUEST';
export const FETCH_SINGLE_CONTEST_SUCCESS = 'FETCH_SINGLE_CONTEST_SUCCESS';
export const FETCH_SINGLE_CONTEST_FAILURE = 'FETCH_SINGLE_CONTEST_FAILURE';

export const JOIN_CONTEST_REQUEST = 'JOIN_CONTEST_REQUEST';
export const JOIN_CONTEST_SUCCESS = 'JOIN_CONTEST_SUCCESS';
export const JOIN_CONTEST_FAILURE = 'JOIN_CONTEST_FAILURE';

export const RESET_SUCCESS_MESSAGE = 'RESET_SUCCESS_MESSAGE';

export const fetchContestsRequest = (limit, offset) => ({
  type: FETCH_CONTESTS_REQUEST,
  payload: { limit, offset }
});

export const fetchContestsSuccess = (contests) => ({
  type: FETCH_CONTESTS_SUCCESS,
  payload: contests
});

export const fetchContestsFailure = (error) => ({
  type: FETCH_CONTESTS_FAILURE,
  payload: error
});

export const fetchSingleContestRequest = (contestId, limit, offset) => ({
  type: FETCH_SINGLE_CONTEST_REQUEST,
  payload: { contestId, limit, offset }
});

export const fetchSingleContestSuccess = (contest) => ({
  type: FETCH_SINGLE_CONTEST_SUCCESS,
  payload: contest
});

export const fetchSingleContestFailure = (error) => ({
  type: FETCH_SINGLE_CONTEST_FAILURE,
  payload: error
});

export const joinContestRequest = (contestId, contestActionType) => ({
  type: JOIN_CONTEST_REQUEST,
  payload: { contestId, contestActionType },
});

export const joinContestSuccess = (response) => ({
  type: JOIN_CONTEST_SUCCESS,
  payload: response,
});

export const joinContestFailure = (error) => ({
  type: JOIN_CONTEST_FAILURE,
  payload: error,
});

export const resetSuccessMessage = () => ({
  type: RESET_SUCCESS_MESSAGE,
});