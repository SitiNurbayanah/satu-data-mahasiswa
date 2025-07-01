import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({
  isLoggedIn = false,
  userRole = "general",
  setIsAuthenticated,
  setUserData = () => {},
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated?.(false);
    setUserData?.(null);
    localStorage.removeItem("authToken");
    navigate("/");
    window.location.reload();
  };

  const handleLogin = () => navigate("/login");
  const handleNavigation = (path) => navigate(path);
  const isActive = (path) => location.pathname === path;

  const isExecutive = userRole === "eksekutif" || userRole === "dosen";
  const isMahasiswa = userRole === "mahasiswa";

  const getAboutPath = () => {
    if (isMahasiswa) return "/about-mahasiswa";
    if (isExecutive) return "/about-eksekutif";
    return "/about";
  };

  const getHomePath = () => {
    if (isMahasiswa || isExecutive) return "/dashboard";
    return "/";
  };

  // Data download untuk masing-masing role
  const generalDatasets = [
    { label: "Data Mahasiswa Umum", file: "tracking_mahasiswa.csv" },
    { label: "Data Mahasiswa Aktif", file: "data_mahasiswa_aktif.csv" },
    { label: "Data Alumni Umum", file: "statistik_alumni_komprehensif.csv" },
    { label: "Data Perbandingan Gender Mahasiswa", file: "view_perbandingan_gender_mahasiswa.csv" },
  ];

  const executiveDatasets = [
    { label: "Data Dashboard Eksekutif", file: "dashboard_eksekutif.csv" },
    { label: "Data Kinerja Dosen", file: "kinerja_dosen.csv" },
    { label: "Data Statistik Alumni Komprehensif", file: "statistik_alumni_komprehensif.csv" },
    { label: "Data Tracking Mahasiswa", file: "tracking_mahasiswa.csv" },
    { label: "Data Perbandingan Gender Mahasiswa", file: "view_perbandingan_gender_mahasiswa.csv" },
    { label: "Data Statistik UKT Pivot", file: "view_statistik_ukt_pivot.csv" },
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul className="nav-list">
          <li className={`nav-item ${isActive(getHomePath()) ? "active" : ""}`}>
            <a
              href="#"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(getHomePath());
              }}
            >
              <span className="nav-icon">🏠</span>
              <span className="nav-text">Home</span>
            </a>
          </li>

          <li className={`nav-item ${isActive(getAboutPath()) ? "active" : ""}`}>
            <a
              href="#"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(getAboutPath());
              }}
            >
              <span className="nav-icon">ℹ️</span>
              <span className="nav-text">About</span>
            </a>
          </li>

          {isLoggedIn && isMahasiswa && (
            <>
              <li className={`nav-item ${isActive("/my-statistik") ? "active" : ""}`}>
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
              <li className={`nav-item ${isActive("/kinerja-akademik") ? "active" : ""}`}>
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
            </>
          )}

          {isLoggedIn && isExecutive && (
            <>
              <li className={`nav-item ${isActive("/statistik") ? "active" : ""}`}>
                <a
                  href="#"
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation("/statistik");
                  }}
                >
                  <span className="nav-icon">📊</span>
                  <span className="nav-text">Statistik</span>
                </a>
              </li>
              <li className={`nav-item ${isActive("/kinerja-dosen") ? "active" : ""}`}>
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
              <li className={`nav-item ${isActive("/pembayaran-ukt") ? "active" : ""}`}>
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

          {/* Dropdown dataset khusus masing-masing role */}
          {!isLoggedIn && (
            <li className={`nav-item ${isDropdownOpen ? "active" : ""}`}>
              <div
                className={`nav-link ${isDropdownOpen ? "dropdown-open" : ""}`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
              >
                <span className="nav-icon">⬇️</span>
                <span className="nav-text">Download Dataset Umum</span>
              </div>

              {isDropdownOpen && (
                <ul
                  style={{
                    listStyle: "none",
                    margin: "10px 0",
                    padding: 0,
                    backgroundColor: "#fff",
                    border: "2px solid #3b82f6",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    overflow: "hidden",
                  }}
                >
                  {generalDatasets.map((item, index) => (
                    <li
                      key={index}
                      style={{
                        borderBottom: index < generalDatasets.length - 1 ? "1px solid #eee" : "none",
                      }}
                    >
                      <a
                        href={`/datasets/${item.file}`}
                        download
                        style={{
                          display: "block",
                          padding: "10px 16px",
                          textDecoration: "none",
                          color: "#1d4ed8",
                          fontWeight: 500,
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#eff6ff";
                          e.target.style.fontWeight = "bold";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "transparent";
                          e.target.style.fontWeight = "500";
                        }}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )}

          {isLoggedIn && isExecutive && (
            <li className={`nav-item ${isDropdownOpen ? "active" : ""}`}>
              <div
                className={`nav-link ${isDropdownOpen ? "dropdown-open" : ""}`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
              >
                <span className="nav-icon">⬇️</span>
                <span className="nav-text">Download Dataset Eksekutif</span>
              </div>

              {isDropdownOpen && (
                <ul
                  style={{
                    listStyle: "none",
                    margin: "10px 0",
                    padding: 0,
                    backgroundColor: "#fff",
                    border: "2px solid #3b82f6",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    overflow: "hidden",
                  }}
                >
                  {executiveDatasets.map((item, index) => (
                    <li
                      key={index}
                      style={{
                        borderBottom: index < executiveDatasets.length - 1 ? "1px solid #eee" : "none",
                      }}
                    >
                      <a
                        href={`/datasets/${item.file}`}
                        download
                        style={{
                          display: "block",
                          padding: "10px 16px",
                          textDecoration: "none",
                          color: "#1d4ed8",
                          fontWeight: 500,
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#eff6ff";
                          e.target.style.fontWeight = "bold";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "transparent";
                          e.target.style.fontWeight = "500";
                        }}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )}
        </ul>
      </nav>

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
