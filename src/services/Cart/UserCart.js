import axios from 'axios';

export const getUserCartService = async (token, accountId, postparams)  => {
  const { limit, offset, account_id} = postparams;
  // pageSize=10&pageNumber=1
    try {
      const response = await axios.get(
        `products/v1/products/cart?pageSize=${limit}&pageNumber=${offset}`,
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

  export const addProductToCart = async (token, accountId, product) => {
    try {
      const response = await axios.post(
        `products/v1/product/cart/add`,
        product,
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

  export const updateProductToCart = async (token, accountId, product) => {
    try {
      const response = await axios.patch(
        `products/v1/product/cart/update`,
        product,
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

  export const deleteProductFromCart = async (token, accountId, productId) => {
    try {
      const response = await axios.delete(
        `products/v1/product/cart/${productId}`,
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

  export const PaymentProceedService = async (token, accountId, orderObj) => {
    try {
      const response = await axios.post(
        `orders/v1/order/web`,
        orderObj,
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

  export const GetOrderInfoByID = async (token, accountId, orderID) => {
    try {
      const response = await axios.post(
        `orders/v1/order/${orderID}`,
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