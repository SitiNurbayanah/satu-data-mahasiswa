import React, { useState } from "react";

const LoginHeader = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <span className="logo-icon">🌟</span>
          <span className="logo-text">SDM</span>
        </div>
      </div>
      <div className="header-right">
        <span className="about-link">About</span>
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
      </div>
    </header>
  );
};

export default LoginHeader;
