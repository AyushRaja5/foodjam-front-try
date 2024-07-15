import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderPaymentScreens.css';

const FailedPaidOrder = () => {
    const navigate = useNavigate()
  return (
    <div className="failure-container">
      <div className="failure-card">
        <h2>Order failure</h2>
        <p>We are unable to process your order at this time.</p>
        <div className="button-container">
          <button className="go-to-cart-btn" onClick={()=> navigate('/cart')}>GO TO YOUR SHOPPING CART</button>
          <button className="go-to-home-btn" onClick={()=> navigate('/')}>GO TO HOMEPAGE</button>
        </div>
      </div>
    </div>
  );
}

export default FailedPaidOrder;
