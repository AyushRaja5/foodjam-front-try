import React, { useState } from 'react'
import './ViewAllProducts.css';
import { Link, useLocation } from 'react-router-dom';
// import userPlaceholder from '../../assets/imagespng/user.png'
// import { Button, ButtonGroup, Stack, Skeleton } from '@mui/material';
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from 'react-redux';
// import VideoCard from '../videocard/VideoCard';
// import RemoveIcon from '@mui/icons-material/Remove';
// import AddIcon from '@mui/icons-material/Add';
// import { addProductToCart } from '../../services/Cart/UserCart';
import { ProductCard } from '../ProductCard/ProductCard';
const ViewAllProducts = () => {
  const [show, setShow] = useState(false);
  const [src, setSrc] = useState("");
  const [poster, setPoster] = useState("");
  const cdnBaseURL = "https://cdn.commeat.com/";
  const location = useLocation();
  const { productsArray } = location.state || { productsArray: [] };

  // const truncateText = (text, maxLength) => {
  //   if (text?.length > maxLength) {
  //     return text.substring(0, maxLength) + '...';
  //   }
  //   return text;
  // };

  // const handleQuantityChange = async (product_id, quantity) => {
  //   console.log(product_id)
  //   if (quantity < 0) return;
  //   const user = JSON.parse(localStorage.getItem('foodjam-user'));
  //   if (!user || !user?.sessionToken) {
  //     toast.error("Please login to add products")
  //   }
  //   const token = user ? user.sessionToken : null;
  //   const accountId = user ? user.account_id : null;

  //   const response = await addProductToCart(token, accountId, { product_id, quantity: quantity.toString() });

  //   if (response?.success) {
  //     toast.success(response?.data?.success);
  //   } else {
  //     toast.error("Some error occured. Please try after some time" || response?.message);
  //   }
  // };

  // const handleAddToCart = async (product) => {
  //   const user = JSON.parse(localStorage.getItem('foodjam-user'));
  //   if (!user || !user?.sessionToken) {
  //     toast.error("Please login to add products")
  //   }
  //   const token = user ? user.sessionToken : null;
  //   const accountId = user ? user.account_id : null;

  //   try {
  //     const response = await addProductToCart(token, accountId, { product_id: product.product_id, quantity: 1 });
  //     if (response) {
  //       toast.success(response?.data.success)
  //       window.location.reload();
  //     }
  //   } catch (error) {
  //     toast.error(error?.response?.data?.message)
  //     console.error(error);
  //   }
  // };
  
  console.log(productsArray,'asdfgh')
  return (
    <div className="view-all-product-conatiner">
      {productsArray?.map((product, i) => (
        <div
          key={i}
          className="product-section-container"
          onClick={() => {
            setSrc(`${cdnBaseURL + product.media}`);
            setPoster(`${cdnBaseURL + product.thumbnail}`);
            setShow(true);
          }}
        >
          <ProductCard product={product}/>
          {/* <div className='product-card-container'>
            <img src={`${product.thumb}`} alt='Product Thumbnail' className='product-image' />

            <span className='bottom-text'>
              <div className='saved-productinfo'>
                {truncateText(product.name, 40)}
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
          </div> */}
        </div>
      ))}
    </div>
  )
}

export default ViewAllProducts