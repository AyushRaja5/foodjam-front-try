import React, { useState, useEffect } from 'react';
import { getWorkshopList } from '../../services/Explore/WorkshopService';  // Make sure this import path is correct
import './Workshops.css';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import noContestImg from '../../assets/imagespng/noContest.png';
import shareEmptyImg from '../../assets/imagespng/shareEmpty.png';
import expiredImg from '../../assets/imagespng/expired.png';
import contestCalenderIcon from '../../assets/imagespng/contestIcon.png';
import { Link } from 'react-router-dom';
import { Box, Pagination, Skeleton, Stack } from '@mui/material';
import NotFound from '../NotFound/NotFound';


dayjs.extend(utc);
dayjs.extend(timezone);

const Workshops = () => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [searchTxt, setSearchTxt] = useState('');
  const formatDate = (dateString) => {
    return dayjs(dateString).tz('Asia/Kolkata').format('ddd DD MMM, hh:mm A');
  };

  const handlePageChange = (event, value) => {
    // setPage(value);
    setOffset(offset + 1);
  };

  useEffect(() => {
    const fetchWorkshops = async () => {
      const user = JSON.parse(localStorage.getItem('foodjam-user'));
      const token = user ? user.sessionToken : null;
      const accountId = user ? user.account_id : null;
      try {
        const data = await getWorkshopList(token, accountId, offset, limit);
        setWorkshops(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, [offset, limit]);

  const getWorkshopListData = () => {
    if (searchTxt) {
      const filteredData = workshops.filter(item =>
        item?.title.toUpperCase().includes(searchTxt.toUpperCase())
      );
      return filteredData;
    } else {
      return workshops;
    }
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

  if (error) {
    return <NotFound/>;
  }

  return (
    <div className="workshops-container">
      <input
        type="text"
        placeholder="Search Title for Workshop"
        value={searchTxt}
        onChange={e => setSearchTxt(e.target.value)}
        className="search-box"
      />
      <div className="workshops-content">
        {getWorkshopListData()?.length > 0 ? (

          <div className='workshop-list'>
            {getWorkshopListData()?.map((item, index) => (
                <Link to={`/workshop_details/${item?.id}`} className='link-user-profile'>
              <div key={item?.id} className="main-view">
                <div className="item-btn">
                  <div className="share-banner-container">
                    <img src={shareEmptyImg} alt='share' className='share-img' />
                    <div className="banner-sec">
                      <img
                        src={item?.thumbnail ? (item.thumbnail.includes("https://") ? item?.thumbnail : `https://cdn.commeat.com/${item?.thumbnail}`) : ""}
                        alt={item?.title}
                        className="banner-img"
                      />
                      {!item?.is_live &&
                        <img
                          src={expiredImg}
                          alt="Expired"
                          className="expired-stripe"
                        />}
                    </div>
                  </div>
                  <div className='middle-part-workshop-card'>
                    <div className="details-top-sec">
                      <div className="left-sec">
                        <img
                          src={contestCalenderIcon}
                          alt="Calendar"
                          className="calendar-icon"
                        />
                        <p className="date-txt">
                          {`${formatDate(item?.starts)}`}
                        </p>
                      </div>
                      <p className="date-txt">
                        Duration: <span className="price-txt">{item?.duration}</span>
                      </p>
                    </div>
                    <p className="sub-txt"><strong>Workshop Type:</strong> {item?.is_meeting ? 'Online' : 'Offline'}</p>
                    <p className="sub-txt"><strong>Title:</strong> {item?.title}</p>
                    <p className="sub-txt"><strong>Organised By Chef:</strong> {item?.chef_name}</p>
                  </div>
                  <div className="bottom-sec">
                    <div className="participants-sec">
                      <p className="participate-txt">{item?.cost}/-</p>
                    </div>
                    <Link to={`/workshop_details/${item?.id}`} className='link-user-profile'>
                      <button
                        className={`join-btn`}
                      >
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
                </Link>
            ))}
          </div>
        ) : (
          <div className="no-workshop-image-container">
            <img src={noContestImg} alt="No Workshop" className="no-workshop-img" />
            <br />
            <h4>No data found</h4>
            <p className="tip-txt">You have no live events. Click on New Workshop to create your workshop.</p>
          </div>
        )}
      </div>

      <Box display="flex" justifyContent="center" my={2}>
        <Pagination
          size="small"
          count={Math.ceil(workshops.length / limit)}
          page={offset + 1}
          onChange={handlePageChange}
          variant="outlined"
          color="secondary"
        />
      </Box>
    </div>
  );
};

export default Workshops;
