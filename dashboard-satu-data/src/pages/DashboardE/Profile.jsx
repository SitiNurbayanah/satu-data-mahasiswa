/* eslint-disable no-unused-vars */
import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const ProfileEksekutif = ({ onLogout, isDarkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const userData = {
    nama: "Dr. Ani Wulandari, M.Kom.",
    jabatan: "Lektor Kepala",
    email: "ani.wulandari@kampus.ac.id",
    bidang: "Sistem Informasi",
    fakultas: "Fakultas Sains dan Teknologi",
    pendidikan: "S3 Ilmu Komputer - Universitas Indonesia",
    mengajarSejak: "2010",
    penelitian: "15 publikasi internasional",
    pengabdian: "10 proyek pengabdian masyarakat"
  };

  // Styles
  const containerStyle = {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column"
  };

  const mainContentStyle = {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
    backgroundColor: isDarkMode ? "#0f172a" : "#f9fafb",
  };

  const profileCardStyle = {
    backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
    padding: "2.5rem",
    borderRadius: "1rem",
    width: "100%",
    maxWidth: "600px",
    boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
    color: isDarkMode ? "#f1f5f9" : "#1e293b",
    position: "relative"
  };

  const rowStyle = {
    display: "flex",
    padding: "0.75rem 0",
    borderBottom: `1px solid ${isDarkMode ? "#334155" : "#e5e7eb"}`,
    alignItems: "flex-start"
  };

  const labelStyle = {
    fontWeight: "600",
    color: isDarkMode ? "#a5b4fc" : "#4f46e5",
    marginRight: "1rem",
    minWidth: "150px",
    textAlign: "right"
  };

  const valueStyle = {
    color: isDarkMode ? "#e2e8f0" : "#4b5563",
    flex: 1
  };

  const backButtonStyle = {
    position: "absolute",
    top: "1.5rem",
    left: "1.5rem",
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    backgroundColor: "transparent",
    color: isDarkMode ? "#a5b4fc" : "#4f46e5",
    border: `1px solid ${isDarkMode ? "#4f46e5" : "#a5b4fc"}`,
    fontWeight: "500",
    cursor: "pointer",
    fontSize: "0.875rem",
    display: "flex",
    alignItems: "center",
    gap: "0.25rem"
  };

  return (
    <div style={containerStyle}>
      <Sidebar isLoggedIn={true} userRole="eksekutif" onLogout={onLogout} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header
          isLoggedIn={true}
          userRole="eksekutif"
          onLogout={onLogout}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <main style={mainContentStyle}>
          <div style={profileCardStyle}>
            {/* Back Button - Top Left */}
            <button
              onClick={() => navigate("/dashboard")}
              style={backButtonStyle}
            >
              <span>←</span> Kembali
            </button>

            {/* Profile Header */}
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center",
              marginBottom: "2rem"
            }}>
              {/* Profile Photo */}
              <div style={{ 
                width: "120px", 
                height: "120px", 
                borderRadius: "50%",
                overflow: "hidden",
                marginBottom: "1.5rem",
                border: `4px solid ${isDarkMode ? "#7c3aed" : "#8b5cf6"}`,
                boxShadow: `0 0 20px ${isDarkMode ? "rgba(124,58,237,0.3)" : "rgba(139,92,246,0.2)"}`
              }}>
                <img
                  src="/images/eksekutif-avatar.png"
                  alt="Foto Profil"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </div>

              {/* Name and Position */}
              <h1 style={{ 
                fontSize: "1.75rem", 
                fontWeight: "700", 
                marginBottom: "0.25rem",
                color: isDarkMode ? "#ffffff" : "#111827",
                textAlign: "center"
              }}>
                {userData.nama}
              </h1>
              <p style={{ 
                color: isDarkMode ? "#a5b4fc" : "#6b7280",
                marginBottom: "1rem"
              }}>
                {userData.jabatan}
              </p>
            </div>

            {/* Profile Details */}
            <div style={{ 
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "0.5rem"
            }}>
              <div style={rowStyle}>
                <span style={labelStyle}>Bidang Keahlian:</span>
                <span style={valueStyle}>{userData.bidang}</span>
              </div>
              <div style={rowStyle}>
                <span style={labelStyle}>Fakultas:</span>
                <span style={valueStyle}>{userData.fakultas}</span>
              </div>
              <div style={rowStyle}>
                <span style={labelStyle}>Email:</span>
                <span style={valueStyle}>{userData.email}</span>
              </div>
              <div style={rowStyle}>
                <span style={labelStyle}>Pendidikan Tertinggi:</span>
                <span style={valueStyle}>{userData.pendidikan}</span>
              </div>
              <div style={rowStyle}>
                <span style={labelStyle}>Mengajar Sejak:</span>
                <span style={valueStyle}>{userData.mengajarSejak}</span>
              </div>
              <div style={rowStyle}>
                <span style={labelStyle}>Publikasi Penelitian:</span>
                <span style={valueStyle}>{userData.penelitian}</span>
              </div>
              <div style={rowStyle}>
                <span style={labelStyle}>Pengabdian Masyarakat:</span>
                <span style={valueStyle}>{userData.pengabdian}</span>
              </div>
            </div>
          </div>
        </main>
        <Footer isLoggedIn={true} />
      </div>
    </div>
  );
};

export default ProfileEksekutif;