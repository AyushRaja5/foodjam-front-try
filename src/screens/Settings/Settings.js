import React, { useState, useEffect } from 'react';
import './Settings.css';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import shareChat from '../../assets/imagespng/sharechat@2x.png';
import inviteBtn from '../../assets/imagespng/inviteBtn@3x.png';
import rateIcon from '../../assets/imagespng/rateIcon@3x.png';
import orderIcon from '../../assets/imagespng/orderBagIcon@3x.png';
import locationIcon from '../../assets/imagespng/location@3x.png';
import feedbackIcon from '../../assets/imagespng/feedbackIcon@3x.png';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import YourOrders from './Yourorders/YourOrders';
import Preferences from './Preferences/Preferences';
import AddressBook from './AddressBook/AddressBook';
import BankDetails from './BankDetails/BankDetails';
import Withdrawal from './Withdrawal/Withdrawal';
import { useLocation, useNavigate } from 'react-router-dom';
import { Divider, useMediaQuery } from '@mui/material';
import DeleteAccountDialogBox from './DeleteNDeactivate/DeleteAccountDialogBox'; // Import the dialog box
import DeactivateAccountDialogBox from './DeleteNDeactivate/DeactivateAccountDialogBox'; // Import the dialog box
import { toast } from 'react-toastify';
import { deactivateAccount, deleteAccount } from '../../services/Profile/DeleteNDeactivate';
import { useDispatch } from 'react-redux';
import { clearAuthToken } from '../../redux/actions/authActions';
import NotAuthorized from '../NotAuthorized/NotAuthorized';

const Settings = () => {
  const dispatch = useDispatch();
  const userProfileData = JSON.parse(localStorage.getItem('foodjam-user'));
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:1024px)');
  const [mobileTabIndex, setMobileTabIndex] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // State for delete dialog box
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false); // State for deactivate dialog box

  useEffect(() => {
    const pathToIndex = {
      '/my_orders': 0,
      '/addresses': 1,
      '/preferences': 2,
      '/bank_details': 3,
      '/withdraw': 4,
    };
    setMobileTabIndex(pathToIndex[location.pathname]);
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    if (newValue === 5) {
      setDeactivateDialogOpen(true);
    } else if (newValue === 6) {
      setDeleteDialogOpen(true);
    } else {
      let path = '/setting';
      if (newValue === 0) path = `/my_orders`;
      if (newValue === 1) path = `/addresses`;
      if (newValue === 2) path = `/preferences`;
      if (newValue === 3) path = `/bank_details`;
      if (newValue === 4) path = `/withdraw`;
      navigate(path);
    }
  };

  const handleTabClick = (index) => {
    if (index === 5) {
      setDeactivateDialogOpen(true);
    } else if (index === 6) {
      setDeleteDialogOpen(true);
    } else {
      let path = '/setting';
      if (index === 0) path = `/my_orders`;
      if (index === 1) path = `/addresses`;
      if (index === 2) path = `/preferences`;
      if (index === 3) path = `/bank_details`;
      if (index === 4) path = `/withdraw`;
      navigate(path);
    }
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await deleteAccount(userProfileData?.sessionToken, userProfileData?.account_id);
      toast.success(response?.message);
      dispatch(clearAuthToken());
      localStorage.removeItem('foodjam-user');
      navigate('/');
      setDeleteDialogOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleCloseDeactivateDialog = () => {
    setDeactivateDialogOpen(false);
  };

  const handleConfirmDeactivate = async () => {
    try {
      const response = await deactivateAccount(userProfileData?.sessionToken, userProfileData?.account_id);
      toast.success(response?.message);
      dispatch(clearAuthToken());
      localStorage.removeItem('foodjam-user');
      navigate('/');
      setDeactivateDialogOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const tabLabels = [
    'Your Orders',
    'Address Book',
    'Preferences',
    'Bank Details',
    'Withdrawal',
    'Deactivate account',
    'Delete account',
  ];

  const tabIcons = [
    orderIcon,
    locationIcon,
    rateIcon,
    feedbackIcon,
    feedbackIcon,
    orderIcon,
    rateIcon,
  ];

  const renderComponent = () => {
    switch (location.pathname) {
      case '/my_orders':
        return <YourOrders />;
      case '/addresses':
        return <AddressBook />;
      case '/preferences':
        return <Preferences />;
      case '/bank_details':
        return <BankDetails />;
      case '/withdraw':
        return <Withdrawal />;
      default:
        return <YourOrders />;
    }
  };

  if(!userProfileData){
    toast.error("Please Login to your account.")
      return (
        <div color="error">
          <NotAuthorized />
        </div>);
    }
  return (
    <div className='setting-container'>
      <div className='profile-component'>
        <div className='mobile-view'>
          <MobileView tabLabels={tabLabels} tabIcons={tabIcons} setMobileTabIndex={setMobileTabIndex} mobileTabIndex={mobileTabIndex} handleTabClick={handleTabClick} />
        </div>
        <div className='web-view'>
          <div className='tabs-web'>
            <Tabs
              value={mobileTabIndex}
              onChange={handleChange}
              variant="fullWidth"
              orientation="vertical"
              aria-label="Settings Tabs"
              centered
              sx={{ width: '100%', display: 'flex', padding: '0' }}
            >
              {tabLabels.map((label, index) => (
                <CustomTab key={index} icon={<img src={tabIcons[index]} alt={label} className='tab-icon' />} label={label} />
              ))}
            </Tabs>
          </div>
          <Divider sx={{ marginLeft: '20px', borderWidth: '1px', color: 'red' }} orientation="vertical" variant="fullWidth" flexItem />
          <div className='dashboardInfo'>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {renderComponent()}
            </Box>
          </div>
        </div>
        <DeleteAccountDialogBox
          open={deleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          onConfirm={handleConfirmDelete}
        />
        <DeactivateAccountDialogBox
          open={deactivateDialogOpen}
          onClose={handleCloseDeactivateDialog}
          onConfirm={handleConfirmDeactivate}
        />
      </div>
    </div>
  );
};

export default Settings;

const CustomTab = ({ icon, label, ...other }) => {
  return (
    <Tab
      sx={{ width: '100%', display: 'flex', padding: '0 10px' }}
      label={
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <span style={{ display: 'flex', textAlign: 'justify' }}>{label}</span>
          <span style={{ alignSelf: 'center' }}>{'>'}</span>
        </div>
      }
      icon={icon}
      iconPosition="start"
      {...other}
    />
  );
};

const MobileView = ({ tabLabels, tabIcons, handleTabClick, mobileTabIndex }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const handleLogout = () => {
    toast.success("Logged Out Successfully");
    dispatch(clearAuthToken());
    localStorage.removeItem('foodjam-user');
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <div className='tabs-mobile-setting'>
        <ul className={pathname !== '/setting' ? 'hide' : ''}>
          {tabLabels.map((label, index) => (
            <li key={index} className='mobile-tab' onClick={() => handleTabClick(index)}>
              <img src={tabIcons[index]} alt={label} className='tab-icon' />
              <span className='tab-label'>{label}</span>
              <span className='tab-arrow'>{'>'}</span>
            </li>
          ))}
        </ul>
        <div className={pathname !== '/setting' ? 'setting-botton-hide' : 'setting-botton'}>
          <button onClick={handleLogout}>Log Out</button>
          <div className='invite-frnds-div'>
            <div className='invite-frnds-left'>
              <h3>Refer a Friend</h3>
              <div>Invite Your friends to Foodjam and enjoy shopping together</div>
              <a href="https://play.google.com/store/apps/details?id=com.commeat.androidapp" target="_blank" rel="noopener noreferrer">
                <img src={inviteBtn} alt="inviteBtn" />
              </a>
            </div>
            <img src={shareChat} alt='shareChat' className='invite-frnds-right' />
          </div>
        </div>
      </div>
      <div className={pathname !== '/setting' ? 'mobile-content' : 'mobile-hide'}>
        {mobileTabIndex !== null && (
          <>
            {mobileTabIndex === 0 && <YourOrders />}
            {mobileTabIndex === 1 && <AddressBook />}
            {mobileTabIndex === 2 && <Preferences />}
            {mobileTabIndex === 3 && <BankDetails />}
            {mobileTabIndex === 4 && <Withdrawal />}
          </>
        )}
      </div>
    </>
  );
};
