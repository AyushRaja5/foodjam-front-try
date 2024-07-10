// reducers/shopReducer.js
import { FETCH_SHOP_REQUEST, FETCH_SHOP_SUCCESS, FETCH_SHOP_FAILURE,
  GET_SHOP_VIEW_ALL_REQUEST, GET_SHOP_VIEW_ALL_SUCCESS, GET_SHOP_VIEW_ALL_FAILURE,
 } from '../actions/shopActions';

const initialState = {
  shop: null,
  loading: false,
  VieaAllwithTitle : [],
  error: null,
};

const shopReducer = (state = initialState, action) => {
  // console.log(action,'reducers')
  switch (action.type) {
    case FETCH_SHOP_REQUEST:
    case GET_SHOP_VIEW_ALL_REQUEST:
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
      case GET_SHOP_VIEW_ALL_SUCCESS:
        return {
          ...state,
          loading: false,
          viewAllWithTitle: action.payload,
        };
    case FETCH_SHOP_FAILURE:
      case GET_SHOP_VIEW_ALL_FAILURE:
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
