// navigation/AppRoutes.js

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const Home = lazy(() => import('../screens/Home/Home'));
const Explore = lazy(() => import('../screens/Explore/Explore'));
const FoodamStore = lazy(() => import('../screens/FoodjamStore/FoodjamStore'));
const Login = lazy(() => import('../screens/Login/Login'));
const Profile = lazy(() => import('../screens/Profile/Profile'));
const Settings = lazy(() => import('../screens/Settings/Settings'));
const Notification = lazy(() => import('../screens/Notification/Notification'));
const YourOrderDetail = lazy(() => import('../screens/Settings/Yourorders/YourOrderDetail'));
const Cart = lazy(() => import('../screens/Cart/Cart'));
const WithdrawBalance = lazy(() => import('../screens/Settings/Withdrawal/WithdrawBalance'));
// const NotFound = lazy(() => import('../screens/NotFound/NotFound'));
const TopFoodJammers = lazy(() => import('../screens/TopFoodJammers/TopFoodJammers'));
const BrandDetails = lazy(() => import('../components/BrandDetails/BrandDetails'));
const Contests = lazy(() => import('../screens/Contests/Contests'));
const ContestDetail = lazy(() => import('../components/ContestDetail/ContestDetail'));
const Rewards = lazy(() => import('../screens/Rewards/Rewards'));
const RewardDetail = lazy(() => import('../components/RewardDetail/RewardDetail'));
const Workshops = lazy(() => import('../screens/Workshops/Workshops'));
const Campaigns = lazy(() => import('../screens/Campaigns/Campaigns'));

const CampaignDetail = lazy(() => import('../components/CampaignDetail/CampaignDetail'));
const ViewAllCreators = lazy(() => import('../components/ViewAllCreators/ViewAllCreators'));
const ViewAllAffiliates = lazy(() => import('../components/ViewAllAffiliates/ViewAllAffiliates'));
const ViewAllVideos = lazy(() => import('../components/ViewAllVideos/ViewAllVideos'));
const ViewAllProducts = lazy(() => import('../components/ViewAllProducts/ViewAllProducts'));
const ViewAllBrands = lazy(() => import('../components/ViewAllBrands/ViewAllBrands'));
const SuccessFullPaidOrder = lazy(() => import('../components/OrderPaymentScreens/SuccessFullPaidOrder'));
const FailedPaidOrder = lazy(() => import('../components/OrderPaymentScreens/FailedPaidOrder'));


const TopBrandsPage = lazy(() => import('../screens/TopBrandsPage/TopBrandsPage'));
const BestSellersPage = lazy(() => import('../screens/BestSellersPage/BestSellersPage'));
const TopOffersPage = lazy(() => import('../screens/TopOffersPage/TopOffersPage'));
const ProductDetailsPage = lazy(() => import('../screens/ProductDetailsPage/ProductDetailsPage'));
const CategoriesPage = lazy(() => import('../screens/CategoriesPage/CategoriesPage'));

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact="true" path="/" element={<Explore />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/shop" element={<FoodamStore />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/profile" element={<Profile/>} /> */}
          <Route path="/profile/:id/:tab" element={<Profile />} />

          {/* Settings */}
          <Route path="/setting" element={<Settings />} />
          <Route path="/my_orders" element={<Settings />} />
          <Route path="/addresses" element={<Settings />} />
          <Route path="/preferences" element={<Settings />} />
          <Route path="/bank_details" element={<Settings />} />
          <Route path="/withdraw" element={<Settings />} />
          <Route path="/withdraw/tobewithdraw" element={<WithdrawBalance />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/my_orders/:orderId" element={<YourOrderDetail />} />
          <Route path="/cart" element={<Cart />} />

          {/* Explore */}
          <Route path="/view_all_products" element={<ViewAllProducts />} />
          <Route path="/view_all_brands" element={<ViewAllBrands />} />
          <Route path="/view_all_creators" element={<ViewAllCreators />} />
          <Route path="/view_all_affiliates" element={<ViewAllAffiliates />} />
          <Route path="/view_all_videos/:title" element={<ViewAllVideos />} />
          <Route path="/top_foodjammers" element={<TopFoodJammers/>} />
          <Route path="/brand/:brandId" element={<BrandDetails/>} />

          <Route path="/contests" element={<Contests />} />
          <Route path="/contest_details/:contestId" element={<ContestDetail />} />

          <Route path="/rewards" element={<Rewards />} />
          <Route path="/rewardsInfo/:rewardId" element={<RewardDetail />} />

          <Route path="/workshops" element={<Workshops />} />

          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaign_details/:campaignId" element={<CampaignDetail />} />

          {/* Shop  */}
          <Route path="/top_brands" element={<TopBrandsPage />} />
          <Route path="/best_sellers" element={<BestSellersPage />} />
          <Route path="/top_offers" element={<TopOffersPage />} />
          <Route path="/categories/:categoriesId" element={<CategoriesPage />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />

          <Route path="/success" element={<SuccessFullPaidOrder />} />
          <Route path="/failed" element={<FailedPaidOrder />} />
          
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
