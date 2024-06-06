import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

const DeactivateAccountDialogBox = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
       <CloseIcon sx={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }} onClick={onClose} />
         <DialogTitle sx={{ textAlign: 'center', position: 'relative', marginTop:'30px' }}>
        <strong>{"Are you sure you want to deactivate your account?"}</strong>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', fontSize:'12px' }}>
        <DialogContentText>
            You can active your account again once you are looged in with in 30 days. Your data will not be visible to public.
        </DialogContentText>
      </DialogContent>
      <div style={{marginBottom:'20px'}}>
        <Button onClick={onClose} color="primary" sx={{ width: '100%', 
        borderTop: '1px solid rgba(0, 0, 0, 0.5)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.5)'}}>NO</Button>
        <Button onClick={onConfirm} sx={{ width: '100%', color:'black' }}>YES</Button>
      </div>
    </Dialog>
  );
};

export default DeactivateAccountDialogBox;
