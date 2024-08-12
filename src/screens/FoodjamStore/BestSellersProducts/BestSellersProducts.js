import React, { useState, useEffect } from 'react';
import './BestSellersProducts.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addToCartRequest } from '../../../redux/actions/cartActions';
import { HorozontalProduct } from '../../CategoriesPage/CategoriesPage';
import crownImg from '../../../assets/imagespng/crownImg.png'; 

const BestSellersProducts = ({ variant, columns, heading, display_limit, cartproducts, responseMessage }) => {
    const [displayData, setDisplayData] = useState(columns.slice(0, display_limit));
    const dispatch = useDispatch();
    const navigate = useNavigate();

   
    const handleAddToCart = (product) => {
        const user = JSON.parse(localStorage.getItem('foodjam-user'));
        if (!user || !user?.sessionToken) {
            toast.error("Please login to add products");
            return;
        }
        dispatch(addToCartRequest(product.product_id, "1"));
    };

    const handleQuantityChange = (product_id, quantity) => {
        if (quantity < 0) return;
        const user = JSON.parse(localStorage.getItem('foodjam-user'));
        if (!user || !user?.sessionToken) {
            toast.error("Please login to adjust quantity");
            return;
        }
        dispatch(addToCartRequest(product_id, quantity.toString()));
    };

    const getQuantityFromCart = (productId) => {
        const availableProduct = cartproducts?.products?.find(product => product.product_id === productId);
        return availableProduct ? availableProduct.quantity : 0;
    };

    const handleViewAll = () => { 
        navigate('/best_sellers');
    };

    return (
        <div className="best-sellers-section">
            <div className="best-sellers">
                <div className="best-sellers-heading">
                    <img src={crownImg} alt="crownImg" className="crown-img" />
                    <strong>{heading}</strong>
                </div>

                <Button onClick={handleViewAll} className="shop-view-btn">
                    View All
                </Button>
            </div>

            <div className="best-sellers-container">
                {displayData.map((data, index) => (
                    <div key={index} className="product-section-container">
                        <HorozontalProduct
                            product={{
                                product_image: data.thumb,
                                product_id: data.product_id,
                                product_name: data.title.slice(0, 20),
                                manufacturer_name: data.name.slice(0, 20),
                                product_price: data.price
                            }}
                            quantity={getQuantityFromCart(data.product_id)}
                            responseMessage={responseMessage}
                            handleAddToCart={handleAddToCart}
                            handleQuantityChange={handleQuantityChange}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BestSellersProducts;
