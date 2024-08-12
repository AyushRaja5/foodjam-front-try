import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderPaymentScreens.css';
import orderFailed from '../../assets/imagespng/order failed.png'

const FailedPaidOrder = () => {
    const navigate = useNavigate()
  return (
    <div className="failure-container">
      <div className="failure-card">
        <img src={orderFailed} alt='tick mark' className="success-icon"/>
        <h2>Order Failed!</h2>
        <p>We are unable to process your order at this time.</p>
        {/* <div className="button-container">
          <button className="go-to-cart-btn" onClick={()=> navigate('/cart')}>GO TO YOUR SHOPPING CART</button>
          <button className="go-to-home-btn" onClick={()=> navigate('/')}>GO TO HOMEPAGE</button>
        </div> */}
        <div className="failed-delivery-actions">
          <button className="view-order-btn" onClick={()=> navigate('/my_orders')}>View Order</button>
          <a href="/shop" className="homepage-link">Go to Homepage</a>
        </div>
      </div>
    </div>
  );
}

export default FailedPaidOrder;
