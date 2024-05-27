// src/redux/actions/userAddressActions.js

export const FETCH_USER_ADDRESS_REQUEST = 'FETCH_USER_ADDRESS_REQUEST';
export const FETCH_USER_ADDRESS_SUCCESS = 'FETCH_USER_ADDRESS_SUCCESS';
export const FETCH_USER_ADDRESS_FAILURE = 'FETCH_USER_ADDRESS_FAILURE';

export const ADD_USER_ADDRESS_REQUEST = 'ADD_USER_ADDRESS_REQUEST';
export const ADD_USER_ADDRESS_SUCCESS = 'ADD_USER_ADDRESS_SUCCESS';
export const ADD_USER_ADDRESS_FAILURE = 'ADD_USER_ADDRESS_FAILURE';

export const EDIT_USER_ADDRESS_REQUEST = 'EDIT_USER_ADDRESS_REQUEST';
export const EDIT_USER_ADDRESS_SUCCESS = 'EDIT_USER_ADDRESS_SUCCESS';
export const EDIT_USER_ADDRESS_FAILURE = 'EDIT_USER_ADDRESS_FAILURE';

export const DELETE_USER_ADDRESS_REQUEST = 'DELETE_USER_ADDRESS_REQUEST';
export const DELETE_USER_ADDRESS_SUCCESS = 'DELETE_USER_ADDRESS_SUCCESS';
export const DELETE_USER_ADDRESS_FAILURE = 'DELETE_USER_ADDRESS_FAILURE';

export const fetchUserAddresssRequest = (limit, offset) => ({
  type: FETCH_USER_ADDRESS_REQUEST,
  payload: { limit, offset }
});

export const fetchUserAddresssSuccess = (userAddress) => ({
  type: FETCH_USER_ADDRESS_SUCCESS,
  payload: userAddress
});

export const fetchUserAddresssFailure = (error) => ({
  type: FETCH_USER_ADDRESS_FAILURE,
  payload: error
});

export const addUserAddressRequest = (addressData) => ({
  type: ADD_USER_ADDRESS_REQUEST,
  payload: addressData
});

export const addUserAddressSuccess = (addressSuccessMessage) => ({
  type: ADD_USER_ADDRESS_SUCCESS,
  payload: addressSuccessMessage
});

export const addUserAddressFailure = (error) => ({
  type: ADD_USER_ADDRESS_FAILURE,
  payload: error
});

export const editUserAddressRequest = (addressId, addressData) => ({
  type: EDIT_USER_ADDRESS_REQUEST,
  payload: { addressId, addressData }
});

export const editUserAddressSuccess = (addressSuccessMessage) => ({
  type: EDIT_USER_ADDRESS_SUCCESS,
  payload : addressSuccessMessage
});

export const editUserAddressFailure = (error) => ({
  type: EDIT_USER_ADDRESS_FAILURE,
  payload: error
});

export const deleteUserAddressRequest = (addressId) => ({
  type: DELETE_USER_ADDRESS_REQUEST,
  payload: { addressId }
});

export const deleteUserAddressSuccess = (addressData) => ({
  type: DELETE_USER_ADDRESS_SUCCESS,
  payload : addressData
});

export const deleteUserAddressFailure = (error) => ({
  type: DELETE_USER_ADDRESS_FAILURE,
  payload: error
});
