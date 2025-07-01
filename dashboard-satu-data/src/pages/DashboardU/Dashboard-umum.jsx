import React, { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const DashboardUmum = ({ isDarkMode, toggleDarkMode }) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [datasetRequest, setDatasetRequest] = useState("");
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const statsData = [
        {
            number: "79.420",
            label: "Mahasiswa/i Aktif",
            icon: "👨‍🎓",
        },
        {
            number: "5.000",
            label: "Dosen Aktif",
            icon: "👩‍🏫",
        },
        {
            number: "2.000",
            label: "Mahasiswa/i lulus pertahun",
            icon: "🏅",
        },
    ];

    const allCategories = [
        {
            title: "Grafik Mahasiswa",
            icon: "📊",
            color: "#4a90e2",
            onClick: () => navigate("/population-chart"),
            keywords: ["mahasiswa", "grafik", "data mahasiswa", "student"]
        },
        {
            title: "Grafik Kelulusan",
            icon: "🎓",
            color: "#e74c3c",
            onClick: () => navigate("/graduation-chart"),
            keywords: ["kelulusan", "lulus", "graduation", "wisuda"]
        },
        {
            title: "Persebaran Bidang Kerja",
            icon: "💼",
            color: "#27ae60",
            onClick: () => navigate("/job-distribution"),
            keywords: ["kerja", "pekerjaan", "job", "karir", "bidang kerja"]
        },
    ];

    const [categories, setCategories] = useState(allCategories);

    const handleSearch = (e) => {
        e.preventDefault();
        const query = searchQuery.toLowerCase().trim();
        
        if (query === "") {
            setCategories(allCategories);
            return;
        }

        const filtered = allCategories.filter(category => 
            category.keywords.some(keyword => 
                keyword.includes(query) || 
                category.title.toLowerCase().includes(query)
            )
        );
        
        setCategories(filtered);
    };

    const handleDatasetRequest = (e) => {
        e.preventDefault();
        console.log("Dataset requested:", datasetRequest, "Email:", email);
        setIsSubmitted(true);
        setDatasetRequest("");
        setEmail("");
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        if (e.target.value === "") {
            setCategories(allCategories);
        }
    };

    return (
        <div className={`dashboard-layout ${isDarkMode ? "dark-mode" : ""}`}>
            <Sidebar isLoggedIn={false} userRole="general" />

            <div className="dashboard-content">
                <Header
                    isLoggedIn={false}
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                />

                <main className="dashboard-main">
                    <div
                        className="hero-section"
                        style={{
                            background: isDarkMode
                                ? "linear-gradient(135deg, #111 0%, #333 100%)"
                                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "white",
                            padding: "80px 40px",
                            textAlign: "center",
                            marginBottom: "0",
                        }}
                    >
                        <div className="hero-content">
                            <h1 className="hero-title">
                                Selamat Datang di Satu Data Mahasiswa UIN
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
                                    New York
                                </span>
                            </h1>
                            <p className="hero-subtitle" style={{ opacity: "0.9" }}>
                                Cari data-data menarik seputar UIN New York disini!
                            </p>
                            
                            <form onSubmit={handleSearch} style={{ marginTop: "30px", maxWidth: "600px", margin: "30px auto 0" }}>
                                <div style={{
                                    display: "flex",
                                    borderRadius: "50px",
                                    overflow: "hidden",
                                    boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
                                }}>
                                    <input
                                        type="text"
                                        placeholder="Cari data mahasiswa, dosen, atau lainnya..."
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        style={{
                                            flex: 1,
                                            padding: "15px 20px",
                                            border: "none",
                                            fontSize: "1rem",
                                            outline: "none"
                                        }}
                                    />
                                    <button
                                        type="submit"
                                        style={{
                                            padding: "0 25px",
                                            background: "linear-gradient(45deg, #ffd700, #ffed4e)",
                                            color: "#333",
                                            border: "none",
                                            fontWeight: "bold",
                                            cursor: "pointer",
                                            fontSize: "1rem"
                                        }}
                                    >
                                        Cari
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="stats-section">
                        <div className="stats-grid">
                            {statsData.map((stat, index) => (
                                <div
                                    key={index}
                                    className="stat-card"
                                    style={{
                                        backgroundColor: isDarkMode ? "#2c3e50" : "white",
                                        color: isDarkMode ? "#eee" : "#2c3e50",
                                        padding: "30px",
                                        borderRadius: "15px",
                                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                                        textAlign: "center",
                                    }}
                                >
                                    <div className="stat-number" style={{ fontSize: "2rem", fontWeight: "bold" }}>
                                        {stat.number}
                                    </div>
                                    <div className="stat-label" style={{ fontSize: "1.1rem", marginTop: "10px" }}>
                                        {stat.label}
                                    </div>
                                    <div className="stat-icon" style={{ fontSize: "2rem", marginTop: "10px" }}>
                                        {stat.icon}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="categories-section">
                        <div className="categories-container">
                            <h2 className="categories-title" style={{ color: isDarkMode ? "#eee" : "#2c3e50" }}>
                                {searchQuery ? `Hasil pencarian untuk "${searchQuery}"` : "Kategori"}
                            </h2>
                            {categories.length > 0 ? (
                                <div className="categories-grid">
                                    {categories.map((category, index) => (
                                        <div
                                            key={index}
                                            className="category-card"
                                            onClick={category.onClick || (() => {})}
                                            style={{
                                                cursor: category.onClick ? 'pointer' : 'default',
                                                backgroundColor: isDarkMode ? "#2c3e50" : "white",
                                                color: isDarkMode ? "#eee" : "#2c3e50",
                                                padding: "30px",
                                                borderRadius: "15px",
                                                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "20px",
                                            }}
                                        >
                                            <div
                                                className="category-icon"
                                                style={{
                                                    color: category.color,
                                                    fontSize: "2rem",
                                                    flexShrink: 0,
                                                }}
                                            >
                                                {category.icon}
                                            </div>
                                            <div className="category-title" style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                                                {category.title}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p style={{ 
                                    textAlign: "center", 
                                    color: isDarkMode ? "#eee" : "#2c3e50",
                                    padding: "20px"
                                }}>
                                    Tidak ditemukan kategori yang sesuai dengan pencarian Anda.
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="dataset-section" style={{
                        marginTop: "50px",
                        padding: "40px",
                        backgroundColor: isDarkMode ? "#2c3e50" : "#f8f9fa",
                        borderRadius: "15px",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                    }}>
                        <h2 style={{
                            color: isDarkMode ? "#eee" : "#2c3e50",
                            textAlign: "center",
                            marginBottom: "30px"
                        }}>
                            Request Dataset
                        </h2>
                        
                        {isSubmitted ? (
                            <div style={{
                                textAlign: "center",
                                padding: "20px",
                                backgroundColor: isDarkMode ? "#27ae60" : "#2ecc71",
                                color: "white",
                                borderRadius: "10px",
                                marginBottom: "20px"
                            }}>
                                Terima kasih! Permintaan dataset Anda telah kami terima. Kami akan menghubungi Anda melalui email.
                            </div>
                        ) : (
                            <form onSubmit={handleDatasetRequest}>
                                <div style={{ marginBottom: "20px" }}>
                                    <label style={{
                                        display: "block",
                                        marginBottom: "8px",
                                        color: isDarkMode ? "#eee" : "#2c3e50",
                                        fontWeight: "500"
                                    }}>
                                        Dataset yang Anda butuhkan
                                    </label>
                                    <textarea
                                        value={datasetRequest}
                                        onChange={(e) => setDatasetRequest(e.target.value)}
                                        placeholder="Jelaskan dataset apa yang Anda butuhkan..."
                                        required
                                        style={{
                                            width: "100%",
                                            padding: "15px",
                                            borderRadius: "10px",
                                            border: "1px solid #ddd",
                                            minHeight: "120px",
                                            backgroundColor: isDarkMode ? "#34495e" : "white",
                                            color: isDarkMode ? "#eee" : "#333",
                                            fontSize: "1rem"
                                        }}
                                    />
                                </div>
                                
                                <div style={{ marginBottom: "20px" }}>
                                    <label style={{
                                        display: "block",
                                        marginBottom: "8px",
                                        color: isDarkMode ? "#eee" : "#2c3e50",
                                        fontWeight: "500"
                                    }}>
                                        Email Anda
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="email@contoh.com"
                                        required
                                        style={{
                                            width: "100%",
                                            padding: "15px",
                                            borderRadius: "10px",
                                            border: "1px solid #ddd",
                                            backgroundColor: isDarkMode ? "#34495e" : "white",
                                            color: isDarkMode ? "#eee" : "#333",
                                            fontSize: "1rem"
                                        }}
                                    />
                                </div>
                                
                                <button
                                    type="submit"
                                    style={{
                                        width: "100%",
                                        padding: "15px",
                                        background: "linear-gradient(45deg, #ffd700, #ffed4e)",
                                        color: "#333",
                                        border: "none",
                                        borderRadius: "10px",
                                        fontWeight: "bold",
                                        fontSize: "1rem",
                                        cursor: "pointer",
                                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
                                    }}
                                >
                                    Request Dataset
                                </button>
                            </form>
                        )}
                    </div>
                </main>
                <Footer isLoggedIn={true} />
            </div>
        </div>
    );
};

export default DashboardUmum;