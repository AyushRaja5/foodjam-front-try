import React from 'react';
import './ViewAllCreators.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import userPlaceholder from '../../assets/imagespng/user.png'
import { Button, Card, Grid } from '@mui/material';
import { followUser } from '../../services/Explore/ExploreService';
import { toast } from 'react-toastify';
const ViewAllCreators = () => {
  const location = useLocation();
  const { creatorsArray } = location.state || { creatorsArray: [] };

  const user = JSON.parse(localStorage.getItem('foodjam-user'));
  const token = user ? user.sessionToken : null;
  const accountId = user ? user.account_id : null;

  const handleFollow = async (accountToFollow) => {
    if(token && accountId){
      toast.error("You are not Signed In")
      return;
    }
    try {
      const response = await followUser(token, accountId, accountToFollow);
      toast.success( response?.data?.message || 'Successfully followed the user!');
    } catch (error) {
      console.error('Failed to follow user:', error);
      toast.success( error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="view-all-creators-container">
      {creatorsArray.length > 0 ? (
        creatorsArray.map((creator, index) => (
          <Grid item key={index}>
            <Link to={`/profile/${creator?.account_id}/3`} className='link-user-profile'>
              <Card className="user-card">
                <img
                  className="user-img"
                  src={
                    creator?.profile_picture
                      ? creator.profile_picture.includes("https://")
                        ? creator?.profile_picture
                        : `https://cdn.commeat.com/${creator?.profile_picture}`
                      : userPlaceholder
                  }
                  alt={'View-all'}
                />
                <div className="user-text">
                  {`${creator.username}`}
                </div>
                <Button className="user-follow-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    handleFollow(creator.account_id);
                  }}
                >
                  {creator.isfollow ? 'Following' : '+ Follow'}
                </Button>
              </Card>
            </Link>
          </Grid>
        ))
      ) : (
        <div>No creators found</div>
      )}
    </div>
  );
};

export default ViewAllCreators;
