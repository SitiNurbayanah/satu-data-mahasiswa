import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({
  isLoggedIn = false,
  userRole = "general",
  userName = "",
  isDarkMode,
  toggleDarkMode,
  toggleSidebar, // Tambahkan prop ini untuk mengontrol sidebar
}) => {
  const navigate = useNavigate();

  const displayName =
    userRole === "eksekutif"
      ? ""
      : userName || (userRole === "mahasiswa" ? "Mahasiswa" : "Eksekutif");

  const handleProfileClick = () => {
    if (userRole === "eksekutif") {
      navigate("/dashboard-eksekutif/profile");
    } else if (userRole === "mahasiswa") {
      navigate("/dashboard-mahasiswa/profile");
    }
  };

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
          <div className="theme-toggle">
            <span className="theme-icon">☀️</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={!!isDarkMode}
                onChange={toggleDarkMode || (() => {})}
              />
              <span className="slider"></span>
            </label>
            <span className="theme-icon">🌙</span>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={`dashboard-header ${userRole}`}>
      <div className="header-left">
        {/* Tambahkan onClick handler untuk logo */}
        <div className="logo" onClick={toggleSidebar} style={{cursor: 'pointer'}}>
          <img src="/logo-uin.png" alt="SDM Logo" />
          <span className="logo-text">SDM</span>
        </div>
      </div>

      <div className="header-right">
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
          <button
            onClick={handleProfileClick}
            className="user-avatar hover:scale-105 transition-transform"
            title="Lihat Profil"
          >
            {userRole === "eksekutif"
              ? "👔"
              : userRole === "mahasiswa"
              ? "🎓"
              : "👤"}
          </button>
          {userRole === "eksekutif" && (
            <div className="user-role-badge">EKSEKUTIF</div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;