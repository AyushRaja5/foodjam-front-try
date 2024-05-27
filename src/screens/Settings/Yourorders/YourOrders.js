import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrdersRequest } from '../../../redux/actions/userOrderActions';
import { Skeleton, Stack } from '@mui/material';
import forwardImg from '../../../assets/imagespng/forwardIcon@3x.png'
import './YourOrders.css';

const YourOrders = () => {
  // const userData = JSON.parse(localStorage.getItem('foodjam-user'));
  const dispatch = useDispatch();
  const orders = useSelector(state => state.userOrder.userorders);
  const loading = useSelector(state => state.userOrder.loading);
  const error = useSelector(state => state.userOrder.error);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    dispatch(fetchUserOrdersRequest(10, 1));
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  if (loading) return (
    <div className='yourOrders'>
      <Stack spacing={1}>
        <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'100%'} height={80} />
        <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'100%'} height={80} />
        <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'100%'} height={80} />
      </Stack>
    </div>
  );

  if (error) return <div>Error: {error}</div>;

  const myOrders = orders.data;

  const truncateText = (text) => {
    let maxLength = 150;

    if (screenWidth <= 1024) {
      maxLength = 150;
    }
    if (screenWidth <= 750) {
      maxLength = 80;
    }
    if (screenWidth <= 450) {
      maxLength = 30; 
    }

    if (text?.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className='yourOrders'>
      {myOrders?.map((order) => (
        <div key={order.order_id} className='order'>
          <div className='order-header'>
            <div>Order no:- {order.order_id}</div>
            <div>Order placed on {new Date(order.date_added).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            }).replace(/ /g, ' ')}</div>
          </div>
          <div className='order-details'>
            <div className='product'>
              <img src={order.products_image} alt="Product" className='product-image' />
              <div className='product-info'>
                {truncateText(order.products)}
              </div>
              <img src={forwardImg} alt='forward' className='forward-image'/>
            </div>
          </div>
          <div className='order-footer'>
            <div className='order-status'>{order.order_status}</div>
            <div className='reorder'>Re-order</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default YourOrders;
