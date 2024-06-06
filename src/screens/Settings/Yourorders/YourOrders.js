import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrdersRequest } from '../../../redux/actions/userOrderActions';
import { Skeleton, Stack } from '@mui/material';
import forwardImg from '../../../assets/imagespng/forwardIcon@3x.png'
import './YourOrders.css';
import { useNavigate } from 'react-router-dom';

const YourOrders = () => {
  const navigate = useNavigate();
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

  const getStatusStyles = (status) => {
    let textColor = '';
    let backGroundColor = '';

    if (status === 'Delivered' || status === 'Shipped') {
      textColor = 'rgba(19, 76, 50, 1)';
      backGroundColor = 'rgba(8, 120, 73, 0.1)';
    } else if (status === 'Out of Delivery') {
      textColor = 'rgba(23, 62, 97, 1)';
      backGroundColor = 'rgba(200, 227, 254, 1)';
    } else if (status === 'Packed & Ready' || status === 'Processing') {
      textColor = 'rgba(131, 101, 18, 1)';
      backGroundColor = 'rgba(248, 228, 164, 1)';
    } else if (status === 'Ordered') {
      textColor = 'rgba(35, 31, 46, 1)';
      backGroundColor = 'rgba(214, 215, 217, 1)';
    } else if (
      status === 'Canceled' ||
      status === 'Expired' ||
      status === 'Pending' ||
      status === 'Out Of Order'
    ) {
      textColor = 'rgba(104, 39, 47, 1)';
      backGroundColor = 'rgba(245, 198, 204, 1)';
    }

    return { textColor, backGroundColor };
  };

  const handleOrderClick = (orderId) => {
    navigate(`/my_orders/${orderId}`);
  };

  return (
    <div className='yourOrders'>
      {myOrders?.map((order) => {
        const { textColor, backGroundColor } = getStatusStyles(order.order_status);
        return (
          <div key={order.order_id} className='order' onClick={() => handleOrderClick(order.order_id)}>
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
              <div className='order-status'
                style={{ color: textColor, backgroundColor: backGroundColor }}
              >
                {order.order_status}
              </div>
              {/* <div className='reorder'>Re-order</div> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default YourOrders;
