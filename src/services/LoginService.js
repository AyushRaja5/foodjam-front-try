// src/services/LoginService.js

import axios from 'axios';

export const LoginUser = async (data) => {
  try {
    const response = await axios.post(
      `users/v2/user/login`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error,'Error when giving number')
    throw new Error(error);
  }
}

export const VerifyOTP = async (data) => {
  // console.log('from backend', data)
  try {
    const response = await axios.post(
      'users/v1/user/verify/otp',
      data
    );
    return response.data;
  } catch (error) {
    // console.log("Error from api when otp varify", error.response.data.message)
    throw new Error(error.response.data.message);
  }
}
export const RegisterWithOTP = async (data) => {
  try {
    const response = await axios.post(
      'users/v1/user/register',
      data
    );
    return response.data;
  } catch (error) {
    console.log("Error from api when otp varify in register", error.response.data.message)
    throw new Error(error.response.data.message);
  }
}