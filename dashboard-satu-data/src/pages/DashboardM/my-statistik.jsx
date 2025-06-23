import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

const MyStatistik = ({ user, onLogout }) => {
  const [selectedSemester, setSelectedSemester] = useState("Semester 1");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Data untuk setiap semester
  const semesterData = {
    "Semester 1": {
      ip: [
        { semester: "2022-1", ip: 3.2 },
        { semester: "2022-2", ip: 3.4 },
        { semester: "2023-1", ip: 3.6 },
        { semester: "2023-2", ip: 3.7 },
        { semester: "2024-1", ip: 3.8 },
      ],
      courses: [
        { week: "Mata Kuliah 1", grade: 3.5 },
        { week: "Mata Kuliah 2", grade: 3.7 },
        { week: "Mata Kuliah 3", grade: 3.8 },
        { week: "Mata Kuliah 4", grade: 3.9 },
        { week: "Mata Kuliah 5", grade: 3.6 },
        { week: "Mata Kuliah 6", grade: 3.4 },
      ],
      sks: 20,
      lulus: 249,
      tidakLulus: 1,
    },
    "Semester 2": {
      ip: [
        { semester: "2022-1", ip: 3.0 },
        { semester: "2022-2", ip: 3.3 },
        { semester: "2023-1", ip: 3.5 },
        { semester: "2023-2", ip: 3.6 },
        { semester: "2024-1", ip: 3.7 },
      ],
      courses: [
        { week: "Mata Kuliah 1", grade: 3.3 },
        { week: "Mata Kuliah 2", grade: 3.5 },
        { week: "Mata Kuliah 3", grade: 3.6 },
        { week: "Mata Kuliah 4", grade: 3.8 },
        { week: "Mata Kuliah 5", grade: 3.4 },
        { week: "Mata Kuliah 6", grade: 3.2 },
      ],
      sks: 18,
      lulus: 185,
      tidakLulus: 3,
    },
    "Semester 3": {
      ip: [
        { semester: "2022-1", ip: 2.8 },
        { semester: "2022-2", ip: 3.1 },
        { semester: "2023-1", ip: 3.4 },
        { semester: "2023-2", ip: 3.5 },
        { semester: "2024-1", ip: 3.6 },
      ],
      courses: [
        { week: "Mata Kuliah 1", grade: 3.1 },
        { week: "Mata Kuliah 2", grade: 3.3 },
        { week: "Mata Kuliah 3", grade: 3.4 },
        { week: "Mata Kuliah 4", grade: 3.6 },
        { week: "Mata Kuliah 5", grade: 3.2 },
        { week: "Mata Kuliah 6", grade: 3.0 },
      ],
      sks: 22,
      lulus: 156,
      tidakLulus: 5,
    },
  };

  const riskData = [
    { name: "Progress Optimal", value: 75, color: "#22c55e" },
    { name: "Risiko Rendah", value: 15, color: "#eab308" },
    { name: "Risiko Tinggi", value: 10, color: "#ef4444" },
  ];

  const currentData = semesterData[selectedSemester];

  const handleViewMore = () => {
    alert("Navigating to Kinerja Akademik");
  };

  return (
    <div className="dashboard-layout">
      <Sidebar isLoggedIn={true} userRole="mahasiswa" onLogout={onLogout} />

      <div className="dashboard-content">
        <Header isLoggedIn={true} user={user} onLogout={onLogout} />

        <main className="dashboard-main">
          <h1 className="dashboard-title">Dashboard Status Mahasiswa/i</h1>

          {/* Chart & Risk Section */}
          <div className="charts-grid">
            {/* IP Chart */}
            <div className="chart-card">
              <div className="chart-header">
                <div className="legend-container">
                  <span className="legend-item">
                    <span className="legend-dot legend-dot-green"></span>
                    IP Kumulatif
                  </span>
                  <span className="legend-item legend-item-gray">
                    <span className="legend-dot legend-dot-gray"></span>
                    IP Semester
                  </span>
                </div>
                <div className="chart-stats">
                  <div>SKS: 1000</div>
                  <div>
                    Lulus: {currentData.lulus} | Tidak Lulus:{" "}
                    {currentData.tidakLulus}
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={currentData.ip}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="semester"
                    tick={{ fill: "white", fontSize: 12 }}
                  />
                  <YAxis
                    domain={[0, 4]}
                    tick={{ fill: "white", fontSize: 12 }}
                  />
                  <Bar dataKey="ip" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Risk Category */}
            <div className="chart-card">
              <h2 className="risk-title">Kategori Risiko Akademik</h2>
              <div className="risk-bars">
                {["Semester 1", "Semester 2", "Semester 3"].map((smt, i) => (
                  <div key={i} className="risk-bar-item">
                    <span className="risk-bar-label">{smt}</span>
                    <div className="risk-bar-container">
                      <div
                        className="risk-bar-fill"
                        style={{ width: `${80 - i * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="pie-chart-container">
                <div className="pie-chart-wrapper">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskData}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={60}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {riskData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="pie-chart-center">
                    <div>
                      <div>Progress</div>
                      <div>Optimal</div>
                    </div>
                  </div>
                </div>
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
