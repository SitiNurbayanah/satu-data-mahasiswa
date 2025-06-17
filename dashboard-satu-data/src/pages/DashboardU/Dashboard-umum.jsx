import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const DashboardUmum = () => {
    const navigate = useNavigate();
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

    const categories = [
        {
            title: "Grafik Mahasiswa",
            icon: "📊",
            color: "#4a90e2",
            onClick: () => navigate("/population-chart")
        },
        {
            title: "Grafik Kelulusan",
            icon: "🎓",
            color: "#e74c3c",
            onClick: () => navigate("/graduation-chart")
        },
        {
            title: "Persebaran Bidang Kerja",
            icon: "💼",
            color: "#27ae60",
            onClick: () => navigate("/job-distribution")
        },
    ];

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <div className="dashboard-content">
                <Header isLoggedIn={false} />

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
                            <h2 className="categories-title">Kategori</h2>
                            <div className="categories-grid">
                                {categories.map((category, index) => (
                                    <div
                                        key={index}
                                        className="category-card"
                                        onClick={category.onClick || (() => { })} // Tambahkan onClick di sini
                                        style={{ cursor: category.onClick ? 'pointer' : 'default' }} // Ubah kursor jika bisa diklik
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
                        </div>
                    </div>
                </main>
                <Footer isLoggedIn={true} />
            </div>
        </div>
    );
};

export default DashboardUmum;