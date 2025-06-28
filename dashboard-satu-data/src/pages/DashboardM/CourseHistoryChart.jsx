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
  Tooltip,
  Legend,
} from "recharts";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

const CourseHistoryChart = ({ user, onLogout }) => {
  const [selectedSemester, setSelectedSemester] = useState("Semester 1");
  const [viewType, setViewType] = useState("line"); // 'line' or 'bar'

  // Data riwayat mata kuliah per semester
  const courseHistoryData = {
    "Semester 1": {
      sks: 20,
      courses: [
        {
          code: "IF101",
          name: "Algoritma Pemrograman",
          grade: 3.8,
          sks: 3,
          status: "Lulus",
        },
        {
          code: "IF102",
          name: "Matematika Diskrit",
          grade: 3.5,
          sks: 3,
          status: "Lulus",
        },
        {
          code: "IF103",
          name: "Sistem Digital",
          grade: 3.7,
          sks: 3,
          status: "Lulus",
        },
        {
          code: "IF104",
          name: "Pengantar Teknologi Informasi",
          grade: 3.9,
          sks: 2,
          status: "Lulus",
        },
        {
          code: "UNU101",
          name: "Bahasa Indonesia",
          grade: 3.6,
          sks: 2,
          status: "Lulus",
        },
        {
          code: "UNU102",
          name: "Pancasila",
          grade: 3.4,
          sks: 2,
          status: "Lulus",
        },
        {
          code: "MAT101",
          name: "Kalkulus I",
          grade: 3.2,
          sks: 3,
          status: "Lulus",
        },
        {
          code: "FIS101",
          name: "Fisika Dasar",
          grade: 3.3,
          sks: 2,
          status: "Lulus",
        },
      ],
      ip: 3.55,
      totalSks: 20,
      lulusSks: 20,
    },
    "Semester 2": {
      sks: 22,
      courses: [
        {
          code: "IF201",
          name: "Struktur Data",
          grade: 3.6,
          sks: 3,
          status: "Lulus",
        },
        {
          code: "IF202",
          name: "Pemrograman Berorientasi Objek",
          grade: 3.8,
          sks: 3,
          status: "Lulus",
        },
        {
          code: "IF203",
          name: "Basis Data",
          grade: 3.7,
          sks: 3,
          status: "Lulus",
        },
        {
          code: "IF204",
          name: "Organisasi Komputer",
          grade: 3.4,
          sks: 3,
          status: "Lulus",
        },
        {
          code: "MAT201",
          name: "Kalkulus II",
          grade: 3.2,
          sks: 3,
          status: "Lulus",
        },
        {
          code: "MAT202",
          name: "Statistika",
          grade: 3.5,
          sks: 3,
          status: "Lulus",
        },
        {
          code: "UNU201",
          name: "Kewarganegaraan",
          grade: 3.8,
          sks: 2,
          status: "Lulus",
        },
        {
          code: "ENG201",
          name: "Bahasa Inggris",
          grade: 3.6,
          sks: 2,
          status: "Lulus",
        },
      ],
      ip: 3.58,
      totalSks: 22,
      lulusSks: 22,
    },
    "Semester 3": {
      sks: 21,
      courses: [
        {
          code: "IF301",
          name: "Analisis Algoritma",
          grade: 3.9,
          sks: 3,
          status: "Lulus",
        },
        {
          code: "IF302",
          name: "Jaringan Komputer",
          grade: 3.7,
          sks: 3,
          status: "Lulus",
        },
        {
          code: "IF303",
          name: "Sistem Operasi",
          grade: 3.6,
          sks: 3,
          status: "Lulus",
        },
        {
          code: "IF304",
          name: "Rekayasa Perangkat Lunak",
          grade: 3.8,
          sks: 3,
          status: "Lulus",
        },
        {
          code: "IF305",
          name: "Pemrograman Web",
          grade: 3.9,
          sks: 3,
          status: "Lulus",
        },
        {
          code: "MAT301",
          name: "Aljabar Linear",
          grade: 3.3,
          sks: 3,
          status: "Lulus",
        },
        {
          code: "UNU301",
          name: "Agama",
          grade: 3.7,
          sks: 3,
          status: "Lulus",
        },
      ],
      ip: 3.7,
      totalSks: 21,
      lulusSks: 21,
    },
  };

  const currentData = courseHistoryData[selectedSemester];

  // Data untuk chart (hanya nilai mata kuliah)
  const chartData = currentData.courses.map((course, index) => ({
    name: course.code,
    fullName: course.name,
    grade: course.grade,
    sks: course.sks,
    index: index + 1,
  }));

  // Custom tooltip untuk chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          style={{
            backgroundColor: "#1a1a1a",
            border: "1px solid #444",
            borderRadius: "0.5rem",
            padding: "1rem",
            color: "white",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
          }}
        >
          <p
            style={{
              fontWeight: "bold",
              marginBottom: "0.5rem",
              color: "#3b82f6",
              margin: "0 0 0.5rem 0",
            }}
          >
            {data.fullName}
          </p>
          <p style={{ margin: "0.25rem 0", fontSize: "0.9rem" }}>
            Kode: {data.name}
          </p>
          <p style={{ margin: "0.25rem 0", fontSize: "0.9rem" }}>
            Nilai: {data.grade}
          </p>
          <p style={{ margin: "0.25rem 0", fontSize: "0.9rem" }}>
            SKS: {data.sks}
          </p>
        </div>
      );
    }
    return null;
  };

  // Fungsi untuk mendapatkan warna berdasarkan nilai
  const getGradeColor = (grade) => {
    if (grade >= 3.7) return "#22c55e"; // Hijau untuk A
    if (grade >= 3.3) return "#3b82f6"; // Biru untuk B
    if (grade >= 3.0) return "#eab308"; // Kuning untuk C
    return "#ef4444"; // Merah untuk D
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
            Riwayat Mata Kuliah
          </h1>

          {/* Control Section */}
          <div
            style={{
              backgroundColor: "#1a1a1a",
              borderRadius: "0.75rem",
              padding: "1.5rem",
              marginBottom: "2rem",
              border: "1px solid #333",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <label style={{ color: "#ccc" }}>Semester:</label>
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #444",
                  backgroundColor: "#2a2a2a",
                  color: "white",
                  fontSize: "0.9rem",
                }}
              >
                <option value="Semester 1">Semester 1</option>
                <option value="Semester 2">Semester 2</option>
                <option value="Semester 3">Semester 3</option>
              </select>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <label style={{ color: "#ccc" }}>Tampilan:</label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  onClick={() => setViewType("line")}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #444",
                    backgroundColor:
                      viewType === "line" ? "#3b82f6" : "#2a2a2a",
                    color: "white",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                >
                  Line Chart
                </button>
                <button
                  onClick={() => setViewType("bar")}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #444",
                    backgroundColor: viewType === "bar" ? "#3b82f6" : "#2a2a2a",
                    color: "white",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                >
                  Bar Chart
                </button>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2rem",
                fontSize: "0.9rem",
                color: "#ccc",
              }}
            >
              <span>
                IP Semester:{" "}
                <strong style={{ color: "#22c55e" }}>{currentData.ip}</strong>
              </span>
              <span>
                Total SKS:{" "}
                <strong style={{ color: "#3b82f6" }}>
                  {currentData.totalSks}
                </strong>
              </span>
            </div>
          </div>

          {/* Chart Section */}
          <div
            style={{
              backgroundColor: "#1a1a1a",
              borderRadius: "0.75rem",
              padding: "2rem",
              marginBottom: "2rem",
              border: "1px solid #333",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                marginBottom: "2rem",
                textAlign: "center",
                color: "white",
              }}
            >
              Grafik Nilai Mata Kuliah - {selectedSemester}
            </h2>

            <ResponsiveContainer width="100%" height={400}>
              {viewType === "line" ? (
                <LineChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "white", fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis
                    domain={[0, 4]}
                    tick={{ fill: "white", fontSize: 12 }}
                    label={{
                      value: "Nilai",
                      angle: -90,
                      position: "insideLeft",
                      style: { textAnchor: "middle", fill: "white" },
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="grade"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", r: 6 }}
                    activeDot={{ r: 8, fill: "#22c55e" }}
                  />
                </LineChart>
              ) : (
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "white", fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis
                    domain={[0, 4]}
                    tick={{ fill: "white", fontSize: 12 }}
                    label={{
                      value: "Nilai",
                      angle: -90,
                      position: "insideLeft",
                      style: { textAnchor: "middle", fill: "white" },
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="grade" radius={[4, 4, 0, 0]} fill="#3b82f6" />
                </BarChart>
              )}
            </ResponsiveContainer>

            {/* Grade Legend */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "2rem",
                marginTop: "1rem",
                fontSize: "0.9rem",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: "#22c55e",
                    borderRadius: "50%",
                  }}
                ></div>
                <span>A (3.7-4.0)</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: "#3b82f6",
                    borderRadius: "50%",
                  }}
                ></div>
                <span>B (3.3-3.69)</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: "#eab308",
                    borderRadius: "50%",
                  }}
                ></div>
                <span>C (3.0-3.29)</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: "#ef4444",
                    borderRadius: "50%",
                  }}
                ></div>
                <span>D (&lt; 3.0)</span>
              </div>
            </div>
          </div>

          {/* Course Details Table */}
          <div
            style={{
              backgroundColor: "#1a1a1a",
              borderRadius: "0.75rem",
              padding: "2rem",
              border: "1px solid #333",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                marginBottom: "1.5rem",
                textAlign: "center",
                color: "white",
              }}
            >
              Detail Mata Kuliah - {selectedSemester}
            </h2>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.9rem",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "2px solid #444" }}>
                    <th
                      style={{
                        padding: "1rem",
                        textAlign: "left",
                        color: "#ccc",
                      }}
                    >
                      No
                    </th>
                    <th
                      style={{
                        padding: "1rem",
                        textAlign: "left",
                        color: "#ccc",
                      }}
                    >
                      Kode
                    </th>
                    <th
                      style={{
                        padding: "1rem",
                        textAlign: "left",
                        color: "#ccc",
                      }}
                    >
                      Nama Mata Kuliah
                    </th>
                    <th
                      style={{
                        padding: "1rem",
                        textAlign: "center",
                        color: "#ccc",
                      }}
                    >
                      SKS
                    </th>
                    <th
                      style={{
                        padding: "1rem",
                        textAlign: "center",
                        color: "#ccc",
                      }}
                    >
                      Nilai
                    </th>
                    <th
                      style={{
                        padding: "1rem",
                        textAlign: "center",
                        color: "#ccc",
                      }}
                    >
                      Grade
                    </th>
                    <th
                      style={{
                        padding: "1rem",
                        textAlign: "center",
                        color: "#ccc",
                      }}
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.courses.map((course, index) => {
                    let grade = "";
                    if (course.grade >= 3.7) grade = "A";
                    else if (course.grade >= 3.3) grade = "B";
                    else if (course.grade >= 3.0) grade = "C";
                    else grade = "D";

                    return (
                      <tr
                        key={index}
                        style={{
                          borderBottom: "1px solid #333",
                          transition: "background-color 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#2a2a2a";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        <td style={{ padding: "1rem", color: "white" }}>
                          {index + 1}
                        </td>
                        <td
                          style={{
                            padding: "1rem",
                            color: "#3b82f6",
                            fontWeight: "bold",
                          }}
                        >
                          {course.code}
                        </td>
                        <td style={{ padding: "1rem", color: "white" }}>
                          {course.name}
                        </td>
                        <td
                          style={{
                            padding: "1rem",
                            textAlign: "center",
                            color: "white",
                          }}
                        >
                          {course.sks}
                        </td>
                        <td
                          style={{
                            padding: "1rem",
                            textAlign: "center",
                            color: getGradeColor(course.grade),
                            fontWeight: "bold",
                          }}
                        >
                          {course.grade}
                        </td>
                        <td
                          style={{
                            padding: "1rem",
                            textAlign: "center",
                            color: getGradeColor(course.grade),
                            fontWeight: "bold",
                          }}
                        >
                          {grade}
                        </td>
                        <td
                          style={{
                            padding: "1rem",
                            textAlign: "center",
                            color:
                              course.status === "Lulus" ? "#22c55e" : "#ef4444",
                            fontWeight: "bold",
                          }}
                        >
                          {course.status}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        <Footer isLoggedIn={true} />
      </div>
    </div>
  );
};

export default CourseHistoryChart;
