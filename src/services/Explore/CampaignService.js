import axios from "axios";

export const getCampaignsList = async (token, accountId, offset, limit) => {
  // console.log(token, accountId, 'token and account Id')
  try {
    if (!token && !accountId) {
      const response = await axios.get(`campaigns/v1/campaigns`);
      return response.data;
    }
    else {
      const response = await axios.get(
        `campaigns/v1/campaigns/auth`,
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

export const getSingleCampaigns = async (token, accountId, campaignId, offset, limit) => {
  // console.log(token, accountId, campaignId, limit, offset)
  try {
    if (!token && !accountId) {
      const response = await axios.get(`campaigns/v1/campaign/${campaignId}`);
      return response.data;
    }
    else {
      if(!campaignId)
        return "Invalid Campaign Id"
      const response = await axios.get(
        `campaigns/v1/campaign/${campaignId}`,
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

export const joinCampaignService = async (token, accountId, campaignId, campaignActionType) => {
  console.log(campaignId, campaignActionType,'my type from Saga')
  try {
    const response = await axios.post(`campaigns/v1/campaign/${campaignId}/join`,
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