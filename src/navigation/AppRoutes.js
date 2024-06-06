// navigation/AppRoutes.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../screens/Home/Home';
import Explore from '../screens/Explore/Explore';
import FoodamStore from '../screens/FoodjamStore/FoodjamStore'
import Login from '../screens/Login/Login';
import Navbar from '../components/Navbar/Navbar';
import Profile from '../screens/Profile/Profile'
// import Event from '../screens/Event/Event'
import Settings from '../screens/Settings/Settings';
import Notification from '../screens/Notification/Notification';
import YourOrderDetail from '../screens/Settings/Yourorders/YourOrderDetail';
import Cart from '../screens/Cart/Cart';
import WithdrawBalance from '../screens/Settings/Withdrawal/WithdrawBalance';
const AppRoutes = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact="true" path="/" element={<Home/>} />
        {/* <Route path="/event" element={<Event/>} /> */}
        <Route path="/explore" element={<Explore/>} />
        <Route path="/foodjamstore" element={<FoodamStore/>} />
        <Route path="/login" element={<Login/>} />
        {/* <Route path="/profile" element={<Profile/>} /> */}
        <Route path="/profile/:id/:tab" element={<Profile/>}  />
        <Route path="/setting" element={<Settings/>} />
        <Route path="/my_orders" element={<Settings/>} />
        <Route path="/addresses" element={<Settings/>} />
        <Route path="/preferences" element={<Settings/>} />
        <Route path="/payment" element={<Settings/>} />
        <Route path="/withdraw" element={<Settings/>} />
        <Route path="/withdraw/tobewithdraw" element={<WithdrawBalance/>} />
        <Route path="/notifications" element={<Notification/>}  />
        <Route path="/my_orders/:orderId" element={<YourOrderDetail/>} />
        <Route path="/cart" element={<Cart/>}  />

        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
