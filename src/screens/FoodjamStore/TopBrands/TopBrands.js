import React, { useEffect, useRef, useState } from "react";
import { Card, Button } from "@mui/material";
import './TopBrands.css';
import topCreators from '../../../assets/imagespng/topCreators.png';
import userPlaceholder from '../../../assets/imagespng/user.png';
import { Link, useNavigate } from "react-router-dom";

const TopBrands = ({ heading, columns, display_limit }) => {
    const [displayData, setDisplayData] = useState(columns.slice(0, display_limit || 6));

    const navigate = useNavigate();
    const handleViewAll = () => { 
        // navigate('/top_brands')
        navigate(`/view_all_brands`, { state: { brandArray: columns } });
    };

    const truncateText = (text, maxLength) => {
        if (text?.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };
    return (
        <div className="top-brands-section">
            <div className="top-brands">
                <div className="top-brands-heading">
                    <img src={topCreators} alt="topCreators" className="topCreators-img" />
                    <strong>{heading}</strong>
                </div>
                <Button onClick={handleViewAll} className="top-brands-view-btn">
                    View All
                </Button>
            </div>

            <div className="top-brands-container">
                {displayData.map((data, index) => (
                    <div key={index} className="top-brands-card-container">
                        <Link to={`/brand/${data?.manufacturer_id}`} className='link-top-brands-profile'>
                            <Card className="top-brands-card">
                                <img
                                    className="top-brands-img"
                                    src={data?.icon}
                                    alt={heading}
                                />
                                <div className="top-brands-text">
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

export default TopBrands