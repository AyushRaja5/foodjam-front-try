import React, { useEffect, useState } from 'react';
import './ProductCard.css';
import { addProductToCart } from '../../services/Cart/UserCart';
import { toast } from 'react-toastify';
import { Button, ButtonGroup, CircularProgress, Drawer, IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartRequest, fetchCartProductsRequest, resetResponseMessage } from '../../redux/actions/cartActions';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import OfferRibbon from '../../assets/imagespng/offer-ribbon.png'
export const ProductCard = ({ product, quantity }) => {
  const dispatch = useDispatch();
  const { loading: cartLoading } = useSelector(state => state.cartProducts);
  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };
  const handleAddToCart = async (product) => {
    const user = JSON.parse(localStorage.getItem('foodjam-user'));
    if (!user || !user?.sessionToken) {
      toast.error("Please login to add products")
    }

    if (product.id)
      dispatch(addToCartRequest(product?.id, "1"))

    else dispatch(addToCartRequest(product?.product_id, "1"))
  };

  const handleQuantityChange = async (product_id, quantity) => {
    if (quantity < 0) return;
    const user = JSON.parse(localStorage.getItem('foodjam-user'));
    if (!user || !user?.sessionToken) {
      toast.error("Please login to add products")
    }
    dispatch(addToCartRequest(product_id, quantity.toString()))
  };

  return (
    <div className='product-card-container' >
      {product.offer &&
        <div className='offer-ribbon'>
          <img src={OfferRibbon} alt='offer ribbon' />
          <span className='product-card-offer'>10% off</span>
        </div>
      }
      <Link to={`/product/${product?.product_id}`} className='link-product-detail'>
        <img src={`${product.thumb}`} alt='Product Thumbnail' className='product-image' />
      </Link>

      <div className='saved-productinfo'>
        <span className='product-text'>{truncateText(product.text, 50) || truncateText(product.name, 50)}</span>
        <span className='bottom-text'>
          <div className='saved-product-price'>
            {product.offer ? (
              <div className='price-old-price'>
               <span className="line-through"> &#8377; {product.price}</span>
               <span><strong> &#8377; {product.special}</strong></span>
              </div>
            ) : (
              <span>&#8377; {product.price}</span>
            )}

            {quantity || product?.quantity ?
              <div className="product-price">
                <ButtonGroup>
                  <Button
                    className='quantity-btn'
                    aria-label="reduce"
                    sx={{ borderRadius: '10px' }}
                    onClick={() => handleQuantityChange(product.product_id || product.id, parseInt(quantity || product.quantity) - 1)}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <Button className='quantity-btn' sx={{ borderLeft: 'none', borderRight: 'none' }}>{cartLoading ? <CircularProgress size={15} color='primary' sx={{ display: 'flex', textAlign: 'center' }} /> : parseInt(quantity || product.quantity)}</Button>
                  <Button
                    className='quantity-btn'
                    sx={{ borderLeft: 'none', borderRadius: '10px' }}
                    aria-label="increase"
                    onClick={() => handleQuantityChange(product.product_id || product.id, parseInt(quantity || product.quantity) + 1)}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </ButtonGroup>
              </div>
              : <button className='saved-product-add-button'
                onClick={(e) => {
                  handleAddToCart(product);
                }}> {cartLoading ? <CircularProgress size={15} color='primary' /> : 'Add'}</button>
            }
          </div>
        </span>
      </div>
    </div>
  );
};

export const StoreMyProductCard = ({ myProduct }) => {
  const cdnBaseURL = 'https://cdn.commeat.com/';
  const thumbnailURL = myProduct.thumbnail.includes('https') ? myProduct.thumbnail : `${cdnBaseURL}${myProduct.thumbnail}`;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const { cartproducts, loading: cartLoading, responseMessage } = useSelector(state => state.cartProducts);

  useEffect(() => {
    dispatch(fetchCartProductsRequest(10, 1));
  }, [dispatch]);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  useEffect(() => {
    if (responseMessage) {
      toast.success(responseMessage.success)
      dispatch(resetResponseMessage())
      dispatch(fetchCartProductsRequest(10, 1));
    }
  }, [responseMessage]);

  const getQuantityFromCart = (productId) => {
    const availableProduct = cartproducts?.products?.find(product => product.product_id === productId.toString());
    return availableProduct ? availableProduct.quantity : 0;
  };

  // console.log(myProduct,'my product', cartproducts,'caart products')
  return (
    <div className='myproduct-card-container'>
      <img src={thumbnailURL} alt='Video Thumbnail' className='store-videos-thumbnail' onClick={toggleDrawer(true)} />
      <div className='my-store-product-div'>
        <div>Products in reels</div>
        <div className='mystore-product-array-img'>
          {myProduct?.products.length > 0 && myProduct?.products.map((product) => (
            <div className='myproduct-thumbnail' key={product.id}>
              <img src={product.thumb} alt='Product Thumbnail' />
            </div>
          ))}
        </div>
        <Button className='shop-now-button' onClick={toggleDrawer(true)}>Shop Now</Button>
      </div>

      <Drawer anchor="bottom" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div className='drawer-content'>
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
          <div className='drawer-product-list'>
            {myProduct?.products.map((product) => (
              <ProductCard product={product} key={product.id} quantity={getQuantityFromCart(product.id)} />
            ))}
          </div>
        </div>
      </Drawer>
    </div>
  );
}
