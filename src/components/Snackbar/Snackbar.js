import React from 'react';
import { IconButton, Button, Snackbar } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import './Snackbar.css';

const SimpleSnackbar = () => {
  const [open, setOpen] = React.useState(true); // Show Snackbar by default

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleOpenApp = () => {
    window.open('https://play.google.com/store/apps/details?id=com.commeat.androidapp', '_blank');
  };

  return (
    <div className="snackbar-download-app">
      <Snackbar
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ backgroundColor: 'white', height: '50px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', marginTop: '45px' }}
      >
        <div className="snackbar-download-content">
          <span>Download Foodjam app for earnings and rewards</span>
          <Button
            className="snackbar-download-button"
            sx={{ bgcolor: '#f8a003', color: 'white', lineHeight: 1 }}
            size="small"
            onClick={handleOpenApp}
          >
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
};

export default SimpleSnackbar;
