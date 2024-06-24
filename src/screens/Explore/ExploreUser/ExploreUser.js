import React, { useEffect, useRef, useState } from "react";
import { Card, Button } from "@mui/material";
import './ExploreUser.css';
import topCreators from '../../../assets/imagespng/topCreators.png';
import userPlaceholder from '../../../assets/imagespng/user.png';
import { Link, useNavigate } from "react-router-dom";

const ExploreUser = ({ variant, columns, dataSource, heading, limit, handleFollow }) => {
  const [displayData, setDisplayData] = useState(columns.slice(0, limit));
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const handleViewAll = () => {
    navigate('/view_all_creators', { state: { creatorsArray: columns } });
  };

  const formatUsername = (username) => {
    return username.length > 15 ? `${username.slice(0, 15)}...` : username;
  };

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <div className="explore-user-section">
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
      <div className="scroll-container">
        <Button className="scroll-btn left" onClick={scrollLeft}>{"<"}</Button>
        <div className="videos-container" ref={containerRef}>
          {displayData.map((data, index) => (
            <div key={index} className="user-card-container">
              <Link to={`/profile/${data?.account_id}/3`} className='link-user-profile'>
                <Card className="user-card">
                  <img
                    className="user-img"
                    src={
                      data?.profile_picture
                        ? data.profile_picture.includes("https://")
                          ? data?.profile_picture
                          : `https://cdn.commeat.com/${data?.profile_picture}`
                        : userPlaceholder
                    }
                    alt={heading}
                  />
                  <div className="user-text">
                    {formatUsername(data.username)}
                  </div>
                  <Button className="user-follow-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      handleFollow(data.account_id);
                    }}
                  >
                    {data.isfollow ? 'Following' : '+ Follow'}
                  </Button>
                </Card>
              </Link>
            </div>
          ))}
        </div>
        <Button className="scroll-btn right" onClick={scrollRight}>{">"}</Button>
      </div>
    </div>
  );
};

export default ExploreUser;
