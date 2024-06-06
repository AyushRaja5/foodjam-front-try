import axios from 'axios';

export const deactivateAccount = async (sessionToken, accountId) => {
    // console.log(sessionToken, accountId, 'user')
  try {
    const response = await axios.post(
      `users/v1/user/deactivate`,
      {},
      {
        headers: {
            'x-access-token': sessionToken,
            'x-access-user': accountId,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAccount = async (sessionToken, accountId) => {
  try {
    const response = await axios.delete(
      `/users/v1/users/${accountId}`,
      {},
      {
        headers: {
            'x-access-token': sessionToken,
            'x-access-user': accountId,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
