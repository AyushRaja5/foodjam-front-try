// reducers/shopReducer.js
import { FETCH_SHOP_REQUEST, FETCH_SHOP_SUCCESS, FETCH_SHOP_FAILURE } from '../actions/shopActions';

const initialState = {
  shop: null,
  loading: false,
  error: null,
};

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SHOP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SHOP_SUCCESS:
      return {
        ...state,
        loading: false,
        shop: action.payload,
      };
    case FETCH_SHOP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
