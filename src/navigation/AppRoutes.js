// navigation/AppRoutes.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from '../screens/Home/Home';
import Explore from '../screens/Explore/Explore';
import FoodamStore from '../screens/FoodjamStore/FoodjamStore'
import Login from '../screens/Login/Login';
import Navbar from '../components/Navbar/Navbar';
import Profile from '../screens/Profile/Profile'
import Event from '../screens/Event/Event'
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
        <Route path="/profile/stats/:id" element={<Profile/>}  />
        <Route path="/profile/channel/:id" element={<Profile/>}  />
        <Route path="/profile/store/:id" element={<Profile/>}  />
        <Route path="/profile/saved/:id" element={<Profile/>}  />
        {/* <Route path="*" element={<Navigate to="/profile" />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
