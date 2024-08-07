// Action Types
export const SET_BREADCRUMB_TITLE = 'SET_BREADCRUMB_TITLE';
export const CLEAR_BREADCRUMB_TITLE = 'CLEAR_BREADCRUMB_TITLE';

// Action Creators
export const setBreadcrumbTitle = (path, title) => ({
  type: SET_BREADCRUMB_TITLE,
  payload: { path, title }
});

export const clearBreadcrumbTitle = (path) => ({
  type: CLEAR_BREADCRUMB_TITLE,
  payload: { path }
});
