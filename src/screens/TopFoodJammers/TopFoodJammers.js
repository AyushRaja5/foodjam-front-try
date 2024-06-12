import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboardRequest } from '../../redux/actions/ExploreActions';
import { Box, Button, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Dialog, DialogTitle, DialogContent, CircularProgress, Skeleton, Stack, Menu, MenuItem, TextField, IconButton } from '@mui/material';
import './TopFoodJammers.css';
import { ArrowForwardIos } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import forwardIcon from '../../assets/imagespng/forwardIcon@3x.png'

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const years = Array.from(new Array(10), (val, index) => new Date().getFullYear() - index);

const TopFoodJammers = () => {
  const dispatch = useDispatch();
  const { leaderboardData, loading: leaderboardLoading, error: leaderboardError } = useSelector(state => state.exploreData);
  const [date, setDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const filterDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    dispatch(fetchLeaderboardRequest(filterDate));
  }, [dispatch, date]);

  const handleDateChange = (type, value) => {
    const newDate = new Date(date);
    if (type === 'month') {
      newDate.setMonth(value);
    } else {
      newDate.setFullYear(value);
    }
    setDate(newDate);
    setAnchorEl(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (leaderboardLoading) {
    return (
      <div className='leaderboard-skeleton'>
        <Stack spacing={1}>
          <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'100%'} height={80} />
          <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'100%'} height={80} />
          <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'100%'} height={80} />
        </Stack>
      </div>
    );
  }

  if (leaderboardError) {
    return <div className='error'>Error: {leaderboardError}</div>;
  }

  return (
    <Box className="leaderboard-section">

      <Typography variant="body1" paragraph className='leaderboard-summary'>
        <span>To all the Foodjammers, be on the top of the leaderboard every month and be assured of winning gifts,
          free rewards, and many other benefits.</span>

        <span>
          Easy and simple to do, ensure that you are on track and see how you go up and down the month.
        </span>

        <span>You get the following points for each act as shown in</span>
      </Typography>

      <Box className='lps-date-box'>
        <Button variant="text" color="primary" onClick={openModal} className='lps-link'>
          Leaderboard Points System (LPS)
        </Button>

        <Button variant="outlined" onClick={handleMenuOpen} className='date-select-leaderboard'>
          {`${months[date.getMonth()]} - ${date.getFullYear()}`}
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <Box display="flex" flexDirection="column" p={2}>
            <TextField
              select
              label="Month"
              value={date.getMonth()}
              onChange={(e) => handleDateChange('month', parseInt(e.target.value, 10))}
              variant="outlined"
              margin="normal"
            >
              {months.map((month, index) => (
                <MenuItem key={month} value={index}>
                  {month}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Year"
              value={date.getFullYear()}
              onChange={(e) => handleDateChange('year', parseInt(e.target.value, 10))}
              variant="outlined"
              margin="normal"
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Menu>

      </Box>

      <List>
        {leaderboardData?.data?.length > 0 && (
          <ListItem className='list-leaderboard-header'>
            <ListItemText primary="Profile" />
            <ListItemText className='list-head' primary="Points" />
          </ListItem>
        )}
        {leaderboardData?.data?.length > 0 ? leaderboardData.data.map((item, index) => (
          <ListItem key={index} button className='list-item-leaderboard'>
            <Box display="flex" alignItems="center" mr={1}>
              <Typography ><strong>{index + 1}</strong></Typography>
            </Box>

            <ListItemAvatar>
              <Avatar src={item?.profile_picture
                    ? item.profile_picture.includes("https://")
                      ? item?.profile_picture
                      : `https://cdn.commeat.com/${item?.profile_picture}`
                    : ""|| '/default-user.png'} />
            </ListItemAvatar>

            <ListItemText primary={item.username || 'Anonymous'} className='username-section' />

            <Box display="flex" alignItems="center">
              <div className='points-section'>{item.points}</div>
            </Box>

            <Link to={`/profile/${item?.account_id}/2`} className='link-user-profile'>
              {/* <ArrowForwardIos /> */}
              <img src={forwardIcon} alt='forwardIcon' className='leader-forward-icon'/>
            </Link>

          </ListItem>
        )) : <Typography variant="body2" color="textSecondary">No data found!</Typography>}
      </List>
      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle>Leaderboard Points System (LPS)</DialogTitle>
        <DialogContent>
          {/* Add your points system data here */}
        </DialogContent>
        <Button onClick={closeModal}>Close</Button>
      </Dialog>
    </Box>
  );
};

export default TopFoodJammers;
