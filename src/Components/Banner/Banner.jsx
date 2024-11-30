import React, { useEffect, useState } from 'react'
import './Banner.css'

const Banner = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const parallaxEffect = {
    transform: `translateY(${scrollY * 0.5}px)`
  }

  return (
    <div className='banner'>
        <div className='image-container'>
            <img className='banner-image' src="./image.svg" alt="banner image" style={parallaxEffect} />
        </div>
        <div className='banner-text text-white'>
            <h1 className='font-medium text-5xl'>Ideas</h1>
            <p>Where all our great things begins</p>
        </div>
    </div>
  )
}

export default Banner