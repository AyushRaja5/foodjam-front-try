import React from 'react';
import './ProductCard.css';
import { addProductToCart } from '../../services/Cart/UserCart';
import { toast } from 'react-toastify';
import { Button, ButtonGroup } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { addToCartRequest } from '../../redux/actions/cartActions';
export const ProductCard = ({ product }) => {
  const cdnBaseURL = 'https://cdn.commeat.com/';
  const dispatch = useDispatch();
  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };
  const handleAddToCart = async (product) => {
    // const user = JSON.parse(localStorage.getItem('foodjam-user'));
    // if(!user || !user?.sessionToken){
    //     toast.error("Please login to add products")
    // }
    // const token = user ? user.sessionToken : null;
    // const accountId = user ? user.account_id : null;

    // try {
    //     const response = await addProductToCart(token, accountId, { product_id: product.product_id, quantity: 1 });
    //     if(response){
    //         toast.success(response?.data.success)
    //     }
    // } catch (error) {
    //     toast.error(error?.response?.data?.message)
    //     console.error(error);
    // }
    const user = JSON.parse(localStorage.getItem('foodjam-user'));
    if (!user || !user?.sessionToken) {
      toast.error("Please login to add products")
    }
    dispatch(addToCartRequest(product?.product_id, "1"))
};

const handleQuantityChange = async (product_id, quantity) => {
  // console.log(product_id)
  // if (quantity < 0) return;
  // const user = JSON.parse(localStorage.getItem('foodjam-user'));
  // if (!user || !user?.sessionToken) {
  //   toast.error("Please login to add products")
  // }
  // const token = user ? user.sessionToken : null;
  // const accountId = user ? user.account_id : null;

  // const response = await addProductToCart(token, accountId, { product_id, quantity: quantity.toString() });

  // if (response?.success) {
  //   toast.success(response?.data?.success);
  // } else {
  //   toast.error("Some error occured. Please try after some time" || response?.message);
  // }

  if (quantity < 0) return;
    const user = JSON.parse(localStorage.getItem('foodjam-user'));
    if (!user || !user?.sessionToken) {
      toast.error("Please login to add products")
    }
  dispatch(addToCartRequest(product_id, quantity.toString()))
};

  return (
    <div className='product-card-container'>
      <img src={`${product.thumb}`} alt='Product Thumbnail' className='product-image' />

      <span className='bottom-text'>
        <div className='saved-productinfo'>
          {/* {product.text} */}
          {truncateText(product.text, 30)|| truncateText(product.name , 40)}
        </div>
        <div className='saved-product-price'>
          &#8377;{product.price}

          {product?.quantity ?
                  <div className="product-price">
                    <ButtonGroup>
                      <Button
                        className='quantity-btn'
                        aria-label="reduce"
                        sx={{ borderRadius: '10px' }}
                        onClick={() => handleQuantityChange(product.product_id, parseInt(product.quantity) - 1)}
                      >
                        <RemoveIcon fontSize="small" />
                      </Button>
                      <Button className='quantity-btn' sx={{ borderLeft: 'none', borderRight: 'none' }}>{parseInt(product.quantity)}</Button>
                      <Button
                        className='quantity-btn'
                        sx={{ borderLeft: 'none', borderRadius: '10px' }}
                        aria-label="increase"
                        onClick={() => handleQuantityChange(product.product_id, parseInt(product.quantity) + 1)}
                      >
                        <AddIcon fontSize="small" />
                      </Button>
                    </ButtonGroup>
                  </div>
                  : <button className='saved-product-add-button'
                    onClick={(e) => {
                      // e.stopPropagation();
                      handleAddToCart(product);
                    }}>Add</button>
                }
        </div>
      </span>
    </div>
  );
};

export const StoreMyProductCard = ({myProduct}) => {
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

