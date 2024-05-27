// src/redux/actions/userNotificationActions.js

export const FETCH_USER_NOTIFICATION_REQUEST = 'FETCH_USER_NOTIFICATION_REQUEST';
export const FETCH_USER_NOTIFICATION_SUCCESS = 'FETCH_USER_NOTIFICATION_SUCCESS';
export const FETCH_USER_NOTIFICATION_FAILURE = 'FETCH_USER_NOTIFICATION_FAILURE';

export const fetchUserNotificationsRequest = (limit, offset) => ({
  type: FETCH_USER_NOTIFICATION_REQUEST,
  payload: { limit, offset }
});

export const fetchUserNotificationsSuccess = (userNotification) => ({
  type: FETCH_USER_NOTIFICATION_SUCCESS,
  payload: userNotification
});

export const fetchUserNotificationsFailure = (error) => ({
  type: FETCH_USER_NOTIFICATION_FAILURE,
  payload: error
});
