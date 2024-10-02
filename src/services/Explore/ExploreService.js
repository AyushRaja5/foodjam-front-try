import axios from 'axios';
import { toast } from 'react-toastify';

export const getExploreSequenceService = async (token, accountId) => {
  // console.log(token, accountId,'ayush cjeck')
  try {
    if (!token && !accountId) {
      const response = await axios.get(`dynamic/v2/discovery`);
      return response.data;
    }
    else {
      const response = await axios.get(
        `dynamic/v2/discovery/auth`,
        {
          headers: {
            'x-access-token': token,
            'x-access-user': accountId,
          },
        }
      );
      return response.data;
    }
  } catch (error) {
    throw error;
  }
}

export const getPostByResourceId = async (resource_id) => {
  try {
    const response = await axios.get(
      `/posts/v1/auth/post/${resource_id}`,
      // {
      //   headers: {
      //     'x-access-token': token,
      //     'x-access-user': accountId,
      //   },
      // }
    );
    return response.data
  }
  catch (error) {
    throw error
  }
}

export const followUser = async (token, accountId, account_to_follow) => {
  // console.log(account_to_follow,'account to follow')
  try {
    if(!account_to_follow)
        return "Invalid Contest Id"
    const response = await axios.post(
      `users/v1/user/follow?account_id=${account_to_follow}`,
      {account_id:account_to_follow},
      {
        headers: {
          'x-access-token': token,
          'x-access-user': accountId,
        },
      }
    );
    if(response?.data?.message) 
      toast.success(response?.data?.message)
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getLeaderBoardService = async (token, accountId,filterDate) => {
  try {
    if (!token && !accountId) {
      const response = await axios.get( `leaderboards/v1/leaderboard/monthly/${filterDate}`);
      return response.data;
    }
    else {
      const response = await axios.get(
        `leaderboards/v1/leaderboard/monthly/${filterDate}/auth`,
        {
          headers: {
            'x-access-token': token,
            'x-access-user': accountId,
          },
        }
      );
      return response.data;
    }
  } catch (error) {
    throw error;
  }
}