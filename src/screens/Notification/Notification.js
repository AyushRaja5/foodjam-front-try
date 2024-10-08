import React, { useEffect, useState } from 'react';
import './Notification.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserNotificationsRequest } from '../../redux/actions/userNotificationActions';
import { Skeleton, Stack } from '@mui/material';
import placeholderprofile from '../../assets/imagespng/placeholder.png'
import { Link } from 'react-router-dom';
import NotAuthorized from '../NotAuthorized/NotAuthorized';
import { toast } from 'react-toastify';
import NotFound from '../NotFound/NotFound';
const Notification = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.userNotification.usernotification);
  const loading = useSelector(state => state.userNotification.loading);
  const error = useSelector(state => state.userNotification.error);
  const cdnBaseURL = 'https://cdn.commeat.com/';
  useEffect(() => {
    dispatch(fetchUserNotificationsRequest(10, 1));
  }, [dispatch]);
  // console.log(notifications, 'notification')

  if (loading) return (
    <div className='userNotification'>
      <Stack spacing={1}>
        <Skeleton variant="rounded" width={'100%'} height={80} />
        <Skeleton variant="rounded" width={'100%'} height={80} />
        <Skeleton variant="rounded" width={'100%'} height={80} />
      </Stack>
    </div>
  );

  if (error) {
    { toast.error(error.response?.data?.message) }
    return (
      <div variant="h6" color="error">
        <NotFound />
      </div>);
  }
  if (notifications.length < 1) {
    return (
      <div style={{height:'80vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
          <span style={{fontSize:'24px'}}>
            Empty Notification
          </span>
      </div>);
  }

  const getTimeDifference = (createdAt) => {
    const timeDiffInDays = Math.floor((Date.now() - new Date(createdAt)) / (1000 * 60 * 60 * 24));

    if (timeDiffInDays > 30) {
      const months = Math.floor(timeDiffInDays / 30);
      return `${months} months ago`;
    } else {
      return `${timeDiffInDays} days ago`;
    }
  };
  return (
    <div className='userNotification'>
      {notifications?.map((notice) => (
        <Link to={`/profile/${notice?.account_id}/3`} className='linkuserNotificationToDoor'>
          <div className="notification" >
            <div className="profile-picture">
              <img src={notice.profile_picture ? `${cdnBaseURL}${notice.profile_picture}` : placeholderprofile} alt={`${notice.first_name}'s profile`} />
            </div>
            <div className="message">
              {notice.text}
            </div>
            <div className="date">
              {getTimeDifference(notice.created_at)}
              <div><strong>{notice.first_name}</strong></div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Notification