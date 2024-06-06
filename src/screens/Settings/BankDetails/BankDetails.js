import React, { useEffect, useState } from 'react';
import './BankDetails.css';
import { Skeleton, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import deleteImg from '../../../assets/imagespng/delete@3x.png';
import { addBankUpiDetailsRequest, deleteBankUpiDetailsRequest, fetchBankUpiDetailsRequest, resetBankUpiDetailsError, resetBankUpiDetailsResponseMessage } from '../../../redux/actions/bankDetailsActions';
import {
  Button,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BankImg from '../../../assets/imagespng/bankX.png';
import UPIImg from '../../../assets/imagespng/upi.png';
import { toast } from 'react-toastify';

const BankDetails = ({ onDefaultBankChange }) => {
  const dispatch = useDispatch();
  const { bankUpiDetails, loading: bankUpiDetailsLoading, error: bankUpiDetailsError, responseMessage } = useSelector((state) => state.bankDetails);
  const state = useSelector((state)=>state)
  const [bankDialogOpen, setBankDialogOpen] = useState(false);
  const [upiDialogOpen, setUpiDialogOpen] = useState(false);
  const [defaultBankDetail, setDefaultBankDetail] = useState('');
  // console.log(state,'state')
  const [bankAddNewDetail, setBankAddNewDetail] = useState({
    user_bank_name: '',
    account_number: '',
    re_account_number: '',
    ifsc: '',
    phone: '+91',
    name: '',
    email: '',
    mode: 'bank',
    pan_card: '',
  });
  const [upiAddNewDetail, setUpiAddNewDetail] = useState({
    upi_id: '',
    phone: '+91',
    pan_card: '',
    mode: 'upi',
    email: '',
    name: '',
  });
  const [validationErrors, setValidationErrors] = useState({
    accountNumberError: '',
    reAccountNumberError: '',
    emailError: '',
    phoneError: '',
    upiIdError: ''
  });

  useEffect(() => {
    dispatch(fetchBankUpiDetailsRequest(10, 1));
  }, [dispatch]);

  const validateBankDetails = () => {
    let valid = true;
    let errors = {
      accountNumberError: '',
      reAccountNumberError: '',
      emailError: '',
      phoneError: ''
    };

    if (!/^\d{10}$/.test(bankAddNewDetail.account_number)) {
      errors.accountNumberError = 'Account Number must be 10 digits';
      valid = false;
    }

    if (bankAddNewDetail.account_number !== bankAddNewDetail.re_account_number) {
      errors.reAccountNumberError = 'Account numbers do not match';
      valid = false;
    }

    if (!/\S+@\S+\.\S+/.test(bankAddNewDetail.email)) {
      errors.emailError = 'Email is not valid';
      valid = false;
    }

    if (!/^\+91\d{10}$/.test(bankAddNewDetail.phone)) {
      errors.phoneError = 'Phone number must be 10 digits';
      valid = false;
    }

    setValidationErrors(errors);
    return valid;
  };

  const validateUpiDetails = () => {
    let valid = true;
    let errors = {
      emailError: '',
      phoneError: '',
      upiIdError: ''
    };

    if (!/\S+@\S+\.\S+/.test(upiAddNewDetail.email)) {
      errors.emailError = 'Email is not valid';
      valid = false;
    }

    if (!/^\+91\d{10}$/.test(upiAddNewDetail.phone)) {
      errors.phoneError = 'Phone number must be 10 digits';
      valid = false;
    }

    if (!upiAddNewDetail.upi_id) {
      errors.upiIdError = 'UPI ID is required';
      valid = false;
    }

    setValidationErrors(errors);
    return valid;
  };

  const handleAddBankDetail = () => {
    if (validateBankDetails()) {
      dispatch(addBankUpiDetailsRequest(bankAddNewDetail));
      setBankDialogOpen(false);
      setBankAddNewDetail({
        user_bank_name: '',
        account_number: '',
        re_account_number: '',
        ifsc: '',
        phone: '+91',
        name: '',
        email: '',
        mode: 'bank',
        pan_card: '',
      });
    }
  };

  const handleAddUpiDetail = () => {
    if (validateUpiDetails()) {
      dispatch(addBankUpiDetailsRequest(upiAddNewDetail));
    }
    setUpiDialogOpen(false)
    setUpiAddNewDetail({
      upi_id: '',
      phone: '',
      pan_card: '',
      mode: 'upi',
      email: '',
      name: '',
    });
  };

  useEffect(() => {
    if (responseMessage){
      toast.success(responseMessage.message)
      dispatch(fetchBankUpiDetailsRequest(10, 1));
      dispatch(resetBankUpiDetailsResponseMessage()); 
    }
    if(bankUpiDetailsError){
      toast.error(bankUpiDetailsError.message)
      dispatch(resetBankUpiDetailsError());
      dispatch(fetchBankUpiDetailsRequest(10, 1));
    }
  }, [dispatch, responseMessage, bankUpiDetailsError]);


  const handleDeleteDetail = (id, mode) => {
    dispatch(deleteBankUpiDetailsRequest(id, mode));
  };

  const handleBankDialogOpen = () => {
    setBankDialogOpen(true);
  };

  const handleBankDialogClose = () => {
    setBankDialogOpen(false);
  };

  const handleUpiDialogOpen = () => {
    setUpiDialogOpen(true);
  };

  const handleUpiDialogClose = () => {
    setUpiDialogOpen(false);
  };

  const handleDefaultChange = (event) => {
    const defaultDetail = event.target.value;
    let selectedBankDetail = {detail : bankUpiDetails?.bank_details?.find(detail => detail?.id === defaultDetail), type:'bank'};
    selectedBankDetail = {detail : bankUpiDetails?.upi_details?.find(detail => detail?.id === defaultDetail), type : 'upi'};
    setDefaultBankDetail(defaultDetail);
    onDefaultBankChange(selectedBankDetail); 
  console.log(selectedBankDetail,'bank details')
  };

  if (bankUpiDetailsLoading)
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
    <div className="bank-details-container">
      <div className="add-bank-upi-div">
        <div className="heading-address hide">Account Details</div>
        <div className="heading-title-btn">
          Add another Bank Account
          <Button variant="contained" sx={{ bgcolor: '#f8a003', marginLeft: '10px' }} onClick={handleBankDialogOpen}>
            <AddIcon />
          </Button>
        </div>
      </div>
      <div className="select-default-text">
        {(bankUpiDetails?.bank_details?.length|| bankUpiDetails?.upi_details?.length )&& <strong>Select default method to receive money</strong>}
      </div>
      <RadioGroup value={defaultBankDetail} onChange={handleDefaultChange}>
        <div className="bank-grid">
          {bankUpiDetails?.bank_details &&
            bankUpiDetails?.bank_details?.map((detail) => (
              <div key={detail.id} className="bank-detail-card">
                <div className="address-row">
                  <div className="row">
                    <div className="left">
                      <FormControlLabel
                        value={detail.id}
                        control={<Radio color="warning" />}
                        label={detail.bank_details.bank_name}
                      />
                    </div>
                    <div className="right">
                      <img src={deleteImg} alt="delete" onClick={() => handleDeleteDetail(detail.id, 'bank')} />
                    </div>
                  </div>
                  <div className="row details">
                    <div>Saving A/c No. XXXXXXX{detail.bank_details.account_number.slice(-3)}</div>
                    <div>A/c Holder Name : {detail.bank_details.account_holder_name}</div>
                  </div>
                </div>
                <Divider />
                <div className="remove-acc-div">Remove Account</div>
              </div>
            ))}
        </div>
        <br />
        <Divider sx={{ borderWidth: '1px' }} />
        <div className="add-bank-upi-div upi-right-add">
          <div className="heading-title-btn">
            Add another UPI ID
            <Button variant="contained" sx={{ bgcolor: '#f8a003', marginLeft: '10px' }} onClick={handleUpiDialogOpen}>
              <AddIcon />
            </Button>
          </div>
        </div>
        <div className="upi-grid">
          {bankUpiDetails?.upi_details &&
            bankUpiDetails?.upi_details?.map((detail) => (
              <div key={detail.id} className="bank-detail-card">
                <div className="address-row">
                  <div className="row">
                    <div className="left">
                      <FormControlLabel value={detail.id} control={<Radio color="warning" />} label="UPI ID" />
                    </div>
                    <div className="right">
                      <img src={deleteImg} alt="delete" onClick={() => handleDeleteDetail(detail.id, 'upi')} />
                    </div>
                  </div>
                  <div className="row details">
                    <div>UPI ID: XXXXXXX{detail.upi_details.upi_id.slice(-8)}</div>
                  </div>
                </div>
                <Divider />
                <div className="remove-acc-div">Remove Account</div>
              </div>
            ))}
        </div>
      </RadioGroup>

      <Dialog open={bankDialogOpen} onClose={handleBankDialogClose}>
        <DialogTitle>
          <div className="bank-dialog-box-title">
            <div className="bankImg-div">
              <img src={BankImg} alt="bank" className="bankImg" />
            </div>
            <div className="bank-detail-heading">
              <div className="bank-acc-title">Bank Account</div>
              <div className="bank-acc-subtitle">Pay using bank account</div>
            </div>
          </div>
        </DialogTitle>

        <DialogContent>
          <TextField
            margin="dense"
            label="Bank Name"
            type="text"
            fullWidth
            value={bankAddNewDetail.user_bank_name}
            onChange={(e) => setBankAddNewDetail({ ...bankAddNewDetail, user_bank_name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Account Number"
            type="text"
            fullWidth
            value={bankAddNewDetail.account_number}
            onChange={(e) => setBankAddNewDetail({ ...bankAddNewDetail, account_number: e.target.value })}
            error={!!validationErrors.accountNumberError}
            helperText={validationErrors.accountNumberError}
          />
          <TextField
            margin="dense"
            label="Re-enter Account Number"
            type="text"
            fullWidth
            value={bankAddNewDetail.re_account_number}
            onChange={(e) => setBankAddNewDetail({ ...bankAddNewDetail, re_account_number: e.target.value })}
            error={!!validationErrors.reAccountNumberError}
            helperText={validationErrors.reAccountNumberError}
          />
          <TextField
            margin="dense"
            label="IFSC Code"
            type="text"
            fullWidth
            value={bankAddNewDetail.ifsc}
            onChange={(e) => setBankAddNewDetail({ ...bankAddNewDetail, ifsc: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Enter mobile number here"
            type="text"
            fullWidth
            value={bankAddNewDetail.phone}
            onChange={(e) => setBankAddNewDetail({ ...bankAddNewDetail, phone: e.target.value.startsWith('+91') ? e.target.value : `+91${e.target.value}` })}
            error={!!validationErrors.phoneError}
            helperText={validationErrors.phoneError}
          />
          <TextField
            margin="dense"
            label="Account Holder Name"
            type="text"
            fullWidth
            value={bankAddNewDetail.name}
            onChange={(e) => setBankAddNewDetail({ ...bankAddNewDetail, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Enter your email here"
            type="email"
            fullWidth
            value={bankAddNewDetail.email}
            onChange={(e) => setBankAddNewDetail({ ...bankAddNewDetail, email: e.target.value })}
            error={!!validationErrors.emailError}
            helperText={validationErrors.emailError}
          />
          <TextField
            margin="dense"
            label="PAN Card"
            type="text"
            fullWidth
            value={bankAddNewDetail.pan_card}
            onChange={(e) => setBankAddNewDetail({ ...bankAddNewDetail, pan_card: e.target.value })}
          />
        </DialogContent>
        <Divider />
        <div className="add-bank-detail-div">
          <button onClick={handleAddBankDetail} className="submit-add-bank-details">
            Submit
          </button>
        </div>
      </Dialog>

      <Dialog open={upiDialogOpen} onClose={handleUpiDialogClose}>
        <DialogTitle>
          <div className="bank-dialog-box-title">
            <div className="bankImg-div">
              <img src={UPIImg} alt="bank" className="bankImg" />
            </div>
            <div className="bank-detail-heading">
              <div className="bank-acc-title">UPI</div>
              <div className="bank-acc-subtitle">Pay using UPI ID</div>
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Enter Name here"
            type="text"
            fullWidth
            value={upiAddNewDetail.name}
            onChange={(e) => setUpiAddNewDetail({ ...upiAddNewDetail, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Enter email here"
            type="text"
            fullWidth
            value={upiAddNewDetail.email}
            onChange={(e) => setUpiAddNewDetail({ ...upiAddNewDetail, email: e.target.value })}
            error={!!validationErrors.emailError}
            helperText={validationErrors.emailError}
          />
          <TextField
            margin="dense"
            label="Enter mobile number here"
            type="text"
            fullWidth
            value={upiAddNewDetail.phone}
            onChange={(e) => setUpiAddNewDetail({ ...upiAddNewDetail, phone: e.target.value.startsWith('+91') ? e.target.value : `+91${e.target.value}` })}
            error={!!validationErrors.phoneError}
            helperText={validationErrors.phoneError}
          />
          <TextField
            margin="dense"
            label="PAN Card"
            type="text"
            fullWidth
            value={upiAddNewDetail.pan_card}
            onChange={(e) => setUpiAddNewDetail({ ...upiAddNewDetail, pan_card: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Enter UPI ID here"
            type="text"
            fullWidth
            value={upiAddNewDetail.upi_id}
            onChange={(e) => setUpiAddNewDetail({ ...upiAddNewDetail, upi_id: e.target.value })}
            error={!!validationErrors.upiIdError}
            helperText={validationErrors.upiIdError}
          />
        </DialogContent>
        <Divider />
        <div className="add-bank-detail-div">
          <button onClick={handleAddUpiDetail} className="submit-add-bank-details">
            Submit
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default BankDetails;
