/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const DashboardEksekutif = ({ onLogout, isDarkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const [statsData, setStatsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/view/dashboard-eksekutif");
        const data = await response.json();

        if (response.ok) {
          const sortedData = data.data.sort((a, b) => parseFloat(b.rata_ipk) - parseFloat(a.rata_ipk));
          const top2 = sortedData.slice(0, 2);
          const lowPerformer = sortedData.find(item => item.nama_prodi === "Manajemen Haji dan Umrah");
          const combined = [...top2, lowPerformer].filter(Boolean);
          
          const mapped = combined.map((item, index) => ({
            nama_prodi: item.nama_prodi,
            rata_ipk: item.rata_ipk,
            rata_kehadiran: item.rata_kehadiran,
            icon: item.icon,
            isHighPerformer: index < 2
          }));
          
          setStatsData(mapped);
        } else {
          setError(data.message || "Gagal memuat data");
        }
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const allCategories = [
    {
      title: "Statistik Resiko Akademik Mahasiswa/i",
      icon: "📉",
      color: "#4a90e2",
      onClick: () => navigate("/statistik"),
      keywords: ["risiko", "akademik", "mahasiswa", "peringatan", "statistik"]
    },
    {
      title: "Statistik Kelulusan Tepat Waktu",
      icon: "📈",
      color: "#e74c3c",
      onClick: () => navigate("/statistik"),
      keywords: ["kelulusan", "tepat waktu", "lulus", "wisuda", "statistik"]
    },
    {
      title: "Evaluasi Kinerja Dosen",
      icon: "📑",
      color: "#27ae60",
      onClick: () => navigate("/kinerja-dosen"),
      keywords: ["dosen", "kinerja", "evaluasi", "penilaian", "pengajar"]
    },
    {
      title: "Statistik Pembayaran UKT",
      icon: "🪙",
      color: "#f39c12",
      onClick: () => navigate("/pembayaran-ukt"),
      keywords: ["ukt", "pembayaran", "biaya", "keuangan", "statistik"]
    },
  ];

  const [filteredCategories, setFilteredCategories] = useState(allCategories);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query) {
      setFilteredCategories(allCategories);
      return;
    }

    const results = allCategories.filter(category => 
      category.title.toLowerCase().includes(query) || 
      category.keywords.some(keyword => keyword.includes(query))
    );
    
    setFilteredCategories(results);
  };

  return (
    <div className={`dashboard-layout ${isDarkMode ? "dark" : "light"}`}>
      <Sidebar isLoggedIn={true} userRole="eksekutif" onLogout={onLogout} />
      
      <div className="dashboard-content">
        <Header
          isLoggedIn={true}
          userRole="eksekutif"
          onLogout={onLogout}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <main className="dashboard-main">
          {/* Hero Section with Search */}
          <section className="hero" style={{
            background: isDarkMode
              ? "linear-gradient(135deg, #111827 0%, #1f2937 100%)"
              : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            color: "white",
            padding: "4rem 1rem",
            borderRadius: "1rem",
            textAlign: "center",
            position: "relative"
          }}>
            <div style={{
              maxWidth: "800px",
              margin: "0 auto",
              position: "relative",
              zIndex: 2
            }}>
              <h1 style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                marginBottom: "1rem",
                lineHeight: "1.2"
              }}>
                Dashboard Eksekutif - UIN <span style={{
                  background: "linear-gradient(45deg, #f59e0b, #fcd34d)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>New York</span>
              </h1>
              
              <p style={{
                fontSize: "1.125rem",
                opacity: "0.9",
                marginBottom: "2rem"
              }}>
                Pantau dan kelola data strategis universitas dalam satu platform terintegrasi
              </p>
              
              {/* Enhanced Search Component */}
              <div style={{
                maxWidth: "600px",
                margin: "0 auto"
              }}>
                <div style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center"
                }}>
                  <input
                    type="text"
                    placeholder="Cari laporan (contoh: risiko, UKT, dosen)..."
                    value={searchQuery}
                    onChange={handleSearch}
                    style={{
                      width: "100%",
                      padding: "0.875rem 1.25rem 0.875rem 3rem",
                      borderRadius: "9999px",
                      border: "none",
                      fontSize: "1rem",
                      outline: "none",
                      background: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.3)",
                      color: "white",
                      backdropFilter: "blur(5px)",
                      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)"
                    }}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      position: "absolute",
                      left: "1rem",
                      color: "rgba(255,255,255,0.7)"
                    }}
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
              </div>
            </div>
            
            <div style={{
              position: "absolute",
              right: "2rem",
              bottom: "0",
              opacity: "0.1",
              zIndex: 1,
              fontSize: "10rem",
              lineHeight: "1"
            }}>
              🏛️
            </div>
          </section>

          {/* Stats Section */}
          {loading ? (
            <div style={{ 
              padding: "3rem",
              textAlign: "center",
              color: isDarkMode ? "#e5e7eb" : "#4b5563"
            }}>
              <p>Memuat data...</p>
            </div>
          ) : error ? (
            <div style={{ 
              padding: "3rem",
              textAlign: "center",
              color: "#ef4444"
            }}>
              <p>{error}</p>
            </div>
          ) : (
            <section style={{ 
              padding: "2rem 1rem",
              maxWidth: "1200px",
              margin: "0 auto"
            }}>
              <h2 style={{
                textAlign: "center",
                marginBottom: "2rem",
                color: isDarkMode ? "#f3f4f6" : "#111827",
                fontSize: "1.5rem",
                fontWeight: "600"
              }}>
                Perbandingan IPK Program Studi
              </h2>
              
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "1.5rem",
                marginBottom: "3rem"
              }}>
                {/* Top Performers */}
                <div style={{
                  background: isDarkMode ? "#1e40af" : "#2563eb",
                  color: "white",
                  padding: "1.5rem",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)"
                }}>
                  <h3 style={{
                    textAlign: "center",
                    marginBottom: "1.5rem",
                    fontSize: "1.25rem",
                    fontWeight: "600"
                  }}>
                    IPK Tertinggi
                  </h3>
                  
                  {statsData.filter(stat => stat.isHighPerformer).map((stat, index) => (
                    <div key={index} style={{
                      marginBottom: index === 0 ? "1.5rem" : "0",
                      textAlign: "center"
                    }}>
                      <p style={{
                        fontSize: "1.125rem",
                        fontWeight: "600",
                        marginBottom: "0.5rem"
                      }}>
                        {stat.nama_prodi}
                      </p>
                      <p style={{
                        fontSize: "2.25rem",
                        fontWeight: "700",
                        color: "#86efac",
                        marginBottom: "0.25rem"
                      }}>
                        {stat.rata_ipk}
                      </p>
                      <p style={{ opacity: "0.9" }}>
                        Kehadiran: {stat.rata_kehadiran}
                      </p>
                      <div style={{
                        marginTop: "0.75rem",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        background: "rgba(255,255,255,0.1)",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "9999px"
                      }}>
                        🏆 Ranking {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Low Performers */}
                <div style={{
                  background: isDarkMode ? "#7f1d1d" : "#dc2626",
                  color: "white",
                  padding: "1.5rem",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)"
                }}>
                  <h3 style={{
                    textAlign: "center",
                    marginBottom: "1.5rem",
                    fontSize: "1.25rem",
                    fontWeight: "600"
                  }}>
                    Perlu Perhatian
                  </h3>
                  
                  {statsData.filter(stat => !stat.isHighPerformer).map((stat, index) => (
                    <div key={index} style={{ textAlign: "center" }}>
                      <p style={{
                        fontSize: "1.125rem",
                        fontWeight: "600",
                        marginBottom: "0.5rem"
                      }}>
                        {stat.nama_prodi}
                      </p>
                      <p style={{
                        fontSize: "2.25rem",
                        fontWeight: "700",
                        color: "#fca5a5",
                        marginBottom: "0.25rem"
                      }}>
                        {stat.rata_ipk}
                      </p>
                      <p style={{ opacity: "0.9" }}>
                        Kehadiran: {stat.rata_kehadiran}
                      </p>
                      <div style={{
                        marginTop: "0.75rem",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        background: "rgba(255,255,255,0.1)",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "9999px"
                      }}>
                        ⚠️ Perlu Perbaikan
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

{/* Categories Section */}
<section style={{ 
  padding: "2rem 1rem",
  maxWidth: "1200px",
  margin: "0 auto"
}}>
  <h2 style={{
    textAlign: "center",
    marginBottom: "2rem",
    color: isDarkMode ? "#f3f4f6" : "#111827",
    fontSize: "1.5rem",
    fontWeight: "600"
  }}>
    {searchQuery ? `Hasil pencarian untuk "${searchQuery}"` : "Kategori Laporan Eksekutif"}
  </h2>
  
  {filteredCategories.length > 0 ? (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "1.5rem"
    }}>
      {filteredCategories.map((category, index) => (
        <div
          key={index}
          onClick={category.onClick}
          style={{
            background: isDarkMode ? "#2c3e50" : "white",
            color: isDarkMode ? "#e5e7eb" : "#374151",
            padding: "1.5rem",
            borderRadius: "0.5rem",
            boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)",
            cursor: "pointer",
            transition: "all 0.2s ease",
            borderLeft: `4px solid ${category.color}`,
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            '&:hover': {
              transform: "translateY(-4px)",
              boxShadow: `0 10px 20px -5px ${isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.2)'}`,
              background: isDarkMode ? "#34495e" : "#f9fafb"
            }
          }}
        >
          <div style={{
            fontSize: "1.8rem",
            flexShrink: 0,
            color: category.color,
            transition: "transform 0.2s ease",
            '&:hover': {
              transform: "scale(1.1)"
            }
          }}>
            {category.icon}
          </div>
          <div style={{
            fontWeight: "600",
            fontSize: "1.125rem"
          }}>
            {category.title}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div style={{ 
      padding: "3rem",
      textAlign: "center",
      color: isDarkMode ? "#9ca3af" : "#6b7280"
    }}>
      <p>Tidak ditemukan laporan yang sesuai dengan pencarian Anda.</p>
    </div>
  )}
</section>
        </main>

        <Footer isLoggedIn={true} />
      </div>
    </div>
  );
};

export default DashboardEksekutif;
