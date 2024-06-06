// src/redux/constants/bankDetailActions.js

export const FETCH_BANK_UPI_DETAILS_REQUEST = 'FETCH_BANK_UPI_DETAILS_REQUEST';
export const FETCH_BANK_UPI_DETAILS_SUCCESS = 'FETCH_BANK_UPI_DETAILS_SUCCESS';
export const FETCH_BANK_UPI_DETAILS_FAILURE = 'FETCH_BANK_UPI_DETAILS_FAILURE';

export const ADD_BANK_UPI_DETAILS_REQUEST = 'ADD_BANK_UPI_DETAILS_REQUEST';
export const ADD_BANK_UPI_DETAILS_SUCCESS = 'ADD_BANK_UPI_DETAILS_SUCCESS';
export const ADD_BANK_UPI_DETAILS_FAILURE = 'ADD_BANK_UPI_DETAILS_FAILURE';

export const DELETE_BANK_UPI_DETAILS_REQUEST = 'DELETE_BANK_UPI_DETAILS_REQUEST';
export const DELETE_BANK_UPI_DETAILS_SUCCESS = 'DELETE_BANK_UPI_DETAILS_SUCCESS';
export const DELETE_BANK_UPI_DETAILS_FAILURE = 'DELETE_BANK_UPI_DETAILS_FAILURE';

export const FETCH_PAYOUT_HISTORY_REQUEST = 'FETCH_PAYOUT_HISTORY_REQUEST';
export const FETCH_PAYOUT_HISTORY_SUCCESS = 'FETCH_PAYOUT_HISTORY_SUCCESS';
export const FETCH_PAYOUT_HISTORY_FAILURE = 'FETCH_PAYOUT_HISTORY_FAILURE';

export const RESET_BANK_UPI_DETAILS_RESPONSE_MESSAGE = 'RESET_BANK_UPI_DETAILS_RESPONSE_MESSAGE';
export const RESET_BANK_UPI_DETAILS_ERROR = 'RESET_BANK_UPI_DETAILS_ERROR';

export const WITHDRAW_REQUEST = 'WITHDRAW_REQUEST';
export const WITHDRAW_SUCCESS = 'WITHDRAW_SUCCESS';
export const WITHDRAW_FAILURE = 'WITHDRAW_FAILURE';

export const RESET_WITHDRAW_RESPONSE_MESSAGE = 'RESET_WITHDRAW_RESPONSE_MESSAGE';
export const RESET_WITHDRAW_ERROR = 'RESET_WITHDRAW_ERROR';


export const fetchBankUpiDetailsRequest = () => ({
    type: FETCH_BANK_UPI_DETAILS_REQUEST,
  });
  
  export const fetchBankUpiDetailsSuccess = (details) => ({
    type: FETCH_BANK_UPI_DETAILS_SUCCESS,
    payload: details,
  });
  
  export const fetchBankUpiDetailsFailure = (error) => ({
    type: FETCH_BANK_UPI_DETAILS_FAILURE,
    payload: error,
  });
  
  // Add Bank or UPI Details
  export const addBankUpiDetailsRequest = (details) => ({
    type: ADD_BANK_UPI_DETAILS_REQUEST,
    payload: details,
  });
  
  export const addBankUpiDetailsSuccess = (response) => ({
    type: ADD_BANK_UPI_DETAILS_SUCCESS,
    payload: response,
  });
  
  export const addBankUpiDetailsFailure = (error) => ({
    type: ADD_BANK_UPI_DETAILS_FAILURE,
    payload: error,
  });
  
  // Delete Bank or UPI Details
  export const deleteBankUpiDetailsRequest = (id, mode) => ({
    type: DELETE_BANK_UPI_DETAILS_REQUEST,
    payload: { id, mode },
  });
  
  export const deleteBankUpiDetailsSuccess = (response) => ({
    type: DELETE_BANK_UPI_DETAILS_SUCCESS,
    payload: response,
  });
  
  export const deleteBankUpiDetailsFailure = (error) => ({
    type: DELETE_BANK_UPI_DETAILS_FAILURE,
    payload: error,
  });
  
  export const resetBankUpiDetailsResponseMessage = () => ({
    type: RESET_BANK_UPI_DETAILS_RESPONSE_MESSAGE,
  });
  
  export const resetBankUpiDetailsError = () => ({
    type: RESET_BANK_UPI_DETAILS_ERROR,
  });

  // Fetch Payout History
  export const fetchPayoutHistoryRequest = (limit, tillDate, offset) => ({
    type: FETCH_PAYOUT_HISTORY_REQUEST,
    payload: { limit, tillDate, offset },
  });
  
  export const fetchPayoutHistorySuccess = (history) => ({
    type: FETCH_PAYOUT_HISTORY_SUCCESS,
    payload: history,
  });
  
  export const fetchPayoutHistoryFailure = (error) => ({
    type: FETCH_PAYOUT_HISTORY_FAILURE,
    payload: error,
  });

  
  
  // Withdraw
  export const withdrawRequest = (withdrawDetail) => ({
    type: WITHDRAW_REQUEST,
    payload: withdrawDetail,
  });
  
  export const withdrawSuccess = (response) => ({
    type: WITHDRAW_SUCCESS,
    payload: response,
  });
  
  export const withdrawFailure = (error) => ({
    type: WITHDRAW_FAILURE,
    payload: error,
  });
  
  export const resetWithdrawResponseMessage = () => ({
    type: RESET_WITHDRAW_RESPONSE_MESSAGE,
  });
  
  export const resetWithdrawError = () => ({
    type: RESET_WITHDRAW_ERROR,
  });