import React, { useCallback, useEffect, useState } from 'react';
import './Cart.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartProductsRequest, updateCartProductRequest } from '../../redux/actions/cartActions';
import { Button, ButtonGroup, Divider, Skeleton, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Typography, TextField, Box } from '@mui/material';
import mailIcon from '../../assets/imagespng/mailIcon.png';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import { fetchUserAddresssRequest } from '../../redux/actions/userAddressActions';
import locator from '../../assets/imagespng/locator@3x.png';
import emptyData from '../../assets/imagespng/empty-cart.png'
import { PaymentProceedService } from '../../services/Cart/UserCart';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NotAuthorized from '../NotAuthorized/NotAuthorized';
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const callback = useCallback()
  const { cartproducts, loading: cartProductsLoading, error: cartProductsError, responseMessage } = useSelector((state) => state.cartProducts);
  const { addresses, loading: addressesLoading, error: addressesError } = useSelector((state) => state.userAddress);
  const [localCartProducts, setLocalCartProducts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [couponDialogOpen, setCouponDialogOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [paymentstatusRazorpay, setPaymentstatusRazorpay] = useState(null);

  useEffect(() => {
    dispatch(fetchCartProductsRequest(10, 1));
    dispatch(fetchUserAddresssRequest(10, 1));
  }, [dispatch]);

  useEffect(() => {
    if (cartproducts?.products) {
      setLocalCartProducts(cartproducts.products);
    }
  }, [cartproducts]);

  useEffect(() => {
    if (addresses && addresses.length > 0) {
      setSelectedAddress(addresses[0]);
    }
  }, [addresses]);

  const handleQuantityChange = (cartId, quantity) => {
    if (quantity < 1) {
      setLocalCartProducts(cartproducts.products);
    }

    const updatedProducts = localCartProducts.map(product =>
      product.cart_id === cartId ? { ...product, quantity: quantity.toString() } : product
    );

    setLocalCartProducts(updatedProducts);
    dispatch(updateCartProductRequest(cartId, quantity));

    if (responseMessage?.success) {
      toast.success(responseMessage.success);
    } else {
      toast.error(cartProductsError || responseMessage?.message);
    }
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleCouponDialogOpen = () => {
    setCouponDialogOpen(true);
  };

  const handleCouponDialogClose = () => {
    setCouponDialogOpen(false);
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    handleDialogClose();
  };

  const handleCouponChange = (event) => {
    setCouponCode(event.target.value);
  };

  const handleApplyCoupon = () => {
    applyCoupon(couponCode);
    handleCouponDialogClose();
  };
  const applyCoupon = (couponCode) => {
    console.log('Applying coupon:', couponCode);
  };

  if (cartProductsLoading || addressesLoading) {
    return (
      <div className='userNotification'>
        <Stack spacing={1}>
          <Skeleton variant="rounded" width={'100%'} height={80} />
          <Skeleton variant="rounded" width={'100%'} height={80} />
          <Skeleton variant="rounded" width={'100%'} height={80} />
        </Stack>
      </div>
    );
  }

  if (cartProductsError) {
    // return <div className='error'>Error: {cartProductsError}</div>;
    return (
      <div variant="h6" color="error">
        {toast.error(cartProductsError)}
        <NotAuthorized />
      </div>);
  }

  if (addressesError) {
    return <div className='error'>Error: {addressesError}</div>;
  }

  const handlePayment = async(addressObj) => {
    let orderObj = {
      address_id: addressObj.address_id,
      shipping_address: {
        city: addressObj.city,
        address_1: addressObj.address_1,
        lastname: addressObj.lastname || '',
        firstname: addressObj.first_name || addressObj.company,
        zone_id: addressObj.zone,
        postcode: addressObj.postcode,
        country_id: 99,
        address_2: addressObj.address_2,
        name: addressObj.company,
        phone: addressObj?.phone,
      },
      payment_method: 'razorpay',
      coupon_code: 'my_code',
    }
    const user = JSON.parse(localStorage.getItem('foodjam-user'));
    const token = user ? user.sessionToken : null;
    const accountId = user ? user.account_id : null;

    if (!user || !token) {
      toast.error("You are not Signed In");
      return;
    }

    try{
      const response = await PaymentProceedService(token, accountId, orderObj)
      console.log(response)
      if (response.success) { // Open payment URL in the same tab
        try {
          window.open(response.data.payment_url, '_self');
          const paymentCheckResponse = callback(response.data.payment_url);
          setPaymentstatusRazorpay(paymentCheckResponse)
          console.log(paymentCheckResponse,'paymentcheck response')
          if (paymentCheckResponse) {
            toast.success('Payment made successfully');
            console.log(paymentCheckResponse)
          }
        } catch (error) {
          console.error('Error checking payment status:', error);
        }
      } else {
        toast.error(response.message || "Order failed.");
      }
    }
    catch(error){
      console.log(error)
    }
    // console.log(orderObj,'order Obj')
  }
  console.log(paymentstatusRazorpay,'payment status razorpay')
  return (
    <>
      {!cartProductsLoading && (
        <div className="order-detail cart-detail">
          <div className="order-detail-left">
            {/* localCartProducts.length === 0 ? (
              <div className='empty-cart'>
                <img src={emptyData} alt="Empty Cart" />
              </div> */}
              <div className='order-products'>
                {localCartProducts.map((product, index) => (
                  <React.Fragment key={index}>
                    <div className="product-item">
                      <img src={product.thumb} alt={product.name} />
                      <div className="product-info">
                        <span>{product.name}</span>
                        <div className='product-total'><strong>&#8377; {product.price * product.quantity}</strong></div>
                      </div>
                      <div className="product-price">
                        <ButtonGroup>
                          <Button
                            className='quantity-btn'
                            aria-label="reduce"
                            sx={{ borderRadius: '10px' }}
                            onClick={() => handleQuantityChange(product.cart_id, parseInt(product.quantity) - 1)}
                          // disabled={parseInt(product.quantity) <= parseInt(product.minimum_quantity)}
                          >
                            <RemoveIcon fontSize="small" />
                          </Button>
                          <Button className='quantity-btn' sx={{ borderLeft: 'none', borderRight: 'none' }}>{parseInt(product.quantity)}</Button>
                          <Button
                            className='quantity-btn'
                            sx={{ borderLeft: 'none', borderRadius: '10px' }}
                            aria-label="increase"
                            onClick={() => handleQuantityChange(product.cart_id, parseInt(product.quantity) + 1)}
                          >
                            <AddIcon fontSize="small" />
                          </Button>
                        </ButtonGroup>
                      </div>
                    </div>
                    {index !== localCartProducts.length - 1 && (
                      <Divider sx={{ marginLeft: '20px', borderWidth: '1px', color: 'red' }} variant="fullWidth" flexItem />
                    )}
                  </React.Fragment>
                ))}
              </div>
          </div>
          <Divider sx={{ borderWidth: '1px', color: 'red' }} orientation="vertical" variant="fullWidth" flexItem />

          <div className="order-detail-right">
            <div className="delivery-address cart-address">
              <img src={locator} alt='deliveryIcon' className='deliveryIcon' />
              <div className='delivery-address-content cart-delivery-content'>
                <div>Delivery to <strong>{selectedAddress?.company}</strong></div>
                <div>{selectedAddress?.address_1}, {selectedAddress?.address_2},
                  {selectedAddress?.city}, {selectedAddress?.zone}, {selectedAddress?.country},
                  Pin code:- {selectedAddress?.postcode}</div>
              </div>
              <div className='address-change-btn' onClick={handleDialogOpen}>Change</div>
            </div>

            {localCartProducts.length > 0 &&
              <div className="order-summary">
                <h3>{`Price Details (${localCartProducts.length} items)`}</h3>
                <div className="order-summary-content">
                  <div className="order-summary-left">
                    {cartproducts?.totals?.map((total, index) => (
                      <p key={index}>{total.title}</p>
                    ))}
                  </div>
                  <div className="order-summary-right">
                    {cartproducts?.totals?.map((total, index) => (
                      <p key={index}>{total.text}</p>
                    ))}
                  </div>
                </div>
              </div>
            }

            <div className='coupon-div' onClick={handleCouponDialogOpen}>
              <div className='icon-text-coupon'>
                <img src={locator} alt='couponIcon' />
                <span>Apply Coupon Code</span>
              </div>
              <div>{`>`}</div>
            </div>

            <div className="emailBox">
              <div className='emailBox-first'>
                <img src={mailIcon} alt='emailBox' />
                <div>Need Support ?</div>
              </div>
              <a href="mailto:support@foodjam.in" className='emailBox-last'>
                support@foodjam.in
              </a>
            </div>

            <div className='delivery-address-content cart-payment-btn'>
              <span className='cart-total-payment'>
                <div className='cart-small-total-text'>Total</div>
                <div>
                  {cartproducts?.totals && cartproducts.totals.length > 0 ? (
                    <div className='total-to-pay-cart'>
                      &#8377; {cartproducts.totals[cartproducts.totals.length - 1].text}
                    </div>
                  ) : (
                    <div className='total-to-pay-cart'>
                      &#8377; 0
                    </div>
                  )}
                </div>
              </span>
              <Button onClick={() => handlePayment(selectedAddress)}>Proceed TO Payment</Button>
            </div>
          </div>
        </div>
      )}

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Select Address</DialogTitle>
        <DialogContent sx={{ width: '320px' }}>
          {addresses && addresses.length > 0 ? (
            addresses?.map((address) => (
              <div key={address.address_id}>
                <div className="cart-address-card"
                  onClick={() => handleAddressSelect(address)}>
                  <div className="address-row">
                    <div className="row">
                      <div className="left">
                        <img src={locator} alt="locator" className='deliveryIcon' />
                        {address.company} : <span>{address.phone}</span>
                      </div>
                    </div>
                    <div className="row details">
                      <div>{address.address_1}, {address.address_2}</div>
                      <div>{address.city}, {address.postcode}</div>
                      <div>{address.zone}, {address.country}</div>
                    </div>
                  </div>
                </div>
                <Divider />
              </div>
            ))
          ) : (
            <Button onClick={handleDialogClose}>Add Address</Button>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={couponDialogOpen} onClose={handleCouponDialogClose} maxWidth="sm" fullWidth>
      <DialogTitle>Apply Coupon Code</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1" gutterBottom>
          Enter your coupon code below to receive a discount on your purchase.
        </Typography>
        <Box display="flex" alignItems="center">
          <TextField
            margin="normal"
            label="Coupon Code"
            fullWidth
            variant="outlined"
            value={couponCode}
            onChange={handleCouponChange}
          />
          <Button 
            onClick={handleApplyCoupon} 
            color="primary" 
            variant="contained" 
            style={{ marginLeft: '8px', height: '56px' }} // Match the height of the TextField
          >
            Apply
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCouponDialogClose} color="secondary" variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
};

export default Cart;
