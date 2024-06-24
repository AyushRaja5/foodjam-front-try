import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampaignsRequest, joinCampaignRequest } from '../../redux/actions/campaignActions';
import {
  Box,
  Tab,
  Tabs,
  Typography,
  Pagination,
  CircularProgress,
  Stack,
  Skeleton,
} from '@mui/material';
import './Campaigns.css';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import contestCalenderIcon from '../../assets/imagespng/contestIcon.png';
import expiredImg from '../../assets/imagespng/expired.png';
import whiteCupImg from '../../assets/imagespng/whiteCup.png';
import kingImg from '../../assets/imagespng/king.png';
import downArrowImg from '../../assets/imagespng/down-arrow.png';
import userPlaceholder from '../../assets/imagespng/user.png';
import shareEmptyImg from '../../assets/imagespng/shareEmpty.png';
import noContestImg from '../../assets/imagespng/noContest.png';
import clockImg from '../../assets/imagespng/clock.png';
import bigArrowImg from '../../assets/imagespng/bigArrow.png';
import giftHamperImg from '../../assets/imagespng/gift.png';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Campaign } from '@mui/icons-material';

dayjs.extend(utc);
dayjs.extend(timezone);

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const Campaigns = () => {
  const dispatch = useDispatch();
  const { campaigns, loading, error, successMessage } = useSelector(state => state.campaignData);

  const [selectedModule, setSelectedModule] = useState(0);
  const [limitCnt, setLimitCnt] = useState(6);
  const [searchTxt, setSearchTxt] = useState('');
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const stares = useSelector(state => state)
  console.log( 'stares', stares)
  useEffect(() => {
    dispatch(fetchCampaignsRequest(offset, limitCnt));
  }, [offset, limitCnt]);

  const handleChange = (event, newValue) => {
    setSelectedModule(newValue);
    setPage(1); // Reset to first page
    setOffset(0); // Reset offset
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    setOffset((value - 1) * limitCnt); // Update offset based on the new page
  };

  const getListData = () => {
    if (searchTxt) {
      const dataList =
        (selectedModule === 0 && campaigns.data?.liveCampaigns) ||
        (selectedModule === 1 && campaigns.data?.expiredCampaigns) ||
        campaigns.data?.upcomingCampaigns;
      const filteredData = dataList.filter(item =>
        item.title.toUpperCase().includes(searchTxt.toUpperCase())
      );
      return filteredData;
    } else {
      if (selectedModule === 0) return campaigns.data?.liveCampaigns;
      if (selectedModule === 1) return campaigns.data?.expiredCampaigns;
      if (selectedModule === 2) return campaigns.data?.upcomingCampaigns;
    }
  };

  const formatDate = (dateString) => {
    return dayjs(dateString).tz('UTC').format('ddd DD MMM, hh:mm A');
  };

  const joinTheContest = (contestId,contestActionType) => {
    dispatch(joinCampaignRequest(contestId, contestActionType));
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
    <div className="campaigns-container">
      <Tabs
        value={selectedModule}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Live Campaign" className='tab-nav-contest' />
        <Tab label="Expired Campaign" className='tab-nav-contest' />
        <Tab label="Upcoming Campaign" className='tab-nav-contest' />
      </Tabs>
      <br />
        <>
          <p className="tip-txt">Get Creative with special campaigns & Win Amazing Prizes!</p>
          <input
            type="text"
            placeholder="Search for contest"
            value={searchTxt}
            onChange={e => setSearchTxt(e.target.value)}
            className="search-box"
          />
        </>
      <TabPanel value={selectedModule} index={0}>
        <div className='contest-per-page'>
          {getListData()?.length === 0 ? (
            <div className="no-contest-image-container">
              <img src={noContestImg} alt="No Campign" className="no-contest-img" />
              <br />
              <h4>No data found</h4>
              <p className="tip-txt">You have no live events. Click on New Campign to create your contest.</p>
            </div>
          ) : (
            <div className='contest-list'>
              {getListData()?.map((item, index) => (
                <div key={item?.id} className="main-view">
                  <div className="item-btn">
                  <Link to={`/campaign_details/${item?.id}`} className='link-user-profile'>
                    <div className="share-banner-container">
                      <img src={shareEmptyImg} alt='share' className='share-img' />
                      <div className="banner-sec">
                        <img
                          src={item?.cover ? (item.cover.includes("https://") ? item?.cover : `https://cdn.commeat.com/${item?.cover}`) : ""}
                          alt={item?.title}
                          className="banner-img"
                        />
                      </div>
                    </div>
                    <div className='middle-part-contest-card'>
                      <div className='contest-status'>
                        <div className="contest-type live">
                          <div className="type-icon" />
                          <p>Live</p>
                        </div>
                      </div>
                      <div className="details-top-sec">
                        <div className="left-sec">
                          <img
                            src={contestCalenderIcon}
                            alt="Calendar"
                            className="calendar-icon"
                          />
                          <p className="date-txt">
                            {`Ends On ${formatDate(item?.ends)}`}
                          </p>
                        </div>
                        <p className="date-txt">
                          Entry fee: <span className="price-txt">₹{item?.entry_fee}</span>
                        </p>
                      </div>
                      <p className="sub-txt">{item?.short_info}</p>
                      <p className="sub-txt hashtags">{item?.hashtags}</p>
                      {/* <div> */}
                      <div className="winner-sec">
                          <span>
                            <img
                              className="gift-img"
                              src={giftHamperImg}
                              alt="Gift"
                            />
                           <p className="gift-txt">{`Win ${item?.prize?.['1st'] || 'Gift Hamper'}`}</p>
                          </span>
                          <p className="gift-sub-txt">{`${index === 0 ? 'First' : index === 1 ? 'Second' : 'Third'} Place`}</p>
                        </div>
                      {/* </div> */}
                    </div>
                    </Link>
                    <div className="bottom-sec">
                      <div className="participants-sec">
                        <div className="minor-profile-sec">
                          <p className="label-txt">+{item?.participants}</p>
                        </div>
                        <p className="participate-txt">Participated</p>
                      </div>
                      <button
                        className={`join-btn`}
                        onClick={() => joinTheContest(item?.id, item?.isjoined === '0' ? 'join' : 'backOut' )}
                        // disabled={item?.isjoined === '1'}
                      >
                        {item?.isjoined === '0' ? 'Join' : 'Joined'}
                        <img src={bigArrowImg} alt='arrow' className='arrow-join-contest' />
                      </button>
                    </div>
                  </div>
                 
                </div>
              ))}
            </div>
          )}
        </div>
      </TabPanel>

      <TabPanel value={selectedModule} index={1}>
        <div className='contest-per-page'>
          {getListData()?.length === 0 ? (
            <div className="no-contest-image-container">
              <img src={noContestImg} alt="No Contest" className="no-contest-img" />
              <br />
              <h4>No data found</h4>
              <p className="tip-txt">You have no expired events.</p>
            </div>
          ) : (
            <div className='contest-list'>
              {getListData()?.map(item => (
                <div key={item?.id} className="main-view">
                  <Link to={`/campaign_details/${item?.id}`} className='link-user-profile'>
                    <div className="item-btn">
                      <div className="share-banner-container">
                        <img src={shareEmptyImg} alt='share' className='share-img' />
                        <div className="banner-sec">
                          <img
                            src={item?.cover ? (item.cover.includes("https://") ? item?.cover : `https://cdn.commeat.com/${item?.cover}`) : ""}
                            alt={item?.title}
                            className="banner-img"
                          />
                          <img
                            src={expiredImg}
                            alt="Expired"
                            className="expired-stripe"
                          />
                        </div>
                      </div>

                      <div className='middle-part-contest-card'>
                        <div className="details-top-sec">
                          <div className="left-sec">
                            <img
                              src={contestCalenderIcon}
                              alt="Calendar"
                              className="calendar-icon"
                            />
                            <p className="date-txt">
                              {`${formatDate(item.starts)} - ${formatDate(item.ends)}`}
                            </p>
                          </div>
                        </div>
                        {/* <p className="sub-txt">{item?.short_info.length > 40 ? `${item?.short_info.slice(0, 40)}.....` : item.short_info}</p> */}
                        {/* <p className="sub-txt hashtags">{item?.hashtags}</p> */}
                        {item?.winners?.length > 0 && (
                          <Link to={`/profile/${item?.winners[0]?.account_id}/3`} className='link-user-profile'>
                            <div className="winner-view">
                              <div className="left-sec">
                                <img
                                  src={whiteCupImg}
                                  alt="Cup"
                                  className="cup-image"
                                />
                                <p>Top winner prize</p>
                              </div>
                              <div className="winner-bottom">
                                <div className="left-sec">
                                  <div className="view-with-badges">
                                    <div className="image-main-sec">
                                      <img
                                        src={
                                          item?.winners[0]?.profile_picture
                                            ? (item?.winners[0]?.profile_picture.includes("https://")
                                              ? item?.winners[0]?.profile_picture
                                              : `https://cdn.commeat.com/${item?.winners[0]?.profile_picture}`)
                                            : userPlaceholder
                                        }
                                        alt={item?.winners[0]?.id}
                                        className="winner-img"
                                      />
                                    </div>
                                    <img
                                      src={kingImg}
                                      alt="King"
                                      className="king-img"
                                    />
                                    <div className="rank-sec">
                                      <p className="rank-txt">1</p>
                                    </div>
                                  </div>
                                  <p className="winner-name">{item?.winners[0]?.first_name}</p>
                                </div>
                                <div className="left-sec">
                                  <p className="winner-price-txt">Won gift hamper</p>
                                  <img
                                    src={downArrowImg}
                                    alt="Arrow"
                                    className="right-arrow"
                                  />
                                </div>
                              </div>
                            </div>
                          </Link>
                        )}
                      </div>

                      <div className="bottom-sec">
                        <div className="participants-sec">
                          <div className="minor-profile-sec">
                            <p className="label-txt">+{item?.participants}</p>
                          </div>
                          <p className="participate-txt">Participated</p>
                        </div>
                        <Link to={`/contest_details/${item?.id}`} className='link-user-profile'>
                          <button className="join-btn">More Details</button>
                        </Link>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </TabPanel>

      <TabPanel value={selectedModule} index={2}>
        <div className='contest-per-page'>
          {getListData()?.length === 0 ? (
            <div className="no-contest-image-container">
              <img src={noContestImg} alt="No Contest" className="no-contest-img" />
              <br />
              <h4>No data found</h4>
              <p className="tip-txt">You have no upcoming events.</p>
            </div>
          ) : (
            <div className='contest-list'>
              {getListData()?.map((item, index) => {
                const prize = item.prize && item.prize[index === 0 ? '1st' : index === 1 ? '2nd' : '3rd'];
                return (
                  <div key={item?.id} className="main-view">
                    <Link to={`/campaign_details/${item?.id}`} className='link-user-profile'>
                    <div className='timeline-upcoming'>
                      <img src={clockImg} alt='clock' className='clock-upcoming-contest' />
                      {`${formatDate(item.starts)}, ${dayjs(item.starts).diff(new Date(), 'day')} days left`}
                    </div>
                    <div className="item-btn">
                      <div className="share-banner-container">
                        <img src={shareEmptyImg} alt='share' className='share-img' />
                        <div className="banner-sec">
                          <img
                            src={item?.cover ? (item.cover.includes("https://") ? item?.cover : `https://cdn.commeat.com/${item?.cover}`) : ""}
                            alt={item?.title}
                            className="banner-img"
                          />
                        </div>
                      </div>

                      <div className='middle-part-contest-card'>
                        {/* <p className="sub-txt">{item?.short_info.length > 40 ? `${item?.short_info.slice(0, 40)}.....` : item.short_info}</p>
                        <p className="sub-txt hashtags">{item?.hashtags}</p> */}

                        <div className="winner-sec">
                          <span>
                            <img
                              className="gift-img"
                              src={giftHamperImg}
                              alt="Gift"
                            />
                            <p className="gift-txt">{`Win ${prize || 'Gift Hamper'}`}</p>
                          </span>
                          <p className="gift-sub-txt">{`${index === 0 ? 'First' : index === 1 ? 'Second' : 'Third'} Place`}</p>
                        </div>

                      </div>

                      <div className="bottom-sec">
                        <div className="participants-sec">
                          <div className="minor-profile-sec">
                            <p className="label-txt">+{item?.participants > 9 ? item.participants : `0${item?.participants}`}</p>
                          </div>
                          <p className="participate-txt">Participated</p>
                        </div>
                        
                          <button className="join-btn">
                            <span>Join</span>
                            <img src={bigArrowImg} alt='arrow' className='arrow-join-contest' />
                          </button>
                      </div>
                    </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </TabPanel>

      <Box display="flex" justifyContent="center" my={2}>
        <Pagination
          size="small"
          count={Math.ceil(campaigns?.metadata?.total_campaigns / limitCnt)}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          color="secondary"
        />
      </Box>
    </div>
  );
};

export default Campaigns;
