import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const ProfileMahasiswa = ({ onLogout, isDarkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [user, setUser] = useState(null); // Add user state

  // Get user data from localStorage on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Enhanced toggle function with transition handling
  const handleToggleDarkMode = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      toggleDarkMode();
      setIsTransitioning(false);
    }, 300);
  };

  // Format date function
  const formatTanggal = (tanggal) => {
    if (!tanggal) return "-";
    const date = new Date(tanggal);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const nim = storedUser?.nim;

      if (nim) {
        try {
          const res = await fetch(`http://localhost:5000/view/profil-lengkap/${nim}`);
          const json = await res.json();

          if (json.status === "success") {
            setProfile(json.data);
          } else {
            setError(json.message || "Gagal memuat data");
          }
        } catch (err) {
          setError("Terjadi kesalahan saat fetch data");
        }
      } else {
        setError("NIM tidak ditemukan");
      }
    };

    fetchData();
  }, []);

  // Transition control for styles
  const transitionStyle = isTransitioning ? "none" : "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";

  // Main container style
  const containerStyle = {
    display: "flex", 
    minHeight: "100vh",
    backgroundColor: isDarkMode ? "#0f172a" : "#f9fafb",
    transition: transitionStyle
  };

  // Content wrapper style
  const contentWrapperStyle = {
    flex: 1, 
    display: "flex", 
    flexDirection: "column",
    transition: transitionStyle
  };

  // Main content style
  const mainContentStyle = {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
    transition: transitionStyle
  };

  // Profile card style
  const profileCardStyle = {
    backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
    padding: "3rem",
    borderRadius: "2rem",
    width: "100%",
    maxWidth: "900px",
    boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
    color: isDarkMode ? "#f1f5f9" : "#1e293b",
    position: "relative",
    transition: transitionStyle
  };

  // Back button style
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
    gap: "0.25rem",
    zIndex: 10,
    transition: transitionStyle,
    ':hover': {
      backgroundColor: isDarkMode ? "rgba(79, 70, 229, 0.1)" : "rgba(165, 180, 252, 0.2)"
    }
  };

  // Profile image style
  const profileImageStyle = {
    width: "150px",
    height: "150px",
    borderRadius: "9999px",
    objectFit: "cover",
    border: `5px solid ${isDarkMode ? "#7c3aed" : "#8b5cf6"}`,
    boxShadow: `0 0 15px ${isDarkMode ? "rgba(124, 58, 237, 0.5)" : "rgba(139, 92, 246, 0.5)"}`,
    marginBottom: "1rem",
    transition: transitionStyle
  };

  // Name text style
  const nameTextStyle = {
    fontSize: "1.75rem", 
    fontWeight: "800", 
    marginBottom: "0.25rem",
    color: isDarkMode ? "#ffffff" : "#111827",
    transition: transitionStyle
  };

  // NIM text style
  const nimTextStyle = {
    fontWeight: "600", 
    color: isDarkMode ? "#93c5fd" : "#3b82f6",
    transition: transitionStyle
  };

  // Row style for profile data
  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.5rem 0",
    borderBottom: `1px solid ${isDarkMode ? "#334155" : "#e5e7eb"}`,
    transition: transitionStyle
  };

  // Label style
  const labelStyle = {
    fontWeight: "600",
    width: "45%",
    color: isDarkMode ? "#f1f5f9" : "#1e293b",
    transition: transitionStyle
  };

  // Value style
  const valueStyle = {
    width: "55%",
    color: isDarkMode ? "#cbd5e1" : "#334155",
    transition: transitionStyle
  };

  return (
    <div style={containerStyle}>
      <Sidebar isLoggedIn={true} userRole="mahasiswa" onLogout={onLogout} />
      
      <div style={contentWrapperStyle}>
        <Header
          isLoggedIn={true}
          userRole={user?.role || "mahasiswa"} // Provide fallback
          userName={user?.name || "Mahasiswa"} // Provide fallback
          isDarkMode={isDarkMode}
          toggleDarkMode={handleToggleDarkMode}
          onLogout={onLogout}
        />

        <main style={mainContentStyle}>
          <div style={profileCardStyle}>
            <button
              onClick={() => navigate("/dashboard")}
              style={backButtonStyle}
            >
              <span>←</span> Kembali
            </button>

            {error ? (
              <p style={{ color: "#ef4444" }}>{error}</p>
            ) : !profile ? (
              <p>Memuat data profil...</p>
            ) : (
              <>
                <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                  <img
                    src="/images/mahasiswa-avatar.png"
                    alt="Foto Profil"
                    style={profileImageStyle}
                  />
                  <h2 style={nameTextStyle}>
                    {profile.nama}
                  </h2>
                  <p style={nimTextStyle}>
                    {profile.nim}
                  </p>
                </div>

                <div>
                  {[
                    ["Jenis Kelamin", profile.jenis_kelamin],
                    ["NIK KTP", profile.nik],
                    ["NIM", profile.nim],
                    ["Jalur Masuk", profile.jalur_masuk],
                    ["Tempat Lahir", profile.tempat_lahir],
                    ["Tanggal Lahir", formatTanggal(profile.tanggal_lahir)],
                    ["Agama", profile.agama],
                    ["Email", profile.email],
                    ["NIK Ayah", profile.nik_ayah],
                    ["Nama Ayah", profile.nama_ayah],
                    ["Tanggal Lahir Ayah", formatTanggal(profile.tgl_lahir_ayah)],
                    ["Pendidikan Ayah", profile.pendidikan_ayah],
                    ["Pekerjaan Ayah", profile.pekerjaan_ayah],
                    ["Penghasilan Ayah", profile.penghasilan_ayah],
                    ["NIK Ibu", profile.nik_ibu],
                    ["Nama Ibu", profile.nama_ibu],
                    ["Tanggal Lahir Ibu", formatTanggal(profile.tgl_lahir_ibu)],
                    ["Pendidikan Ibu", profile.pendidikan_ibu],
                    ["Pekerjaan Ibu", profile.pekerjaan_ibu],
                    ["Penghasilan Ibu", profile.penghasilan_ibu],
                    ["Nama Wali", profile.nama_wali],
                    ["Tanggal Lahir Wali", formatTanggal(profile.tgl_lahir_wali)],
                    ["Pendidikan Wali", profile.pendidikan_wali],
                    ["Pekerjaan Wali", profile.pekerjaan_wali],
                    ["Penghasilan Wali", profile.penghasilan_wali],
                    ["Dosen Pembimbing", profile.dosen_pembimbing],
                  ].map(([label, value], idx) => (
                    <div style={rowStyle} key={idx}>
                      <div style={labelStyle}>{label}:</div>
                      <div style={valueStyle}>{value || "-"}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
        <Footer isLoggedIn={true} />
      </div>
    </div>
  );
};

export default ProfileMahasiswa;