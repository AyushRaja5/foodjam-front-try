// src/services/Profile/UserPreferences.js
import axios from 'axios';

export const getUserPreferencesAPI = async (token, accountId) => {
  try {
    const response = await axios.get(
      `users/v1/users/preferences`,
      {
        headers: {
          'x-access-token': token,
          'x-access-user': accountId,
        }, 
      }
    );
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const addUserPreferencesAPI = async (token, accountId, preferenceData) => {
  console.log(preferenceData)
  try {
    const response = await axios.post(
      `users/v1/users/preferences`,
      preferenceData,
      {
        headers: {
          'x-access-token': token,
          'x-access-user': accountId,
        },
      }
    );
    // console.log(response,'response from api')
    return response.data;
  } catch (error) {
    throw error;
  }
};
