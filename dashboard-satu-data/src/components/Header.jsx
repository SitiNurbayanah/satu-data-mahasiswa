import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({
  isLoggedIn = false,
  userRole = "general",
  userName = "",
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
  };

  // Tentukan nama pengguna berdasarkan role
  const displayName =
    userRole === "eksekutif"
      ? "Mamat"
      : userName || (userRole === "mahasiswa" ? "Mahasiswa" : "Eksekutif");

  // Render header untuk halaman login (general)
  if (!isLoggedIn) {
    return (
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <img src="/logo-uin.png" alt="SDM Logo" />
            <span className="logo-text">SDM</span>
          </div>
        </div>
        <div className="header-right">
          <Link to="/about" className="about-link" style={{ color: "white" }}>
            About
          </Link>
          <div className="theme-toggle">
            <span className="theme-icon">☀️</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
              <span className="slider"></span>
            </label>
            <span className="theme-icon">🌙</span>
          </div>
        </div>
      </header>
    );
  }

  // Render header untuk dashboard (setelah login)
  return (
    <header className={`dashboard-header ${userRole}`}>
      <div className="header-left">
        <div className="logo">
          <img src="/logo-uin.png" alt="SDM Logo" />
          <span className="logo-text">SDM</span>
        </div>
      </div>

      <div className="header-center">
        {userRole === "eksekutif" && (
          <div className="admin-badge">
            <span className="badge-icon">⭐</span>
          </div>
        )}
        <div className="search-container">
          <input
            type="text"
            placeholder={
              userRole === "eksekutif"
                ? "Search Reports and Analytics"
                : userRole === "mahasiswa"
                ? "Search Courses and Notes"
                : "Search"
            }
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="header-right">
        <Link to="/about" className="about-link" style={{ color: "white" }}>
          About
        </Link>
        <div className="theme-toggle">
          <span className="theme-icon">☀️</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
            <span className="slider"></span>
          </label>
          <span className="theme-icon">🌙</span>
        </div>
        <div className="user-profile">
          <span className="user-name">{displayName}</span>
          <div className="user-avatar">
            {userRole === "eksekutif"
              ? "👔"
              : userRole === "mahasiswa"
              ? "🎓"
              : "👤"}
          </div>
          {userRole === "eksekutif" && (
            <div className="user-role-badge">EKSEKUTIF</div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
