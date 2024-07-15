import React, { useState } from 'react';
import './DealsProducts.css'; // Make sure to import your CSS file
import placeholder from '../../../assets/imagespng/placeholder.png'; // Update with correct path
import topCreators from '../../../assets/imagespng/topCreators.png'; // Update with correct path
import { Button, Card, CardContent, Typography } from '@mui/material'; // If using Material UI
import { Link } from 'react-router-dom';
const colors = ['#331a1a', '#2F4F4F', '#483D8B', '#556B2F', '#8B4513', '#5F9EA0', '#4B0082'];
 // Add as many colors as you need

const DealsProducts = ({ variant, columns, heading, display_limit }) => {
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
    <div className="shop-card-section">
      <div className="shop-brands">
        <div className="shop-dealProduct-heading">
          <img src={topCreators} alt="topCreators" className="topCreators-img" />
          <strong>{heading}</strong>
        </div>

        {columns?.length > display_limit && (
          <Button onClick={handleToggle} className="view-btn">
            {isExpanded ? 'View Less' : 'View All'}
          </Button>
        )}
      </div>

      <div className="dealProduct-container">
        {displayData.map((data, index) => (
          <div key={index} className="dealProduct-card-container" style={{ backgroundColor: colors[index % colors.length] }}>
            <Link to={`/product/${data?.product_id}`} className='link-shop-brand'>
                <div className="dealProduct-image-container">
                  <img
                    className="brand-img"
                    src={
                      data?.image
                        ? data.image.includes("https://")
                          ? data?.image
                          : `https://cdn.commeat.com/${data?.image}`
                        : placeholder
                    }
                    alt={heading}
                  />
                </div>
                  <div className="dealProduct-brand-title">
                    {formatBrandname(data.title,60) || ''}
                    <div className='view-shop-brand'>View</div>
                  </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealsProducts;
