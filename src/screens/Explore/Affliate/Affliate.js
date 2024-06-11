import React from 'react';
import './Affliate.css';

const Affiliate = ({ heading, columns }) => {
    const BUCKET_URL = "https://cdn.commeat.com/";
    return (
        <div className="explore-user-section">
            <div className="explore-curation-heading">{heading}</div>
            <div className="affiliate-container">
                {columns.map((data) => (
                    <div key={data.id} className="affiliate-div">
                        <div className="affiliate-card" onClick={()=>  window.open(data?.url, '_blank', 'noopener,noreferrer')}>
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
