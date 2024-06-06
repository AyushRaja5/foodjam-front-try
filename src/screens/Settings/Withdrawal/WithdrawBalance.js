import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPayoutHistoryRequest, resetBankUpiDetailsResponseMessage, resetWithdrawError, withdrawRequest } from '../../../redux/actions/bankDetailsActions';
import './Withdrawal.css'
import BankDetails from '../BankDetails/BankDetails';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
const WithdrawBalance = () => {
  const dispatch = useDispatch();
  const { payoutHistory, payoutLoading, error: payoutHistoryError, responseMessage, withdrawError } = useSelector((state) => state.bankDetails);
  const [defaultBankDetail, setDefaultBankDetail] = useState('');
  const state = useSelector((state) => state)
  const handleDefaultBankChange = (defaultDetail) => {
    setDefaultBankDetail(defaultDetail);
  };

  useEffect(() => {
    const currentDate = new Date();
    const endDate = currentDate.toISOString().split('T')[0];
    currentDate.setMonth(currentDate.getMonth() - 3);
    const startDate = currentDate.toISOString().split('T')[0];
    dispatch(fetchPayoutHistoryRequest(10, startDate, 1));
  }, [dispatch]);
  // console.log(payoutHistory?.payout_details)
  const handleWithdrawSubmit = () => {

    const withdrawDetail = {
      beneficiary_id: defaultBankDetail?.detail?.upi_bank_beneficiary_id,
      name: defaultBankDetail?.detail?.upi_details?.account_holder_name,
      email: defaultBankDetail?.detail?.upi_details?.email,
      phone: defaultBankDetail?.detail?.upi_details?.phone,
      amount: payoutHistory?.withdrawalable_balance,
      mode: defaultBankDetail?.detail?.upi_details?.type,
      upi_id: defaultBankDetail?.detail?.upi_details?.upi_id,
    }
    // console.log(withdrawDetail)
    dispatch(withdrawRequest(withdrawDetail)); 
  };

  useEffect(() => {
    if (responseMessage){
      toast.success(responseMessage?.response?.data?.message || responseMessage?.message)
      // dispatch(fetchBankUpiDetailsRequest(10, 1));
      dispatch(resetBankUpiDetailsResponseMessage()); 
    }
    if(withdrawError){
      toast.error(withdrawError?.response?.data?.message || withdrawError?.message)
      // dispatch(fetchBankUpiDetailsRequest(10, 1));
      dispatch(resetWithdrawError());
    }
  }, [dispatch, responseMessage, withdrawError]);


  console.log(responseMessage, 'response from server')
  console.log(state, 'state')
  return (
    <div className='withdraw-balance-container'>
      <div className='withdraw_balance'>
        <div>Withdraw Balance</div>
        <div className='withdraw_balance-text'> &#8377; {payoutHistory?.withdrawalable_balance}</div>
      </div>
      <BankDetails onDefaultBankChange={handleDefaultBankChange} />
      <div className='withdraw-balance-submit'>
        <Button onClick={handleWithdrawSubmit}>Withdraw</Button>
      </div>
    </div>
  )
}

export default WithdrawBalance