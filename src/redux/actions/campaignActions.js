// src/redux/actions/campaignActions.js

export const FETCH_CAMPAIGNS_REQUEST = 'FETCH_CAMPAIGNS_REQUEST';
export const FETCH_CAMPAIGNS_SUCCESS = 'FETCH_CAMPAIGNS_SUCCESS';
export const FETCH_CAMPAIGNS_FAILURE = 'FETCH_CAMPAIGNS_FAILURE';

export const FETCH_SINGLE_CAMPAIGN_REQUEST = 'FETCH_SINGLE_CAMPAIGN_REQUEST';
export const FETCH_SINGLE_CAMPAIGN_SUCCESS = 'FETCH_SINGLE_CAMPAIGN_SUCCESS';
export const FETCH_SINGLE_CAMPAIGN_FAILURE = 'FETCH_SINGLE_CAMPAIGN_FAILURE';

export const JOIN_CAMPAIGN_REQUEST = 'JOIN_CAMPAIGN_REQUEST';
export const JOIN_CAMPAIGN_SUCCESS = 'JOIN_CAMPAIGN_SUCCESS';
export const JOIN_CAMPAIGN_FAILURE = 'JOIN_CAMPAIGN_FAILURE';

export const fetchCampaignsRequest = (offset, limit) => ({
  type: FETCH_CAMPAIGNS_REQUEST,
  payload: { offset, limit }
});

export const fetchCampaignsSuccess = (campaigns) => ({
  type: FETCH_CAMPAIGNS_SUCCESS,
  payload: campaigns
});

export const fetchCampaignsFailure = (error) => ({
  type: FETCH_CAMPAIGNS_FAILURE,
  payload: error
});

export const fetchSingleCampaignRequest = (campaignId) => ({
  type: FETCH_SINGLE_CAMPAIGN_REQUEST,
  payload: { campaignId }
});

export const fetchSingleCampaignSuccess = (campaign) => ({
  type: FETCH_SINGLE_CAMPAIGN_SUCCESS,
  payload: campaign
});

export const fetchSingleCampaignFailure = (error) => ({
  type: FETCH_SINGLE_CAMPAIGN_FAILURE,
  payload: error
});

export const joinCampaignRequest = (campaignId, campaignActionType) => ({
  type: JOIN_CAMPAIGN_REQUEST,
  payload: { campaignId, campaignActionType }
});

export const joinCampaignSuccess = (response) => ({
  type: JOIN_CAMPAIGN_SUCCESS,
  payload: response
});

export const joinCampaignFailure = (error) => ({
  type: JOIN_CAMPAIGN_FAILURE,
  payload: error
});
