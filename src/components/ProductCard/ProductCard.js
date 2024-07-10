import React, { useEffect } from 'react';
import './ProductCard.css';
import { addProductToCart } from '../../services/Cart/UserCart';
import { toast } from 'react-toastify';
import { Button, ButtonGroup, CircularProgress } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartRequest } from '../../redux/actions/cartActions';
import { Link } from 'react-router-dom';
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
    dispatch(addToCartRequest(product?.product_id, "1"))
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
    <div className='product-card-container'>
      <Link to={`/product/${product?.product_id}`} className='link-product-detail'>
      <img src={`${product.thumb}`} alt='Product Thumbnail' className='product-image' />
      </Link>

        <div className='saved-productinfo'>
          {truncateText(product.text, 30) || truncateText(product.name, 30)}
        </div>
      <span className='bottom-text'>
        <div className='saved-product-price'>
          &#8377;{product.price}

          {quantity || product?.quantity ?
            <div className="product-price">
              <ButtonGroup>
                <Button
                  className='quantity-btn'
                  aria-label="reduce"
                  sx={{ borderRadius: '10px' }}
                  onClick={() => handleQuantityChange(product.product_id, parseInt(quantity || product.quantity) - 1)}
                >
                  <RemoveIcon fontSize="small" />
                </Button>
                <Button className='quantity-btn' sx={{ borderLeft: 'none', borderRight: 'none' }}>{cartLoading ? <CircularProgress size={15} color='primary' sx={{display:'flex', textAlign:'center'}}/> :  parseInt(quantity  || product.quantity)}</Button>
                <Button
                  className='quantity-btn'
                  sx={{ borderLeft: 'none', borderRadius: '10px' }}
                  aria-label="increase"
                  onClick={() => handleQuantityChange(product.product_id, parseInt(quantity  || product.quantity) + 1)}
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
  );
};

export const StoreMyProductCard = ({ myProduct }) => {
  // const cdnBaseURL = 'https://cdn.commeat.com/';

  return (
    <div className='myproduct-card-container'>
      <img src={`${myProduct.thumb}`} alt='Video Thumbnail' className='myproduct-thumbnail' />
      <div className='overlay'>
        <span className='myproduct-bottom-text'>
          <div>{myProduct.name}</div>
        </span>
      </div>
    </div>
  );
}

