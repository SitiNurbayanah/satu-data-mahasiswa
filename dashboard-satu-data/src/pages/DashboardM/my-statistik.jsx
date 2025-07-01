import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

const MyStatistik = ({ user, onLogout, isDarkMode, toggleDarkMode }) => {
  const [selectedSemester, setSelectedSemester] = useState("Semester 4");
  const navigate = useNavigate();

  // Dummy data for semester 4
  const semesterData = {
    "Semester 1": {
      ip: [
        { semester: "1", ip: 3.5 },
        { semester: "2", ip: 3.6 },
        { semester: "3", ip: 3.7 },
        { semester: "4", ip: 3.7 }
      ],
      courses: [
        { week: "MK1", grade: 3.7 },
        { week: "MK2", grade: 3.8 },
        { week: "MK3", grade: 3.6 },
        { week: "MK4", grade: 3.7 }
      ],
      sks: 24,
      lulus: 6,
      tidakLulus: 0
    },
    "Semester 2": {
      ip: [
        { semester: "1", ip: 3.5 },
        { semester: "2", ip: 3.6 },
        { semester: "3", ip: 3.7 },
        { semester: "4", ip: 3.7 }
      ],
      courses: [
        { week: "MK1", grade: 3.6 },
        { week: "MK2", grade: 3.7 },
        { week: "MK3", grade: 3.5 },
        { week: "MK4", grade: 3.6 }
      ],
      sks: 24,
      lulus: 6,
      tidakLulus: 0
    },
    "Semester 3": {
      ip: [
        { semester: "1", ip: 3.5 },
        { semester: "2", ip: 3.6 },
        { semester: "3", ip: 3.7 },
        { semester: "4", ip: 3.7 }
      ],
      courses: [
        { week: "MK1", grade: 3.7 },
        { week: "MK2", grade: 3.8 },
        { week: "MK3", grade: 3.6 },
        { week: "MK4", grade: 3.7 }
      ],
      sks: 24,
      lulus: 6,
      tidakLulus: 0
    },
    "Semester 4": {
      ip: [
        { semester: "1", ip: 3.5 },
        { semester: "2", ip: 3.6 },
        { semester: "3", ip: 3.7 },
        { semester: "4", ip: 3.7 }
      ],
      courses: [
        { week: "MK1", grade: 3.8 },
        { week: "MK2", grade: 3.7 },
        { week: "MK3", grade: 3.9 },
        { week: "MK4", grade: 3.7 }
      ],
      sks: 24,
      lulus: 6,
      tidakLulus: 0
    }
  };

  const currentData = semesterData[selectedSemester];

  const handleViewMore = () => {
    navigate("/kinerja-akademik");
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
          <h1 className="dashboard-title">Dashboard Status Mahasiswa/i</h1>

          <div className="charts-grid">
            {/* IP Chart */}
            <div className="chart-card">
              <div className="chart-header">
                <div className="legend-container">
                  <span className="legend-item">
                    <span className="legend-dot legend-dot-green"></span>
                    IP Kumulatif: 3.7
                  </span>
                  <span className="legend-item legend-item-gray">
                    <span className="legend-dot legend-dot-gray"></span>
                    Kehadiran: 98%
                  </span>
                </div>
                <div className="chart-stats">
                  <div>SKS: {currentData.sks}</div>
                  <div>Lulus: {currentData.lulus} | Tidak Lulus: {currentData.tidakLulus}</div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={currentData.ip}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="semester" tick={{ fill: "white", fontSize: 12 }} />
                  <YAxis domain={[0, 4]} tick={{ fill: "white", fontSize: 12 }} />
                  <Bar dataKey="ip" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Risk */}
            <div className="chart-card">
              <h2 className="risk-title">Kategori Risiko Akademik</h2>
              <div className="risk-bars">
                {["Semester 1", "Semester 2", "Semester 3", "Semester 4"].map((smt, i) => (
                  <div key={i} className="risk-bar-item">
                    <span className="risk-bar-label">{smt}</span>
                    <div className="risk-bar-container">
                      <div
                        className="risk-bar-fill"
                        style={{ width: `${100 - i * 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={handleViewMore} className="view-more-btn">
                Lihat Selengkapnya
              </button>
            </div>
          </div>

          {/* Course Chart */}
          <div className="chart-card">
            <div className="course-header">
              <h3 className="sks-title">{currentData.sks} SKS</h3>
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="semester-select"
              >
                <option>Semester 1</option>
                <option>Semester 2</option>
                <option>Semester 3</option>
                <option>Semester 4</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={currentData.courses}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="week" tick={{ fill: "white", fontSize: 11 }} />
                <YAxis domain={[0, 4]} tick={{ fill: "white", fontSize: 12 }} />
                <Line
                  type="monotone"
                  dataKey="grade"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: "#3B82F6", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="chart-legend">
              <div className="chart-legend-dot"></div>
              <span>Capaian Nilai</span>
            </div>
          </div>
        </main>

        <Footer isLoggedIn={true} />
      </div>
    </div>
  );
};

export default MyStatistik;