import React, { useState } from 'react';
import './Affliate.css';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const Affiliate = ({ heading, columns, limit, display_limit }) => {
    const [displayData, setDisplayData] = useState(columns.slice(0, display_limit));
    const navigate = useNavigate();
    const handleViewAll = () => {
        navigate('/view_all_affiliates', { state: { affiliateArray: columns } });
    };
    const BUCKET_URL = "https://cdn.commeat.com/";
    return (
        <div className="explore-user-section">
            <div className="explore-curation-heading">
                <div className="explore-curation-heading explore-users">
                    <div className="explore-user-heading">
                        <strong>{heading}</strong>
                    </div>

                    <Button onClick={handleViewAll} className="view-btn">
                        View All
                    </Button>
                </div>
            </div>
            <div className="affiliate-container">
                {displayData?.map((data) => (
                    <div key={data.id} className="affiliate-div">
                        <div className="affiliate-card" onClick={() => window.open(data?.url, '_blank', 'noopener,noreferrer')}>
                            <img src={`${BUCKET_URL + data.image}`} alt={data.name} className="affiliate-img" />
                        </div>
                        <div className="affiliate-text">{data.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Affiliate;
