import axios from "axios";

export const getContestsList = async (token, accountId, offset, limit) => {
  // console.log(token, accountId, 'token and account Id')
  try {
    if (!token && !accountId) {
      const response = await axios.get(`contests/v2/contests?limit=${limit}&&offset=${offset}`);
      return response.data;
    }
    else {
      const response = await axios.get(
        `contests/v2/contests/auth?limit=${limit}&&offset=${offset}`,
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

export const getSingleContests = async (token, accountId, contestId, offset, limit) => {
  console.log(token, accountId, contestId, limit, offset)
  try {
    if (!token && !accountId) {
      const response = await axios.get(`contests/v2/contest/${contestId}?participant_list=true&posts=true&winnerLimit=5`);
      return response.data;
    }
    else {
      if(!contestId)
        return "Invalid Contest Id"
      const response = await axios.get(
        `contests/v2/contest/${contestId}/auth?participant_list=true&posts=true&winnerLimit=5`,
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

export const joinContestService = async (token, accountId, contestId, contestActionType) => {
  console.log(contestId, contestActionType,'my type from Saga')
  try {
    const response = await axios.post(`contests/v1/contest/${contestId}/join`,
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