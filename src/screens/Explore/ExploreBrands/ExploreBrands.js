import React, { useState } from "react";
import wishlist from '../../../assets/imagespng/wishlist.png';
import placeholder from '../../../assets/imagespng/placeholder.png';
import { Button } from "@mui/material";
import './ExploreBrands.css';

const ExploreBrands = ({ heading, variant, limit, columns, dataSource }) => {
  const displayLimit = 4;
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayData, setDisplayData] = useState(columns.slice(0, displayLimit));

  const handleToggle = () => {
    if (isExpanded) {
      setDisplayData(columns.slice(0, displayLimit));
    } else {
      setDisplayData(columns);
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="explore-user-section">
      <div className="explore-brands">
        <div className="explore-curation-heading">
          <img src={wishlist} alt="wishlist" className="wishlist-img" />
          {heading}
        </div>

        {columns.length > displayLimit && (
          <Button onClick={handleToggle} className="view-btn">
            {isExpanded ? 'View Less' : 'View All'}
          </Button>
        )}
      </div>

      <div className="curation-conatiner">
        {displayData.map((data, index) => (
          <div key={index} className="user-card">
            <img
              className="user-img"
              src={
                data.images
                  ? data.images.includes("https://")
                    ? data.images
                    : `https://cdn.commeat.com/${data.images}`
                  : placeholder
              }
              alt={heading}
            />
            <p className="user-text explore-brands-text">{data.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreBrands;
