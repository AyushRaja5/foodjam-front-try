import React from 'react'
import './Home.css'
import Explore from '../Explore/Explore'
import SimpleSnackbar from '../../components/Snackbar/Snackbar'
const Home = () => {
  return (
    <div className='home-component'>
      {/* <h1>Home</h1> */}
      <SimpleSnackbar />
      <Explore />
    </div>
  )
}

export default Home