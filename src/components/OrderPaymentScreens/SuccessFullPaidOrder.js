import React from 'react';
import './OrderPaymentScreens.css';
import { useNavigate } from 'react-router-dom';
import walkthrough2 from '../../assets/imagespng/walkthrough2.png'
import orderConfirm from '../../assets/imagespng/order confirm.png'
const SuccessFullPaidOrder = () => {
  return (
    <div className="success-container">
      <div className="success-card">
        <img src={orderConfirm} alt='tick mark' className="success-icon"/>
        <h3>Order Confirmed!</h3>
        <h5>Order Id: </h5>
        <br/>
        <DeliveryCard />
      </div>
    </div>
  );
}

export default SuccessFullPaidOrder;

const DeliveryCard = () => {
  const navigate = useNavigate()
  return (
    <div className="delivery-card">
      <div className="delivery-card-content">
        <div className="delivery-info">
          <h4>Delivering To</h4>
          <p><strong>Aakash Singh</strong> <span className="phone-number">| 4578158524</span></p>
          <p className="address">
            <span className="location-icon">📍</span> Gali no.4, Sector 11 Gurugram
          </p>
        </div>
        <div className="delivery-image">
          <img src={walkthrough2} alt="Delivery" />
        </div>
      </div>
      <div className="delivery-actions">
        <button className="view-order-btn" onClick={()=> navigate('/my_orders')}>View Order</button>
        <a href="/shop" className="homepage-link">Go to Homepage</a>
      </div>
    </div>
  );
};
