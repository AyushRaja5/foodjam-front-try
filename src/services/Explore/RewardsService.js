import axios from "axios";

export const getRewardsList = async (token, accountId) => {
  try {
    if (!token && !accountId) {
      const response = await axios.get(`rewards/v1/rewards`);
      return response.data;
    }
    else {
      const response = await axios.get(
        `rewards/v1/rewards`,
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


export const getSingleReward = async (token, accountId, rewardId ) => {
  try {
    if (!token && !accountId) {
      const response = await axios.get(`rewards/v1/reward/${rewardId}`);
      return response.data;
    }
    else {
      if(!rewardId)
        return "Invalid Reward Id"
      const response = await axios.get(`rewards/v1/reward/${rewardId}`,
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

export const joinRewardService = async (token, accountId, RewardId, RewardActionType) => {
  console.log(RewardId, RewardActionType,'my type from Saga')
  try {
    const response = await axios.post(`rewards/v1/reward/join/${RewardId}`,
      {},
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
};