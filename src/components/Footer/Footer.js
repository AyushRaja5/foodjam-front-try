import React from 'react';
import './Footer.css';
import FJLogo from '../../assets/imagessvg/foodjamLogo.svg';
import GPlayStore from '../../assets/imagessvg/playstore.webp';
import IOSstore from '../../assets/imagespng/iphone-play-store.png';
import { Grid, IconButton, Link } from '@mui/material';
import { Facebook, Twitter, Google, Instagram, LinkedIn, Home, Email, Phone, Print, Close as CloseIcon } from '@mui/icons-material';
const Footer = () => {
  return (
    <>
    <DownloadAppSection />
    <footer className="footer">
      <div className="footer-section">
        <div variant="h6" fontWeight="bold"
              component={Link} href="https://foodjam.in/"
              className='footer-brand'>
              <img src={FJLogo} alt="Logo" />
            </div>
        <p>
          Welcome to Foodjam! The most comprehensive suite all in one for culinary creators.
          Super easy to create your food vlog or upload HD version of those on the platform.
        </p>

        <Grid item borderTop="1px solid gray" mt={2} container alignItems="center" justifyContent="center" gap={2}>
          <IconButton component={Link} href="https://www.facebook.com/Foodjamapp/" color="inherit"  target="_blank" >
            <Facebook />
          </IconButton>
          <IconButton component={Link} href="https://twitter.com/Commeat_" color="inherit"  target="_blank" >
            <Twitter />
          </IconButton>
          <IconButton component={Link} href="https://foodjam.in/" color="inherit">
            <Google />
          </IconButton>
          <IconButton component={Link} href="https://www.instagram.com/foodjamapp/" color="inherit"  target="_blank" >
            <Instagram />
          </IconButton>
          <IconButton component={Link} href="https://www.linkedin.com/company/foodjam" color="inherit"  target="_blank" >
            <LinkedIn />
          </IconButton>
        </Grid>
      </div>
      
      <div className="footer-section">
        <h3 className="footer-title">Products</h3>
        <ul>
        <ul>
        <li>
          <Link href="/best_sellers" variant="body2" display="block" >Best Sellers</Link>
        </li>
        <li>
          <Link href="/top_offers" variant="body2" display="block" color="textPrimary">Top offers</Link>
        </li>
        <li>
          <Link href="/contests" variant="body2" display="block" color="textPrimary">Upcoming Contests</Link>
        </li>
        <li>
          <Link href="/top_foodjammers" variant="body2" display="block" color="textPrimary">Top Foodjammers</Link>
        </li>
      </ul>

        </ul>
      </div>
      <div className="footer-section">
        <h3 className="footer-title">Useful links</h3>
        <ul>
          <li>
            <Link href="https://event.foodjam.in/" variant="body2" display="block" color="textPrimary">New Events</Link>
          </li>
          <li>
            <Link href="https://foodjam.in/blogs/" variant="body2" display="block" color="textPrimary">Our Blogs</Link>
          </li>
          <li>
            <Link href="https://foodjam.in/termsAndConditions/" variant="body2" display="block" color="textPrimary">Terms & Conditions</Link>
          </li>
          <li>
            <Link href="https://foodjam.in/privacy/" variant="body2" display="block" color="textPrimary">Privacy Policy</Link>
          </li>
          <li>
            <Link href="https://foodjam.in/creator-earning-tnc/" variant="body2" display="block" color="textPrimary">Earning T&C</Link>
          </li>
        </ul>
        
        {/* 
        <h3 className="footer-title legal-title">Legal</h3>
        <ul>
          <li>Terms & Conditions</li>
          <li>Cookie Policy</li>
          <li>Privacy Policy</li>
          <li>Investor Relations</li>
        </ul> */}

      </div>
      {/* <div className="footer-section">
        <h3 className="footer-title">We deliver to:</h3>
        <ul>
          <li>Bangalore</li>
          <li>Gurgaon</li>
          <li>Hyderabad</li>
          <li>Delhi</li>
          <li>Mumbai</li>
          <li>Pune</li>
          <li className="city-dropdown">589 cities</li>
        </ul>
      </div> */}
    </footer>
    </>
  );
};

export default Footer;

const DownloadAppSection = () => {
  return (
    <div className="download-section">
      <div>For better experience, download the Foodjam app now</div>
      <div className="app-buttons">
        <a href="https://play.google.com/store/apps/details?id=com.commeat.androidapp">
          <img src={GPlayStore} alt="Google Play Store" />
        </a>
        <a href="https://apps.apple.com/in/app/id1662431063">
          <img src={IOSstore} alt="Apple App Store" />
        </a>
      </div>
    </div>
  );
};