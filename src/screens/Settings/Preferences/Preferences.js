import { Skeleton, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserPreferenceRequest, fetchUserPreferencesRequest } from '../../../redux/actions/userPreferencesActions';
import { toast } from 'react-toastify';
import './Preferences.css';

const Preferences = () => {
  const dispatch = useDispatch();
  const preferences = useSelector((state) => state.userPreferences.preferences);
  const loading = useSelector((state) => state.userPreferences.loading);
  const error = useSelector((state) => state.userPreferences.error);
  const response = useSelector((state) => state.userPreferences.response);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    dispatch(fetchUserPreferencesRequest());
  }, [dispatch]);

  useEffect(() => {
    const initiallySelectedItems = preferences
      .filter((pref) => pref.isSelected)
      .map((pref) => pref.name);
    setSelectedItems(initiallySelectedItems);
  }, [preferences]);

  // useEffect(() => {
  //   if (response) {
  //     if(response.success)
  //         toast.success("Preferences Updates")
  //     // toast.success(response.message);
  //   }
  //   if (error) {
  //     toast.error(error.message);
  //   }
  // }, [response, error]);

  const toggleItem = (item) => {
    setSelectedItems((prevState) => {
      const isSelected = prevState.includes(item.name);
      return isSelected ? prevState.filter((i) => i !== item.name) : [...prevState, item.name];
    });
  };

  const handleSavePreferences = () => {
    const preferenceData = {
      preference_data: preferences.map(pref => ({
        name: pref.name,
        isSelected: selectedItems.includes(pref.name)
      }))
    };
    const isAnySelected = preferenceData.preference_data.some(pref => pref.isSelected);

    if (!isAnySelected) {
      toast.error("Please select any option");
      return;
    }
    dispatch(addUserPreferenceRequest(preferenceData));
    if (response) {
      if(response.success)
          toast.success("Preferences Updates")
      // toast.success(response.message);
    }
    if (error) {
      toast.error(error.message);
    }
  };

  if (loading) return (
    <div className='yourOrders'>
      <Stack spacing={1}>
        <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'100%'} height={80} />
        <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'100%'} height={80} />
        <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'100%'} height={80} />
      </Stack>
    </div>
  );

  if (error) return <div>Error: {error}</div>;

  return (
    <div className='yourPreferences'>
      <div className='preference-header'>
        <h2>Improve your feed</h2>
        <span>By choosing your favourite tags, you help us know you better and your taste.</span>
      </div>
      <div className='items'>
        {preferences.map((pref, index) => (
          <div
            key={index}
            className={`item ${selectedItems.includes(pref.name) ? 'selected' : ''}`}
            onClick={() => toggleItem(pref)}
          >
            {pref.name}
          </div>
        ))}
      </div>
      <div className='preference-btn'>
        <button onClick={handleSavePreferences}>Save</button>
      </div>
    </div>
  );
};

export default Preferences;
