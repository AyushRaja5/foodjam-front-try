import React, { useState } from "react";
import wishlist from '../../../assets/imagespng/wishlist.png';
import placeholder from '../../../assets/imagespng/placeholder.png';
import { Button } from "@mui/material";
import './ExploreBrands.css';
import { Link } from "react-router-dom";

const ExploreBrands = ({ heading, variant, limit, columns, dataSource }) => {
  const displayLimit = 5;
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
          <Link to={`/brand/${data.manufacturer_id}`} className="link-user-profile" key={index} >
          <div className="brand-card">
            <img
              className="brand-image"
              src={
                data.images
                  ? data.images.includes("https://")
                    ? data.images
                    : `https://cdn.commeat.com/${data.images}`
                  : placeholder
              }
              alt={heading}
            />
            {/* <p className="user-text explore-brands-text">{data.name}</p> */}
            <div className="brand-details">
              <img src={data.icon} className="brand-icon"/>
              <p className="brand-name">{data.name}</p>
              <p className="brand-description">{data.description.slice(0,120)}</p>
              {data.is_verified && <p className="brand-verified">Verified</p>}
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExploreBrands;
