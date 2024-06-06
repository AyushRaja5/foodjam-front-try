// src/services/Profile/UserOrders.js
import axios from 'axios';

export const getUserOrders = async (token, accountId, postparams) => {
    const { limit, offset } = postparams;
    try {
      const response = await axios.get(
        `orders/v1/orders?limit=${limit}&offset=${offset}`,
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
};

export const getOrdersByOrderID = async (token, accountId, orderId) => {
    try {
      const response = await axios.get(
        `orders/v1/order/${orderId}`,
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
