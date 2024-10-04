import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Button, Skeleton, Stack, Avatar } from '@mui/material';
import { fetchSingleContestRequest, joinContestRequest, resetSuccessMessage } from '../../redux/actions/contestActions';
import { setBreadcrumbTitle, clearBreadcrumbTitle } from '../../redux/actions/breadcrumbActions';
import './ContestDetail.css';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import kingImg from '../../assets/imagespng/king.png';
import contestCalenderIcon from '../../assets/imagespng/contestIcon.png';
import expiredImg from '../../assets/imagespng/expired.png';
import userPlaceholder from '../../assets/imagespng/user.png';
import downArrowImg from '../../assets/imagespng/down-arrow.png';
import shareEmptyImg from '../../assets/imagespng/shareEmpty.png';
import giftHamperImg from '../../assets/imagespng/gift.png';
import VideoCard from '../videocard/VideoCard';

import goldCupImg from '../../assets/imagespng/one.png';
import silverCupImg from '../../assets/imagespng/two.png';
import bronzeCupImg from '../../assets/imagespng/three.png';
import profileUnknown from '../../assets/imagespng/unknown.png';
import { toast } from 'react-toastify';

dayjs.extend(utc);
dayjs.extend(customParseFormat);

const ContestDetail = () => {
  const { contestId } = useParams();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [src, setSrc] = useState("");
  const [poster, setPoster] = useState("");
  const BUCKET_URL = "https://cdn.commeat.com/";
  const { singleContest, loading, error, participantsList, successMessage } = useSelector(state => state.contestData);
  const [limitCnt, setLimitCnt] = useState(5);

  useEffect(() => {
    if (contestId) {
      getContestDetails();
    }
  }, [contestId]);

  useEffect(() => {
    if (singleContest?.data?.title) {
      dispatch(setBreadcrumbTitle(`/contest_details/${contestId}`, singleContest.data.title));
    }
  }, [singleContest, dispatch, contestId]);

  useEffect(() => {
    return () => {
      dispatch(clearBreadcrumbTitle(`/contest_details/${contestId}`));
    };
  }, [dispatch, contestId]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(resetSuccessMessage());
    }
  }, [successMessage, dispatch]);

  const getContestDetails = () => {
    dispatch(fetchSingleContestRequest(contestId, limitCnt, 5));
  };

  const joinTheContest = () => {
    dispatch(joinContestRequest(contestId));
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
  if (error) return <div variant="h6" color="error">Error: {error}</div>;

  return (
    <Container className="contest-detail-container">
      {singleContest?.data?.contestType === 'expired' && (
        <ExpiredContestDetail singleContest={singleContest} joinTheContest={joinTheContest} BUCKET_URL={BUCKET_URL} setShow={setShow} setSrc={setSrc} setPoster={setPoster} />
      )}
      {singleContest?.data?.contestType === 'live' && (
        <LiveContestDetail singleContest={singleContest} joinTheContest={joinTheContest} BUCKET_URL={BUCKET_URL} setShow={setShow} setSrc={setSrc} setPoster={setPoster} />
      )}
      {singleContest?.data?.contestType === 'upcoming' && (
        <UpcomingContestDetail singleContest={singleContest} joinTheContest={joinTheContest}/>
      )}
    </Container>
  );
};

const ExpiredContestDetail = ({ singleContest, joinTheContest, BUCKET_URL, setShow, setSrc, setPoster }) => (
  <Container className="contest-detail-container">
    <div className="contest-share-banner-container">
      <img src={shareEmptyImg} alt='share' className='share-img' />
      <div className="banner-sec">
        <img
          src={singleContest?.data?.cover ? singleContest?.data?.cover?.includes("https://") ? singleContest?.data?.cover : `https://cdn.commeat.com/${singleContest?.data?.cover}` : ""}
          alt='Contest cover'
          className="banner-img"
        />
        <img
          src={expiredImg}
          alt="Expired"
          className="expired-stripe"
        />
      </div>
    </div>

    <div className='contest-detail-middle'>
      <div className="details-top-sec">
        <div className="left-sec">
          <img
            src={contestCalenderIcon}
            alt="Calendar"
            className="calendar-icon"
          />
          <p className="date-txt">
            Started on {dayjs.utc(singleContest?.data?.starts).format('ddd DD MMM, hh:mm A')}
          </p>
        </div>
        <div className="left-sec">
          <img
            src={contestCalenderIcon}
            alt="Calendar"
            className="calendar-icon"
          />
          <p className="date-txt">
            Ends on {dayjs.utc(singleContest?.data?.ends).format('ddd DD MMM, hh:mm A')}
          </p>
        </div>
      </div>

      <div className='contest-detail-hashtags'>{singleContest?.data?.hashtags}</div>

      <div variant="body1" component="div" className='contest-detail-long-info' dangerouslySetInnerHTML={{ __html: singleContest?.data?.long_info }} />
      {singleContest?.data?.contestType === 'live' && (
        <Button
          variant="contained"
          color="primary"
          onClick={joinTheContest}
          disabled={singleContest?.data?.isjoined === '1'}
          className="joinButton"
        >
          {singleContest?.data?.isjoined === '0' ? 'Join' : 'Joined'}
        </Button>
      )}
    </div>

    {singleContest?.data?.participants?.length > 0 && singleContest?.data?.posts?.length > 0 && (
      <div className='participants-contest-videos'>
        <div className="participantsTitle">
          <ParticipantList participants={singleContest?.data?.participants} />
        </div>

        <div className='contest-videos-container'>
          {singleContest?.data?.posts?.map((vid, i) => (
            <div
              key={i}
              className="video-section-container"
              onClick={() => {
                setSrc(`${BUCKET_URL + vid.media}`);
                setPoster(`${BUCKET_URL + vid.thumbnail}`);
                setShow(true);
              }}
            >
              <VideoCard post={{ ...vid, total_views: vid.views, username: vid?.first_name }} />
            </div>
          ))}
        </div>
      </div>
    )}
    <WinnerList winners={singleContest?.data?.winners || []} />
    <WinnerListBox winners={singleContest?.data?.winners || []} />
  </Container>
);

const LiveContestDetail = ({ singleContest, joinTheContest, BUCKET_URL, setShow, setSrc, setPoster }) => (
  <>
    <div className="contest-share-banner-container">
      <img src={shareEmptyImg} alt='share' className='share-img' />
      <div className="banner-sec">
        <img
          src={singleContest?.data?.cover ? (singleContest?.data?.cover.includes("https://") ? singleContest?.data?.cover : `https://cdn.commeat.com/${singleContest?.data?.cover}`) : ""}
          alt='Contest cover'
          className="banner-img"
        />
      </div>
    </div>
    <div className='contest-detail-middle'>
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
            Started on {dayjs.utc(singleContest?.data?.starts).format('ddd DD MMM, hh:mm A')}
          </p>
        </div>
        <div className="left-sec">
          <img
            src={contestCalenderIcon}
            alt="Calendar"
            className="calendar-icon"
          />
          <p className="date-txt">
            Ends on {dayjs.utc(singleContest?.data?.ends).format('ddd DD MMM, hh:mm A')}
          </p>
        </div>
      </div>
      <div className='contest-detail-hashtags'>{singleContest?.data?.title}</div>
      <div variant="body1" component="div" className='contest-detail-long-info' dangerouslySetInnerHTML={{ __html: singleContest?.data?.long_info }} />

      <div className='participants-contest-videos'>

        {singleContest?.data?.participants?.length > 0 &&
          <div className={`${singleContest?.data?.posts?.length > 0 ? '' : 'participantsTitle'} `}>
            <ParticipantList participants={singleContest?.data?.participants} />
          </div>}

        {singleContest?.data?.posts?.length > 0 && (
          <div className='contest-videos-container'>
            {singleContest?.data?.posts.map((vid, i) => (
              <div
                key={i}
                className="video-section-container"
                onClick={() => {
                  setSrc(`${BUCKET_URL + vid.media}`);
                  setPoster(`${BUCKET_URL + vid.thumbnail}`);
                  setShow(true);
                }}
              >
                <VideoCard post={{ ...vid, total_views: vid?.views || '', username: vid?.first_name || '' }} />
              </div>
            ))}
          </div>
        )}

      </div>

      <WinnerListBox winners={singleContest?.data?.winners || []} />
      <button
        className={`contest-detail-join-btn ${singleContest?.data?.isjoined === '1' ? 'disabled' : ''}`}
        onClick={() => joinTheContest(singleContest?.data?.id)}
        disabled={singleContest?.data?.isjoined === '1'}
      >
        {singleContest?.data?.isjoined === '0' ? 'Join' : 'Joined'}
      </button>
    </div>
  </>
);

const UpcomingContestDetail = ({ singleContest, joinTheContest }) => (
  <>
    <div className="contest-share-banner-container">
      <img src={shareEmptyImg} alt='share' className='share-img' />
      <div className="banner-sec">
        <img
          src={singleContest?.data?.cover ? (singleContest?.data?.cover.includes("https://") ? singleContest?.data?.cover : `https://cdn.commeat.com/${singleContest?.data?.cover}`) : ""}
          alt='Contest cover'
          className="banner-img"
        />
      </div>
    </div>
    <div className='contest-detail-middle'>
      <div className="details-top-sec">
        <div className="left-sec">
          <img
            src={contestCalenderIcon}
            alt="Calendar"
            className="calendar-icon"
          />
          <p className="date-txt">
            Started on {dayjs.utc(singleContest?.data?.starts).format('ddd DD MMM, hh:mm A')}
          </p>
        </div>
        <div className="left-sec">
          <img
            src={contestCalenderIcon}
            alt="Calendar"
            className="calendar-icon"
          />
          <p className="date-txt">
            Ends on {dayjs.utc(singleContest?.data?.ends).format('ddd DD MMM, hh:mm A')}
          </p>
        </div>
      </div>
      <div className='contest-detail-hashtags'>{singleContest?.data?.title}</div>
      <div variant="body1" component="div" className='contest-detail-long-info' dangerouslySetInnerHTML={{ __html: singleContest?.data?.long_info }} />
      <WinnerListBox winners={singleContest?.data?.winners || []} />
      <button
        className={`contest-detail-join-btn ${singleContest?.data?.isjoined === '1' ? 'disabled' : ''}`}
        onClick={() => joinTheContest(singleContest?.data?.id)}
        disabled={singleContest?.data?.isjoined === '1'}
      >
        {singleContest?.data?.isjoined === '0' ? 'Join' : 'Joined'}
      </button>
    </div>
  </>
);

// const ContestDetailContent = ({ singleContest }) => (
//   <div className='contest-detail-middle'>
//     <div className="details-top-sec">
//       <div className="left-sec">
//         <img
//           src={contestCalenderIcon}
//           alt="Calendar"
//           className="calendar-icon"
//         />
//         <p className="date-txt">
//           Started on {dayjs.utc(singleContest?.data?.starts).format('ddd DD MMM, hh:mm A')}
//         </p>
//       </div>
//       <div className="left-sec">
//         <img
//           src={contestCalenderIcon}
//           alt="Calendar"
//           className="calendar-icon"
//         />
//         <p className="date-txt">
//           Ends on {dayjs.utc(singleContest?.data?.ends).format('ddd DD MMM, hh:mm A')}
//         </p>
//       </div>
//     </div>
//     <div className='contest-detail-hashtags'>{singleContest?.data?.hashtags}</div>
//     <div variant="body1" component="div" className='contest-detail-long-info' dangerouslySetInnerHTML={{ __html: singleContest?.data?.long_info }} />
//   </div>
// );

const ParticipantList = ({ participants }) => {
  console.log(participants, 'parti')
  const displayedParticipants = (participants || []).slice(0, 3);
  const remainingParticipants = participants ? participants.length - displayedParticipants.length : 0;

  return (
    <div className="participant-container">
      <div className='participant-container-left'>
        <div className="avatar-group">
          {displayedParticipants?.map((participant, index) => (
            <div className="avatar" key={index}>
              <img src={
                participant?.profile_picture
                  ? participant.profile_picture.includes("https://")
                    ? participant?.profile_picture
                    : `https://cdn.commeat.com/${participant?.profile_picture}`
                  : userPlaceholder
              } alt={index} />
            </div>
          ))}
          {remainingParticipants > 0 && (
            <div className="avatar more">+{remainingParticipants}</div>
          )}
        </div>
        <div className="participant-text">
          {displayedParticipants.map((participant, index) => (
            <span key={index}>
              {participant?.first_name}{index < displayedParticipants.length - 1 ? ', ' : ''}
            </span>
          ))}
          {remainingParticipants > 0 && (
            <span> and {remainingParticipants} others have joined</span>
          )}
        </div>
      </div>
      <img
        src={downArrowImg}
        alt="Arrow"
        className="right-arrow"
      />
    </div>
  );
};

const ContestVideos = ({ posts, BUCKET_URL, setShow, setSrc, setPoster }) => {
  return (
    <div className='contest-videos-container'>
      {posts?.map((vid, i) => (
        <div
          key={i}
          className="video-section-container"
          onClick={() => {
            setSrc(`${BUCKET_URL + vid.media}`);
            setPoster(`${BUCKET_URL + vid.thumbnail}`);
            setShow(true);
          }}
        >
          <VideoCard post={{ ...vid, total_views: vid.views, username: vid?.first_name }} />
        </div>
      ))}
    </div>
  );
};

const WinnerList = ({ winners }) => {
  const topWinners = winners.slice(0, 3);
  const otherWinners = winners.length > 3 ? winners.slice(3) : [];

  return (
    <div className="winner-container">
      {topWinners.length > 0 && (
        <div className="top-winners">
          <h3>🏆 Top 3 Winners</h3>
          <div className="top-winners-list">
            {topWinners[1] && (
              <div className="winner-card second">
                <img src={topWinners[1]?.profile_picture
                  ? topWinners[1].profile_picture.includes("https://")
                    ? topWinners[1]?.profile_picture
                    : `https://cdn.commeat.com/${topWinners[1]?.profile_picture}`
                  : userPlaceholder} alt="Winner" className="winner-avatar" />
                <p className="winner-name">{topWinners[1]?.first_name}</p>
              </div>
            )}
            {topWinners[0] && (
              <div className="winner-card first">
                <img src={topWinners[0]?.profile_picture
                  ? topWinners[0].profile_picture.includes("https://")
                    ? topWinners[0]?.profile_picture
                    : `https://cdn.commeat.com/${topWinners[0]?.profile_picture}`
                  : userPlaceholder} alt="Winner" className="winner-avatar" />
                <p className="winner-name">{topWinners[0]?.first_name}</p>
                <img src={kingImg} alt="Crown" className="crown-icon" />
              </div>
            )}
            <div className="winner-card third">
              <img src={topWinners[2]?.profile_picture
                ? topWinners[2].profile_picture.includes("https://")
                  ? topWinners[2]?.profile_picture
                  : `https://cdn.commeat.com/${topWinners[2]?.profile_picture}`
                : userPlaceholder} alt="Winner" className="winner-avatar" />
              <p className="winner-name">{topWinners[2]?.first_name || '3rd Winner'}</p>
            </div>
          </div>
        </div>
      )}
      {otherWinners.length > 0 && (
        <div className="contest-winners">
          <h3>🏆 Contest Winners</h3>
          {otherWinners.map((winner, index) => (
            <div className="winner-card contest-winner" key={index}>
              <div className="winner-info">
                <img src={winner?.profile_picture
                  ? winner.profile_picture.includes("https://")
                    ? winner?.profile_picture
                    : `https://cdn.commeat.com/${winner?.profile_picture}`
                  : userPlaceholder} alt="Winner" className="winner-avatar" />
                <p className="winner-name">{winner.first_name}</p>
              </div>
              <p className="winner-prize">Won Gift Hamper</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};



const WinnerListBox = ({ winners }) => {
  const getCupImage = (index) => {
    switch (index) {
      case 0:
        return goldCupImg;
      case 1:
        return silverCupImg;
      case 2:
        return bronzeCupImg;
      default:
        return profileUnknown;
    }
  };
  const winnersToShow = winners && winners.length > 0 ? winners.slice(0, 3) : Array.from({ length: 3 });

  console.log(winners, 'jdjfgf')
  return (
    <div className="winner-list-container">
      <div className="winner-list-header">
        <div className='winners-will-get'>🏆 Winners will get</div>
      </div>
      {winnersToShow?.map((winner, index) => (
        <div key={index} className="winner-row">
          <img src={getCupImage(index)} alt="Cup" className="cup-image" />
          <img
            src={
              winner?.profile_picture
                ? winner?.profile_picture.includes("https://")
                  ? winner?.profile_picture
                  : `https://cdn.commeat.com/${winner?.profile_picture}`
                : profileUnknown
            }
            alt="Profile"
            className="profile-image"
          />
          <p className="winner-name">{winner?.first_name || ''}</p>
          <p className="winner-prize">Win Gift Hamper</p>
        </div>
      ))}
    </div>
  );
};

WinnerList.propTypes = {
  winners: PropTypes.arrayOf(
    PropTypes.shape({
      account_id: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      first_name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      last_name: PropTypes.string,
      likes: PropTypes.string,
      middle_name: PropTypes.string,
      points: PropTypes.number,
      profile_picture: PropTypes.string,
      total_views: PropTypes.string,
      views: PropTypes.string,
    })
  ).isRequired,
};


ContestDetail.propTypes = {
  singleContest: PropTypes.shape({
    data: PropTypes.shape({
      cover: PropTypes.string,
      starts: PropTypes.string,
      ends: PropTypes.string,
      hashtags: PropTypes.string,
      long_info: PropTypes.string,
      contestType: PropTypes.string,
      isjoined: PropTypes.string,
      participants: PropTypes.array,
      winners: PropTypes.array,
      posts: PropTypes.array
    })
  })
};

ContestDetail.defaultProps = {
  singleContest: null
};

ParticipantList.propTypes = {
  participants: PropTypes.arrayOf(PropTypes.shape({
    profile_picture: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
  })).isRequired,
};

ParticipantList.defaultProps = {
  participants: []
};

WinnerList.propTypes = {
  winners: PropTypes.arrayOf(PropTypes.shape({
    profile_picture: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
  })).isRequired,
};

WinnerList.defaultProps = {
  winners: []
};

export default ContestDetail;
