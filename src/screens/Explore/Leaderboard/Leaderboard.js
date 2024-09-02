import React from 'react';
import './Leaderboard.css';
import userPlaceholder from '../../../assets/imagespng/user.png'; // Import the default user image
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const Leaderboard = ({ heading, columns, handleFollow }) => {
  const media = 'https://cdn.commeat.com/';

  const sortarr = [];
  sortarr.push(columns[2] || columns[1]);
  sortarr.push(columns[0]);
  sortarr.push(columns[1]);

  return (
    <div className="explore-user-section top-list-main-view">
      <h2 className="top-list-title">Top Foodjamers of the Month</h2>
      <div className="list-style">
        {sortarr.map((item, index) => (
          <div key={index} className="user-btn">
            <div
              className={`users-profile-btn ${index === 2 ? 'sub-img' : ''} ${index === 0 ? 'first-img' : ''}`}
              style={{
                backgroundImage: `url(${item?.profile_picture ? (item.profile_picture?.includes('https') ? item.profile_picture : media + item.profile_picture) : userPlaceholder})`
              }}
            >
              <div className="users-profile-label">
                <span className="users-profile-label-txt">Professional</span>
              </div>
            </div>
            <p className="user-name">{item?.username}</p>
            <Button className="user-follow-btn"
              onClick={(e) => {
                e.preventDefault();
                handleFollow(item.account_id);
              }}
            >
              {item?.isfollow ? 'Following' : '+ Follow'}
            </Button>
          </div>
        ))}
      </div>
      <Link to={`/top_foodjammers`} className='link-user-profile'>
        <p className="bottom-see-all-txt">See All</p>
      </Link>
    </div>
  );
};

export default Leaderboard;
