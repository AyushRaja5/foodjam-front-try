import React, { useEffect, useState } from 'react';
import './WorkshopDetail.css';
import { Container, Button, Skeleton, Stack, Dialog, DialogContent } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getSingleWorkshop } from '../../services/Explore/WorkshopService';
import { setBreadcrumbTitle, clearBreadcrumbTitle } from '../../redux/actions/breadcrumbActions';
import expiredImg from '../../assets/imagespng/expired.png';
import shareEmptyImg from '../../assets/imagespng/shareEmpty.png';
import userPlaceholder from '../../assets/imagespng/user.png';
import downArrowImg from '../../assets/imagespng/down-arrow.png';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import NotAuthorized from '../../screens/NotAuthorized/NotAuthorized'

dayjs.extend(utc);
dayjs.extend(customParseFormat);

const WorkshopDetail = () => {
  const { workshopId } = useParams();
  const dispatch = useDispatch();
  const BUCKET_URL = "https://cdn.commeat.com/";

  // State management
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [workshopData, setWorkshopData] = useState(null);

  // Dialog state for image enlargement
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  // Fetch workshop details when component mounts
  useEffect(() => {
    const fetchWorkshopDetails = async () => {
      try {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('foodjam-user'));
        const token = user ? user.sessionToken : null;
        const accountId = user ? user.account_id : null;
        const data = await getSingleWorkshop(token, accountId, workshopId, 0, 10);

        // Set the workshop data to state
        setWorkshopData(data);
        dispatch(setBreadcrumbTitle(`/workshop_details/${workshopId}`, data?.title || 'Workshop Details'));
      } catch (err) {
        setError(err.message || 'Failed to load workshop details');
        toast.error('Failed to load workshop details');
      } finally {
        setLoading(false);
      }
    };

    if (workshopId) {
      fetchWorkshopDetails();
    }

    // Clean up breadcrumb on unmount
    return () => {
      dispatch(clearBreadcrumbTitle());
    };
  }, [dispatch, workshopId]);

  // Handler to open dialog and set selected image
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenDialog(true);
  };

  // Loading state
  if (loading) {
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

  // Error state
  if (error) {
    return (
      <div variant="h6" color="error">
        <NotAuthorized />
      </div>
    );
  }

  console.log("asdfghjkl :", workshopData)
  // Workshop data render
  return (
    <Container className="workshop-detail-container">
      <div className="workshop-share-banner-container">
        <img src={shareEmptyImg} alt='share' className='share-img' />
        <div className="banner-sec">
          <img
            src={workshopData?.data?.thumbnail ? workshopData?.data?.thumbnail?.includes("https://") ? workshopData?.data?.thumbnail : `https://cdn.commeat.com/${workshopData?.data?.thumbnail}` : ""}
            alt='Contest cover'
            className="banner-img"
          />
          {workshopData?.data?.is_live &&
            <img
              src={expiredImg}
              alt="Expired"
              className="expired-stripe"
            />
          }
        </div>
        <img
          src={workshopData?.data?.image ? workshopData?.data?.image?.includes("https://") ? workshopData?.data?.image : `https://cdn.commeat.com/${workshopData?.data?.image}` : ""}
          alt='Contest cover'
          className="info-img"
          onClick={() => handleImageClick(
            workshopData?.data?.image?.includes("https://")
              ? workshopData?.data?.image
              : `https://cdn.commeat.com/${workshopData?.data?.image}`
          )} />
      </div>

      <div className='workshop-detail-middle'>
        <div className="details-top-sec">
          <div className="left-sec">
            <p className="date-txt">
              Organised By:  {workshopData?.data?.chef_name}
            </p>
          </div>
          <div className="right-sec">
            <p className="date-txt">
              {workshopData?.data?.is_live ? "Live" : "Expired"}
            </p>
          </div>
        </div>

        <div className='workshop-detail-hashtags'>{workshopData?.data?.chef_bio}</div>

        <br />
        <hr />
        <br />

        <div className="details-top-sec">
          <div className="left-sec">
            <p className="title-cost">
              {workshopData?.data?.title}
            </p>
          </div>
          <div className="right-sec">
            <strong className="title-cost">
              {workshopData?.data?.cost}/-
            </strong>
          </div>
        </div>

        <br />

        <div className='workshop-detail-title'>Additional Information: </div>
        <div className='workshop-detail-hashtags'>{workshopData?.data?.additional_heading}</div>
        <br />
        <div className='workshop-detail-hashtags'>{workshopData?.data?.additional_data}</div>
        <br />
        <div className='workshop-detail-long-info' dangerouslySetInnerHTML={{ __html: workshopData?.data?.session_details }} />
        <br />
        {workshopData?.data?.pdf_link && (
          <>
            <div className='workshop-detail-hashtags'><strong>Pdf Notes:</strong></div>
            <div className='workshop-detail-hashtags'>
              <a href={BUCKET_URL + workshopData?.data?.pdf_link} target="_blank" rel="noopener noreferrer">
                Open Pdf
              </a>
            </div>
          </>
        )}

        <div variant="body1" component="div" className='workshop-detail-long-info' dangerouslySetInnerHTML={{ __html: workshopData?.data?.long_info }} />
        {workshopData?.data?.workshopType === 'live' && (
          <Button
            variant="contained"
            color="primary"
            // onClick={joinTheCampaign}
            disabled={workshopData?.data?.isjoined === '1'}
            className="joinButton"
          >
            {workshopData?.data?.isjoined === '0' ? 'Join' : 'Joined'}
          </Button>
        )}
      </div>

      {workshopData?.data?.participants?.length > 0 && (
        <div className='participants-workshop-videos'>
          <div className="participantsTitle">
            <ParticipantList participants={workshopData?.data?.participants} />
          </div>
        </div>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="lg">
        <DialogContent>
          <img src={selectedImage} alt="Large View" style={{ width: '100%', height: 'auto' }} />
        </DialogContent>
      </Dialog>

    </Container>
  );
};

export default WorkshopDetail;


const ParticipantList = ({ participants }) => {
  console.log(participants, 'parti')
  const displayedParticipants = (participants || []).slice(0, 1);
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
