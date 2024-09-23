import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboardRequest } from '../../redux/actions/ExploreActions';
import {Box, Button, Typography, List, ListItem, ListItemAvatar, Avatar, 
  ListItemText, Dialog, DialogTitle, DialogContent, CircularProgress, 
  Skeleton, Stack, Menu, MenuItem, TextField, IconButton, Accordion, 
  AccordionSummary, AccordionDetails  } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './TopFoodJammers.css';
import { Link } from 'react-router-dom';
import forwardIcon from '../../assets/imagespng/forwardIcon@3x.png'

// Points system data
const pointsSystemData = [
  {
    title: 'Video / Post',
    id: 1,
    pointsData: [
      { title: 'Upload video with products', subTitle: '', points: '+20' },
      { title: 'Upload video without products', subTitle: '', points: '+15' },
      { title: 'Share post', subTitle: '10 points to user, who has uploaded that video', points: '+5' },
      { title: 'Comment on post', subTitle: '5 points to user, who has uploaded that video', points: '+2' },
      { title: 'Like post', subTitle: '5 points to user, who has uploaded that video', points: '+2' },
      { title: 'View post', subTitle: '5 points to user, who has uploaded that video', points: '+2' },
    ],
  },
  {
    title: 'Explore',
    id: 2,
    pointsData: [{ title: 'Join contest', subTitle: '', points: '+20' }],
  },
  {
    title: 'Shop',
    id: 3,
    pointsData: [{ title: 'Place order', subTitle: '30 points to user, whose product is sold', points: '+20' }],
  },
  {
    title: 'Login',
    id: 4,
    pointsData: [{ title: 'Login', subTitle: '', points: '+20' }, { title: 'Register', subTitle: '', points: '+30' }],
  },
  {
    title: 'Profile',
    id: 5,
    pointsData: [
      { title: 'When your follower increased', subTitle: '5 points to user, whose followers increased', points: '+2' },
      { title: 'When your follower decreased', subTitle: '-5 points to user, whose followers decreased', points: '-2' },
    ],
  },
];


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

            <Link to={`/profile/${item?.account_id}/3`} className='link-user-profile'>
              {/* <ArrowForwardIos /> */}
              <img src={forwardIcon} alt='forwardIcon' className='leader-forward-icon'/>
            </Link>

          </ListItem>
        )) : <Typography variant="body2" color="textSecondary">No data found!</Typography>}
      </List>
      <Dialog open={isModalOpen} onClose={closeModal}  maxWidth="lg" fullWidth className='leader-board-dialog-box' >
        <DialogTitle>Leaderboard Points System (LPS)</DialogTitle>
        <DialogContent>
        {renderPointsSystem()}
        </DialogContent>
        <Button onClick={closeModal}>Close</Button>
      </Dialog>
    </Box>
  );
};

export default TopFoodJammers;

const isPositive = (points) => parseInt(points) > 0;

const renderPointsSystem = () => (
  <div style={{ padding: '16px' }}>
    {pointsSystemData.map((category) => (
      <Accordion key={category.id}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${category.id}-content`}
          id={`${category.id}-header`}
        >
          <Typography>{category.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {category.pointsData.map((item, index) => {
              const positive = isPositive(item.points);
              return (
                <ListItem key={index}>
                  <Box 
                    display="flex" 
                    justifyContent="space-between" 
                    width="100%" 
                    sx={{
                      backgroundColor: positive ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)',
                      padding: '8px',
                      borderRadius: '8px',
                      alignItems:'center'
                    }}
                  >
                    <Box>
                      <ListItemText primary={item.title} secondary={item.subTitle} />
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: positive ? 'green' : 'red',
                        fontWeight: 'bold',
                        fontSize: '18px'
                      }}
                    >
                      {item.points}
                    </Typography>
                  </Box>
                </ListItem>
              );
            })}
          </List>
        </AccordionDetails>
      </Accordion>
    ))}
  </div>
);