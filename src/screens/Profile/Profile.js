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
import { fetchUserProfileByAccountIdRequest } from '../../redux/actions/userProfileByAccountIdActions'
import { fetchPostByIdRequest } from '../../redux/actions/postByIdActions'
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
import { useLocation, useNavigate, useParams } from 'react-router-dom';


const CustomTabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index} style={{ width: '100%' }}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
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
  // const userProfileData = JSON.parse(localStorage.getItem('foodjam-user'));
  const [currentPage, setCurrentPage] = useState(1);
  const [currentStoreMyProductsPage, setCurrentStoreMyProductsPage] = useState(1);
  const [value, setValue] = React.useState(initialTab());
  const [channelTabValue, setChannelTabValue] = React.useState('1');
  const stats = useSelector((state) => state.dashboardState.stats);
  const userProfileData = useSelector((userProfile) => userProfile.userProfile.userProfileInfo);
  const userPosts = useSelector((userPost) => userPost.postById.post);
  const userSavedPosts = useSelector((userSavedPost) => userSavedPost.savedPosts);
  const storeMyProducts = useSelector((userStoreMyProducts) => userStoreMyProducts.storeProducts);
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
    console.log(`Fetching data for user ID: ${id} and tab: ${tab}`);
    dispatch(fetchUserProfileByAccountIdRequest(id));
  }, [dispatch, id]);

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

  const [openPopularityDialogBox, setOpenPopularityDialogBox] = React.useState(false);

  const handleClickOpenPopularityDialogBox = () => {
    setOpenPopularityDialogBox(true);
  };

  const handleClosePopularityDialogBox = () => {
    setOpenPopularityDialogBox(false);
  };
  // console.log(stats, 'dashboard profile stats')
  // console.log(userPosts, 'user posts if account id')
  // console.log(userProfileData, 'user profile Data')
  return (
    <div className='profile-component'>
      <div>
        <div className='profileInfo'>
          <div className='profile-pic-name-info'>
            <img src={userProfileData?.profile_picture ? cdnBaseURL + userProfileData?.profile_picture : profile}
              alt='profile' className='profile-pic-div' />
            <div className='profile-name-div'>
              <div className='profile-tags'>
                <span>{userProfileData?.user_type}</span>
                <span>{userProfileData?.user_sub_type}</span>
                <span onClick={handleClickOpenPopularityDialogBox}>Popularity</span>
              </div>
              <p className='username'>{userProfileData?.username ? userProfileData?.username : "Ayush"}</p>
              <p className='fullname'>{userProfileData?.first_name} {userProfileData?.middle_name} {userProfileData?.last_name}</p>
            </div>
          </div>
          <div className='follow-div'>
            <span>{userProfileData?.followers}<p>Followers</p></span>
            <span>{userProfileData?.following}<p>Following</p></span>
            <span>{userProfileData?.points}<p>Candies</p></span>
          </div>
          <span className='share-card-span'>
            <div className='buttons-div'>
              <button>Share Profile</button>
              <button>Edit Profile</button>
            </div>
          </span>
        </div>

        <div className='tabs-web'>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            scrollButtons={false}
            orientation="vertical"
            aria-label="scrollable prevent tabs example"
            centered
            sx={{ width: '100%', display: 'flex', padding: '0 20px', paddingTop: '10px' }}
          >
            <CustomTab value={1} icon={<img src={dashboard} alt="Dashboard" className='tab-icon' />} label="Dashboard" />
            <CustomTab value={2} icon={<img src={channel} alt="Channel" className='tab-icon' />} label="Channel" />
            <CustomTab value={3} icon={<img src={cartHome} alt="Store" className='tab-icon' />} label="Store" />
            <CustomTab value={4} icon={<img src={bookmarkSelect} alt="Save" className='tab-icon' />} label="Save" />
          </Tabs>
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
            <strong>Youtube</strong>: <span>{userProfileData?.youtube_followers || 0}</span>
          </Typography>
          <Typography gutterBottom>
            <strong>Instagram</strong>: <span>{userProfileData?.instagram_followers || 0}</span>
          </Typography>
          <Typography gutterBottom>
            <strong>facebook</strong>: <span>{userProfileData?.facebook_followers || 0}</span>
          </Typography>
        </DialogContent>
      </BootstrapDialog>
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
                  justifyContent: 'center'
                },
                '.MuiTabs-flexContainer': {
                  justifyContent: 'center'
                }
                , boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', paddingTop: '10px', borderRadius: '25px 25px 0 0'
              }}
            >
              <Tab value={1} icon={<img src={dashboard} alt="Dashboard" className='tab-icon' />} label="Dashboard" />
              <Tab value={2} icon={<img src={channel} alt="Channel" className='tab-icon' />} label="Channel" />
              <Tab value={3} icon={<img src={cartHome} alt="Store" className='tab-icon' />} label="Store" />
              <Tab value={4} icon={<img src={bookmarkSelect} alt="Save" className='tab-icon' />} label="Save" />
            </Tabs>
          </div>

          <CustomTabPanel value={value} index={1} >
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
                <h2>&#8377; {stats?.total}</h2>
              </div>
              <div className='dashboard-second-box light-gradient-orange'>
                <div className='dashboard-second-box-first-part'>
                  <div className='dashboard-second-box-image-icons'><img src={creatingVideo} alt='CC' /></div>
                  <div>
                    <p>From Creating Content</p>
                    <p>{`Create Content >`}</p>
                  </div>
                </div>
                <div className='dashboard-second-box-second-part'>&#8377; {`${stats?.create_content} >`} </div>
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
                <div className='dashboard-second-box-second-part'>&#8377; {`${stats?.from_creating} >`}</div>
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
          </CustomTabPanel>

          <CustomTabPanel value={value} index={2}>
            {userPosts &&
              < ChannelCustomTabPanel channelTabValue={channelTabValue}
                handleChannelChange={handleChannelChange}
                userPosts={userPosts}
                currentPage={currentPage}
                handleChannelPagination={handleChannelPagination}
                limit={limit} />
            }
          </CustomTabPanel>

          <CustomTabPanel value={value} index={3}>
            <StoreCustomTabPanel storeMyProducts={storeMyProducts}
              currentStoreMyProductsPage={currentStoreMyProductsPage}
              handleStoreMyProductsPagination={handleStoreMyProductsPagination}
              limit={limit}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            <SavedCustomTabPanel
              userSavedPosts={userSavedPosts}
            />
          </CustomTabPanel>
        </Box>
      </div>
    </div >
  );
};

export default Profile;

const ChannelCustomTabPanel = ({ channelTabValue, handleChannelChange, userPosts, currentPage, handleChannelPagination, limit }) => {
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
      <CustomTabPanel value={channelTabValue} index="1">
        <div style={{
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          //  justifyContent:'start'
        }}>
          {userPosts?.data?.map((post) => (
            <VideoCard post={post} key={post.id} />
          ))}
        </div>
        {userPosts && (
          <Stack spacing={2} className="pagination-stack" style={{ marginTop: 'auto' }}>
            <Pagination
              count={Math.ceil(userPosts?.metadata?.total_posts / limit)}
              page={currentPage}
              onChange={handleChannelPagination}
              size="small"
            />
          </Stack>
        )}
      </CustomTabPanel>

      <CustomTabPanel value={channelTabValue} index="2">
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            backgroundColor: 'red',
            gap: '10px',
            justifyContent: 'start'
          }}>
          <h2>COMING SOON</h2>
        </div>
      </CustomTabPanel>
    </Box>
  )
}

const StoreCustomTabPanel = ({ storeMyProducts, currentStoreMyProductsPage, handleStoreMyProductsPagination, limit }) => {
  const [storeTabValue, setstoreTabValue] = React.useState('1');
  const handleStoreTabChange = (event, newValue) => {
    setstoreTabValue(newValue);
  };
  // console.log(storeMyProducts, 'store products')
  return (
    <div>
      <Box >
        <Tabs value={storeTabValue} onChange={handleStoreTabChange}
          variant="scrollable"
          scrollButtons={false}
          aria-label="scrollable prevent tabs example"
          sx={{ width: '100%', display: 'flex', paddingTop: '10px', borderBottom: 1, borderColor: 'skyblue' }}
        >
          <Tab label={`My Products (${storeMyProducts?.storeProducts?.metadata?.total_posts || storeMyProducts?.storeProducts?.data?.length})`} value="1" />
          <Tab label="My Workshop (0)" value="2" />
          <Tab label="Exclusive Content (0)" value="3" />
        </Tabs>
        <CustomTabPanel value={storeTabValue} index="1">
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              // justifyContent:'start'
            }}
          >
            {storeMyProducts?.storeProducts?.data?.map((product) => (
              <StoreMyProductCard myProduct={product} key={product.product_id} />
            ))}
          </div>
          <Stack spacing={2} className="pagination-stack" style={{ marginTop: 'auto' }}>
            <Pagination
              count={Math.ceil(storeMyProducts?.metadata?.total_posts / limit)}
              page={currentStoreMyProductsPage}
              onChange={handleStoreMyProductsPagination}
              size="small"
            />
          </Stack>
        </CustomTabPanel>

        <CustomTabPanel value={storeTabValue} index="2">
          <div
            style={{
              minHeight: '350px',
              height: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
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
            }}>
            <h2>COMING SOON</h2>
          </div>
        </CustomTabPanel>
      </Box>
    </div>
  )
}

const SavedCustomTabPanel = ({ userSavedPosts }) => {
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
          <Tab label={`Products (${userSavedPosts?.savedPosts?.saved?.categories[0].total})`} value="1" />
          <Tab label={`Videos (${userSavedPosts?.savedPosts?.saved?.categories[1].total})`} value="2" />
        </Tabs>
        <CustomTabPanel value={savedTabValue} index="1">
          {userSavedPosts?.savedPosts.saved?.categoryData[0].videos.map((post) => (
            <ProductCard product={post} key={post.id} />
          ))}
        </CustomTabPanel>
        <CustomTabPanel value={savedTabValue} index="2">
          {userSavedPosts?.savedPosts.saved?.categoryData[1].videos.map((post) => (
            <VideoCard post={post} key={post.id} />
          ))}
        </CustomTabPanel>
      </Box>
    </div>
  )
}
