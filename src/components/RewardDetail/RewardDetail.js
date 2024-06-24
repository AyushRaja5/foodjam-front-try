import { Skeleton, Stack } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleRewardRequest } from '../../redux/actions/rewardsActions';

const RewardDetail = () => {
  const { rewardId } = useParams();
  const dispatch = useDispatch();
  const { singleReward, loading, error } = useSelector(state => state.rewardsData);
  console.log(rewardId)
  useEffect(() => {
    dispatch(fetchSingleRewardRequest(rewardId));
  }, [dispatch, rewardId]);

  if (loading) {
    return (
      <div className='water'>
      <Stack spacing={1} sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
        <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
        <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
        <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
        <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
      </Stack>
    </div>
    )
  }
  return (
    <div>
      <img src={singleReward?.logo} />
    </div>
  )
}

export default RewardDetail