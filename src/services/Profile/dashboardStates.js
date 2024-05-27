import axios from 'axios';

export const GetDashboardStatesService = async (token, accountId)  => {
    try {
      const response = await axios.get(
        'users/v2/users/stats',
        {
          headers: {
            'x-access-token': token,
            'x-access-user': accountId,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  export const GetUserProfilebyAccountIdService = async (token, accountId, userparams)  => {
    const { account_id} = userparams;
    try {
      const response = await axios.get(
        `users/v2/user/profile?account_id=${account_id}`,
        {
          headers: {
            'x-access-token': token,
            'x-access-user': accountId,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }