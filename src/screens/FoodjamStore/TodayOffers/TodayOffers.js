import React, { useState } from 'react';
import './TodayOffers.css'; // Make sure to import your CSS file
import placeholder from '../../../assets/imagespng/placeholder.png'; // Update with correct path
import topCreators from '../../../assets/imagespng/topCreators.png'; // Update with correct path
import { Button, Card, CardContent, Typography } from '@mui/material'; // If using Material UI
import { Link } from 'react-router-dom';
import { ProductCard } from '../../../components/ProductCard/ProductCard';

const TodayOffers =  ({ variant, columns, heading, display_limit }) => {
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

    const formatBrandname = (description, alphabet_limit) => {
        return description?.length > alphabet_limit ? `${description.slice(0, alphabet_limit)}...` : description;
    };

    return (
        <div className="today-offer-section">
            <div className="today-offer">
                <div className="today-offer-heading">
                    <img src={topCreators} alt="topCreators" className="topCreators-img" />
                    <strong>{heading}</strong>
                </div>

                {columns?.length > display_limit && (
                    <Button onClick={handleToggle} className="view-btn">
                        {isExpanded ? 'View Less' : 'View All'}
                    </Button>
                )}
            </div>

            <div className="today-offer-container">
                {displayData.map((data, index) => (
                    // <div key={index} className="today-offer-card-container">
                    //     <Link to={`/product/${data?.product_id}`} className='link-today-offer'>
                    //         <img
                    //             src={
                    //                 data.thumb?.includes("https://")
                    //                     ? data.thumb
                    //                     : `https://cdn.commeat.com/${data.thumb}`
                    //             }
                    //             alt={heading}
                    //             className="today-offer-img"
                    //         />
                    //         <div className="today-offer-text-wrapper">
                    //             <p className="today-offer-description">{formatBrandname(data.description)}</p>
                    //         </div>
                    //     </Link>
                    // </div>
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

export default TodayOffers