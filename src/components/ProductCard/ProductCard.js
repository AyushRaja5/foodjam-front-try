import React from 'react';
import './ProductCard.css';
export const ProductCard = ({ product }) => {
  const cdnBaseURL = 'https://cdn.commeat.com/';
  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };
  return (
    <div className='product-card-container'>
      <img src={`${product.thumb}`} alt='Product Thumbnail' className='product-image' />

      <span className='bottom-text'>
        <div className='saved-productinfo'>
          {/* {product.text} */}
          {truncateText(product.text, 30)}
        </div>
        <div className='saved-product-price'>
          &#8377;{product.price}
          <button className='saved-product-add-button'>Add</button>
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

