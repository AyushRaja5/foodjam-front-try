// screens/NotAuthorized/NotAuthorized.js

import React from 'react';
import { Link } from 'react-router-dom';
import './NotAuthorized.css'
import emptyImg from '../../assets/imagespng/empty-data-img.jpg'
const NotAuthorized = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px 50px' }}>
       <main className="not-found-main">
        <h1>Oops, You are not Authorized...</h1>
        <p>
          Looks like you've to login first. Connect with our team to find what you're looking for.
        </p>
        <div className="illustration">
            <img src={emptyImg} />
        </div>
        <Link to="/" className="back-to-home">
          Back To Home
        </Link>
      </main>
    </div>
  );
};

export default NotAuthorized;
