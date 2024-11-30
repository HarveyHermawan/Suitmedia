import React from 'react'
import Navbar from './Components/Navbar/Navbar.jsx'
import './IdeaPage.css'
import Banner from './Components/Banner/Banner.jsx'
import List from './Components/List/List.jsx'

const IdeaPage = () => {
  return (
    <div className="idea-page">
      <Navbar/>
      <Banner/>
      <List/>
    </div>
  )
}

export default IdeaPage