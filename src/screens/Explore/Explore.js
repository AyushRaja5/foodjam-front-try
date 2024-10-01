import React, { useEffect, useState, useCallback } from 'react';
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
import LoginDrawer from '../../config/LoginDrawer';

// Custom hook for handling cache operations
const useCache = (CACHE_NAME, CACHE_KEY, CACHE_DURATION) => {
  const [cachedData, setCachedData] = useState(null);

  const getCachedData = useCallback(async () => {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(CACHE_KEY);

    if (!cachedResponse) return null;

    const data = await cachedResponse.json();
    const now = new Date().getTime();

    if (now - data.timestamp > CACHE_DURATION) {
      await cache.delete(CACHE_KEY); // Clear expired cache
      return null;
    }

    return data.payload;
  }, [CACHE_NAME, CACHE_KEY, CACHE_DURATION]);

  const storeDataInCache = async (data) => {
    const cache = await caches.open(CACHE_NAME);
    const dataToCache = { payload: data, timestamp: new Date().getTime() };
    const response = new Response(JSON.stringify(dataToCache));
    await cache.put(CACHE_KEY, response);
  };

  const clearCache = async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.delete(CACHE_KEY);
  };

  return { cachedData, setCachedData, getCachedData, storeDataInCache, clearCache };
};

const Explore = () => {
  const dispatch = useDispatch();
  const { exploredata, loading: exploreLoading, error: exploreError, successMessage } = useSelector((state) => state.exploreData);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Cache Configuration
  const CACHE_NAME = process.env.REACT_APP_EXPLORE_CACHE_NAME || 'explore-cache';
  const CACHE_KEY = process.env.REACT_APP_EXPLORE_CACHE_KEY || 'explore-data';
  const CACHE_DURATION = parseInt(process.env.REACT_APP_CACHE_DURATION, 10) || 10 * 60 * 1000; // 10 minutes default
  const { cachedData, setCachedData, getCachedData, storeDataInCache, clearCache } = useCache(CACHE_NAME, CACHE_KEY, CACHE_DURATION);

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  useEffect(() => {
    const fetchData = async () => {
      const cachedExploreData = await getCachedData();

      if (cachedExploreData) {
        setCachedData(cachedExploreData);
      } else {
        dispatch(fetchExploreRequest());
      }
    };

    fetchData();
  }, [dispatch, getCachedData, setCachedData]);

  useEffect(() => {
    if (exploredata && exploredata.rows) {
      exploredata.rows.sort((a, b) => a.sequence - b.sequence);
      storeDataInCache(exploredata);
      setCachedData(exploredata);
    }
  }, [exploredata, storeDataInCache]);

  const handleFollow = async (accountToFollow) => {
    if (!accountToFollow) {
      toast.error('User Id invalid');
      return;
    }
    const user = JSON.parse(localStorage.getItem('foodjam-user'));
    if (!user || !user?.sessionToken) {
      toast.error('Please login to Follow User');
      setDrawerOpen(true);
      return;
    }

    try {
      await clearCache();
      await dispatch(followUserRequest(accountToFollow));
      dispatch(fetchExploreRequest());
      setCachedData(exploredata);
    } catch (error) {
      toast.error('Failed to follow user.');
    }
  };

  if (exploreLoading || !cachedData) {
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
    <div className="explore-component">
      {sortedRows?.map((exploreItem, index) => (
        <RenderFunction key={index} data={exploreItem} handleFollow={handleFollow} />
      ))}
      <LoginDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
    </div>
  );
};

const RenderFunction = ({ data, handleFollow }) => {
  if (!data.is_visible || !data.columns || data.columns.length === 0) {
    return null;
  }

  switch (data.type) {
    case 'banner':
      return <Banner {...data} />;
    case 'users':
      return <ExploreUser {...data} handleFollow={handleFollow} />;
    case 'curation':
      return <Curation {...data} />;
    case 'explore_brands':
      return <ExploreBrands {...data} />;
    case 'blog':
      return <Blog {...data} />;
    case 'brands':
      return <Brand {...data} />;
    case 'videos':
      return <ExploreVideos {...data} />;
    case 'explore_food_links':
      return <Affliate {...data} />;
    case 'leaderboard':
      return <Leaderboard {...data} handleFollow={handleFollow} />;
    case 'buttons':
      return <ButtonsCard {...data} />;
    default:
      return null;
  }
};

export default Explore;
