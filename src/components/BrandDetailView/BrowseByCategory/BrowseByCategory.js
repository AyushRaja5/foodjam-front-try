import React, { useState } from "react";
import './BrowseByCategory.css'
import { Button, ButtonBase } from "@mui/material";
import wishlist from '../../../assets/imagespng/wishlist.png';
import { useNavigate } from "react-router-dom";
const BrowseByCategory = ({ heading, columns, display_limit }) => {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);
    const [displayData, setDisplayData] = useState(columns.slice(0, display_limit || 4));
    const [show, setShow] = useState(false);
    const [src, setSrc] = useState("");
    const [poster, setPoster] = useState("");
    const BUCKET_URL = "https://cdn.commeat.com/";


    const handleViewAll = () => {
        navigate(`/view_all_videos/${heading.slice(1)}`, { state: { videosArray: columns } });
    };

    return (
        <div className="explore-user-section">
            <div className="explore-curation-heading explore-brands">
                <div className="explore-user-heading">
                    <img src={wishlist} alt="wishlist" className="wishlist-img" />
                    <strong>{heading}</strong>
                </div>
                <Button onClick={handleViewAll} className="view-btn">
                    View All
                </Button>
            </div>

            <div className="browse-by-category-conatiner">
                {displayData.map((data, i) => (
                    <div
                        key={i}
                        className="video-section-container"
                        onClick={() => {
                            setSrc(`${BUCKET_URL + data.media}`);
                            setPoster(`${BUCKET_URL + data.thumbnail}`);
                            setShow(true);
                        }}
                    >

                        <div className='video-card-container'>
                            <img src={`${data?.image}`} alt='Video Thumbnail' className='video-thumbnail' />
                            <div className='overlay'>
                                <span className='bottom-center-text'>
                                    <div className='brand-view-name'>{data.name}</div>
                                    <Button className="brand-view-btn">View</Button>
                                </span>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrowseByCategory;
