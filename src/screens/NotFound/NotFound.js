// screens/NotFound/NotFound.js

import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'
import emptyImg from '../../assets/imagespng/empty-data-img.jpg'
const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', }}>
       <main className="not-found-main">
        <h1>Oops, Wrong Turn...</h1>
        <p>
          Looks like you've wandered off the beaten path. Our team is working to get you back on track and find what you're looking for.
        </p>
        <div className="illustration">
            <img src={emptyImg} />
          {/* Add your SVG or Illustration here */}
        </div>
        <Link to="/" className="back-to-home">
          Back To Home
        </Link>
      </main>
    </div>
  );
};

export default NotFound;
