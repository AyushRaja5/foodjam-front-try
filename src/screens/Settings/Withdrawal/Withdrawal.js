import React, { useEffect, useState } from 'react'
import './Withdrawal.css'
import { fetchPayoutHistoryRequest } from '../../../redux/actions/bankDetailsActions';
import { useDispatch, useSelector } from 'react-redux';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {
  Divider, Paper, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
  Button, Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import SimpleSnackbar from '../../../components/Snackbar/Snackbar';
const Withdrawal = () => {
  const dispatch = useDispatch();
  const [openWithdrawalFilterDialog, setOpenWithdrawalFilterDialog] = useState(false);
  const [selectedWithdrawalFilterOption, setSelectedWithdrawalFilterOption] = useState('last3Months');
  const { payoutHistory, payoutLoading, error: payoutHistoryError, responseMessage } = useSelector((state) => state.bankDetails);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    const endDate = currentDate.toISOString().split('T')[0];
    currentDate.setMonth(currentDate.getMonth() - 3);
    const startDate = currentDate.toISOString().split('T')[0];
    dispatch(fetchPayoutHistoryRequest(10, startDate, 1));
  }, [dispatch]);

  const handleFilterOptionChange = (event) => {
    setSelectedWithdrawalFilterOption(event.target.value);
  };

  const handleWithdrawalFilterSubmit = () => {
    let endDate;
    let startDate;
    const currentDate = new Date();

    switch (selectedWithdrawalFilterOption) {
      case 'last3Months':
        endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        endDate.setMonth(endDate.getMonth() - 3);
        break;
      case 'last6Months':
        endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        endDate.setMonth(endDate.getMonth() - 6);
        break;
      case 'currYear':
        endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        startDate = `${currentDate.getFullYear() + 1}-04-01`; // Fiscal year starts from April 1st
        endDate = `${currentDate.getFullYear()}-03-31`; // Fiscal year ends on March 31st of the next year
        break;
      case 'lastYear':
        endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        startDate = `${currentDate.getFullYear()}-04-01`; // Fiscal year starts from April 1st
        endDate = `${currentDate.getFullYear() - 1}-03-31`; // Fiscal year ends on March 31st
        break;
      case 'inception':
        startDate = '2023-09-18';
        endDate = new Date();
        break;
      default:
        break;
    }

    const formattedStartDate = startDate ? startDate : null; // If startDate is not defined, set it to null
    const formattedEndDate = endDate ? (typeof endDate === 'string' ? endDate : endDate.toISOString().split('T')[0]) : null; // If endDate is not defined, set it to null
    // console.log(formattedEndDate, 'end')
    dispatch(fetchPayoutHistoryRequest(10, formattedEndDate, 1)); // Dispatch action with selected parameters
    setOpenWithdrawalFilterDialog(false);  // Close the dialog after submitting
  };


  if (payoutLoading)
    return (
      <div className="yourOrders">
        <Stack spacing={1}>
          <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'100%'} height={80} />
          <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'100%'} height={80} />
          <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'100%'} height={80} />
        </Stack>
      </div>
    );

  return (
    <div className="withdrawal-detail">
      <div className="withdrawal-detail-left">
        <div className='withdrawal-table-header typography'>
          <span><strong>Withdrawal History</strong></span>
          <span className='filter-on-date' onClick={() => setOpenWithdrawalFilterDialog(true)}><FilterAltIcon />
            {selectedWithdrawalFilterOption === 'last3Months' ? 'Last 3 Months' :
              selectedWithdrawalFilterOption === 'last6Months' ? 'Last 6 Months' :
                selectedWithdrawalFilterOption === 'currYear' ? 'Current FY' :
                  selectedWithdrawalFilterOption === 'lastYear' ? 'Last FY' :
                    selectedWithdrawalFilterOption === 'inception' ? 'Since Inception' : ''}
          </span>
        </div>
        <TableContainer component={Paper} className="table-container">
          <Table>
            <TableHead sx={{ bgcolor: '#ccc' }}>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Ref. ID</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payoutHistory?.payout_history?.map((history, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ textDecoration: 'underline' }}>{new Date(history.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</TableCell>
                  <TableCell>{history.bank_reference_id}</TableCell>
                  <TableCell>&#8377; {history.amount}</TableCell>
                  <TableCell>{history.bank_status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Divider sx={{ borderWidth: '1px', color: 'red' }} orientation="vertical" variant="fullWidth" flexItem />

      <div className="withdrawal-detail-right">
        <div className="withdrawal-summary">
          <h3>Earning Details</h3>
          <Typography variant="body2" className='typography'><span>Lifetime Earning (Till Date)</span> <span>&#8377; {payoutHistory?.payout_details?.life_time_total}</span></Typography>
          <Typography variant="body2" className='typography'><span>Last Month Earning</span> <span>&#8377; {payoutHistory?.payout_details?.last_month}</span></Typography>
          <Typography variant="body2" className='typography'><span>This Month Earning</span> <span> &#8377; {payoutHistory?.payout_details?.this_month}</span></Typography>
          <Typography variant="body2" className='typography'><span>Next Due Date</span> <span>{payoutHistory?.payout_details?.withdrawal_till_date}</span></Typography>
          {/* <Typography variant="body2">Withdrawal Status: {payoutHistory?.payout_details?.status}</Typography> */}
          <Typography variant="body2" className='typography'><span>Withdrawalable Balance</span> <span>&#8377; {payoutHistory?.payout_details?.withdrawalable_balance}</span></Typography>
          <Divider />
          <div className='withdrawal-summary-bottom'>
            {payoutHistory?.withdrawalable_balance == 0 ? (
              // For navigating to withdrawal page
              // <Link to="/withdraw/tobewithdraw" className='typography withdraw-text'>
              //   {"Withdraw >"} <span> &#8377; {payoutHistory?.withdrawalable_balance}</span>
              // </Link>
              <span className='withdraw-text-disabled'>
                <span onClick={()=> {
                  toast.warn('Download the app to withdraw money')
                  setSnackbarOpen(true)
                }}>{"Withdraw >"}</span>
                 <span> &#8377; {payoutHistory?.withdrawalable_balance}</span>
              </span>
            ) : (
              <span className='withdraw-text-disabled'>
                {"Withdraw >"} <span> &#8377; {payoutHistory?.withdrawalable_balance}</span>
              </span>
            )}
            <Typography variant="body2" className='withdrawal-summary-remark'>
              Remarks: {payoutHistory?.payout_details?.remarks}
            </Typography>
          </div>
        </div>
      </div>

      <Dialog open={openWithdrawalFilterDialog} onClose={() => setOpenWithdrawalFilterDialog(false)}
        maxWidth="md" // Set the maximum width of the dialog
        fullWidth // Set fullWidth to true to occupy the full width
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: '500px' } }}>
        <DialogTitle>Filter Options</DialogTitle>
        <DialogContent>
          <RadioGroup value={selectedWithdrawalFilterOption} onChange={handleFilterOptionChange}>
            <FormControlLabel value="last3Months" control={<Radio color="warning" />} label="Last 3 Months" />
            <FormControlLabel value="last6Months" control={<Radio color="warning" />} label="Last 6 Months" />
            <FormControlLabel value="currYear" control={<Radio color="warning" />} label="Current FY" />
            <FormControlLabel value="lastYear" control={<Radio color="warning" />} label="Last FY" />
            <FormControlLabel value="inception" control={<Radio color="warning" />} label="Since Inception" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={() => setOpenWithdrawalFilterDialog(false)}>Cancel</Button> */}
          <Button onClick={handleWithdrawalFilterSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      <SimpleSnackbar open={snackbarOpen} setOpen={setSnackbarOpen} />
    </div>
  )
}

export default Withdrawal