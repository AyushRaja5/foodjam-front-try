// categoriesActions.js
export const GET_CATEGORIES_PRODUCT_REQUEST = 'GET_CATEGORIES_PRODUCT_REQUEST';
export const GET_CATEGORIES_PRODUCT_SUCCESS = 'GET_CATEGORIES_PRODUCT_SUCCESS';
export const GET_CATEGORIES_PRODUCT_FAILURE = 'GET_CATEGORIES_PRODUCT_FAILURE';

  export const getCategoriesProductRequest = ( categoriesId ) => ({
    type: GET_CATEGORIES_PRODUCT_REQUEST,
    payload: { categoriesId },
  });
  
  export const getCategoriesProductSuccess = (data) => ({
    type: GET_CATEGORIES_PRODUCT_SUCCESS,
    payload: data,
  });
  
  export const getCategoriesProductFailure = (error) => ({
    type: GET_CATEGORIES_PRODUCT_FAILURE,
    payload: error,
  });
  