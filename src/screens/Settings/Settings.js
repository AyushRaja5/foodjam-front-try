import React, { useState } from 'react'
import './Settings.css'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import shareChat from '../../assets/imagespng/sharechat@2x.png'
import inviteBtn from '../../assets/imagespng/inviteBtn@3x.png'
import rateIcon from '../../assets/imagespng/rateIcon@3x.png'
import orderIcon from '../../assets/imagespng/orderBagIcon@3x.png'
import locationIcon from '../../assets/imagespng/location@3x.png'
import feedbackIcon from '../../assets/imagespng/feedbackIcon@3x.png'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import YourOrders from './Yourorders/YourOrders';
import Preferences from './Preferences/Preferences';
import AddressBook from './AddressBook/AddressBook';
import BankDetails from './BankDetails/BankDetails'
import Withdrawal from './Withdrawal/Withdrawal'
import { useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
{/* <Stack spacing={1}>
      <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={210} height={60}/>
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
      </Stack> */}
const Settings = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:1024px)');
  const [mobileTabIndex, setMobileTabIndex] = useState(null);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    let path = '/setting';
    if (newValue === 0) path = `/my_orders`;
    if (newValue === 1) path = `/addresses `;
    if (newValue === 2) path = `/preferences`;
    if (newValue === 3) path = `/payment`;
    navigate(path);
  };

  const tabLabels = [
    'Your Orders',
    'Address Book',
    'Preferences',
    'Bank Details',
    'Withdrawal',
    'Send feedback',
    'Rate us',
    'Connect Instagram',
    'Deactivate account',
    'Delete account',
  ];

  const tabIcons = [
    orderIcon,
    locationIcon,
    rateIcon,
    feedbackIcon,
    feedbackIcon,
    feedbackIcon,
    rateIcon,
    locationIcon,
    orderIcon,
    rateIcon,
  ];
  return (
    <div className='profile-component'>
    {isMobile ? (
      <MobileView tabLabels={tabLabels} tabIcons={tabIcons}  setMobileTabIndex={setMobileTabIndex} mobileTabIndex={mobileTabIndex}/>
    ) : (
      <>
        <div className='tabs-web'>
          <Tabs
            value={value}
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
        <div className='dashboardInfo'>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {tabLabels.map((label, index) => (
              <CustomTabPanel key={index} value={value} index={index}>
                {index === 0 && <YourOrders/>}
                {index === 1 && <AddressBook />}
                {index === 2 && <Preferences />}
                {index === 3 && <BankDetails />}
                {index === 4 && <Withdrawal />}
              </CustomTabPanel>
            ))}
          </Box>
        </div>
      </>
    )}
  </div>
  )
}

export default Settings


const CustomTabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index} style={{ width: '100%' }}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children} {value}</Typography>
        </Box>
      )}
    </div>
  );
};

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


const MobileView = ({ tabLabels, tabIcons, setMobileTabIndex, mobileTabIndex }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleTabClick = (index) => {
    setMobileTabIndex(index);
    let path = '/setting';
    if (index === 0) path = `/my_orders`;
    if (index === 1) path = `/addresses `;
    if (index === 2) path = `/preferences`;
    if (index === 3) path = `/payment`;
    navigate(path);
  };

  return (
    <>
    <div className='tabs-mobile'>
      <ul className={pathname !== '/setting' ? 'hide' : ''}>
        {tabLabels.map((label, index) => (
          <li key={index} className='mobile-tab' onClick={() => handleTabClick(index)}>
            <img src={tabIcons[index]} alt={label} className='tab-icon' />
            <span className='tab-label'>{label}</span>
            <span className='tab-arrow'>{'>'}</span>
          </li>
        ))}
      </ul>
      
    </div>
    <div className={pathname !== '/setting' ? 'mobile-content' :  'mobile-hide'}>
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