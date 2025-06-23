import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({
  isLoggedIn = false,
  userRole = "general",
  setIsAuthenticated,
  setUserData = () => {},
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (typeof setIsAuthenticated === "function") {
      setIsAuthenticated(false);
    }
    if (typeof setUserData === "function") {
      setUserData(null);
    }

    localStorage.removeItem("authToken");

    navigate("/");
    window.location.reload();
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleMyStatusClick = () => {
    if (userRole === "mahasiswa") {
      navigate("/my-statistik");
    } else if (userRole === "eksekutif") {
      navigate("/statistik");
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Check if user is executive
  const isExecutive = userRole === "eksekutif";
  const isMahasiswa = userRole === "mahasiswa";

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul className="nav-list">
          <li className={`nav-item ${isActive("/") ? "active" : ""}`}>
            <a
              href="#"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("/");
              }}
            >
              <span className="nav-icon">🏠</span>
              <span className="nav-text">Home</span>
            </a>
          </li>
          <li className={`nav-item ${isActive("/about") ? "active" : ""}`}>
            <a
              href="#"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("/about");
              }}
            >
              <span className="nav-icon">ℹ️</span>
              <span className="nav-text">About</span>
            </a>
          </li>

          {/* Mahasiswa specific features - hanya tampil untuk mahasiswa */}
          {isLoggedIn && isMahasiswa && (
            <>
              <li
                className={`nav-item ${
                  isActive("/my-statistik") ? "active" : ""
                }`}
              >
                <a
                  href="#"
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation("/my-statistik");
                  }}
                >
                  <span className="nav-icon">📊</span>
                  <span className="nav-text">My Status</span>
                </a>
              </li>
              <li
                className={`nav-item ${
                  isActive("/kinerja-akademik") ? "active" : ""
                }`}
              >
                <a
                  href="#"
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation("/kinerja-akademik");
                  }}
                >
                  <span className="nav-icon">📈</span>
                  <span className="nav-text">Kinerja Akademik</span>
                </a>
              </li>
              <li
                className={`nav-item ${isActive("/dashboard") ? "active" : ""}`}
              >
                <a
                  href="#"
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation("/dashboard");
                  }}
                >
                  <span className="nav-icon">🎓</span>
                  <span className="nav-text">Dashboard</span>
                </a>
              </li>
            </>
          )}

          {/* Executive Dashboard Features - hanya tampil untuk eksekutif */}
          {isLoggedIn && isExecutive && (
            <>
              <li
                className={`nav-item ${
                  isActive("/my-statistik") || isActive("/statistik")
                    ? "active"
                    : ""
                }`}
              >
                <a
                  href="#"
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleMyStatusClick();
                  }}
                >
                  <span className="nav-icon">📊</span>
                  <span className="nav-text">My Status</span>
                </a>
              </li>
              <li
                className={`nav-item ${isActive("/statistik") ? "active" : ""}`}
              >
                <a
                  href="#"
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation("/statistik");
                  }}
                >
                  <span className="nav-icon">📈</span>
                  <span className="nav-text">Statistik</span>
                </a>
              </li>
              <li
                className={`nav-item ${
                  isActive("/kinerja-dosen") ? "active" : ""
                }`}
              >
                <a
                  href="#"
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation("/kinerja-dosen");
                  }}
                >
                  <span className="nav-icon">⚡</span>
                  <span className="nav-text">Evaluasi Kinerja</span>
                </a>
              </li>
              <li
                className={`nav-item ${
                  isActive("/pembayaran-ukt") ? "active" : ""
                }`}
              >
                <a
                  href="#"
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation("/pembayaran-ukt");
                  }}
                >
                  <span className="nav-icon">💰</span>
                  <span className="nav-text">UKT</span>
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Tombol Login/Logout berdasarkan status login */}
      <div className="sidebar-footer">
        {isLoggedIn ? (
          <button className="logout-btn" onClick={handleLogout}>
            <span className="logout-icon">🚪</span>
            <span className="logout-text">LOGOUT</span>
          </button>
        ) : (
          <button className="logout-btn" onClick={handleLogin}>
            <span className="logout-icon">🔑</span>
            <span className="logout-text">LOGIN</span>
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
