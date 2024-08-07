import React, { useEffect, useState } from 'react'
import './CampaignDetail.css'
import { Container, Button, Skeleton, Stack, Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchSingleCampaignRequest, joinCampaignRequest } from '../../redux/actions/campaignActions';
import { setBreadcrumbTitle, clearBreadcrumbTitle } from '../../redux/actions/breadcrumbActions';
import kingImg from '../../assets/imagespng/king.png';
import campaignCalenderIcon from '../../assets/imagespng/contestIcon.png';
import expiredImg from '../../assets/imagespng/expired.png';
import userPlaceholder from '../../assets/imagespng/user.png';
import downArrowImg from '../../assets/imagespng/down-arrow.png';
import shareEmptyImg from '../../assets/imagespng/shareEmpty.png';
import giftHamperImg from '../../assets/imagespng/gift.png';
import VideoCard from '../videocard/VideoCard';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import goldCupImg from '../../assets/imagespng/one.png';
import silverCupImg from '../../assets/imagespng/two.png';
import bronzeCupImg from '../../assets/imagespng/three.png';
import profileUnknown from '../../assets/imagespng/unknown.png';
import { Grid, IconButton, Typography } from '@mui/material';
import { AddPhotoAlternate, Delete } from '@mui/icons-material';

dayjs.extend(utc);
dayjs.extend(customParseFormat);

const CampaignDetail = () => {
    const { campaignId } = useParams();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [src, setSrc] = useState("");
  const [poster, setPoster] = useState("");
  const BUCKET_URL = "https://cdn.commeat.com/";
  const { singleCampaign, loading, error, successMessage } = useSelector(state => state.campaignData);
  const [limitCnt, setLimitCnt] = useState(10);
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    if (campaignId) {
      getCampaignDetails();
    }
  }, [campaignId]);

  useEffect(() => {
    if (singleCampaign?.data?.title) {
      dispatch(setBreadcrumbTitle(`/campaign_details/${campaignId}`, singleCampaign.data.title));
    }
  }, [singleCampaign, dispatch, campaignId]);

  useEffect(() => {
    return () => {
      dispatch(clearBreadcrumbTitle(`/campaign_details/${campaignId}`));
    };
  }, [dispatch, campaignId]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    //   dispatch(resetSuccessMessage());
    }
  }, [successMessage, dispatch]);

  const getCampaignDetails = () => {
    dispatch(fetchSingleCampaignRequest(campaignId));
  };

  const joinTheCampaign = () => {
    dispatch(joinCampaignRequest(campaignId, 'join'));
  };

  const handleFilesSelected = (files) => {
    setSelectedFiles(files);
  };

  const uploadContent = () => {
    console.log('Uploading content:', selectedFiles);
    // Example API call:
    // dispatch(uploadCampaignContentRequest(campaignId, selectedFiles));
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
  console.log(singleCampaign,'single campaign')
  return (
    <Container className="campaign-detail-container">
      
      {singleCampaign?.data?.campaignType === 'expired' && (
        <ExpiredContestDetail singleCampaign={singleCampaign} joinTheCampaign={joinTheCampaign} BUCKET_URL={BUCKET_URL} setShow={setShow} setSrc={setSrc} setPoster={setPoster} />
      )}
      {singleCampaign?.data?.campaignType === 'live' && (
        <LiveContestDetail singleCampaign={singleCampaign} joinTheCampaign={joinTheCampaign} BUCKET_URL={BUCKET_URL} selectedFiles={selectedFiles} handleFilesSelected={handleFilesSelected} uploadContent={uploadContent} setShow={setShow} setSrc={setSrc} setPoster={setPoster} />
      )}
      {singleCampaign?.data?.campaignType === 'upcoming' && (
        <UpcomingContestDetail singleCampaign={singleCampaign} joinTheCampaign={joinTheCampaign}/>
      )}
    </Container>
  )
}

const ExpiredContestDetail = ({ singleCampaign, joinTheCampaign, BUCKET_URL, setShow, setSrc, setPoster }) => (
  <Container className="campaign-detail">
    <div className="campaign-share-banner-container">
      <img src={shareEmptyImg} alt='share' className='share-img' />
      <div className="banner-sec">
        <img
          src={singleCampaign?.data?.cover ? singleCampaign?.data?.cover?.includes("https://") ? singleCampaign?.data?.cover : `https://cdn.commeat.com/${singleCampaign?.data?.cover}` : ""}
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

    <div className='campaign-detail-middle'>
      <div className="details-top-sec">
        <div className="left-sec">
          <img
            src={campaignCalenderIcon}
            alt="Calendar"
            className="calendar-icon"
          />
          <p className="date-txt">
            Started on {dayjs.utc(singleCampaign?.data?.starts).format('ddd DD MMM, hh:mm A')}
          </p>
        </div>
        <div className="left-sec">
          <img
            src={campaignCalenderIcon}
            alt="Calendar"
            className="calendar-icon"
          />
          <p className="date-txt">
            Ends on {dayjs.utc(singleCampaign?.data?.ends).format('ddd DD MMM, hh:mm A')}
          </p>
        </div>
      </div>

      <div className='campaign-detail-hashtags'>{singleCampaign?.data?.hashtags}</div>

      <div variant="body1" component="div" className='campaign-detail-long-info' dangerouslySetInnerHTML={{ __html: singleCampaign?.data?.long_info }} />
      {singleCampaign?.data?.campaignType === 'live' && (
        <Button
          variant="contained"
          color="primary"
          onClick={joinTheCampaign}
          disabled={singleCampaign?.data?.isjoined === '1'}
          className="joinButton"
        >
          {singleCampaign?.data?.isjoined === '0' ? 'Join' : 'Joined'}
        </Button>
      )}
    </div>

    {singleCampaign?.data?.participants?.length > 0 && singleCampaign?.data?.posts?.length > 0 && (
      <div className='participants-campaign-videos'>
        <div className="participantsTitle">
          <ParticipantList participants={singleCampaign?.data?.participants} />
        </div>

        {/* <div className='campaign-videos-container'>
          {singleCampaign?.data?.posts?.map((vid, i) => (
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
        </div> */}
      </div>
    )}

    {singleCampaign?.data?.winners?.length > 0 && <WinnerList winners={singleCampaign?.data?.winners} />}
  </Container>
);

const LiveContestDetail = ({ singleCampaign, joinTheCampaign, selectedFiles, handleFilesSelected, uploadContent, BUCKET_URL, setShow, setSrc, setPoster }) => {
  console.log(singleCampaign,'campaing single')
  return (
  <>
    <div className="campaign-share-banner-container">
      <img src={shareEmptyImg} alt='share' className='share-img' />
      <div className="banner-sec">
        <img
          src={singleCampaign?.data?.cover ? (singleCampaign?.data?.cover.includes("https://") ? singleCampaign?.data?.cover : `https://cdn.commeat.com/${singleCampaign?.data?.cover}`) : ""}
          alt='Contest cover'
          className="banner-img"
        />
      </div>
    </div>
    <br/>
    <div className='campaign-detail-middle'>
      <div className='campaign-status'>
        <div className="campaign-type live">
          <div className="type-icon" />
          <p>Live</p>
        </div>
      </div>
      <div className="details-top-sec">
        <div className="left-sec">
          <img
            src={campaignCalenderIcon}
            alt="Calendar"
            className="calendar-icon"
          />
          <p className="date-txt">
            Started on {dayjs.utc(singleCampaign?.data?.starts).format('ddd DD MMM, hh:mm A')}
          </p>
        </div>
        <div className="left-sec">
          <img
            src={campaignCalenderIcon}
            alt="Calendar"
            className="calendar-icon"
          />
          <p className="date-txt">
            Ends on {dayjs.utc(singleCampaign?.data?.ends).format('ddd DD MMM, hh:mm A')}
          </p>
        </div>
      </div>
      <br/>
      <div className='campaign-detail-hashtags'>{singleCampaign?.data?.hashtags}</div>
      <br/>
      <div className='campaign-detail-hashtags'>{singleCampaign?.data?.title}</div>
      <div variant="body1" component="div" className='campaign-detail-long-info' dangerouslySetInnerHTML={{ __html: singleCampaign?.data?.long_info }} />

      <div className='participants-campaign-videos'>
        {singleCampaign?.data?.participants?.length > 0 &&
          <div className={`${singleCampaign?.data?.posts?.length > 0 ? '' : 'participantsTitle'} `}>
            <ParticipantList participants={singleCampaign?.data?.participantDetails} />
          </div>}

        {/* {singleCampaign?.data?.posts?.length > 0 && (
          <div className='campaign-videos-container'>
            {singleCampaign?.data?.posts.map((vid, i) => (
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
        )} */}

      </div>

      {/* <WinnerListBox winners={singleCampaign?.data?.winners || []} /> */}
      <div className='file-select-link'>
        <ContentUpload onFilesSelected={handleFilesSelected} />
        + Add Link OR Screenshots
      </div>
      {selectedFiles.length > 0 && (
        <Button variant="contained" color="primary" onClick={uploadContent}>
          Upload Content
        </Button>
      )}
      {/* <Button variant="contained" color="primary" onClick={uploadContent}>Upload Content</Button> */}
      <br/>
      <button
        className={`campaign-detail-join-btn ${singleCampaign?.data?.isjoined === '1' ? 'disabled' : ''}`}
        onClick={() => joinTheCampaign(singleCampaign?.data?.id)}
        disabled={singleCampaign?.data?.isjoined === '1'}
      >
        {singleCampaign?.data?.isjoined === '0' ? 'Join' : 'Joined'}
      </button>
    </div>
  </>
  )
};

const UpcomingContestDetail = ({ singleCampaign, joinTheCampaign }) => (
  <>
    <div className="campaign-share-banner-container">
      <img src={shareEmptyImg} alt='share' className='share-img' />
      <div className="banner-sec">
        <img
          src={singleCampaign?.data?.cover ? (singleCampaign?.data?.cover.includes("https://") ? singleCampaign?.data?.cover : `https://cdn.commeat.com/${singleCampaign?.data?.cover}`) : ""}
          alt='Contest cover'
          className="banner-img"
        />
      </div>
    </div>
    <div className='campaign-detail-middle'>
      <div className="details-top-sec">
        <div className="left-sec">
          <img
            src={campaignCalenderIcon}
            alt="Calendar"
            className="calendar-icon"
          />
          <p className="date-txt">
            Started on {dayjs.utc(singleCampaign?.data?.starts).format('ddd DD MMM, hh:mm A')}
          </p>
        </div>
        <div className="left-sec">
          <img
            src={campaignCalenderIcon}
            alt="Calendar"
            className="calendar-icon"
          />
          <p className="date-txt">
            Ends on {dayjs.utc(singleCampaign?.data?.ends).format('ddd DD MMM, hh:mm A')}
          </p>
        </div>
      </div>
      <div className='campaign-detail-hashtags'>{singleCampaign?.data?.title}</div>
      <div variant="body1" component="div" className='campaign-detail-long-info' dangerouslySetInnerHTML={{ __html: singleCampaign?.data?.long_info }} />
      <WinnerListBox winners={singleCampaign?.data?.winners || []} />
      <button
        className={`campaign-detail-join-btn ${singleCampaign?.data?.isjoined === '1' ? 'disabled' : ''}`}
        onClick={() => joinTheCampaign(singleCampaign?.data?.id)}
        disabled={singleCampaign?.data?.isjoined === '1'}
      >
        {singleCampaign?.data?.isjoined === '0' ? 'Join' : 'Joined'}
      </button>
    </div>
  </>
);


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
    <div className='campaign-videos-container'>
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
        <div className="campaign-winners">
          <h3>🏆 Contest Winners</h3>
          {otherWinners.map((winner, index) => (
            <div className="winner-card campaign-winner" key={index}>
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

  // console.log(winners, 'jdjfgf')
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

const ContentUpload = ({ onFilesSelected }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (selectedFiles.length + files.length > 6) {
      alert('You can only upload up to 6 files.');
      return;
    }
    const updatedFiles = [...selectedFiles, ...files];
    setSelectedFiles(updatedFiles);
    onFilesSelected(updatedFiles);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    onFilesSelected(updatedFiles);
  };

  return (
    <div className="content-upload-container">
      <input
        accept="image/*,video/*"
        style={{ display: 'none' }}
        id="file-input"
        multiple
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="file-input">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<AddPhotoAlternate />}
        >
          Select Files
        </Button>
      </label>

      <Grid container spacing={2} className="selected-files-preview">
        {selectedFiles.map((file, index) => (
          <Grid item xs={4} key={index} >
            <div className="file-preview-item">
            {file.type.startsWith('image') ? (
              <img src={URL.createObjectURL(file)} alt="preview" className="file-preview-image" />
            ) : (
              <video src={URL.createObjectURL(file)} className="file-preview-video" controls />
            )}
            <IconButton
              color="secondary"
              className="remove-file-button"
              onClick={() => handleRemoveFile(index)}
            >
              <Delete />
            </IconButton>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};



export default CampaignDetail
