// src/redux/reducers/campaignReducer.js

import {
    FETCH_CAMPAIGNS_REQUEST,
    FETCH_CAMPAIGNS_SUCCESS,
    FETCH_CAMPAIGNS_FAILURE,
    FETCH_SINGLE_CAMPAIGN_REQUEST,
    FETCH_SINGLE_CAMPAIGN_SUCCESS,
    FETCH_SINGLE_CAMPAIGN_FAILURE,
    JOIN_CAMPAIGN_REQUEST,
    JOIN_CAMPAIGN_SUCCESS,
    JOIN_CAMPAIGN_FAILURE,
  } from '../actions/campaignActions';
  
  const initialState = {
    loading: false,
    campaigns: [],
    singleCampaign: null,
    successMessage: null,
    error: null,
  };
  
  const campaignReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CAMPAIGNS_REQUEST:
      case FETCH_SINGLE_CAMPAIGN_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_CAMPAIGNS_SUCCESS:
        return {
          ...state,
          loading: false,
          campaigns: action.payload,
        };
      case FETCH_SINGLE_CAMPAIGN_SUCCESS:
        return {
          ...state,
          loading: false,
          singleCampaign: action.payload,
        };
      case FETCH_CAMPAIGNS_FAILURE:
      case FETCH_SINGLE_CAMPAIGN_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case JOIN_CAMPAIGN_REQUEST:
        return { ...state, loading: true, error: null };
      case JOIN_CAMPAIGN_SUCCESS:
        return { ...state, loading: false, successMessage: action.payload };
      case JOIN_CAMPAIGN_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default campaignReducer;
  