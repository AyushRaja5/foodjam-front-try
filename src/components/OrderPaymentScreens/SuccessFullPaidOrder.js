import React from 'react';
import './OrderPaymentScreens.css';
import { useNavigate } from 'react-router-dom';

const SuccessFullPaidOrder = () => {
    const navigate = useNavigate()
  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">✔</div>
        <h2>Thank you for ordering!</h2>
        <p>Lorem ipsum dolor sit amet, consectetur sadipscing elitir, sed diam nonumy eirmod tempor</p>
        <div className="button-container">
          <button className="view-order-btn" onClick={()=> navigate('/my_orders')}>VIEW ORDER</button>
          <button className="continue-shopping-btn"  onClick={()=> navigate('/shop')}>CONTINUE SHOPPING</button>
        </div>
      </div>
    </div>
  );
}

export default SuccessFullPaidOrder;
