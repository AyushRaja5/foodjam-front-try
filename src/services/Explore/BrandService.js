import axios from "axios";

export const getAllBrand = async (token, accountId, offset, limit) => {
  try {
    if (!token && !accountId) {
      const response = await axios.get(`/products/v1/products/brands?pageSize=${limit}&pageNumber=${offset}`);
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

export const getSingleBrand = async (token, accountId, brandId, offset, limit) => {
  try {
    if (!token && !accountId) {
      const response = await axios.get(`products/v1/products/brands/${brandId}`);
      return response.data.data;
    }
    else {
      const response = await axios.get(
        `products/v1/products/brands/${brandId}/auth`,
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

export const followBrandsService = async (token, accountId, brandId, campaignActionType) => {
    console.log(brandId, campaignActionType,'my type from Saga')
    try {
      const response = await axios.post(`products/v1/products/brands/${brandId}/follows`,
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