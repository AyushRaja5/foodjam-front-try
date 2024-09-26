import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import howToEarn from '../../assets/imagespng/howToEarn.png';
import './Profile.css';
import profile from '../../assets/imagessvg/profile.svg';
import profilePlaceholder from '../../assets/imagespng/placeholder.png'
import addToWallet from '../../assets/imagespng/addToWallet.png';
import dashboard from '../../assets/imagespng/dashBoard_selected@3x.png'
import channel from '../../assets/imagespng/channelIcon.png'
import cartHome from '../../assets/imagespng/cartHome@3x.png'
import bookmarkSelect from '../../assets/imagespng/bookmark_selected@3x.png'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import dashboard1 from '../../assets/imagespng/dashBoard1.png'
import dashboard2 from '../../assets/imagespng/dashBoard2.png'
import dashboard3 from '../../assets/imagespng/dashBoard3.png'
import dashboard4 from '../../assets/imagespng/dashBoard4.png'
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatsRequest } from '../../redux/actions/dashboardStateActions'
import { fetchUserProfileByAccountIdRequest, saveEditProfileRequest } from '../../redux/actions/userProfileByAccountIdActions'
import { fetchPostByIdRequest } from '../../redux/actions/postByIdActions'
import { followUserRequest, resetSuccessMessage } from '../../redux/actions/ExploreActions'
import { fetchSavedPostsRequest } from '../../redux/actions/savedPostsProductsActions';
import VideoCard from '../../components/videocard/VideoCard'
import { ProductCard, StoreMyProductCard } from '../../components/ProductCard/ProductCard';
import { fetchStoreProductRequest } from '../../redux/actions/storeProductsActions';
import creatingVideo from '../../assets/imagespng/creatingLite.png'
import shopLite from '../../assets/imagespng/shopLite.png'
import campaignLite from '../../assets/imagespng/campLite.png'
import workshopLite from '../../assets/imagespng/workshopLite.png'
import exclusiveLite from '../../assets/imagespng/ecLite.png'
import menuLite from '../../assets/imagespng/sellingLite.png'
import userPlaceholder from '../../assets/imagespng/user.png'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Avatar, Button, DialogActions, Divider, Skeleton, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { UploadUserProfile } from '../../services/Profile/dashboardStates';

const CustomTabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index} style={{ width: '100%' }}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiPaper-root': {
    width: '80%',
  },
}));

const CustomTab = ({ icon, label, ...other }) => {
  return (
    <Tab
      label={
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <span>{label}</span>
          <span>{'>'}</span>
        </div>
      }
      icon={icon}
      iconPosition="start"
      {...other}
    />
  );
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


const Profile = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id, tab } = useParams();
  const initialTab = () => {
    const tabIndex = parseInt(tab, 10);
    return isNaN(tabIndex) ? 1 : tabIndex;
  };

  const cdnBaseURL = 'https://cdn.commeat.com/'
  const loggedInAccountId = JSON.parse(localStorage.getItem('foodjam-user'));
  const isOwnProfile = id === loggedInAccountId?.account_id;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentStoreMyProductsPage, setCurrentStoreMyProductsPage] = useState(1);
  const [value, setValue] = React.useState(initialTab());
  const [channelTabValue, setChannelTabValue] = React.useState('1');
  const [openPopularityDialogBox, setOpenPopularityDialogBox] = React.useState(false);
  const [openEditProfileDialogBox, setOpenEditProfileDialogBox] = useState(false);
  const [formValues, setFormValues] = useState({
    profile_picture: '',
    name: '',
    username: '',
    email: '',
    mobile: '',
    facebook: '',
    instagram: '',
    youtube: ''
  });

  const myStore = useSelector((state) => state)
  const { stats, loading: statsLoading, error: statsError } = useSelector((state) => state.dashboardState);
  const { userProfileInfo, loading: userProfileInfoLoading, error: userProfileInfoError } = useSelector((state) => state.userProfile);
  const { post: userPosts, loading: userPostsInfoLoading, error: userPostsInfoError } = useSelector((state) => state.postById);
  const { savedPosts, loading: savedPostsLoading, error: savedPostsError } = useSelector((state) => state.savedPosts);
  const { storeProducts, loading: storeProductsLoading, error: storeProductsError } = useSelector((state) => state.storeProducts);
  const { loading: exploreLoading, error: exploreError, successMessage } = useSelector(state => state.exploreData);

  // console.log(userPosts)

  const limit = 8;
  const handleLogout = () => {
    localStorage.removeItem('foodjam-user');
    window.location.href = '/';
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(`/profile/${id}/${newValue}`);
  };

  const handleChannelChange = (event, newValue) => {
    setChannelTabValue(newValue);
  };

  const handleChannelPagination = (event, page) => {
    setCurrentPage(page);
    const offset = page;
    dispatch(fetchPostByIdRequest(id, limit, offset));
  };
  const handleStoreMyProductsPagination = (event, page) => {
    setCurrentStoreMyProductsPage(page);
    const offset = page;
    dispatch(fetchStoreProductRequest(id, limit, offset));
  };

  useEffect(() => {
    // Update the tab value when the path changes
    setValue(initialTab());
  }, [location]);

  useEffect(() => {
    // console.log(`Fetching data for user ID: ${id} and tab: ${tab}`);
    dispatch(fetchUserProfileByAccountIdRequest(id));
  }, [dispatch, id, successMessage]);

  useEffect(() => {
    // dispatch(fetchUserProfileByAccountIdRequest(id));
    if (value === 1) {
      dispatch(fetchStatsRequest());
    }
    if (value === 2) {
      dispatch(fetchPostByIdRequest(id, limit, 1));
    }
    if (value === 3) {
      dispatch(fetchStoreProductRequest(id, limit, 1));
    }
    if (value === 4) {
      dispatch(fetchSavedPostsRequest(limit, 1));
    }
  }, [dispatch, value, id, tab]);

  const handleClickOpenPopularityDialogBox = () => {
    setOpenPopularityDialogBox(true);
  };

  const handleClosePopularityDialogBox = () => {
    setOpenPopularityDialogBox(false);
  };

  const handleClickOpenEditProfileDialogBox = () => {
    setOpenEditProfileDialogBox(true);
  };

  const handleCloseEditProfileDialogBox = () => {
    setOpenEditProfileDialogBox(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
// console.log(loggedInAccountId,'logged')
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profilePicture', file);
  
      try {
        const response = await UploadUserProfile(loggedInAccountId?.sessionToken, loggedInAccountId?.account_id, formData);
        console.log(response,'response')
        const imageUrl = response?.data
  
        setFormValues((prevValues) => ({
          ...prevValues,
          profile_picture: imageUrl,
        }));
  
        // setProfileImage(imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };
  
  const handleSaveProfile = () => {
    dispatch(saveEditProfileRequest(formValues));
    setOpenEditProfileDialogBox(false);
  };

  useEffect(() => {
    // console.log(userProfileInfo, 'user profile info')
    if (userProfileInfo) {
      setFormValues({
        name: `${userProfileInfo.first_name} ${userProfileInfo.last_name}` || '',
        username: userProfileInfo.username || '',
        email: userProfileInfo.email || '',
        phone: userProfileInfo.phone || '',
        facebook: userProfileInfo?.facebook_link || '',
        instagram: userProfileInfo?.instagram_link || '',
        youtube: userProfileInfo?.youtube_link || '',
        profile_picture: userProfileInfo?.profile_picture?.startsWith('https://')
        ? userProfileInfo.profile_picture
        : cdnBaseURL + userProfileInfo?.profile_picture || ''
      });
    }
  }, [userProfileInfo]);

  // useEffect(() => {
  //   if (successMessage?.success) {
  //     toast.success(successMessage?.message);
  //     dispatch(resetSuccessMessage())
  //   }
  //   if (exploreError) {
  //     toast.error(exploreError);
  //   }
  // }, [successMessage, exploreError, dispatch]);

  const handleFollow = (accountToFollow) => {
    console.log(accountToFollow);
    dispatch(followUserRequest(accountToFollow));
  };

  return (
    <div className='profile-component'>
      <div className='left-side-profile'>
        {userProfileInfoLoading && (
          <Stack spacing={1}>
            <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'320px'} height={280} />
          </Stack>
        )}

        {!userProfileInfoLoading &&
          <div className='profileInfo'>
            <div className='profile-pic-name-info'>
              <img src={
                userProfileInfo?.profile_picture?.startsWith('https://')
                  ? userProfileInfo.profile_picture
                  : cdnBaseURL + userProfileInfo?.profile_picture
              }
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = userPlaceholder;
                }}
                alt='profile' className='profile-pic-div' />
              <div className='profile-name-div'>
                <div className='profile-tags'>
                  {userProfileInfo?.user_type && <span>{userProfileInfo?.user_type}</span>}
                  {userProfileInfo?.user_sub_type && <span>{userProfileInfo?.user_sub_type}</span>}
                  <span onClick={handleClickOpenPopularityDialogBox}>Popularity</span>
                </div>
                <p className='fullname'>{userProfileInfo?.first_name} {userProfileInfo?.last_name}</p>
                <p className='username'>{userProfileInfo?.username ? userProfileInfo?.username : "User Profile"}</p>
              </div>
            </div>
            <div className='follow-div'>
              <span>{userProfileInfo?.followers}<p>Followers</p></span>
              <span>{userProfileInfo?.following}<p>Following</p></span>
              <span>{userProfileInfo?.points}<p>Candies</p></span>
            </div>
            <span className='share-card-span'>
              <div className='buttons-div'>
                <button>Share Profile</button>
                <button onClick={handleClickOpenEditProfileDialogBox}>Edit Profile</button>
              </div>
            </span>
          </div>
        }
        <div className='tabs-web'>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            scrollButtons={false}
            orientation="vertical"
            aria-label="scrollable prevent tabs example"
            centered
            sx={{ width: '100%', display: 'flex', padding: '0 20px', paddingTop: '10px', }}
          >
            {isOwnProfile && <CustomTab value={1} icon={<img src={dashboard} alt="Dashboard" className='tab-icon' />} label="Dashboard" />}
            <CustomTab value={3} icon={<img src={cartHome} alt="Store" className='tab-icon' />} label="Store" />
            <CustomTab value={2} icon={<img src={channel} alt="Channel" className='tab-icon' />} label="Channel" />
            {isOwnProfile && <CustomTab value={4} icon={<img src={bookmarkSelect} alt="Save" className='tab-icon' />} label="Save" />}
          </Tabs>
          {!isOwnProfile && <Button sx={{ bgcolor: 'black', color: 'white', width: '70%' }}
            onClick={(e) => {
              e.preventDefault();
              handleFollow(userProfileInfo?.account_id);
            }}
            className='follow-btn-profile'
          >{(userProfileInfo?.following === '1') ? 'Following' : '+ Follow'}</Button>}
        </div>
      </div>
      <BootstrapDialog
        onClose={handleClosePopularityDialogBox}
        aria-labelledby="customized-dialog-title"
        open={openPopularityDialogBox}
      >
        <DialogTitle sx={{ m: '2px 40px', p: 2 }} id="customized-dialog-title">
          User Popularity
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClosePopularityDialogBox}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            <strong>Youtube</strong>: <span>{userProfileInfo?.youtube_followers || 0}</span>
          </Typography>
          <Typography gutterBottom>
            <strong>Instagram</strong>: <span>{userProfileInfo?.instagram_followers || 0}</span>
          </Typography>
          <Typography gutterBottom>
            <strong>facebook</strong>: <span>{userProfileInfo?.facebook_followers || 0}</span>
          </Typography>
        </DialogContent>
      </BootstrapDialog>

      <BootstrapDialog onClose={handleCloseEditProfileDialogBox} open={openEditProfileDialogBox}>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Edit Profile
          <IconButton
            aria-label="close"
            onClick={handleCloseEditProfileDialogBox}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap:'20px' }}>
              <Avatar src={
                formValues.profile_picture?.startsWith('https://')
                ? formValues.profile_picture
                : cdnBaseURL + formValues.profile_picture
              } alt="Profile Image" sx={{ width: 100, height: 100 }} />
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload files
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleImageChange}
                />
              </Button>
            </div>
            <TextField
              name="name"
              label="Name"
              value={formValues.name}
              onChange={handleFormChange}
              fullWidth
            />
            <TextField
              name="username"
              label="Username"
              value={formValues.username}
              onChange={handleFormChange}
              fullWidth
            />
            <TextField
              name="email"
              label="Email"
              value={formValues.email}
              onChange={handleFormChange}
              fullWidth
            />
            <TextField
              name="phone"
              label="Mobile"
              value={formValues.phone}
              onChange={handleFormChange}
              fullWidth
            />
            <TextField
              name="facebook"
              label="Facebook"
              value={formValues.facebook}
              onChange={handleFormChange}
              fullWidth
            />
            <TextField
              name="instagram"
              label="Instagram"
              value={formValues.instagram}
              onChange={handleFormChange}
              fullWidth
            />
            <TextField
              name="youtube"
              label="YouTube"
              value={formValues.youtube}
              onChange={handleFormChange}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditProfileDialogBox} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveProfile} color="primary">
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>

      <Divider sx={{ marginLeft: '20px', borderWidth: '1px', color: 'red', height: '90vh' }} orientation="vertical" variant="fullWidth" className='vertical-line' flexItem />
      <div className='dashboardInfo'>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className='tabs-mobile'>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons={false}
              // centered={true}
              aria-label="scrollable prevent tabs example"
              sx={{
                width: '100%', display: 'flex', '.MuiTabs-scroller': {
                  display: 'flex',
                  justifyContent: 'center',
                },
                '.MuiTabs-flexContainer': {
                  justifyContent: 'center'
                }
              }}
            >
              {isOwnProfile && <Tab value={1} icon={<img src={dashboard} alt="Dashboard" className='tab-icon' />} label="Dashboard" />}
              <Tab value={3} icon={<img src={cartHome} alt="Store" className='tab-icon' />} label="Store" />
              <Tab value={2} icon={<img src={channel} alt="Channel" className='tab-icon' />} label="Channel" />
              {isOwnProfile && <Tab value={4} icon={<img src={bookmarkSelect} alt="Save" className='tab-icon' />} label="Save" />}
            </Tabs>

            {!isOwnProfile && <Button sx={{ bgcolor: 'black', color: 'white', width: '130px', height: '40px' }}
              onClick={(e) => {
                e.preventDefault();
                handleFollow(userProfileInfo?.account_id);
              }}
              className='follow-btn-profile'
            >{(userProfileInfo?.is_following) ? 'Following' : '+ Follow'}</Button>}
          </div>

          <CustomTabPanel value={value} index={1} >
            {statsLoading && (
              <div className='yourOrders'>
                <Stack spacing={1}>
                  <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'100%'} height={100} />
                  <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'100%'} height={300} />
                </Stack>
              </div>
            )}
            {!statsLoading && (
              <>
                <div className='dashboard-first'>
                  <div className='dashboard-card'>
                    <div className='dashboard-top'>
                      <div><img src={dashboard1} alt='dashboard1' className='dashboard1' /></div>
                      <div>
                        <h2>{stats?.total_uploaded_videos}</h2>
                        <div>Total Videos Uploaded</div>
                      </div>
                    </div>
                    <p>{stats?.total_uploaded_videos === 0 && 'Uploaded Videos >'}</p>
                  </div>
                  <div className='dashboard-card'>
                    <div className='dashboard-top'>
                      <div><img src={dashboard2} alt='dashboard2' className='dashboard2' /></div>
                      <div>
                        <h2>{stats?.total_uploaded_workshop || 0}</h2>
                        <div>Total Workshops</div>
                      </div>
                    </div>
                    <p>{stats?.total_uploaded_workshop === 0 && 'Create Workshop >'}</p>
                  </div>
                  <div className='dashboard-card'>
                    <div className='dashboard-top'>
                      <div><img src={dashboard3} alt='dashboard3' className='dashboard3' /></div>
                      <div>
                        <h2>{stats?.total_likes}</h2>
                        <div>Total Videos Likes</div>
                      </div>
                    </div>
                    <p>{stats?.total_likes === 0 && 'Explore Content >'}</p>
                  </div>
                  <div className='dashboard-card'>
                    <div className='dashboard-top'>
                      <div><img src={dashboard4} alt='dashboard4' className='dashboard4' /></div>
                      <div>
                        <h2>{stats?.total_views}</h2>
                        <div>Total Videos Views</div>
                      </div>
                    </div>
                    <p>{stats?.total_views === 0 && 'Explore Content >'}</p>
                  </div>
                </div>
                <div className='dashboard-second'>
                  <div className='total-earning'>
                    Total Lifetime Earnings
                    <h2>&#8377; {stats?.you_earned}</h2>
                  </div>
                  <div className='dashboard-second-box light-gradient-orange'>
                    <div className='dashboard-second-box-first-part'>
                      <div className='dashboard-second-box-image-icons'><img src={creatingVideo} alt='CC' /></div>
                      <div>
                        <p>From Creating Content</p>
                        <p>{`Create Content >`}</p>
                      </div>
                    </div>
                    <div className='dashboard-second-box-second-part'>&#8377; {`${stats?.from_creating} >`} </div>
                  </div>
                  <div className='dashboard-second-box light-gradient-skyblue'>
                    <div className='dashboard-second-box-first-part'>
                      <div className='dashboard-second-box-image-icons'><img src={shopLite} alt='CC' /></div>
                      <div>
                        <p>From Sales (Shop)</p>
                        <p>{`Create Shop >`} </p>
                      </div>
                    </div>
                    <div className='dashboard-second-box-second-part'>&#8377; {`${stats?.from_shop} >`}</div>
                  </div>
                  <div className='dashboard-second-box light-gradient-green'>
                    <div className='dashboard-second-box-first-part'>
                      <div className='dashboard-second-box-image-icons'><img src={workshopLite} alt='CC' /></div>
                      <div>
                        <p>From workshop</p>
                        <p>{`Create Workshop >`}</p>
                      </div>
                    </div>
                    <div className='dashboard-second-box-second-part'>&#8377; {`${stats?.from_workshop} >`}</div>
                  </div>
                  <div className='dashboard-second-box light-gradient-purple'>
                    <div className='dashboard-second-box-first-part'>
                      <div className='dashboard-second-box-image-icons'><img src={campaignLite} alt='CC' /></div>
                      <div>
                        <p>From campaign</p>
                        <p>{`Create Campaign >`}</p>
                      </div>
                    </div>
                    <div className='dashboard-second-box-second-part'>&#8377; {`${stats?.create_campaign} >`}</div>
                  </div>
                  <div className='dashboard-second-box light-gradient-blue'>
                    <div className='dashboard-second-box-first-part'>
                      <div className='dashboard-second-box-image-icons'><img src={exclusiveLite} alt='CC' /></div>
                      <div>
                        <p>From Exclusive Content</p>
                        <p>{`Create Content >`}</p>
                      </div>
                    </div>
                    <div className='dashboard-second-box-second-part'>&#8377; {`${stats?.create_content} >`}</div>
                  </div>
                  <div className='dashboard-second-box light-gradient-pink'>
                    <div className='dashboard-second-box-first-part'>
                      <div className='dashboard-second-box-image-icons'><img src={menuLite} alt='CC' /></div>
                      <div>
                        <p>From Menu Selling</p>
                        <p>{`Create from Menu >`}</p>
                      </div>
                    </div>
                    <div className='dashboard-second-box-second-part'>&#8377; {`${stats?.create_from_menu} >`}</div>
                  </div>

                  <div className='view-insights'>{`View insights >`}</div>
                </div>
                <div className='dashboard-third'>
                  <div className='card-balance'>
                    <div className='withdraw-balance-text'>Withdraw Balance</div>
                    <div className='middle-withdraw-balance'>
                      <div className='middle-withdraw-balance-left'>
                        &#8377;0
                        <button disabled={!stats?.is_withdrawal_enable}>Withdraw </button>
                      </div>
                      <img src={addToWallet} alt='addToWallet' className='addToWallet' />
                    </div>
                    <div className='wallet-warning'>{stats?.remarks}</div>
                  </div>
                  <div>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                      >
                        <Typography sx={{ display: 'flex' }}><img src={howToEarn} className='how-to-earn' /> How to earn</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <div className="terms" dangerouslySetInnerHTML={{ __html: stats?.term_and_conditions }} />
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </div>
              </>
            )
            }
          </CustomTabPanel>

          <CustomTabPanel value={value} index={2}>
            < ChannelCustomTabPanel channelTabValue={channelTabValue}
              handleChannelChange={handleChannelChange}
              userPostsInfoLoading={userPostsInfoLoading}
              userPosts={userPosts}
              currentPage={currentPage}
              handleChannelPagination={handleChannelPagination}
              limit={limit} />
          </CustomTabPanel>

          <CustomTabPanel value={value} index={3}>
            <StoreCustomTabPanel storeProducts={storeProducts}
              storeProductsLoading={storeProductsLoading}
              currentStoreMyProductsPage={currentStoreMyProductsPage}
              handleStoreMyProductsPagination={handleStoreMyProductsPagination}
              limit={limit}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            <SavedCustomTabPanel
              savedPosts={savedPosts}
              handleSavedProductPagination={handleChannelPagination}
              savedPostsLoading={savedPostsLoading}
              limit={limit}
            />
          </CustomTabPanel>
        </Box>
      </div>
    </div >
  );
};

export default Profile;

const ChannelCustomTabPanel = ({ channelTabValue, handleChannelChange, userPosts, userPostsInfoLoading, currentPage, handleChannelPagination, limit }) => {
  return (
    <Box >
      <Tabs value={channelTabValue} onChange={handleChannelChange}
        variant="scrollable"
        scrollButtons={false}
        sx={{ width: '100%', display: 'flex', paddingTop: '10px', borderBottom: 1, borderColor: 'skyblue' }}
      >
        <Tab label={`Videos (${userPosts?.metadata?.total_posts})`} value="1" />
        <Tab label="Live (0)" value="2" />
      </Tabs>
      {userPostsInfoLoading && (
        <Stack spacing={1} sx={{ width: '100%' }}>
          <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'100%'} height={80} />
          <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'100%'} height={80} />
          <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'100%'} height={80} />
        </Stack>
      )}
      {!userPostsInfoLoading && (
        <CustomTabPanel value={channelTabValue} index="1">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', // Adjust column width as needed
              gap: '10px',
              marginTop: '10px',
              justifyItems: 'center'
            }}
            className='custom-grid'
          >
            {userPosts?.data?.map((post) => (
              <VideoCard post={post} key={post.id} />
            ))}
          </div>
          {userPosts && (
            <Stack spacing={2} className="pagination-stack" >
              <Pagination
                count={Math.ceil(userPosts?.metadata?.total_posts / limit)}
                page={currentPage}
                onChange={handleChannelPagination}
                size="small"
              />
            </Stack>
          )}
        </CustomTabPanel>
      )}
      <CustomTabPanel value={channelTabValue} index="2">
        <div
          style={{
            width: '100%',
            minHeight: '350px',
            height: 'auto',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <h2>COMING SOON</h2>
        </div>
      </CustomTabPanel>
    </Box>
  )
}

const StoreCustomTabPanel = ({ storeProducts, storeProductsLoading, currentStoreMyProductsPage, handleStoreMyProductsPagination, limit }) => {
  const [storeTabValue, setstoreTabValue] = React.useState('1');
  const handleStoreTabChange = (event, newValue) => {
    setstoreTabValue(newValue);
  };
  // console.log(storeProducts, 'store products', storeProductsLoading)
  return (
    <div>
      <Box >
        <Tabs value={storeTabValue} onChange={handleStoreTabChange}
          variant="scrollable"
          scrollButtons={false}
          aria-label="scrollable prevent tabs example"
          sx={{ width: '100%', display: 'flex', paddingTop: '10px', borderBottom: 1, borderColor: 'skyblue' }}
        >
          <Tab label={`My Products (${storeProducts?.metadata?.total_posts || storeProducts?.data?.store?.categories[0]?.total})`} value="1" />
          <Tab label="My Workshop (0)" value="2" />
          <Tab label="Exclusive Content (0)" value="3" />
        </Tabs>
        {storeProductsLoading && (
          <Stack spacing={1}>
            <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'100%'} height={80} />
            <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'100%'} height={80} />
            <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'100%'} height={80} />
          </Stack>
        )}
        {!storeProductsLoading && (
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              marginTop: '10px'
              // justifyContent:'start'
            }}
          >
            <CustomTabPanel value={storeTabValue} index="1">
              {storeProducts?.data?.store?.categoryData[0]?.products.length > 0 ? (
                <>
                  <div
                    // style={{
                    //   display: 'grid',
                    //   gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', // Adjust column width as needed
                    //   gap: '10px',
                    //   marginTop: '10px',
                    //   justifyItems:'center'
                    // }}
                    className='custom-store-grid'
                  >
                    {storeProducts?.data?.store?.categoryData[0]?.products.map((product) => (
                      <StoreMyProductCard myProduct={product} key={product.id} />
                    ))}
                  </div>

                  <Stack spacing={2} className="pagination-stack">
                    <Pagination
                      count={Math.ceil(storeProducts.metadata.total_posts / limit)}
                      page={currentStoreMyProductsPage}
                      onChange={handleStoreMyProductsPagination}
                      size="small"
                    />
                  </Stack>
                </>
              ) : (
                <div
                  style={{
                    minHeight: '350px',
                    height: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <h2>NO DATA</h2>
                </div>
              )}
            </CustomTabPanel>
          </div>
        )
        }

        <CustomTabPanel value={storeTabValue} index="2">
          <div
            style={{
              minHeight: '350px',
              height: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <h2>COMING SOON</h2>
          </div>
        </CustomTabPanel>

        <CustomTabPanel value={storeTabValue} index="3">
          <div
            style={{
              minHeight: '350px',
              height: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <h2>COMING SOON</h2>
          </div>
        </CustomTabPanel>
      </Box>
    </div>
  )
}

const SavedCustomTabPanel = ({ savedPosts, savedPostsLoading, limit }) => {
  const [savedTabValue, setsavedTabValue] = React.useState('1');
  // console.log(userSavedPosts.savedPosts, 'saved post')
  const handleSavedTabChange = (event, newValue) => {
    setsavedTabValue(newValue);
  };
  return (
    <div>
      <Box >
        <Tabs value={savedTabValue} onChange={handleSavedTabChange}
          aria-label="scrollable prevent tabs example"
          sx={{ width: '100%', display: 'flex', paddingTop: '10px', borderBottom: 1, borderColor: 'skyblue' }}
        >
          <Tab label={`Products (${savedPosts?.saved?.categories[0].total})`} value="1" />
          <Tab label={`Videos (${savedPosts?.saved?.categories[1].total})`} value="2" />
        </Tabs>
        {savedPostsLoading && (
          <Stack spacing={1} sx={{ width: '100%' }}>
            <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'100%'} height={80} />
            <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'100%'} height={80} />
            <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width={'100%'} height={80} />
          </Stack>
        )}

        {!savedPostsLoading && (
          <CustomTabPanel value={savedTabValue} index="1">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', // Adjust column width as needed
              gap: '10px',
              marginTop: '10px',
              justifyItems: 'center'
            }}
              className='custom-grid'
            >
              {savedPosts.saved?.categoryData[0].videos.map((post) => (
                <ProductCard product={post} key={post.id} />
              ))}
            </div>
            <Stack spacing={2} className="pagination-stack">
              <Pagination
                count={Math.ceil(savedPosts?.metadata?.total_posts / limit) || 1}
                page={1}
                // onChange={handleStoreMyProductsPagination}
                size="small"
              />
            </Stack>
          </CustomTabPanel>
        )
        }

        {!savedPostsLoading && (
          <CustomTabPanel value={savedTabValue} index="2" >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '10px',
                marginTop: '10px',
                justifyItems: 'center'
              }}
              className='custom-grid'
            >
              {savedPosts.saved?.categoryData[1].videos.map((post) => (
                <VideoCard post={post} key={post.id} />
              ))}
            </div>
            <Stack spacing={2} className="pagination-stack">
              <Pagination
                count={Math.ceil(savedPosts?.metadata?.total_posts / limit) || 1}
                page={1}
                // onChange={handleStoreMyProductsPagination}
                size="small"
              />
            </Stack>
          </CustomTabPanel>
        )}
      </Box>
    </div>
  )
}
