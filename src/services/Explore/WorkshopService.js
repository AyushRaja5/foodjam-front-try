import axios from "axios";

export const getWorkshopList = async (token, accountId, offset, limit) => {
  // console.log(token, accountId, 'token and account Id')
  try {
    if (!token && !accountId) {
      const response = await axios.get(`workshops/v2/workshops?limit=${limit}&offset=${offset}`);
      return response.data;
    }
    else {
      const response = await axios.get(
        `workshops/v2/workshops?limit=${limit}&offset=${offset}`,
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

export const getSingleWorkshop = async (token, accountId, workshopId, offset, limit) => {
  // console.log(token, accountId, workshopId, limit, offset)
  try {
    if (!token && !accountId) {
      const response = await axios.get(`workshops/v1/workshop/${workshopId}`);
      return response.data;
    }
    else {
      if(!workshopId)
        return "Invalid Workshop Id"
      const response = await axios.get(
        `workshops/v1/workshop/${workshopId}`,
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

export const joinWorkshopService = async (token, accountId, workshopId, campaignActionType) => {
  console.log(workshopId, campaignActionType,'my type from Saga')
  try {
    const response = await axios.post(`workshops/v2/workshops/${workshopId}/join`,
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