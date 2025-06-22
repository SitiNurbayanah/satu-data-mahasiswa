import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ 
  isLoggedIn = false, 
  userRole = "general",
  setIsAuthenticated,
  setUserData = () => {}
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (typeof setIsAuthenticated === 'function') {
      setIsAuthenticated(false);
    }
    if (typeof setUserData === 'function') {
      setUserData(null);
    }
    
    localStorage.removeItem('authToken');
    
    navigate("/");
    window.location.reload();
  };

  const handleLogin = () => {
    navigate("/login");
  };

  // Check if user is executive
  const isExecutive = userRole === "eksekutif";

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul className="nav-list">
          <li className="nav-item active">
            <a href="#" className="nav-link">
              <span className="nav-icon">🏠</span>
              <span className="nav-text">Home</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <span className="nav-icon">ℹ️</span>
              <span className="nav-text">About</span>
            </a>
          </li>
          
          {/* My Status hanya tampil jika user sudah login */}
          {isLoggedIn && (
            <li className="nav-item">
              <a href="#" className="nav-link">
                <span className="nav-icon">📊</span>
                <span className="nav-text">My Status</span>
              </a>
            </li>
          )}

          {/* Executive Dashboard Features - hanya tampil untuk eksekutif */}
          {isLoggedIn && isExecutive && (
            <>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <span className="nav-icon">📈</span>
                  <span className="nav-text">Statistik</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <span className="nav-icon">⚡</span>
                  <span className="nav-text">Evaluasi Kinerja</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
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