import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { List, ListItem, ListItemText, Popover, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Dialog, Stack, Skeleton, TextField, InputAdornment } from '@mui/material';
import './Navbar.css';
import FJLogo from '../../assets/imagessvg/foodjamLogo.svg';
import FJ from '../../assets/imagessvg/fj.svg';
import Bag from '../../assets/imagessvg/BagBottom.svg';
import Explorer from '../../assets/imagessvg/explorer.svg';
import Profile from '../../assets/imagessvg/profile.svg';
import Cross from '../../assets/imagespng/cross-button.png';
import EmptyList from '../../assets/imagespng/emptyListImg.png';
import SearchIcon from '../../assets/imagespng/search.png';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthToken, loginRequest, signupRequest } from '../../redux/actions/authActions';
import { LoginUser } from '../../services/LoginService';
import { toast } from 'react-toastify';
import Person from '@mui/icons-material/Person';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import LoaderOverlay from '../ConditionalLoader/LoaderOverlay';
import notificationimg from '../../assets/imagespng/notification.png'
import cartimg from '../../assets/imagespng/cart.png'
import settingsimg from '../../assets/imagespng/setting.png'
import Cartimg from '../../assets/imagespng/cart.png'
import { NotificationsActive, ShoppingCart } from '@mui/icons-material';
import LoginDrawer from '../../config/LoginDrawer';
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('foodjam-user'));
  const [loggedUser, setLoggedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    setDrawerOpen(open);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const location = useLocation();
  // const optionsRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('foodjam-user');
    if (token) setLoggedUser(JSON.parse(token));
    setLoading(false);
    setIsLoggedIn(!!token);
    setDrawerOpen(false)
  }, [navigate]);

  const handleRestrictedClick = (e, path) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error("You are not logged In.");
      setDrawerOpen(true);
    } else {
      navigate(path);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    setLogoutDialogOpen(true);
  };
  const handleLogoutConfirm = () => {
    toast.success("Logged Out Successfully")
    dispatch(clearAuthToken());
    localStorage.removeItem('foodjam-user');
    setIsLoggedIn(false);
    navigate('/');
    setLogoutDialogOpen(false);
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  const getLastSegment = (path) => {
    const segments = path.split('/');
    return segments[segments.length - 1];
  };

  const getPageName = () => {
    const path = location.pathname;
    if (path === '/') return 'Home';
    if (path.includes('/explore')) return 'Explore';
    if (path.includes('/shop')) return 'Shop';
    if (path.includes('/profile')) return 'Profile';
    if (path.includes('/notifications')) return 'Notification';
    if (path.includes('/setting')) return 'Settings';
    if (path.includes('/my_orders')) return 'My Orders';
    if (path.includes('/addresses')) return 'Addresses';
    if (path.includes('/preferences')) return 'Preferences';
    if (path.includes('/cart')) return 'Cart';
    if (path.includes('/top_foodjammers')) return 'Top Foodjammers';
    if (path.includes('/contests')) return 'Contests';
    if (path.includes('/workshop')) return 'Workshop';
    if (path.includes('/rewards')) return 'Rewards';
    if (path.includes('/campaigns')) return 'Campaigns';

    if (path.includes('/view_all_creators')) return 'Top Creators';
    if (path.includes('/view_all_affiliates')) return 'Explore Food Links';
    if (path.includes('/view_all_videos')) return `#${getLastSegment(path)}` || "Top Videos";

    return '';
  };

  if (isLoading)
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

  return (
    <div className='nav-bar-container'>
      {loading && <LoaderOverlay />}
      <nav className="dashboard_navbar_web">
        <Link to='/' className="navbar-brand">
          <img src={FJLogo} alt="Logo" className="navbar-logo" />
        </Link>
        {/* <div className="search_bar">
          <input type="text" placeholder="Search..." disabled/>
          <img src={SearchIcon} alt="Search" className="search-icon" />
        </div> */}
        <div className="navbar-collapse">
          <ul className="navMenu">
            <li><Link to="/"><img src={FJ} alt='home' className="nav-icon" />Home</Link></li>
            <li><Link to="/"><img src={SearchIcon} alt='search' className="nav-icon" />Search</Link></li>
            <li><Link to="https://event.foodjam.in/" target='blank'><img src={Explorer} alt='event' className="nav-icon" />Event</Link></li>
            {/* <li><Link to="/explore"><img src={Explorer} alt='explorer'  className="nav-icon"/>Explore</Link></li> */}
            <li><Link to="/shop"><img src={Bag} alt='Shop' className="nav-icon" />Shop</Link></li>
            <li><Link onClick={(e) => handleRestrictedClick(e, '/cart')}><img src={Bag} alt='Cart' className="nav-icon" />Cart</Link></li>
            {isLoggedIn ? (
              <li ref={profileRef}>
                <Link onClick={handleClick} className="profile-link"><img src={Profile} alt="Profile" className="nav-icon" /> Profile</Link>
                <Popover
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  PaperProps={{
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                >
                  <List>
                    <ListItem button component={Link} to={`/profile/${loggedUser?.account_id}/1`} onClick={handleClose}>
                      <Person /> <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button component={Link} to={`/cart`} onClick={handleClose}>
                      <ShoppingCart /> <ListItemText primary="My Cart" />
                    </ListItem>
                    <ListItem button component={Link} to={`/setting`} onClick={handleClose}>
                      <Settings /> <ListItemText primary="Settings" />
                    </ListItem>
                    <ListItem button component={Link} to={`/notifications`} onClick={handleClose}>
                      <NotificationsActive /> <ListItemText primary="Notifications" />
                    </ListItem>
                    <ListItem button onClick={() => { handleSignOut(); handleClose(); }}>
                      <Logout /> <ListItemText primary="Logout" />
                    </ListItem>
                  </List>
                </Popover>
              </li>
            ) : (
              <li><Link onClick={toggleDrawer(true)} className="signin-link"><img src={Profile} alt='Signin' className="nav-icon" />SignIn</Link></li>
            )}
          </ul>
        </div>
      </nav>

      <LoginDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
      <div className="mobile-header">
        <div className="page-name">{getPageName()}</div>
        {getPageName().length < 10 && <img src={FJLogo} className='fj-logo' />}
        <div className="mobile-icons">
          <img src={SearchIcon} alt='search' />
          <Link onClick={(e) => handleRestrictedClick(e, '/notifications')}><img src={notificationimg} alt='bell' /></Link>
          {
            location.pathname.includes('/profile') || location.pathname.includes('/setting') ? (
              <Link onClick={(e) => handleRestrictedClick(e, '/setting')}><img src={settingsimg} alt='settings' /></Link>
            ) : (
              <Link onClick={(e) => handleRestrictedClick(e, '/cart')}><img src={cartimg} alt='cart' /></Link>
            )
          }
        </div>
      </div>
      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutCancel}
      >
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to log out?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">Cancel</Button>
          <Button onClick={handleLogoutConfirm} color="primary">Logout</Button>
        </DialogActions>
      </Dialog>

      <div className="bottom_nav_Mobile">
        <Link to="/">
          <img src={FJ} alt='home' />
          <span>Home</span>
        </Link>
        <Link to="/explore">
          <img src={Explorer} alt='explorer' />
          <span>Explore</span>
        </Link>
        <Link to="/shop">
          <img src={Bag} alt='Shop' />
          <span>Shop</span>
        </Link>
        {loggedUser ? (
          <Link to={`/profile/${loggedUser?.account_id}/1`}><img src={Profile} alt="Profile" />Profile</Link>
        ) : (
          <Link onClick={toggleDrawer(true)}><img src={Profile} alt='home' />SignIn</Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
