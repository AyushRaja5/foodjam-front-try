// src/redux/actions/brandActions.js

export const FETCH_SINGLE_BRAND_REQUEST = 'FETCH_SINGLE_BRAND_REQUEST';
export const FETCH_SINGLE_BRAND_SUCCESS = 'FETCH_SINGLE_BRAND_SUCCESS';
export const FETCH_SINGLE_BRAND_FAILURE = 'FETCH_SINGLE_BRAND_FAILURE';

export const FOLLOW_BRAND_REQUEST = 'FOLLOW_BRAND_REQUEST';
export const FOLLOW_BRAND_SUCCESS = 'FOLLOW_BRAND_SUCCESS';
export const FOLLOW_BRAND_FAILURE = 'FOLLOW_BRAND_FAILURE';


export const fetchSingleBrandRequest = (brandId) => ({
  type: FETCH_SINGLE_BRAND_REQUEST,
  payload: {  brandId }
});

export const fetchSingleBrandSuccess = (brand) => ({
  type: FETCH_SINGLE_BRAND_SUCCESS,
  payload: brand
});

export const fetchSingleBrandFailure = (error) => ({
  type: FETCH_SINGLE_BRAND_FAILURE,
  payload: error
});

export const followBrandRequest = ( brandId) => ({
  type: FOLLOW_BRAND_REQUEST,
  payload: { brandId }
});

export const followBrandSuccess = (response) => ({
  type: FOLLOW_BRAND_SUCCESS,
  payload: response
});

export const followBrandFailure = (error) => ({
  type: FOLLOW_BRAND_FAILURE,
  payload: error
});