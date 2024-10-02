import React, { useState, useEffect } from 'react';
import { Drawer, Button, IconButton, TextField, InputAdornment, Link } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { LoginUser } from '../services/LoginService';
import { useDispatch, useSelector } from 'react-redux';
import EmptyList from '../assets/imagespng/emptyListImg.png';
import { loginRequest, signupRequest } from '../redux/actions/authActions';
import './LoginDrawer.css'
import { useNavigate } from 'react-router-dom';

const LoginDrawer = ({ open, toggleDrawer }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const TnCurl = 'https://foodjam.in/termsAndConditions';
    const [loginOrSignUp, setLoginOrSignUp] = useState('Login');
    const [showOTPForm, setShowOTPForm] = useState(false);
    const [loginNumber, setLoginNumber] = useState('');
    const [otpText, setotpText] = useState('');
    const [signupNumber, setsignupNumber] = useState('');
    const [signupName, setsignupName] = useState('');
    const [signupEmail, setsignupEmail] = useState('');
    const [showResendLink, setShowResendLink] = useState(false);
    const [timer, setTimer] = useState(90);
    const otpRecievedFromAPI = useSelector(state => state.authUser);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('foodjam-user'));
    const signUpResponse = useSelector(state => state.signUpUser);

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
    }, [timer, showOTPForm]);

    const resetTimer = () => {
        setTimer(90);
        setShowResendLink(false);
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const login_type = 'phone';
        if (loginNumber.length < 10) {
            toast.error('Phone number must be 10 digits long.');
            return;
        }
        LoginUser({ login_type, phone: loginNumber })
            .then((response) => {
                toast.success(response.message);
                setShowOTPForm(true);
                resetTimer(); // Reset timer when OTP is requested
            })
            .catch((error) => {
                console.error('Login failed:', error);
            });
    };

    const handleOTPSubmit = (e) => {
        e.preventDefault();
        const phone = loginNumber.replace('+91', '');
        dispatch(loginRequest({ phone: phone, otp: otpText }));
    };

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        const login_type = 'phone';
        const userData = { login_type, phone: signupNumber, email: signupEmail, first_name: signupName, otp: otpText };
        dispatch(signupRequest(userData));
    };


    useEffect(() => {
        if (otpRecievedFromAPI.token && !isLoggedIn) {
            const loggedUserFromStorage = JSON.parse(localStorage.getItem('foodjam-user'));
            if (loggedUserFromStorage) {
                navigate(`/profile/${loggedUserFromStorage?.account_id}/1`);
                setShowOTPForm(false);
                setotpText('');
                setLoginNumber('');
            }
        } else if (otpRecievedFromAPI.error) {
            toast.error(otpRecievedFromAPI.error);
            if (otpRecievedFromAPI.error === "Wrong Otp ") {
                setotpText('');
                setShowResendLink(true);
            } else {
                setLoginOrSignUp('Sign Up');
                setsignupNumber(loginNumber);
            }
        }
    }, [otpRecievedFromAPI, isLoggedIn, loginNumber ]);

    useEffect(() => {
        if (signUpResponse.token) {
            toast.success("Sign Up Successful");
        } else if (signUpResponse.error !== null) {
            toast.error(signUpResponse.error);
        }
    }, [signUpResponse]);

    return (
        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
            <div style={{ padding: 20 }} className='drawer-signin'>
                <IconButton onClick={toggleDrawer(false)} size='large'>
                    <CloseIcon />
                </IconButton>

                <div className='signmeny-heading-image'>
                    <div>{loginOrSignUp}</div>
                    <img src={EmptyList} alt='emptylist' />
                </div>

                {loginOrSignUp === 'Login' ? (
                    !showOTPForm ? (
                        <form onSubmit={handleLoginSubmit}>
                            <div className="form-group">
                                <TextField
                                    type="tel"
                                    tabIndex="1"
                                    maxLength='10'
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                                    }}
                                    autoComplete="off"
                                    placeholder="Phone Number"
                                    value={loginNumber}
                                    onChange={(e) => {
                                        if (e.target.value.length <= 10) {
                                            setLoginNumber(e.target.value);
                                        }
                                    }}
                                    required
                                    className="phone-input"
                                />
                            </div>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Login
                            </Button>
                            <div className='tnc-login'>
                                By clicking on Login, I accept the{' '}
                                <strong>
                                    <Link href={TnCurl} target='_blank'> Terms & Conditions & Privacy Policy</Link>
                                </strong>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleOTPSubmit}>
                            <div className="form-group">
                                <TextField
                                    type="text"
                                    value={otpText}
                                    onChange={(e) => setotpText(e.target.value)}
                                    placeholder="Enter OTP"
                                    required
                                    fullWidth
                                />
                            </div>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Submit OTP
                            </Button>
                            <Link className='otp-page-backlink' onClick={() => setShowOTPForm(false)} style={{ cursor: 'pointer' }}>
                                Go back to Login
                            </Link>
                            <br />
                            <br />
                            {showResendLink ? (
                                <div className='resend-otp'>
                                    <Link className='resend-otp-link' onClick={handleLoginSubmit} style={{ cursor: 'pointer' }}>
                                        Resend OTP
                                    </Link>
                                </div>
                            ) : (
                                <div className='resend-otp'>
                                    Resend OTP in : 00:{timer < 10 ? `0${timer}` : timer} Sec
                                </div>
                            )}
                        </form>
                    )
                ) : (
                    <form onSubmit={handleSignUpSubmit}>
                        <div className="form-group">
                            <TextField
                                type="tel"
                                value={signupNumber}
                                onChange={(e) => setsignupNumber(e.target.value)}
                                tabIndex="1"
                                maxLength="10"
                                autoComplete="off"
                                placeholder="Phone Number"
                                required
                                fullWidth
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                type="text"
                                value={signupName}
                                onChange={(e) => setsignupName(e.target.value)}
                                placeholder="Your First Name"
                                required
                                fullWidth
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                type="email"
                                value={signupEmail}
                                onChange={(e) => setsignupEmail(e.target.value)}
                                placeholder="Your Email"
                                required
                                fullWidth
                            />
                        </div>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Sign Up
                        </Button>
                        <div className='tnc-login'>
                                By clicking on Sign Up, I accept the{' '}
                                <strong>
                                    <Link href={TnCurl} target='_blank'> Terms & Conditions & Privacy Policy</Link>
                                </strong>
                            </div>
                    </form>
                )}
            </div>
        </Drawer>
    );
};

export default LoginDrawer;
