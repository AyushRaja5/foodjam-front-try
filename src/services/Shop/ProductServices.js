import axios from 'axios';

export const getSingleProduct = async (token, accountId, productId) => {
    try {
      if (!token && !accountId) {
        const response = await axios.get(`products/v1/product/${productId}`);
        return response.data;
      }
      else {
        if(!productId)
          return "Invalid Product Id"
        const response = await axios.get(
          `products/v1/product/${productId}/auth`,
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
  