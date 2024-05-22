// reducers/index.js

import { combineReducers } from 'redux';
import {authReducer, signupReducer} from './authReducer';
import dashboardStateReducer from './dashboardStateReducer';
import postByIdReducer from './postByIdReducer';
import savedPostsProductsReducer from './savedPostsProductsReducer';
import storeProductsReducer from './storeProductsReducer';
import userProfileByAccountIdReducer from './userProfileByAccountIdReducer'
const rootReducer = combineReducers({
  authUser : authReducer,
  signUpUser: signupReducer,
  dashboardState : dashboardStateReducer,
  postById : postByIdReducer,
  savedPosts :  savedPostsProductsReducer,
  storeProducts : storeProductsReducer,
  userProfile : userProfileByAccountIdReducer
  // Add other reducers here if needed
});

export default rootReducer;
