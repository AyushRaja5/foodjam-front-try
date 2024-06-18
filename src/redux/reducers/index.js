// reducers/index.js

import { combineReducers } from 'redux';
import {authReducer, signupReducer} from './authReducer';
import dashboardStateReducer from './dashboardStateReducer';
import postByIdReducer from './postByIdReducer';
import savedPostsProductsReducer from './savedPostsProductsReducer';
import storeProductsReducer from './storeProductsReducer';
import userProfileByAccountIdReducer from './userProfileByAccountIdReducer'
import userOrderReducer from './userOrderReducer'
import userAddressReducer from './userAddressReducer';
import userPreferencesReducer from './userPreferencesReducer';
import userNotificationReducer from './userNotificationReducer'
import cartReducer from './cartReducer'
import bankDetailsReducer from './bankDetailsReducer'
import exploreReducer from './ExploreReducer'
import contestReducer from './contestReducer'

const rootReducer = combineReducers({
  authUser : authReducer,
  signUpUser: signupReducer,
  dashboardState : dashboardStateReducer,
  postById : postByIdReducer,
  savedPosts :  savedPostsProductsReducer,
  storeProducts : storeProductsReducer,
  userProfile : userProfileByAccountIdReducer,
  userOrder : userOrderReducer,
  userAddress : userAddressReducer,
  userPreferences : userPreferencesReducer,
  userNotification : userNotificationReducer,
  cartProducts : cartReducer,
  bankDetails : bankDetailsReducer,
  exploreData : exploreReducer,
  contestData : contestReducer
  // Add other reducers here if needed
});

export default rootReducer;
