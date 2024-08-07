import React, { useEffect, useState } from 'react'
import './ViewAllVideos.css';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { setBreadcrumbTitle, clearBreadcrumbTitle } from '../../redux/actions/breadcrumbActions';
import userPlaceholder from '../../assets/imagespng/user.png'
import { Button, Card, Grid } from '@mui/material';
import { fetchExploreRequest, followUserRequest } from '../../redux/actions/ExploreActions';
import { useDispatch, useSelector } from 'react-redux';
import VideoCard from '../videocard/VideoCard';

const ViewAllVideos = () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [src, setSrc] = useState("");
    const [poster, setPoster] = useState("");
    const BUCKET_URL = "https://cdn.commeat.com/";
    const location = useLocation();
    const { videosArray } = location.state || { videosArray: [] };
    const { title } = useParams();

    useEffect(() => {
      if (title) {
        dispatch(setBreadcrumbTitle(`/view_all_videos/${title}`, title));
      }
    }, [dispatch, title]);
  
    useEffect(() => {
      return () => {
        dispatch(clearBreadcrumbTitle(`/view_all_videos/${title}`));
      };
    }, [dispatch, title]);

  return (
    <div className="view-all-videos-conatiner">
      {videosArray?.map((data, i) => (
        <div
          key={i}
          className="video-section-container"
          onClick={() => {
            setSrc(`${BUCKET_URL + data.media}`);
            setPoster(`${BUCKET_URL + data.thumbnail}`);
            setShow(true);
          }}
        >
          <VideoCard post={data} />
        </div>
      ))}
    </div>
  )
}

export default ViewAllVideos