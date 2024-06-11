import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboardRequest } from '../../redux/actions/ExploreActions';
import './TopFoodJammers.css';

const TopFoodJammers = () => {
  const dispatch = useDispatch();
  const {leaderboardData, loading:leaderboardLoading, error: leaderboardError} = useSelector(state => state.exploreData);
  console.log(leaderboardData)
  const filterDate = '2024-03'
  const data = []
  useEffect(() => {
    dispatch(fetchLeaderboardRequest(filterDate));
  }, [dispatch, filterDate]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  // const displayedData = data.slice(0, limit);

  return (
    <div className="leaderboard-section">
      {/* <h3 className="explore-heading text-center">{heading}</h3> */}
      <div className="d-flex align-items-stretch justify-content-center flex-wrap" style={{ gap: '2rem' }}>
        {data.map((item, index) => (
          <div key={index} className="leaderboard-item d-flex align-items-center flex-column">
            <img
              src={item.profile_picture}
              alt={item.name}
              style={{ width: '150px', height: '150px', borderRadius: '50%' }}
            />
            <div className="leaderboard-text-wrapper">
              <p className="leaderboard-text">{item.name}</p>
              <p className="leaderboard-score">Score: {item.score}</p>
            </div>
          </div>
        ))}
      </div>
      {/* {data.length > displayedData.length && (
        <div className="view-btn d-flex justify-content-center" style={{ marginTop: '25px' }}>
          <button onClick={() => setDisplayLimit(data.length)}>View All</button>
        </div>
      )} */}
    </div>
  );
};

export default TopFoodJammers;
