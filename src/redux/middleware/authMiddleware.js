// src/redux/middleware/authMiddleware.js

import { VerifyOTP } from '../../services/LoginService';
import { loginSuccess, loginFailure, loginRequest } from '../actions/authActions';
import { LOGIN_REQUEST } from '../actions/authActions';

const authMiddleware = () => next => action => {
  if (action.type === LOGIN_REQUEST) {
    const { phone, otp } = action.payload;
    // next(loginRequest({ login_type, phone, loading: true }));
    VerifyOTP({ phone, otp })
      .then((response) => {
        console.log(response?.data,'token value')
        const token = response?.data?.sessionToken;
        // {otp : 737590}
        // const accountid = response.data.account_id;
        // const sessionUserName =  response.data.first_name || response.data.username
        // console.log(token, 'token generated', accountid, 'accountId')
        // sessionStorage.setItem('foodjamUserToken', token);
        // sessionStorage.setItem('foodjamUserId', accountid);
        // sessionStorage.setItem('foodjamUserName', sessionUserName);
        next(loginSuccess(token));
      })
      .catch((error) => {
        console.error('Login failed:', error);
        next(loginFailure(error));
      })
      .finally(() => {
        next(loginRequest({ loading: false })); // Dispatch login request with loading state set to false after the request completes
      });
  } else {
    return next(action);
  }
};

export default authMiddleware;
