import axios from 'axios';
import { toast } from 'react-toastify';

export const getBankDetailsService = async ( token, accountId )  => {

    try {
      const response = await axios.get(
        `users/v1/users/bank`,
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

  export const addBankDetailsService = async ( token, accountId, bankDetail )  => {
    // console.log(bankDetail)
    try {
      const response = await axios.post(
        `users/v1/users/bank`,
        bankDetail,
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

  export const deleteBankDetailsService = async ( token, accountId, bankDetail )  => {
    console.log(bankDetail)
    try {
      const { id, mode } = bankDetail;
      const response = await axios.delete(
        `users/v1/users/${mode}/delete/${id}`,
        {
          headers: {
            'x-access-token': token,
            'x-access-user': accountId,
          },
        }
      );
      console.log(response,'response')
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  export const getPayoutHistoryService = async ( token, accountId, payoutHistory )  => {
    // console.log(payoutHistory)
    try {
      const { limit, tillDate, offset } = payoutHistory;
      const response = await axios.get(
        `users/v1/users/bank/payout?limit=${limit}&till_date=${tillDate}&offset=${offset}`,
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


  export const withdrawFromUPIService = async ( token, accountId, withdrawUPIDetail )  => {
    console.log(withdrawUPIDetail, 'upi call service ')
    try {
      const response = await axios.post(
        `users/v1/users/bank/payout`,
        withdrawUPIDetail,
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

  export const withdrawFromBankService = async ( token, accountId, withdrawBankDetail )  => {
    console.log(withdrawBankDetail, 'bank call service')
    try {
      const response = await axios.post(
        `users/v1/users/bank/payout`,
        withdrawBankDetail,
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