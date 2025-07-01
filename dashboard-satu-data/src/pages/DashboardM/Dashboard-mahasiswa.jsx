import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

const DashboardMahasiswa = ({ user, onLogout, isDarkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const statsData = [
    {
      number: "79.420",
      label: "Mahasiswa/i Aktif",
      icon: "👨‍🎓",
      bgColor: "#2c3e50",
    },
    {
      number: "5.000",
      label: "Dosen Aktif",
      icon: "👩‍🏫",
      bgColor: "#2c3e50",
    },
    {
      number: "2.000",
      label: "Mahasiswa/i lulus pertahun",
      icon: "🏅",
      bgColor: "#2c3e50",
    },
  ];

  const allCategories = [
    {
      title: "Kinerja Akademik",
      icon: "📁",
      color: "#4a90e2",
      path: "/kinerja-akademik",
      keywords: ["kinerja", "akademik", "prestasi", "ipk"]
    },
    {
      title: "Risiko Akademik",
      icon: "📊",
      color: "#e74c3c",
      path: "/my-statistik",
      keywords: ["risiko", "peringatan", "akademik", "statistik"]
    },
    {
      title: "Riwayat Nilai Kuliah",
      icon: "📚",
      color: "#27ae60",
      path: "/riwayat-mata-kuliah",
      keywords: ["nilai", "riwayat", "kuliah", "matakuliah", "transkrip"]
    },
  ];

  const [categories, setCategories] = useState(allCategories);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setCategories(allCategories);
      return;
    }

    const filtered = allCategories.filter(category => 
      category.title.toLowerCase().includes(query) ||
      category.keywords.some(keyword => keyword.includes(query))
    );
    
    setCategories(filtered);
  };

  const handleCategoryClick = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar isLoggedIn={true} userRole="mahasiswa" onLogout={onLogout} />

      <div className="dashboard-content">
        <Header
          isLoggedIn={true}
          userRole={user?.role}
          userName={user?.name}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          onLogout={onLogout}
        />

        <main className="dashboard-main">
          <div className="hero-section">
            <div className="hero-content">
              <h1 className="hero-title">
                Selamat Datang di Satu Data Mahasiswa UIN
                <span className="highlight">New York</span>
              </h1>
              <p className="hero-subtitle">
                Cari data-data menarik seputar UIN New York disini!
              </p>
              {/* Search Bar */}
              <div className="search-container" style={{ marginTop: "20px" }}>
                <input
                  type="text"
                  placeholder="Cari kategori (kinerja, risiko, nilai...)"
                  value={searchQuery}
                  onChange={handleSearch}
                  style={{
                    padding: "12px 20px",
                    width: "100%",
                    maxWidth: "500px",
                    borderRadius: "25px",
                    border: "none",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    fontSize: "1rem",
                    outline: "none"
                  }}
                />
              </div>
            </div>
            <div className="hero-image">
              <div className="building-placeholder">
                <div className="building-icon">🏛️</div>
              </div>
            </div>
          </div>

          <div className="stats-section">
            <div className="stats-grid">
              {statsData.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-icon">{stat.icon}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="categories-section">
            <div className="categories-container">
              <h2 className="categories-title">
                {searchQuery ? `Hasil pencarian untuk "${searchQuery}"` : "Kategori"}
              </h2>
              {categories.length > 0 ? (
                <div className="categories-grid">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className="category-card clickable"
                      onClick={() => handleCategoryClick(category.path)}
                      style={{ cursor: "pointer" }}
                    >
                      <div
                        className="category-icon"
                        style={{ color: category.color }}
                      >
                        {category.icon}
                      </div>
                      <div className="category-title">{category.title}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ textAlign: "center", padding: "20px" }}>
                  Tidak ditemukan kategori yang sesuai dengan pencarian Anda.
                </p>
              )}
            </div>
          </div>
        </main>
        <Footer isLoggedIn={true} />
      </div>
    </div>
  );
};

export default DashboardMahasiswa;