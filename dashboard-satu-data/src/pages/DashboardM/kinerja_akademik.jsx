import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

const KinerjaAkademik = ({ user, onLogout }) => {
  // Data semester dengan progress seperti di gambar
  const semesterProgress = [
    { semester: "Semester 1", progress: 100 },
    { semester: "Semester 2", progress: 100 },
    { semester: "Semester 3", progress: 50 },
    { semester: "Semester 4", progress: 0 },
    { semester: "Semester 5", progress: 0 },
    { semester: "Semester 6", progress: 0 },
    { semester: "Semester 7", progress: 0 },
    { semester: "Semester 8", progress: 0 },
  ];

  // Komponen Donut Chart
  const DonutChart = () => {
    const completedSemesters = semesterProgress.filter(
      (s) => s.progress === 100
    ).length;
    const totalSemesters = semesterProgress.length;
    const percentage = (completedSemesters / totalSemesters) * 100;

    return (
      <div className="donut-chart-container">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="donut-chart"
        >
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#333"
            strokeWidth="20"
          />
          {/* Progress arc */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="20"
            strokeDasharray={`${(percentage / 100) * 502.65} 502.65`}
            strokeDashoffset="0"
            transform="rotate(-90 100 100)"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00ff88" />
              <stop offset="50%" stopColor="#00cc88" />
              <stop offset="100%" stopColor="#4dd0e1" />
            </linearGradient>
          </defs>
        </svg>
        <div className="donut-center">
          <div className="donut-title">Progress</div>
          <div className="donut-subtitle">Optimal</div>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-layout">
      <Sidebar isLoggedIn={true} userRole="mahasiswa" onLogout={onLogout} />

      <div className="dashboard-content">
        <Header isLoggedIn={true} user={user} onLogout={onLogout} />

        <main className="dashboard-main">
          <h1
            style={{
              textAlign: "center",
              fontSize: "2rem",
              marginBottom: "2rem",
              fontWeight: "bold",
            }}
          >
            Dashboard Status Mahasiswa/i
          </h1>

          {/* Academic Risk Category Section */}
          <div
            style={{
              backgroundColor: "#1a1a1a",
              borderRadius: "1rem",
              padding: "2rem",
              border: "2px solid #0ea5e9",
              marginBottom: "2rem",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                fontSize: "1.5rem",
                marginBottom: "2rem",
                color: "white",
              }}
            >
              Kategori Risiko Akademik
            </h2>

            <div style={{ display: "flex", gap: "3rem", alignItems: "center" }}>
              {/* Progress bars */}
              <div style={{ flex: 1 }}>
                {semesterProgress.map((semester, index) => (
                  <div key={index} style={{ marginBottom: "1rem" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.5rem",
                        fontSize: "0.9rem",
                      }}
                    >
                      <span>{semester.semester}</span>
                      <span>{semester.progress}%</span>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "8px",
                        backgroundColor: "#333",
                        borderRadius: "4px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${semester.progress}%`,
                          height: "100%",
                          background:
                            semester.progress > 0
                              ? "linear-gradient(90deg, #00ff88, #4dd0e1)"
                              : "transparent",
                          transition: "width 0.3s ease",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Donut Chart */}
              <div style={{ position: "relative" }}>
                <DonutChart />
              </div>
            </div>
          </div>
        </main>

        <Footer isLoggedIn={true} />
      </div>

      <style jsx>{`
        .donut-chart-container {
          position: relative;
          display: inline-block;
        }

        .donut-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }

        .donut-title {
          font-size: 1.2rem;
          font-weight: bold;
          color: white;
          margin-bottom: 0.25rem;
        }

        .donut-subtitle {
          font-size: 1rem;
          color: #ccc;
        }

        .donut-chart {
          filter: drop-shadow(0 0 10px rgba(0, 255, 136, 0.3));
        }
      `}</style>
    </div>
  );
};

export default KinerjaAkademik;
