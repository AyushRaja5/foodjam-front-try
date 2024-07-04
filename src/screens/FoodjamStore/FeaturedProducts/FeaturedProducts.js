import React, { useState } from 'react';
import './FeaturedProducts.css'; // Make sure to import your CSS file
import placeholder from '../../../assets/imagespng/placeholder.png'; // Update with correct path
import crownImg from '../../../assets/imagespng/crownImg.png'; // Update with correct path
import { Button, Card, CardContent, Typography } from '@mui/material'; // If using Material UI
import { Link } from 'react-router-dom';


const FeaturedProducts = ({ variant, columns, heading, display_limit }) => {
    const [displayData, setDisplayData] = useState(columns.slice(0, display_limit));
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        if (isExpanded) {
            setDisplayData(columns.slice(0, display_limit));
        } else {
            setDisplayData(columns);
        }
        setIsExpanded(!isExpanded);
    };

    const formatBrandname = (title, alphabet_limit) => {
        return title?.length > alphabet_limit ? `${title.slice(0, alphabet_limit)}...` : title;
    };

    return (
        <div className="featured-product-section">
            <div className="featured-product">
                <div className="featured-product-heading">
                    <img src={crownImg} alt="crownImg" className="crown-img" />
                    <strong>{heading}</strong>
                </div>

                {columns?.length > display_limit && (
                    <Button onClick={handleToggle} className="view-btn">
                        {isExpanded ? 'View Less' : 'View All'}
                    </Button>
                )}
            </div>

            <div className="featured-product-container">
                {displayData.map((data, index) => (
                    <div key={index} className="featured-product-card-container">
                        <Link to={`/product/${data?.product_id}`} className='link-featured-product'>
                            <img
                                src={
                                    data.thumb?.includes("https://")
                                        ? data.thumb
                                        : `https://cdn.commeat.com/${data.thumb}`
                                }
                                alt={heading}
                                className="featured-product-img"
                            />
                            <div className="featured-product-text-wrapper">
                                <p className="featured-product-title">{data.title}</p>
                                <p className="featured-product-description">{data.description}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FeaturedProducts