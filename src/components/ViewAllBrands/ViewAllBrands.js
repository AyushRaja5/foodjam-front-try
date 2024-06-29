import React, { useState } from 'react'
import './ViewAllBrands.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import userPlaceholder from '../../assets/imagespng/user.png'
import { Button, Card, Grid } from '@mui/material';
import { fetchExploreRequest, followUserRequest } from '../../redux/actions/ExploreActions';
import { useDispatch, useSelector } from 'react-redux';
import VideoCard from '../videocard/VideoCard';

const ViewAllBrands = () => {
  const [show, setShow] = useState(false);
    const [src, setSrc] = useState("");
    const [poster, setPoster] = useState("");
    const BUCKET_URL = "https://cdn.commeat.com/";
    const location = useLocation();
    const { brandArray } = location.state || { brandArray: [] };
    
    const truncateText = (text, maxLength) => {
      if (text?.length > maxLength) {
        return text.substring(0, maxLength) + '...';
      }
      return text;
    };
  return (
    <div className="view-all-brands-conatiner">
      {brandArray?.map((data, index) => (
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
  )
}

export default ViewAllBrands