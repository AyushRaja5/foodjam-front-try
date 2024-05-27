// src/redux/reducers/userNotificationReducer.js

import {
  FETCH_USER_NOTIFICATION_REQUEST,
  FETCH_USER_NOTIFICATION_SUCCESS,
  FETCH_USER_NOTIFICATION_FAILURE
} from '../actions/userNotificationActions';

const initialState = {
  loading: false,
  usernotification: [],
  error: null,
};

const userNotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        usernotification: action.payload,
      };
    case FETCH_USER_NOTIFICATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userNotificationReducer;
