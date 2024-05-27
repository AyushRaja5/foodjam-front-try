import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, CircularProgress } from '@mui/material';

const AddressDialogBox = ({ open, onClose, onSave, setDialogOpen, initialData }) => {
    // console.log(initialData,'initial Data')
    const userProfileData = JSON.parse(localStorage.getItem('foodjam-user'));
    const defaultFormData = {
        postcode: '',
        city: '',
        company: '',
        address_1: '',
        phone: '',
        address_2: '',
        country_id: 99,
        zone_id: '',
        firstname: userProfileData.first_name || 'testFirstName',
        lastname: userProfileData.last_name || 'testLastName',
    };
    const [formData, setFormData] =  useState(defaultFormData);

    const mapInitialData = (data) => {
        return {
            postcode: data.postcode || '',
            city: data.city || '',
            company: data.company || '',
            address_1: data.address_1 || '',
            phone: data.phone || '',
            address_2: data.address_2 || '',
            country_id: 99,
            zone_id: data.zone || '',
            firstname: data.firstname || userProfileData.first_name || '',
            lastname: data.lastname || userProfileData.last_name || '',
        };
    };
    const [loading, setLoading] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
        const numericValue = value.replace(/\D/g, '').slice(0, 10);
        setFormData({ ...formData, [name]: numericValue });
        } else {
        setFormData({ ...formData, [name]: value });
        }
    };

    const handlePincodeChange = async (e) => {
        const postcode = e.target.value;
        setFormData({ ...formData, postcode: postcode });

        if (postcode.length === 6) {
            setLoading(true);
            try {
                const response = await axios.get(`https://api.postalpincode.in/pincode/${postcode}`);
                const data = response.data;
                if (data[0].Status === "Success") {
                    const { PostOffice } = data[0];
                    console.log(PostOffice, 'post office')
                    setFormData({
                        ...formData,
                        postcode: PostOffice[0].Pincode,
                        city: PostOffice[0].District,
                        zone_id: PostOffice[0].State
                    });
                } else {
                    setFormData({ ...formData, city: '', zone_id: '' });
                }
            } catch (error) {
                console.error('Error fetching city and zone_id:', error);
                setFormData({ ...formData, city: '', zone_id: '' });
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSave = () => {
        const { postcode, company, address_1, address_2, phone } = formData;
        if (!postcode || !company || !address_1 || !address_2 || !phone) {
            setAlertOpen(true);
        } else {
            onSave(formData);
            setFormData(defaultFormData); 
        }
    };
    onClose = ()=>{
        setFormData(defaultFormData); 
        setDialogOpen(false);
    }
    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    useEffect(() => {
        if (initialData) {
            setFormData(mapInitialData(initialData));
        } else {
            setFormData(defaultFormData);
        }
    }, [initialData, open]);

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth>
                <DialogTitle>{initialData ? 'Edit Address' : 'Add Address'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Pincode"
                        type="text"
                        name="postcode"
                        value={formData.postcode}
                        onChange={handlePincodeChange}
                        fullWidth
                        inputProps={{ maxLength: 6 }}
                    />
                    {loading && <CircularProgress size={24} />}
                    <TextField
                        margin="dense"
                        label="City"
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        fullWidth
                        disabled
                    />
                    <TextField
                        margin="dense"
                        label="State"
                        type="text"
                        name="zone_id"
                        value={formData.zone_id}
                        onChange={handleChange}
                        fullWidth
                        disabled
                    />
                    <TextField
                        margin="dense"
                        label="Name"
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Address 1"
                        type="text"
                        name="address_1"
                        value={formData.address_1}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Address 2"
                        type="text"
                        name="address_2"
                        value={formData.address_2}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Mobile"
                        type="number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        fullWidth
                        inputProps={{ maxLength: 10 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <AlertDialog open={alertOpen} onClose={handleAlertClose} />
        </>
    );
};

export default AddressDialogBox;


const AlertDialog = ({ open, onClose }) => {
    return (
        <Dialog 
        open={open} 
        onClose={onClose} 
        fullWidth 
        maxWidth="xs"
        PaperProps={{
          style: {
            margin: '0 auto',
            width: '85%',
            maxWidth: '400px'
          }
        }}
        >
            <DialogTitle>Alert</DialogTitle>
            <DialogContent>
                <p>Please enter all details.</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};