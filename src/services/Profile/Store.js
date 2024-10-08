import axios from 'axios';

export const GetStoreMyproductService = async (token, accountId, postparams)  => {
  const { limit, offset, account_id} = postparams;
    try {
      if(!token){
        const response = await axios.get(`posts/v3/auth/posts/${account_id}?limit=${limit}&offset=${offset}`);
        return response;
      }
      const response = await axios.get(
        `posts/v3/auth/posts/${account_id}?limit=${limit}&offset=${offset}`,
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