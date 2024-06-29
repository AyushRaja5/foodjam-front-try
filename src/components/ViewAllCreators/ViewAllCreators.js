import React, { useEffect, useState } from 'react';
import './ViewAllCreators.css';
import { Link, useLocation } from 'react-router-dom';
import userPlaceholder from '../../assets/imagespng/user.png';
import { Button, Card, Grid, Skeleton, Stack } from '@mui/material';
import { followUser } from '../../services/Explore/ExploreService';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExploreRequest } from '../../redux/actions/ExploreActions';

const ViewAllCreators = () => {
  const location = useLocation();
  const [creatorsArray, setCreatorsArray] = useState([]);
  const { creatorsHeading } = location.state || { creatorsHeading: null };

  const dispatch = useDispatch();
  const { exploredata, loading: exploreLoading, successMessage } = useSelector(state => state.exploreData);
  
  const formatUsername = (username) => {
    return username.length > 15 ? `${username.slice(0, 15)}...` : username;
  };

  const handleFollow = async (accountToFollow) => {
    const user = JSON.parse(localStorage.getItem('foodjam-user'));
    const token = user ? user.sessionToken : null;
    const accountId = user ? user.account_id : null;

    if (!user || !token) {
      toast.error("You are not Signed In");
      return;
    }

    try {
      const response = await followUser(token, accountId, accountToFollow);
      toast.success(response?.data?.message || 'Successfully followed the user!');
      dispatch(fetchExploreRequest());
    } catch (error) {
      console.error('Failed to follow user:', error);
      toast.success(error.response?.data?.message || 'Something went wrong!');
    }
  };

  useEffect(() => {
    dispatch(fetchExploreRequest());
  }, [dispatch, successMessage]);

  useEffect(() => {
    if (exploredata && exploredata.rows) {
      const foundData = exploredata.rows.find(data => data.heading === creatorsHeading);
      if (foundData) {
        setCreatorsArray(foundData.columns);
      }
    }
  }, [exploredata, creatorsHeading]);

  if (exploreLoading) {
    return (
      <div className='water'>
        <Stack spacing={1} sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
          <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
          <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
          <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
        </Stack>
      </div>
    );
  }

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
                  {formatUsername(creator?.username)}
                </div>
                <Button className="user-follow-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    handleFollow(creator?.account_id);
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
