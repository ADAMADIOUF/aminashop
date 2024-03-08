import React from 'react'
import a from "../assets/b1.png"
const Banner = () => {
  return (
    <div className='banner'>
      <div className='banner-content'>
       <h2>Amina Shop</h2>
        <h3>Discover Unique Style with Our Fashion Collection</h3>
      </div>
      <img src={a} alt='' />
    </div>
  )
}

export default Banner
