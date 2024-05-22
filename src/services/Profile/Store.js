import axios from 'axios';

export const GetStoreMyproductService = async (token, accountId, postparams)  => {
  const { limit, offset, account_id} = postparams;
    try {
      const response = await axios.get(
        `posts/v2/auth/posts/${account_id}?limit=${limit}&offset=${offset}`,
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