import React, { useState } from "react";
import VideoCard from "../../../components/videocard/VideoCard";
import './ExploreVideos.css'
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const ExploreVideos = ({ heading, columns, display_limit }) => {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);
    const [displayData, setDisplayData] = useState(columns.slice(0, display_limit));
    const [show, setShow] = useState(false);
    const [src, setSrc] = useState("");
    const [poster, setPoster] = useState("");
    const BUCKET_URL = "https://cdn.commeat.com/";

    const handleToggle = () => {
        if (isExpanded) {
            setDisplayData(columns.slice(0, display_limit));
        } else {
            setDisplayData(columns);
        }
        setIsExpanded(!isExpanded);
    };

    const handleViewAll = () => {
        navigate(`/view_all_videos/${heading.slice(1)}`, { state: { videosArray: columns} });
    };

    return (
        <div className="explore-user-section">
            <div className="explore-curation-heading explore-brands"><strong>{heading}</strong>

                {/* {columns.length > displayLimit && ( */}
                    <Button onClick={handleViewAll} className="view-btn">
                        View All
                    </Button>
                {/* )} */}
            </div>

            <div className="videos-conatiner">
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
                        <VideoCard post={data} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExploreVideos;
