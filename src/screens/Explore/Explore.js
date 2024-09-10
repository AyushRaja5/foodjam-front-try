import React, { useEffect, useState } from 'react';
import './Explore.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExploreRequest, followUserRequest } from '../../redux/actions/ExploreActions';
import { Skeleton, Stack } from '@mui/material';
import Banner from './Banner/Banner';
import ExploreUser from './ExploreUser/ExploreUser';
import Curation from './Curation/Curation';
import ExploreBrands from './ExploreBrands/ExploreBrands';
import Blog from './Blog/Blog';
import Brand from './Brand/Brand';
import ExploreVideos from './ExploreVideos/ExploreVideos';
import Affliate from './Affliate/Affliate';
import Leaderboard from './Leaderboard/Leaderboard';
import ButtonsCard from './Buttons/Buttons';
import { toast } from 'react-toastify';
import NotFound from '../NotFound/NotFound';

const Explore = () => {
  const dispatch = useDispatch();
  const { exploredata, loading: exploreLoading, error: exploreError, successMessage } = useSelector(state => state.exploreData);
  const [cachedData, setCachedData] = useState(null);

  const CACHE_NAME = process.env.REACT_APP_EXPLORE_CACHE_NAME || 'explore-cache';
  const CACHE_KEY = process.env.REACT_APP_EXPLORE_CACHE_KEY || 'explore-data';
  const CACHE_DURATION = parseInt(process.env.REACT_APP_CACHE_DURATION, 10) || 10 * 60 * 1000; // 10 minutes default

  const getCachedData = async () => {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(CACHE_KEY);

    if (!cachedResponse) return null;

    const data = await cachedResponse.json();
    const now = new Date().getTime();

    // Check if cache has expired
    if (now - data.timestamp > CACHE_DURATION) {
      await cache.delete(CACHE_KEY); // Clear expired cache
      return null;
    }

    return data.payload; // Return cached data
  };

  const storeDataInCache = async (data) => {
    const cache = await caches.open(CACHE_NAME);
    const dataToCache = {
      payload: data,
      timestamp: new Date().getTime(), // Save the current timestamp
    };
    const response = new Response(JSON.stringify(dataToCache));
    await cache.put(CACHE_KEY, response);
  };

  useEffect(() => {
    const fetchData = async () => {
      const cachedExploreData = await getCachedData();

      if (cachedExploreData) {
        setCachedData(cachedExploreData);
      } else {
        // If no valid cache, fetch from API
        dispatch(fetchExploreRequest());
      }
    };

    fetchData();
  }, [dispatch, successMessage]);

  useEffect(() => {
    if (exploredata && exploredata.rows) {
      exploredata.rows.sort((a, b) => a.sequence - b.sequence);

      // Cache the data after a successful fetch
      storeDataInCache(exploredata);
      setCachedData(exploredata);
    }
  }, [exploredata]);

  const handleFollow = (accountToFollow) => {
    if (!accountToFollow) {
      toast.error("User Id invalid");
      return;
    }
    dispatch(followUserRequest(accountToFollow));
  };

  if (exploreLoading && !cachedData) {
    return (
      <div className='water'>
        <Stack spacing={1} sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
          <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
          <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
          <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'90%'} height={100} />
        </Stack>
      </div>
    );
  }

  if (exploreError && !cachedData) return <NotFound />;

  const sortedRows = cachedData?.rows || exploredata?.rows;

  return (
    <div className='explore-component'>
      {sortedRows?.map((exploreItem, index) => (
        <RenderFunction key={index} data={exploreItem} handleFollow={handleFollow} />
      ))}
    </div>
  );
};

const RenderFunction = ({ data, handleFollow }) => {
  if (!data.is_visible || !data.columns || data.columns.length === 0) {
    return null;
  }

  switch (data.type) {
    case "banner":
      return <Banner {...data} />;
    case "users":
      return <ExploreUser {...data} handleFollow={handleFollow} />;
    case "curation":
      return <Curation {...data} />;
    case "explore_brands":
      return <ExploreBrands {...data} />;
    case "blog":
      return <Blog {...data} />;
    case "brands":
      return <Brand {...data} />;
    case "videos":
      return <ExploreVideos {...data} />;
    case "explore_food_links":
      return <Affliate {...data} />;
    case "leaderboard":
      return <Leaderboard {...data} handleFollow={handleFollow} />;
    case "buttons":
      return <ButtonsCard {...data} />;
    default:
      return null;
  }
};

export default Explore;
