import React, { useEffect } from 'react';
import './TopBrandsPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShopRequest } from '../../redux/actions/shopActions';
import { Skeleton, Stack } from '@mui/material';
import { toast } from 'react-toastify';

const TopBrandsPage = () => {
  const dispatch = useDispatch();
  const { shop, loading, error } = useSelector(state => state.shopData);
  useEffect(() => {
    dispatch(fetchShopRequest());
  }, [dispatch]);

  if (loading) return (
    <div className='water'>
      <Stack spacing={1} sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
        <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
        <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
        <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
        <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
      </Stack>
    </div>
  );

  if (error) return <div>Error: {error}</div>;

  const sortedRows = shop?.data?.rows?.slice().sort((a, b) => a.sequence - b.sequence);

  return (
    <div className='top-brands-page'>

    </div>
  );
};


export default TopBrandsPage;
