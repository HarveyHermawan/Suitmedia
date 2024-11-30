import React, {useEffect, useState} from 'react'
import Logo from '/logo Suitmedia.svg'
import './Navbar.css'

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [activeLink, setActiveLink] = useState('Ideas')

  const handleScroll = () => {
    const currentScrollY = window.scrollY
    if(currentScrollY > lastScrollY && currentScrollY > 140){
      setIsVisible(false)
    }else{
      setIsVisible(true)
    }
    setLastScrollY(currentScrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  return (
    <div className={`navbar ${isVisible ? 'visible' : 'hidden'}`}>
        <div className='container'>
          <img className='logo' src={Logo} alt="logo" />
          <div className='nav-links'>
            <div className={`work-text ${activeLink === 'Work' ? 'active' : ''}`} onClick={() => setActiveLink('Work')}>
              Work
            </div>
            <div className={`about-text ${activeLink === 'About' ? 'active' : ''}`} onClick={() => setActiveLink('About')}>
              About
            </div>
            <div className={`services-text ${activeLink === 'Services' ? 'active' : ''}`} onClick={() => setActiveLink('Services')}>
              Services
            </div>
            <div className={`ideas-text ${activeLink === 'Ideas' ? 'active' : ''}`} onClick={() => setActiveLink('Ideas')}>
              Ideas
            </div>
            <div className={`careers-text ${activeLink === 'Careers' ? 'active' : ''}`}onClick={() => setActiveLink('Careers')}>
              Careers
            </div>
            <div className={`contacts-text ${activeLink === 'Contacts' ? 'active' : ''}`} onClick={() => setActiveLink('Contacts')}>
              Contacts
            </div>
          </div>
        </div>
    </div>
  )
}

export default Navbar