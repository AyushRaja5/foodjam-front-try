import React, { useEffect, useState } from 'react'
import './ViewAllBrands.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import userPlaceholder from '../../assets/imagespng/user.png'
import { Button, Card, Grid, Stack, Skeleton } from '@mui/material';
import { fetchExploreRequest, followUserRequest } from '../../redux/actions/ExploreActions';
import { useDispatch, useSelector } from 'react-redux';
import VideoCard from '../videocard/VideoCard';
import { getAllBrand } from '../../services/Explore/BrandService';

const ViewAllBrands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBrands = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('foodjam-user'));
      const token = user ? user.sessionToken : null;
      const accountId = user ? user.account_id : null; 
      const offset = 1; 
      const limit = 10; 

      const data = await getAllBrand(token, accountId, offset, limit);
      setBrands(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

    const truncateText = (text, maxLength) => {
      if (text?.length > maxLength) {
        return text.substring(0, maxLength) + '...';
      }
      return text;
    };

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

  return (
    <div className='view-all-brands-conatiner'>
    
    <div className="view-all-brands">
      {brands?.map((data, index) => (
        <div key={index} className="brand-card-container">
        <Link to={`/brand/${data?.manufacturer_id}`} className='link-user-profile'>
          <Card className="user-card">
            <img
              className="user-img"
              src={data?.icon}
              alt={data?.name}
            />
            <div className="user-text">
              {truncateText(data?.name, 20)}
            </div>

          </Card>
        </Link>
      </div>
      ))}
    </div>
    </div>
  )
}

export default ViewAllBrands