import React from 'react';
import { Container, Grid, Typography, Link, IconButton, Box, Button, Snackbar } from '@mui/material';
import { Facebook, Twitter, Google, Instagram, LinkedIn, Home, Email, Phone, Print, Close as CloseIcon } from '@mui/icons-material';
import FJLogo from '../../assets/imagessvg/foodjamLogo.svg';
import GPlayStore from '../../assets/imagessvg/playstore.webp';
import IOSstore from '../../assets/imagespng/iphone-play-store.png';
import './Footer.css';

export default function Footer() {
  return (
    <div className="footer" >
      <Container>
        <SimpleSnackbar />
        <Grid container justifyContent="space-between" alignItems="center" borderBottom="1px solid gray" pb={4} mb={2}>
        </Grid>

        <Grid container spacing={4} justifyContent="space-between" alignItems="start">
          <Grid item xs={12} sm={6} md={3} style={{ textAlign: 'left' }}>
            <Typography variant="h6" fontWeight="bold"
              component={Link} href="https://foodjam.in/"
              gutterBottom className='footer-brand'>
              <img src={FJLogo} alt="Logo" />
            </Typography>
            <Typography variant="body2">
              Welcome to Foodjam! The most comprehensive suite all in one for culinary creators.
              Super easy to create your food vlog or upload HD version of those on the platform.
            </Typography>

            <Grid item borderTop="1px solid gray" mt={2} container alignItems="center" justifyContent="flex-start">
              <IconButton component={Link} href="https://www.facebook.com/Foodjamapp/" color="inherit">
                <Facebook />
              </IconButton>
              <IconButton component={Link} href="https://twitter.com/Commeat_" color="inherit">
                <Twitter />
              </IconButton>
              <IconButton component={Link} href="https://foodjam.in/" color="inherit">
                <Google />
              </IconButton>
              <IconButton component={Link} href="https://www.instagram.com/foodjamapp/" color="inherit">
                <Instagram />
              </IconButton>
              <IconButton component={Link} href="https://www.linkedin.com/company/foodjam" color="inherit">
                <LinkedIn />
              </IconButton>
            </Grid>
          </Grid>


          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Products
            </Typography>
            <Link href="/best_sellers" variant="body2" display="block" color="textPrimary">Best Sellers</Link>
            <Link href="/top_offers" variant="body2" display="block" color="textPrimary">Top offers</Link>
            <Link href="/contests" variant="body2" display="block" color="textPrimary">Upcoming Contests</Link>
            <Link href="/top_foodjammers" variant="body2" display="block" color="textPrimary">Top Foodjammers</Link>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Useful links
            </Typography>
            <Link href="https://event.foodjam.in/" variant="body2" display="block" color="textPrimary">New Events</Link>
            <Link href="https://foodjam.in/blogs/" variant="body2" display="block" color="textPrimary">Our Blogs</Link>
            <Link href="https://foodjam.in/termsAndConditions/" variant="body2" display="block" color="textPrimary">Tearms & Conditions</Link>
            <Link href="https://foodjam.in/privacy/" variant="body2" display="block" color="textPrimary">Privacy Policy</Link>
            <Link href="https://foodjam.in/creator-earning-tnc/" variant="body2" display="block" color="textPrimary">Earning T&C</Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contact
            </Typography>
            <Box display="flex" alignItems="center" mb={1}>
              <Home sx={{ mr: 1 }} />
              <Typography variant="body2">
                Foodjam Office, Sec. 24 , Delhi
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <Email sx={{ mr: 1 }} />
              <Typography variant="body2">
                support@foodjam.in
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <Phone sx={{ mr: 1 }} />
              <Typography variant="body2">
                + 01 234 567 88
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <Print sx={{ mr: 1 }} />
              <Typography variant="body2">
                + 01 234 567 89
              </Typography>
            </Box>
          </Grid>

        </Grid>
      </Container>

      <Box textAlign="center" py={4} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        <Typography variant="body2" color="textSecondary">
          Copyright ©2024 All rights reserved | Commeat Infotainment Private Limited
        </Typography>

        <Typography component="div" className="footer-download-links" mt={2}>
          <Link href="https://play.google.com/store/apps/details?id=com.commeat.androidapp" target="_blank">
            <img src={GPlayStore} alt="Google Play Store" className="footer-logo" />
          </Link>
          <Link href="https://apps.apple.com/in/app/id1662431063" target="_blank">
            <img src={IOSstore} alt="Apple App Store" className="footer-logo" />
          </Link>
        </Typography>
      </Box>
    </div>
  );
}

const SimpleSnackbar = () => {
  const [open, setOpen] = React.useState(true); // Show Snackbar by default

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const action = (
    <>
      <Button className='snackbar-download-button' sx={{ bgcolor: '#f8a003', color: 'white' }} size="small" onClick={handleClose}>
        Open App
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div className='snackbar-download-app'>
      <Snackbar
        open={open}
        sx={{backgroundColor:'white', height:'50px'}}
        // autoHideDuration={6000}
        onClose={handleClose}
      >
        <div className='snackbar-download-content'>
          <span>Download our app for better experience</span>
          <Button className='snackbar-download-button' sx={{ bgcolor: '#f8a003', color: 'white' }} size="small" onClick={handleClose}>
            Open App
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
      </Snackbar>
    </div>
  );
}