// src/services/Profile/UserAddress.js
import axios from 'axios';

export const getUserAddressAPI = async (token, accountId, addressparams) => {
  // const { limit, offset } = addressparams;
  try {
    const response = await axios.get(
      `products/v1/product/address/get`,
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

export const addUserAddressAPI = async (token, accountId, addressData) => {
  try {
    const response = await axios.post(
      `products/v1/product/address/add`,
      addressData,
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

export const updateUserAddressAPI = async (token, accountId, addressId, addressData) => {
  try {
    const response = await axios.patch(
      `products/v1/product/address/edit?address_id=${addressId}`,
      addressData,
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

export const deleteUserAddressAPI = async (token, accountId, addressId) => {
  try {
    const response = await axios.delete(
      `products/v1/product/address/remove/${addressId}`,
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

