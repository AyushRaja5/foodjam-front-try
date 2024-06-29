import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { List, ListItem, ListItemText, Popover, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Dialog, Stack, Skeleton } from '@mui/material';
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
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('foodjam-user'));
  const [loginOrSignUp, setLoginOrSignUp] = useState('Login');
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [showSignInMenu, setShowSignInMenu] = useState(false);
  const [loginNumber, setLoginNumber] = useState('');
  const [signupNumber, setsignupNumber] = useState('');
  const [signupName, setsignupName] = useState('');
  const [signupEmail, setsignupEmail] = useState('');
  const [otpText, setotpText] = useState('');
  const otpRecievedFromAPI = useSelector(state => state.authUser);
  const signUpResponse = useSelector(state => state.signUpUser);
  const [loggedUser, setLoggedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(90);
  const [showResendLink, setShowResendLink] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
  }, []);
  // console.log(loggedUser,'logged user')
 useEffect(() => {
  if (otpRecievedFromAPI.token && !isLoggedIn) {
    setIsLoading(true);  // Start loading

    const loggedUserFromStorage = JSON.parse(localStorage.getItem('foodjam-user'));
    setLoggedUser(loggedUserFromStorage);
    
    if (loggedUserFromStorage) {
      navigate(`/profile/${loggedUserFromStorage.account_id}/1`);
      setShowOTPForm(false);
      setShowSignInMenu(false);
      setotpText('');
      setLoginNumber('');
      toast.success("Login Successful");
      setIsLoggedIn(true);
    }

    setIsLoading(false);  // Stop loading
  } else if (otpRecievedFromAPI.error) {
    toast.error(otpRecievedFromAPI.error);
    setLoginOrSignUp('Sign Up');
    setsignupNumber(loginNumber);
  }
}, [otpRecievedFromAPI, isLoggedIn, navigate, loginNumber]);

  // useEffect(() => {
  //   const handleOutsideClick = (event) => {
  //     if (profileRef.current && !profileRef.current.contains(event.target)) {
  //       setAnchorEl(null);
  //     }
  //   };

  //   document.addEventListener('mousedown', handleOutsideClick);
  //   return () => {
  //     document.removeEventListener('mousedown', handleOutsideClick);
  //   };
  // }, []);

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
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const login_type = 'phone';
    LoginUser({ login_type, phone: loginNumber })
      .then((response) => {
        toast.success(response.message);
        setShowOTPForm(true);
      })
      .catch((error) => {
        console.error('Login failed:', error);
      });
  };

  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    const login_type = 'phone';
    const userData = { login_type, phone: signupNumber, email: signupEmail, first_name: signupName, otp: otpText };
    dispatch(signupRequest(userData));
  };

  const handleOTPSubmit = (event) => {
    event.preventDefault();
    dispatch(loginRequest({ phone: loginNumber, otp: otpText }));
  };

  useEffect(() => {
    if (signUpResponse.token) {
      toast.success("Sign Up Successful");
    } else if (signUpResponse.error !== null) {
      toast.error(signUpResponse.error);
    }
  }, [signUpResponse]);

  useEffect(() => {
    let countdown;
    if (showOTPForm && timer > 0) {
      countdown = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setShowResendLink(true);
    }
    return () => clearInterval(countdown);
  }, [showOTPForm, timer]);

  const getLastSegment = (path) => {
    const segments = path.split('/');
    return segments[segments.length - 1];
  };

  const getPageName = () => {
    const path = location.pathname;
    if (path === '/') return 'Home';
    if (path.includes('/explore')) return 'Explore';
    if (path.includes('/foodjamstore')) return 'Shop';
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

  if(isLoading)
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
          <img src={FJLogo} alt="Logo" />
        </Link>
        <div className="search_bar">
          <input type="text" placeholder="Search..." disabled/>
          <img src={SearchIcon} alt="Search" className="search-icon" />
        </div>
        <div className="navbar-collapse">
          <ul className="navMenu">
            <li><Link to="/"><img src={FJ} alt='home' />Home</Link></li>
            <li><Link to="https://event.foodjam.in/" target='blank'><img src={Explorer} alt='event' />Event</Link></li>
            <li><Link to="/explore"><img src={Explorer} alt='explorer' />Explore</Link></li>
            <li><Link to="/foodjamstore"><img src={Bag} alt='Shop' />Shop</Link></li>
            {isLoggedIn ? (
              <li ref={profileRef}>
                <Link onClick={handleClick} ><img src={Profile} alt="Profile" /> Profile</Link>
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
              <li><Link onClick={() => setShowSignInMenu(true)}><img src={Profile} alt='Signin' />SignIn</Link></li>
            )}
          </ul>
        </div>
      </nav>

      <div className="mobile-header">
        <div className="page-name">{getPageName()}</div>
        <div className="mobile-icons">
          <img src={SearchIcon} alt='search' />
          <Link to={`/notifications`}><img src={notificationimg} alt='bell' /></Link>
          {
            location.pathname.includes('/profile') || location.pathname.includes('/setting') ? (
              <Link to='/setting'><img src={settingsimg} alt='settings' /></Link>
            ) : (
              <Link to='/cart'><img src={cartimg} alt='cart' /></Link>
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

      <div className={`signin-menu ${showSignInMenu ? 'show-signin-menu' : ''}`}>
        <img src={Cross} alt='cross' onClick={() => setShowSignInMenu(false)} />
        <div className='signmeny-heading-image'>
          <div>
            {loginOrSignUp}
            {/* <div ><span className='toggle-or'>or </span><span onClick={toggleLoginSignUp} className='toggle-text'>{ loginOrSignUp=='Login' ? 'SignUp to your account >' : 'Login to your account >'}</span></div> */}
          </div>
          <img src={EmptyList} alt='emptylist' />
        </div>
        {loginOrSignUp === 'Login' ? (
          !showOTPForm ? (
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <input type="tel" tabIndex="1" maxLength="10" autoComplete="off" placeholder="Phone Number" value={loginNumber} onChange={(e) => setLoginNumber(e.target.value)} required />
              </div>
              <button type="submit">Login</button>
              <div className='tnc-login'>By clicking on Login, I accept the Terms & Conditions & Privacy Policy</div>
            </form>
          ) : (
            <form onSubmit={handleOTPSubmit}>
              <div className="form-group">
                <input type="text" value={otpText} onChange={(e) => setotpText(e.target.value)} placeholder="Enter OTP" required />
              </div>
              <button type="submit">Submit OTP</button>
              <Link className='otp-page-backlink' onClick={() => setShowOTPForm(false)}>Go back to Login</Link>
              <br />
              <br/>
               {showResendLink ? (
                <div className='resend-otp'>
                  <Link className='resend-otp-link'  onClick={handleLoginSubmit}>Resend OTP</Link>
                </div>
              ) : (
                <div className='resend-otp'>Resend OTP in : 00:{timer < 10 ? `0${timer}` : timer} Sec</div>
              )}
            </form>
          )
        ) : (
          <form onSubmit={handleSignUpSubmit}>
            <div className="form-group">
              <input type="tel" value={signupNumber} onChange={(e) => setsignupNumber(e.target.value)} tabIndex="1" maxLength="10" autoComplete="off" placeholder='Phone Number' required />
            </div>
            <div className="form-group">
              <input type="text" value={signupName} onChange={(e) => setsignupName(e.target.value)} placeholder='Your First Name' required />
            </div>
            <div className="form-group">
              <input type="email" value={signupEmail} onChange={(e) => setsignupEmail(e.target.value)} placeholder='Your Email' required />
            </div>
            <button type="submit">Sign Up</button>
            <div className='tnc-login'>By clicking on Sign Up, I accept the Terms & Conditions & Privacy Policy</div>
          </form>
        )}
      </div>

      <div className="bottom_nav_Mobile">
        <Link to="/">
          <img src={FJ} alt='home' />
          <span>Home</span>
        </Link>
        <Link to="/explore">
          <img src={Explorer} alt='explorer' />
          <span>Explore</span>
        </Link>
        <Link to="/foodjamstore">
          <img src={Bag} alt='Shop' />
          <span>Shop</span>
        </Link>
        {loggedUser ? (
          <Link to={`/profile/${loggedUser?.account_id}/1`}><img src={Profile} alt="Profile" />Profile</Link>
        ) : (
          <Link onClick={() => setShowSignInMenu(true)}><img src={Profile} alt='home' />SignIn</Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
