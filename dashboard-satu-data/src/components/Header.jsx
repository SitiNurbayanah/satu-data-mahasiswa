import React, { useState } from "react";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <button className="menu-toggle">
          <span className="hamburger">☰</span>
        </button>
        <div className="logo">
          <span className="logo-icon">🌟</span>
          <span className="logo-text">SDM</span>
        </div>
      </div>

      <div className="header-center">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search Course, Reports and Notes"
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="header-right">
        <div className="theme-toggle">
          <span className="theme-icon">🌙</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
            <span className="slider"></span>
          </label>
          <span className="theme-icon">☀️</span>
        </div>
        <div className="user-profile">
          <span className="user-name">Alex Galon</span>
          <div className="user-avatar">👤</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
