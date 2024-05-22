// storeProductsActions.js

export const FETCH_STORE_PRODUCT_REQUEST = 'FETCH_STORE_PRODUCT_REQUEST';
export const FETCH_STORE_PRODUCT_SUCCESS = 'FETCH_STORE_PRODUCT_SUCCESS';
export const FETCH_STORE_PRODUCT_FAILURE = 'FETCH_STORE_PRODUCT_FAILURE';

export const fetchStoreProductRequest = (account_id, limit, offset) => ({
    type: FETCH_STORE_PRODUCT_REQUEST,
    payload: { account_id, limit, offset },
});

export const fetchStoreProductSuccess = products => ({
    type: FETCH_STORE_PRODUCT_SUCCESS,
    payload: products,
});

export const fetchStoreProductFailure = error => ({
    type: FETCH_STORE_PRODUCT_FAILURE,
    payload: error,
});
