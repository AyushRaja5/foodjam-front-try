import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText, Popover } from '@mui/material';
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const optionsRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('foodjam-user');
    setLoggedUser(JSON.parse(token));
    setIsLoggedIn(!!token);
  }, []);
  // console.log(loggedUser)
  useEffect(() => {
    if (otpRecievedFromAPI.token && !isLoggedIn) {
      navigate('/');
      setShowOTPForm(false);
      setShowSignInMenu(false);
      setotpText('');
      toast.success("Login Successful");
      setIsLoggedIn(true);
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
    toast.success("Logged Out Successfully")
    dispatch(clearAuthToken());
    localStorage.removeItem('foodjam-user');
    setIsLoggedIn(false);
    navigate('/');
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

  return (
    <div className='nav-bar-container'>
      <nav className="dashboard_navbar_web">
        <Link to='/' className="navbar-brand">
          <img src={FJLogo} alt="Logo" />
        </Link>
        <div className="search_bar">
          <input type="text" placeholder="Search..." />
          <img src={SearchIcon} alt="Search" className="search-icon" />
        </div>
        <div className="navbar-collapse">
          <ul className="navMenu">
            <li><Link to="/"><img src={FJ} alt='home' />Home</Link></li>
            <li><Link to="/event"><img src={Explorer} alt='event' />Event</Link></li>
            <li><Link to="/explore"><img src={Explorer} alt='explorer' />Explore</Link></li>
            <li><Link to="/foodjamstore"><img src={Bag} alt='Cart' />Cart</Link></li>
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
                    <ListItem button component={Link} to={`/profile/stats/${loggedUser?.account_id}`}>
                      <Person /> <ListItemText primary="My Profile" />
                    </ListItem>
                    <ListItem button >
                      <Settings /> <ListItemText primary="Settings" />
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
              {/* <button type="button" onClick={handleResendOTP}>Resend OTP</button> */}
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
          <img src={Bag} alt='Cart' />
          <span>Cart</span>
        </Link>
        {isLoggedIn ? (
          <li><Link to={`/profile/stats/${loggedUser?.account_id}`}><img src={Profile} alt="Profile" />Profile</Link></li>
        ) : (
          <li><Link onClick={() => setShowSignInMenu(true)}><img src={Profile} alt='home' />SignIn</Link></li>
        )}
      </div>
    </div>
  );
}

export default Navbar;
