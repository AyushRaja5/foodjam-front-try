// src/components/ConditionalLoader/LoaderOverlay.js

import React from 'react';
import { CircularProgress, Box } from '@mui/material';
import './LoaderOverlay.css';

const LoaderOverlay = () => {
  return (
    <Box className="loader-overlay">
      <CircularProgress size={120} />
    </Box>
  );
};

export default LoaderOverlay;
