import React from 'react'

const Footer = ({ isLoggedIn = false }) => {
  return (
    <footer 
      className="dashboard-footer"
      style={{
        marginLeft: isLoggedIn ? '250px' : '0'
      }}
    >
      2025 SALAM
    </footer>
  )
}

export default Footer