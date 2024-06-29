import { Button, Skeleton, Stack } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { fetchSingleRewardRequest } from '../../redux/actions/rewardsActions';
import userPlaceholder from '../../assets/imagespng/user.png'
import './RewardDetail.css'
const RewardDetail = () => {
  const { rewardId } = useParams();
  const dispatch = useDispatch();
  const { singleReward, loading, error } = useSelector(state => state.rewardsData);

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
    <div className='reward-detail-container'>
      <img src={singleReward?.data[0]?.banner
      ? singleReward?.data[0]?.banner.includes("https://")
      ? singleReward?.data[0]?.banner
      : `https://cdn.commeat.com/${singleReward?.data[0]?.banner}`
      : userPlaceholder
    } alt={singleReward?.data[0]?.title} className='reward-banner' />
      <div className='reward-content'>
        <img src={singleReward?.data[0]?.logo
      ? singleReward?.data[0]?.logo.includes("https://")
      ? singleReward?.data[0]?.logo
      : `https://cdn.commeat.com/${singleReward?.data[0]?.logo}`
      : userPlaceholder
    } alt={singleReward?.data[0]?.title} className='reward-logo' />
        <h1 className='reward-title'>{singleReward?.data[0]?.title}</h1>
        <div className='expiry-amount-redeem'>
        <p className='reward-expiry'>Expires <strong>{new Date(singleReward?.data[0]?.expires).toLocaleDateString()}</strong></p>
        <p className='reward-amount'>Amount <strong>₹{singleReward?.data[0]?.amount}</strong></p>
        {dayjs().isBefore(dayjs(singleReward?.data[0]?.expires)) && (
            <Button variant="contained" color="primary" className='redeem-button'>
              Redeem Voucher
            </Button>
          )}
        </div>
        <div className='reward-description' dangerouslySetInnerHTML={{ __html: singleReward?.data[0]?.description }}></div>
        <div className='reward-terms' dangerouslySetInnerHTML={{ __html: singleReward?.data[0]?.terms_conditions }}></div>
      </div>
    </div>
  );
}

export default RewardDetail