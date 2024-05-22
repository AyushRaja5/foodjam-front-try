// src/screens/Login/LoginForm.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../../redux/actions/authActions';
import './Login.css'
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const handleSignUp = () => {setIsSignUp(true)};
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileView, setMobileView] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.authUser.token !== null);
  const isLoading = useSelector(state => state.authUser.loading);
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth < 720);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const handleSignIn = () => {
    setIsSignUp(false);
  };

  const handleLoginSubmit = (e) => {
    const login_type = 'email'
    console.log(email, password, "login from loging screen")
    e.preventDefault();
    dispatch(loginRequest({ login_type, email, password }));
  };

  return (
    <div className='login-component'>
      <div className={`container ${isSignUp ? 'right-panel-active' : ''}`}>
      {isLoading && <h2>Loading</h2>}
        <div className="form-container sign-up-container">
          <form action="#">
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign Up</button>
            {mobileView && <button className="ghost-dark" onClick={handleSignIn}>Sign In</button>}
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your account</span>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
              required placeholder="Email" />
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
              required placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <button onClick={handleLoginSubmit}>Sign In Here</button>
            {mobileView && <button className="ghost-dark" onClick={handleSignUp}>Sign Up</button>}
            </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" onClick={handleSignIn}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" onClick={handleSignUp}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
