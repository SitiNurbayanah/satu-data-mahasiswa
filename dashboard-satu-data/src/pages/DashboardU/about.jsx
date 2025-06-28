import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

const About = () => {
  const systemStats = [
    {
      number: "2024",
      label: "Tahun Diluncurkan",
      icon: "🚀",
      bgColor: "#2c3e50",
    },
    {
      number: "79.420",
      label: "Data Mahasiswa",
      icon: "👨‍🎓",
      bgColor: "#2c3e50",
    },
    {
      number: "100%",
      label: "Data Terintegrasi",
      icon: "📊",
      bgColor: "#2c3e50",
    },
  ];

  const features = [
    {
      title: "Dashboard Interaktif",
      icon: "📊",
      color: "#4a90e2",
      description:
        "Visualisasi data mahasiswa dengan grafik yang mudah dipahami",
    },
    {
      title: "Data Real-time",
      icon: "⚡",
      color: "#e74c3c",
      description: "Informasi terkini yang diperbarui secara otomatis",
    },
    {
      title: "Analisis Mendalam",
      icon: "🔍",
      color: "#27ae60",
      description: "Insight dan analisis data untuk pengambilan keputusan",
    },
    {
      title: "Keamanan Data",
      icon: "🔒",
      color: "#f39c12",
      description: "Sistem keamanan berlapis untuk melindungi data mahasiswa",
    },
    {
      title: "Akses Multi-platform",
      icon: "📱",
      color: "#9b59b6",
      description: "Dapat diakses melalui desktop, tablet, dan smartphone",
    },
    {
      title: "Laporan Otomatis",
      icon: "📋",
      color: "#e67e22",
      description: "Generate laporan komprehensif dengan satu klik",
    },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar isLoggedIn={false} userRole="general" />

      <div className="dashboard-content">
        <Header isLoggedIn={false} />

        <main
          className="dashboard-main"
          style={{
            padding: "0",
            margin: "0",
            marginLeft: "250px",
            backgroundColor: "white",
            color: "black",
          }}
        >
          {/* Hero Section */}
          <section
            className="hero-section"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              padding: "80px 40px",
              color: "white",
              textAlign: "center",
              marginBottom: "0",
            }}
          >
            <div
              className="hero-content"
              style={{ maxWidth: "1200px", margin: "0 auto" }}
            >
              <h1
                className="dashboard-title"
                style={{
                  fontSize: "3.5rem",
                  fontWeight: "bold",
                  marginBottom: "20px",
                  lineHeight: "1.2",
                  color: "white",
                }}
              >
                Tentang Sistem
                <span
                  className="highlight"
                  style={{
                    display: "block",
                    background: "linear-gradient(45deg, #ffd700, #ffed4e)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "4rem",
                  }}
                >
                  Satu Data Mahasiswa
                </span>
              </h1>
              <p
                className="hero-subtitle"
                style={{
                  fontSize: "1.3rem",
                  opacity: "0.9",
                  maxWidth: "600px",
                  margin: "0 auto 40px",
                  lineHeight: "1.6",
                }}
              >
                Platform terpadu untuk pengelolaan dan analisis data mahasiswa
                UIN New York
              </p>
              <div
                className="hero-image"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "40px",
                }}
              >
                <div
                  className="building-placeholder"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "20px",
                    padding: "40px",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <div className="building-icon" style={{ fontSize: "4rem" }}>
                    💻
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section
            className="stats-section"
            style={{
              padding: "60px 40px",
              background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
              marginBottom: "0",
            }}
          >
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
              <div
                className="stats-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "30px",
                }}
              >
                {systemStats.map((stat, index) => (
                  <div
                    key={index}
                    className="stat-card"
                    style={{
                      background: "white",
                      padding: "40px 30px",
                      borderRadius: "15px",
                      textAlign: "center",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                      transition: "transform 0.3s ease",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      className="stat-icon"
                      style={{
                        fontSize: "3rem",
                        marginBottom: "15px",
                      }}
                    >
                      {stat.icon}
                    </div>
                    <div
                      className="stat-number"
                      style={{
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        color: "#2c3e50",
                        marginBottom: "10px",
                      }}
                    >
                      {stat.number}
                    </div>
                    <div
                      className="stat-label"
                      style={{
                        fontSize: "1.1rem",
                        color: "#666",
                        fontWeight: "500",
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* About Content Section */}
          <section
            className="about-content-section"
            style={{
              padding: "80px 40px",
              background: "white",
              marginBottom: "0",
            }}
          >
            <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
              <div className="about-text" style={{ textAlign: "center" }}>
                <h2
                  className="dashboard-title"
                  style={{
                    fontSize: "2.8rem",
                    fontWeight: "bold",
                    color: "#2c3e50",
                    marginBottom: "40px",
                    position: "relative",
                  }}
                >
                  Latar Belakang dan Tujuan
                  <div
                    style={{
                      width: "100px",
                      height: "4px",
                      background: "linear-gradient(45deg, #667eea, #764ba2)",
                      margin: "20px auto",
                      borderRadius: "2px",
                    }}
                  ></div>
                </h2>
                <div
                  style={{
                    textAlign: "left",
                    fontSize: "1.1rem",
                    lineHeight: "1.8",
                    color: "#444",
                  }}
                >
                  <p style={{ marginBottom: "25px" }}>
                    Sistem Satu Data Mahasiswa UIN New York adalah platform
                    digital yang dikembangkan untuk mengintegrasikan seluruh
                    data mahasiswa dalam satu sistem yang terpusat dan mudah
                    diakses. Diluncurkan pada tahun 2024, sistem ini bertujuan
                    untuk meningkatkan efisiensi pengelolaan data akademik dan
                    memberikan insight yang valuable untuk pengambilan keputusan
                    strategis.
                  </p>
                  <p style={{ marginBottom: "0" }}>
                    Dengan menggabungkan teknologi modern dan desain yang
                    user-friendly, platform ini memungkinkan civitas akademika
                    untuk mengakses informasi mahasiswa secara real-time, mulai
                    dari data demografis, prestasi akademik, hingga analisis
                    pola kelulusan. Sistem ini juga dilengkapi dengan fitur
                    visualisasi data yang interaktif untuk memudahkan
                    interpretasi informasi.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section
            className="categories-section"
            style={{
              padding: "80px 40px",
              background: "linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)",
              marginBottom: "0",
            }}
          >
            <div
              className="categories-container"
              style={{ maxWidth: "1200px", margin: "0 auto" }}
            >
              <h2
                className="dashboard-title"
                style={{
                  fontSize: "2.8rem",
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "#2c3e50",
                  marginBottom: "60px",
                  position: "relative",
                }}
              >
                Fitur Utama Sistem
                <div
                  style={{
                    width: "100px",
                    height: "4px",
                    background: "linear-gradient(45deg, #2c3e50, #34495e)",
                    margin: "20px auto",
                    borderRadius: "2px",
                  }}
                ></div>
              </h2>
              <div
                className="facilities-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                  gap: "30px",
                }}
              >
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="facility-card"
                    style={{
                      background: "white",
                      padding: "30px",
                      borderRadius: "15px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "20px",
                    }}
                  >
                    <div
                      className="facility-icon"
                      style={{
                        color: feature.color,
                        fontSize: "2.5rem",
                        flexShrink: 0,
                      }}
                    >
                      {feature.icon}
                    </div>
                    <div className="facility-content">
                      <div
                        className="facility-title"
                        style={{
                          fontSize: "1.3rem",
                          fontWeight: "bold",
                          color: "#2c3e50",
                          marginBottom: "10px",
                        }}
                      >
                        {feature.title}
                      </div>
                      <div
                        className="facility-description"
                        style={{
                          color: "#666",
                          lineHeight: "1.6",
                          fontSize: "1rem",
                        }}
                      >
                        {feature.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section
            className="mission-section"
            style={{
              padding: "80px 40px",
              background: "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)",
              color: "white",
              marginBottom: "0",
            }}
          >
            <div
              className="mission-container"
              style={{ maxWidth: "1200px", margin: "0 auto" }}
            >
              <h2
                className="dashboard-title"
                style={{
                  fontSize: "2.8rem",
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: "60px",
                  position: "relative",
                  color: "white",
                }}
              >
                Manfaat Sistem
                <div
                  style={{
                    width: "100px",
                    height: "4px",
                    background: "rgba(255,255,255,0.8)",
                    margin: "20px auto",
                    borderRadius: "2px",
                  }}
                ></div>
              </h2>
              <div
                className="mission-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "40px",
                }}
              >
                <div
                  className="mission-item"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    padding: "40px 30px",
                    borderRadius: "15px",
                    textAlign: "center",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <div
                    className="mission-icon"
                    style={{
                      fontSize: "3rem",
                      marginBottom: "20px",
                    }}
                  >
                    📈
                  </div>
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      marginBottom: "15px",
                    }}
                  >
                    Efisiensi Operasional
                  </h3>
                  <p
                    style={{
                      opacity: "0.9",
                      lineHeight: "1.6",
                      margin: "0",
                    }}
                  >
                    Mengotomatisasi proses pengelolaan data dan mengurangi
                    pekerjaan manual
                  </p>
                </div>
                <div
                  className="mission-item"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    padding: "40px 30px",
                    borderRadius: "15px",
                    textAlign: "center",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <div
                    className="mission-icon"
                    style={{
                      fontSize: "3rem",
                      marginBottom: "20px",
                    }}
                  >
                    🎯
                  </div>
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      marginBottom: "15px",
                    }}
                  >
                    Pengambilan Keputusan
                  </h3>
                  <p
                    style={{
                      opacity: "0.9",
                      lineHeight: "1.6",
                      margin: "0",
                    }}
                  >
                    Menyediakan data akurat untuk mendukung keputusan strategis
                    institusi
                  </p>
                </div>
                <div
                  className="mission-item"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    padding: "40px 30px",
                    borderRadius: "15px",
                    textAlign: "center",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <div
                    className="mission-icon"
                    style={{
                      fontSize: "3rem",
                      marginBottom: "20px",
                    }}
                  >
                    🔄
                  </div>
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      marginBottom: "15px",
                    }}
                  >
                    Transparansi Data
                  </h3>
                  <p
                    style={{
                      opacity: "0.9",
                      lineHeight: "1.6",
                      margin: "0",
                    }}
                  >
                    Meningkatkan transparansi dan akuntabilitas dalam
                    pengelolaan data mahasiswa
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer isLoggedIn={false} />
      </div>
    </div>
  );
};

export default About;
