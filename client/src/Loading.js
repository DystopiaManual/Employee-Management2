import React from 'react'
import { HashLoader } from 'react-spinners'

function Loading() {
  return (
    <div className='loading-wrap'>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <HashLoader
          color="#234de3"
        />
      </div>
    </div>
  )
}

export default Loading