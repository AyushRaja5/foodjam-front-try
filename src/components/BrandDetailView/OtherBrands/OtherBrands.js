import React, { useEffect, useRef, useState } from "react";
import { Card, Button } from "@mui/material";
import './OtherBrands.css';
import topCreators from '../../../assets/imagespng/topCreators.png';
import userPlaceholder from '../../../assets/imagespng/user.png';
import { Link, useNavigate } from "react-router-dom";

const OtherBrands = ({ heading, columns, display_limit }) => {
  const navigate = useNavigate();
  const [displayData, setDisplayData] = useState(columns.slice(0, display_limit || 5));

  const handleViewAll = () => {
    navigate(`/view_all_brands`, { state: { brandArray: columns } });
  };

  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className="explore-user-section other-brands">
      {columns.length > 0 && (
        <div className="explore-curation-heading explore-users">
          <div className="explore-user-heading">
            <img src={topCreators} alt="topCreators" className="topCreators-img" />
            <strong>{heading}</strong>
          </div>
          <Button onClick={handleViewAll} className="view-btn">
            View All
          </Button>
        </div>
      )}

      <div className="videos-container">
        {displayData.map((data, index) => (
          <div key={index} className="user-card-container">
            <Link to={`/brand/${data?.manufacturer_id}`} className='link-user-profile'>
              <Card className="user-card">
                <img
                  className="user-img"
                  src={data?.icon}
                  alt={heading}
                />
                <div className="user-text">
                  {truncateText(data.name, 20)}
                </div>

              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OtherBrands