import React from 'react'
import './Event.css'
const Event = () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <iframe
        src="https://event.foodjam.in/"
        title="Embedded Website"
        style={{ position: 'absolute', top: 100, left: 0, width: '100%', height: '100%', border: 'none', }}
      ></iframe>
    </div>
  )
}

export default Event