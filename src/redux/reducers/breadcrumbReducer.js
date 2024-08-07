import { SET_BREADCRUMB_TITLE, CLEAR_BREADCRUMB_TITLE } from '../actions/breadcrumbActions';

const initialState = {
  breadcrumbTitles: {}
};

const breadcrumbReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BREADCRUMB_TITLE:
      return {
        ...state,
        breadcrumbTitles: {
          ...state.breadcrumbTitles,
          [action.payload.path]: action.payload.title
        }
      };
    case CLEAR_BREADCRUMB_TITLE:
      const newTitles = { ...state.breadcrumbTitles };
      delete newTitles[action.payload.path];
      return {
        ...state,
        breadcrumbTitles: newTitles
      };
    default:
      return state;
  }
};

export default breadcrumbReducer;
