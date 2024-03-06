import React, { useEffect, useState } from 'react'
import information from '../dataTopNav'
const TopNav = () => {
  const [index, setIndex] = useState(0)
  const { title } = information[index]
  useEffect(() => {
    const slider = setInterval(() => {
      setIndex((newIndex) => {
        const result = (newIndex + 1) % information.length
        return result
      })
    }, 5000)
    return () => {
      clearInterval(slider)
    }
  }, [index])
  return (
    <div className='top-nav'>
      <div className='top-nav-details'>
        <h3>{title}</h3>
      </div>
    </div>
  )
}

export default TopNav
