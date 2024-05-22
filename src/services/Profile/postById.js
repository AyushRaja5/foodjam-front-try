import axios from 'axios';

export const GetPostByIdService = async (token, accountId, postparams)  => {
  const { limit, offset, account_id} = postparams;
    try {
      const response = await axios.get(
        `posts/v2/post/${account_id}?limit=${limit}&offset=${offset}`,
        {
          headers: {
            'x-access-token': token,
            'x-access-user': accountId,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

export const GetSavedPostProductByAccountIdService = async (token, accountId, postparams)  => {
  const { limit, offset} = postparams;
    try {
      const response = await axios.get(
        `posts/v1/posts/status/saved?limit=${limit}&offset=${offset}`,
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