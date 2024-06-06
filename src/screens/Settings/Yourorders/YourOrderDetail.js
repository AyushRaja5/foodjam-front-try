// src/components/YourOrderDetail.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrderByIdRequest } from '../../../redux/actions/userOrderActions';
import { useParams } from 'react-router-dom';
import { Divider, Skeleton, Stack } from '@mui/material';
import mailIcon from '../../../assets/imagespng/mailIcon.png'
import './YourOrderDetail.css';

const YourOrderDetail = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { loading, userorder, error } = useSelector(state => state?.userOrder);
  const [OrderDetail, setOrderDetail] = useState(null);

  useEffect(() => {
    dispatch(fetchUserOrderByIdRequest(orderId));
  }, [dispatch, orderId]);

  useEffect(() => {
    if (userorder && userorder.length > 0) {
      setOrderDetail(userorder[0]);
    }
  }, [userorder]);

  if (loading) return (
    <div className='yourOrders'>
      <Stack spacing={1}>
        <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'100%'} height={80} />
        <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'100%'} height={80} />
        <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'100%'} height={80} />
      </Stack>
    </div>
  );

  if (error) return <p>Error: {error}</p>;
  if (!OrderDetail) return <p>No order details available</p>;

  const { order_id, order_status, order_details } = OrderDetail;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    date.setHours(date.getHours() + 5, date.getMinutes() + 30);

    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    return date.toLocaleString('en-US', options);
  };

  const orderPlacedDate = formatDate(order_details.date_added);

  return (
    <div className="order-detail">
      <div className="order-detail-left">
        <div className='order-data-left'>Order no.- {order_id}</div>
        <div className='order-data-left'>Order placed on - {orderPlacedDate}</div>

        <div className='order-products'>
          {order_details.products.map((product, index) => (
            <>
              <div key={index} className="product-item">
                <img src={product.thumb} alt={product.name} />
                <div className="product-info">
                  <h4>{product.name}</h4>
                  {/* <div>Model: {product.model}</div> */}
                  <div>Qty: {product.quantity}</div>
                </div>
                <div className="product-price">
                  <div>Price: {product.price} * {product.quantity}</div>
                  <div><strong>Total: {product.total}</strong></div>
                </div>
              </div>
              {index !== order_details.products.length - 1 && (
            <Divider sx={{ marginLeft: '20px', borderWidth: '1px', color: 'red' }} variant="fullWidth" flexItem />
            )}
           </>
          ))}
        </div>
      </div>
      <Divider sx={{ borderWidth:'1px', color:'red' }} orientation="vertical" variant="fullWidth" flexItem />
      <div className="order-detail-right">
        <div className="delivery-address">
          <h3>Delivery Address</h3>
          <div className='delivery-address-content'>
            <div>{order_details.shipping_address}</div>
            <div>Phone no.- {order_details.phone}</div>
          </div>
        </div>
        
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="order-summary-content">
            <div className="order-summary-left">
              <h4>Left Side</h4>
              {order_details.totals.map((total, index) => (
                <p key={index}>
                  {total.title}
                </p>
              ))}
            </div>
            <div className="order-summary-right">
              <h4>Right Side</h4>
              {order_details.totals.map((total, index) => (
                <p key={index}>
                  {total.text}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="emailBox">
          <div className='emailBox-first'>
            <img src={mailIcon} alt='emailBox' />
            <div>Need Support ?</div>
            {/* <div>Email us at : </div> */}
          </div>
          <a href="mailto:support@foodjam.in" className='emailBox-last'>
            support@foodjam.in
          </a>
        </div>
      </div>
    </div>
  );
};

export default YourOrderDetail;
