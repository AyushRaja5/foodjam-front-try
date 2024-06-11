import React, { useEffect } from 'react';
import './Explore.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchExploreRequest } from '../../redux/actions/ExploreActions';
import { Skeleton, Stack } from '@mui/material';
import Banner from './Banner/Banner';
import ExploreUser from './ExploreUser/ExploreUser';
import Curation from './Curation/Curation';
import ExploreBrands from './ExploreBrands/ExploreBrands';
import Blog from './Blog/Blog';
import Brand from './Brand/Brand'
import ExploreVideos from './ExploreVideos/ExploreVideos';
import Affliate from './Affliate/Affliate';
import Leaderboard from './Leaderboard/Leaderboard';
import ButtonsCard from './Buttons/Buttons';

const Explore = () => {
  const dispatch = useDispatch();
  const {exploredata, loading: exploreLoading, error:exploreError} = useSelector(state => state.exploreData);
  // const loading = useSelector(state => state.data.loading);
  // const error = useSelector(state => state.data.error);
 
  useEffect(() => {
    dispatch(fetchExploreRequest());
  }, [dispatch]);

  console.log(exploredata,'Ayush')
  useEffect(() => {
    if (exploredata && exploredata.rows) {
      exploredata.rows.sort((a, b) => a.sequence - b.sequence);
    }
  }, [exploredata]);


  if (exploreLoading) return (
    <div className='water'>
      <Stack spacing={1} sx={{width:'100%', display:'flex', alignItems:'center'}}>
        <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'80%'} height={100} />
        <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'80%'} height={100} />
        <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'80%'} height={100} />
        <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'80%'} height={100} />
      </Stack>
    </div>
  );

  if (exploreError) return <div>Error: {exploreError}</div>;
  const sortedRows = exploredata?.rows?.slice().sort((a, b) => a.sequence - b.sequence);

  return (
    <div className='explore-component'>
      {sortedRows?.map((exploreItem, index) => (
        <RenderFunction key={index} data={exploreItem} />
      ))}
    </div>
  );
}
const RenderFunction = ({ data }) => {
  if (!data.is_visible || !data.columns || data.columns.length === 0) {
    return null;
  }
  
  switch (data.type) {
    case "banner":
      return <Banner {...data} />;
    case "users":
      return <ExploreUser {...data} />;
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
    // case "single_banner":
    //   return <SingleBanner {...data} />;
    case "explore_food_links":
      return <Affliate {...data} />;
    // case "Foodjam Studio":
    //   return <Studio {...data} />;
    case "leaderboard":
      return <Leaderboard {...data} />;
    case "buttons":
      return <ButtonsCard {...data} />;
    // case "Foodjam_Studio":
    //   return <Studio {...data} />;
    default:
      return null;
  }
};
export default Explore