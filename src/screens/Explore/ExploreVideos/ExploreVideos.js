import React, { useState } from "react";
import VideoCard from "../../../components/videocard/VideoCard";
import './ExploreVideos.css'
import { Button } from "@mui/material";
const ExploreVideos = ({ heading, columns, display_limit }) => {
    const displayLimit = display_limit;
    const [isExpanded, setIsExpanded] = useState(false);
    const [displayData, setDisplayData] = useState(columns.slice(0, displayLimit));
    const [show, setShow] = useState(false);
    const [src, setSrc] = useState("");
    const [poster, setPoster] = useState("");
    const BUCKET_URL = "https://cdn.commeat.com/";

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
            <div className="explore-curation-heading explore-brands"><strong>{heading}</strong>

                {columns.length > displayLimit && (
                    <Button onClick={handleToggle} className="view-btn">
                        {isExpanded ? 'View Less' : 'View All'}
                    </Button>
                )}
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
