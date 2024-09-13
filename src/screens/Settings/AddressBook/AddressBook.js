import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserAddressRequest, deleteUserAddressRequest, editUserAddressRequest, fetchUserAddresssRequest } from '../../../redux/actions/userAddressActions';
import { Skeleton, Stack } from '@mui/material';
import locationImg from '../../../assets/imagespng/location@3x.png'
import penImg from '../../../assets/imagespng/pen@3x.png'
import deleteImg from '../../../assets/imagespng/delete@3x.png'
import './AddressBook.css';
import AddressDialogBox from './AddressDialogBox';
import { toast } from 'react-toastify';
import NotFound from '../../NotFound/NotFound';

const AddressBook = () => {
  const dispatch = useDispatch();
  const userAddresses = useSelector((state) => state.userAddress.addresses);
  const loading = useSelector((state) => state.userAddress?.loading);
  const error = useSelector((state) => state.userAddress?.error);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const responseMessage = useSelector((state) => state.userAddress?.response);
  const responseError = useSelector((state) => state.userAddress?.error);

  const handleEdit = (addressInfo) => {
    setCurrentAddress(addressInfo);
    setDialogOpen(true);
  };

  const handleDelete = (addressid) => {
    dispatch(deleteUserAddressRequest(addressid));
  };

  const handleAdd = () => {
    setCurrentAddress(null);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setCurrentAddress(null);
  };

  const handleSave = (addressData) => {
    if (currentAddress) {
      dispatch(editUserAddressRequest(currentAddress.address_id, addressData));
    } else {
      dispatch(addUserAddressRequest(addressData));
    }
    setDialogOpen(false);
    setCurrentAddress(null);
  };

  // Fetch addresses on component mount
  useEffect(() => {
    dispatch(fetchUserAddresssRequest(10, 1));
  }, [dispatch]);

  // Handle success or error messages, with conditions to avoid infinite re-fetches
  useEffect(() => {
    if (responseMessage && responseMessage.success) {
      toast.success(responseMessage.success);
      dispatch(fetchUserAddresssRequest(10, 1));
      dispatch({ type: 'CLEAR_USER_ADDRESS_RESPONSE' }); // Clear response after processing
    }

    if (responseError) {
      toast.error(responseError.message);
      dispatch({ type: 'CLEAR_USER_ADDRESS_ERROR' }); // Clear error after processing
    }
  }, [dispatch, responseMessage, responseError]);

  if (loading) {
    return (
      <div className='yourOrders'>
        <Stack spacing={1}>
          <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'100%'} height={80} />
          <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'100%'} height={80} />
          <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'100%'} height={80} />
        </Stack>
      </div>
    );
  }

  if (error) {
    return <NotFound />;
  }

  return (
    <div className="yourAddress">
      <div className='add-address-div'>
        <div className='heading-address'>Your Addresses</div>
        <button className="add-address-button" onClick={handleAdd}>Add Address</button>
      </div>
      <div className="address-grid">
        {userAddresses && userAddresses.map((address) => (
          <div className="address-card" key={address.address_id}>
            <div className="address-row">
              <div className="row">
                <div className="left">
                  <img src={locationImg} alt="location" /> {address.company}
                  <div>{address.phone}</div>
                </div>
                <div className="right">
                  <img src={penImg} alt="edit" onClick={() => handleEdit(address)} />
                  <img src={deleteImg} alt="delete" onClick={() => handleDelete(address.address_id)} />
                  </div>
                </div>
              <div className="row details">
                <div>{address.address_1}, {address.address_2}</div>
                <div>{address.city}, {address.postcode}</div>
                <div>{address.zone}, {address.country}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='add-address-div bottom-address-btn'>
        <button className="bottom-add-address-button" onClick={handleAdd}>Add Address</button>
      </div>
      <AddressDialogBox
        open={dialogOpen}
        onClose={handleClose}
        onSave={handleSave}
        setDialogOpen={setDialogOpen}
        initialData={currentAddress}
      />
    </div>
  );
};

export default AddressBook;
