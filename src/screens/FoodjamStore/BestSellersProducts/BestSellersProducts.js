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
                    <Link to={`/product/${data?.product_id}`} className='link-shop-brand'>
                        <div key={index} className="best-sellers-card-container">
                            <img
                                src={
                                    data.thumb?.includes("https://")
                                        ? data.thumb
                                        : `https://cdn.commeat.com/${data.thumb}`
                                }
                                alt={heading}
                                className="best-sellers-img"
                            />
                            <div className="best-sellers-text-wrapper">
                                <p className="best-sellers-title">{formatBrandname(data.name, 50)}</p>
                                <div className='price-quantity-section'>
                                    <div className='best-sellers-price'>&#8377; {data.price}</div>

                                    <div className='best-sellers-quantity'> {data?.quantity ?
                                        <ButtonGroup>
                                            <Button
                                                className='best-sellers-quantity-btn'
                                                aria-label="reduce"
                                                sx={{ borderRadius: '10px' }}
                                                onClick={() => handleQuantityChange(data.product_id, parseInt(data.quantity) - 1)}
                                            >
                                                <RemoveIcon fontSize="x-small" />
                                            </Button>
                                            <Button className='best-sellers-quantity-btn' sx={{ borderLeft: 'none', borderRight: 'none', color:'black' }}>{parseInt(data.quantity)}</Button>
                                            <Button
                                                className='best-sellers-quantity-btn'
                                                sx={{ borderLeft: 'none', borderRadius: '10px' }}
                                                aria-label="increase"
                                                onClick={() => handleQuantityChange(data.product_id, parseInt(data.quantity) + 1)}
                                            >
                                                <AddIcon fontSize="x-small" />
                                            </Button>
                                        </ButtonGroup>
                                        : <button className='best-sellers-add-button'
                                            onClick={(e) => {
                                                handleAddToCart(data);
                                            }}>Add</button>
                                    }</div>
                                </div>
                            </div>
                        </div>
                     </Link>
                ))}
            </div>
        </div>
    )
}

export default BestSellersProducts