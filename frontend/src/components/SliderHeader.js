import React from 'react'
import a from '../assets/h.png'
const SliderHeader = () => {
  return (
    <div className='banner'>
      <div className='banner-content'>
        <h2>Welcome to Amina Shop</h2>
        <h3>
          Discover unique fashion pieces crafted with elegance and style. Find
          the perfect attire for every occasion.
        </h3>
      </div>
      <img src={a} alt='' />
    </div>
  )
}

export default SliderHeader
