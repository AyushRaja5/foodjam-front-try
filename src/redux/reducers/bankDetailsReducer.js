// src/redux/reducers/bankDetailsReducer.js

import {
    FETCH_BANK_UPI_DETAILS_REQUEST,
    FETCH_BANK_UPI_DETAILS_SUCCESS,
    FETCH_BANK_UPI_DETAILS_FAILURE,
    ADD_BANK_UPI_DETAILS_REQUEST,
    ADD_BANK_UPI_DETAILS_SUCCESS,
    ADD_BANK_UPI_DETAILS_FAILURE,
    DELETE_BANK_UPI_DETAILS_REQUEST,
    DELETE_BANK_UPI_DETAILS_SUCCESS,
    DELETE_BANK_UPI_DETAILS_FAILURE,
    FETCH_PAYOUT_HISTORY_REQUEST,
    FETCH_PAYOUT_HISTORY_SUCCESS,
    FETCH_PAYOUT_HISTORY_FAILURE,
    RESET_BANK_UPI_DETAILS_RESPONSE_MESSAGE,
    RESET_BANK_UPI_DETAILS_ERROR,
    WITHDRAW_REQUEST,
    WITHDRAW_SUCCESS,
    WITHDRAW_FAILURE,
    RESET_WITHDRAW_RESPONSE_MESSAGE,
    RESET_WITHDRAW_ERROR
  } from '../actions/bankDetailsActions';
  
  const initialState = {
    bankUpiDetails: [],
    loading: false,
    error: null,
    responseMessage: null,
    payoutHistory: [],
    payoutLoading: false,
    payoutError: null,
    withdrawLoading: false,
    withdrawError: null
  };
  
  const bankDetailsReducer = (state = initialState, action) => {
    // console.log(action.payload)
    switch (action.type) {
      case FETCH_BANK_UPI_DETAILS_REQUEST:
        return { ...state, loading: true };
      case FETCH_BANK_UPI_DETAILS_SUCCESS:
        return { ...state, loading: false, bankUpiDetails: action.payload };
      case FETCH_BANK_UPI_DETAILS_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      case ADD_BANK_UPI_DETAILS_REQUEST:
        return { ...state, loading: true };
      case ADD_BANK_UPI_DETAILS_SUCCESS:
        return { ...state, loading: false, responseMessage: action.payload };
      case ADD_BANK_UPI_DETAILS_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      case DELETE_BANK_UPI_DETAILS_REQUEST:
        return { ...state, loading: true };
      case DELETE_BANK_UPI_DETAILS_SUCCESS:
        return { ...state, loading: false, responseMessage: action.payload };
      case DELETE_BANK_UPI_DETAILS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      
      case RESET_BANK_UPI_DETAILS_RESPONSE_MESSAGE:
        return { ...state, responseMessage: null };
      case RESET_BANK_UPI_DETAILS_ERROR:
        return { ...state, error: null };
  
      case FETCH_PAYOUT_HISTORY_REQUEST:
        return { ...state, payoutLoading: true };
      case FETCH_PAYOUT_HISTORY_SUCCESS:
        return { ...state, payoutLoading: false, payoutHistory: action.payload };
      case FETCH_PAYOUT_HISTORY_FAILURE:
        return { ...state, payoutLoading: false, payoutError: action.payload };



      case WITHDRAW_REQUEST:
        return { ...state, withdrawLoading: true };
      case WITHDRAW_SUCCESS:
        return { ...state, withdrawLoading: false, responseMessage: action.payload };
      case WITHDRAW_FAILURE:
        return { ...state, withdrawLoading: false, withdrawError: action.payload };
  
      case RESET_WITHDRAW_RESPONSE_MESSAGE:
        return { ...state, responseMessage: null };
      case RESET_WITHDRAW_ERROR:
        return { ...state, withdrawError: null };
  
      default:
        return state;
    }
  };
  
  export default bankDetailsReducer;