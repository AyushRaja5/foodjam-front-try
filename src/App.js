import React from 'react';
import './App.css';
import AppRoutes from './navigation/AppRoutes';
import axios from 'axios';
function App() {
  const apiUrl = process.env.REACT_APP_API_URL;
  console.log(apiUrl)
  axios.defaults.baseURL = apiUrl;

  return (
    <div className="App">
      <AppRoutes/>
    </div>
  );
}

export default App;
