import React, { useState } from 'react';
import './TopOffersProducts.css';
import crown from '../../../assets/imagespng/crownImg.png'; // Update with correct path
import { Button } from '@mui/material'; // If using Material UI
import { Link } from 'react-router-dom';

const TopOffersProducts =  ({ variant, columns, heading, display_limit }) => {
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
                    <img src={crown} alt="crown" className="crown-img" />
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
                    <div key={index} className="today-offer-card-container">
                        <Link to={`/product/${data?.product_id}`} className='link-today-offer'>
                            <img
                                src={
                                    data.thumb?.includes("https://")
                                        ? data.thumb
                                        : `https://cdn.commeat.com/${data.thumb}`
                                }
                                alt={heading}
                                className="today-offer-img"
                            />
                            <div className="today-offer-text-wrapper">
                                <p className="today-offer-description">{formatBrandname(data.description)}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TopOffersProducts