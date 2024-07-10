import React, { useState } from 'react';
import './BestSellersProducts.css'; // Make sure to import your CSS file
import { addProductToCart } from '../../../services/Cart/UserCart';
import placeholder from '../../../assets/imagespng/placeholder.png'; // Update with correct path
import crownImg from '../../../assets/imagespng/crownImg.png'; // Update with correct path
import { Button, ButtonGroup } from '@mui/material'; // If using Material UI
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { addToCartRequest } from '../../../redux/actions/cartActions';
import { ProductCard } from '../../../components/ProductCard/ProductCard';
const BestSellersProducts = ({ variant, columns, heading, display_limit }) => {
    const [displayData, setDisplayData] = useState(columns.slice(0, display_limit));
    const [isExpanded, setIsExpanded] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleViewAll = () => { navigate('/best_sellers')};

    const formatBrandname = (title, alphabet_limit) => {
        return title?.length > alphabet_limit ? `${title.slice(0, alphabet_limit)}...` : title;
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
        dispatch(addToCartRequest(product_id,quantity.toString()))
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
                   <div
                   key={index}
                   className="product-section-container"
                 >
                   <ProductCard
                     product={data}
                   />
                 </div>
                ))}
            </div>
        </div>
    )
}

export default BestSellersProducts