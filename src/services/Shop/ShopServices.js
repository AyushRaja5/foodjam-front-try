import axios from 'axios';

export const getShopService = async (token, accountId) => {
  // console.log(token, accountId,'ayush cjeck')
  try {
    if (!token && !accountId) {
      const response = await axios.get(`dynamic/v1/shop`);
      return response.data;
    }
    else {
      const response = await axios.get(
        `dynamic/v1/shop/auth`,
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

export const getAllBrand = async (token, accountId, offset, limit) => {
    try {
      if (!token && !accountId) {
        const response = await axios.get(`products/v1/products/brands?pageSize=${limit}&pageNumber=${offset}`);
        return response.data.data;
      }
      else {
        const response = await axios.get(
          `products/v1/products/brands/auth?pageSize=${limit}&pageNumber=${offset}`,
          {
            headers: {
              'x-access-token': token,
              'x-access-user': accountId,
            },
          }
        ); 
        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  }