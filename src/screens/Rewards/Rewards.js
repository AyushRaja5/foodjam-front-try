import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRewardsRequest } from '../../redux/actions/rewardsActions'; // Adjust the path as needed
import { Stack, Skeleton, Typography } from '@mui/material';
import './Rewards.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

const Rewards = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { rewards, loading: rewardsLoading, error: rewardsError } = useSelector(state => state.rewardsData);
  const user = JSON.parse(localStorage.getItem('foodjam-user'));
  const token = user ? user.sessionToken : null;

  useEffect(() => {
    dispatch(fetchRewardsRequest());
  }, [dispatch]);

  const handleRewardClick = (rewardId) => {
    if (token) {
      navigate(`/rewardsInfo/${rewardId}`);
    } else {
      toast.warning('Please log in to view reward details.');
    }
  };

  if (rewardsLoading) return (
    <div className='water'>
      <Stack spacing={1} sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
        <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
        <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
        <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
        <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
      </Stack>
    </div>
  );

  if (rewardsError) return <Typography variant="h6" color="error">{rewardsError}</Typography>;

  return (
    <div className="rewards-container">
      <div className="rewards-grid">
        {rewards?.data?.map(reward => (
          <div key={reward.id} className="reward-card"  onClick={() => handleRewardClick(reward.id)}>
            <img src={reward.cover_image} alt={reward.logo} />
            <div className="reward-card-info">
              <Typography variant="h5" className="reward-card-title">
                {truncateText(reward.title, 30)}
              </Typography>
              <Typography variant="body2" className="reward-card-expiry">
                Expiry Date: {new Date(reward.expires).toLocaleDateString()}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rewards;
