// src/redux/actions/userPreferencesActions.js

export const FETCH_USER_PREFERENCES_REQUEST = 'FETCH_USER_PREFERENCES_REQUEST';
export const FETCH_USER_PREFERENCES_SUCCESS = 'FETCH_USER_PREFERENCES_SUCCESS';
export const FETCH_USER_PREFERENCES_FAILURE = 'FETCH_USER_PREFERENCES_FAILURE';

export const ADD_USER_PREFERENCE_REQUEST = 'ADD_USER_PREFERENCE_REQUEST';
export const ADD_USER_PREFERENCE_SUCCESS = 'ADD_USER_PREFERENCE_SUCCESS';
export const ADD_USER_PREFERENCE_FAILURE = 'ADD_USER_PREFERENCE_FAILURE';

export const fetchUserPreferencesRequest = () => ({
    type: FETCH_USER_PREFERENCES_REQUEST,
});

export const fetchUserPreferencesSuccess = (preferences) => ({
    type: FETCH_USER_PREFERENCES_SUCCESS,
    payload: preferences
});

export const fetchUserPreferencesFailure = (error) => ({
    type: FETCH_USER_PREFERENCES_FAILURE,
    payload: error
});

export const addUserPreferenceRequest = (preferenceData) => ({
    type: ADD_USER_PREFERENCE_REQUEST,
    payload: preferenceData
});

export const addUserPreferenceSuccess = (response) => ({
    type: ADD_USER_PREFERENCE_SUCCESS,
    payload: response
});

export const addUserPreferenceFailure = (error) => ({
    type: ADD_USER_PREFERENCE_FAILURE,
    payload: error
});
