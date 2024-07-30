import React, { useState } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'
import './App.css'

const App = () => {
  const [sidebarExtended, setSidebarExtended] = useState(true)

  const toggleSidebar = () => {
    setSidebarExtended(!sidebarExtended)
  }

  return (
    <div className={`App ${sidebarExtended ? 'sidebar-extended' : 'sidebar-collapsed'}`}>
      <Sidebar extended={sidebarExtended} toggleSidebar={toggleSidebar} />
      <Main />
    </div>
  )
}

export default App