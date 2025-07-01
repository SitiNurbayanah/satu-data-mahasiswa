// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// eslint-disable-next-line no-unused-vars
const PembayaranUKT = ({ onLogout, isDarkMode, toggleDarkMode }) => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedFakultas, setSelectedFakultas] = useState("Semua");
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState({
    fakultasOptions: [],
    chartDataByFakultas: {},
    paymentPercentageData: [],
    correlationData: [],
  });

useEffect(() => {
  fetch("http://localhost:5000/view/statistik-ukt")
    .then((res) => res.json())
    .then((json) => {
      console.log("API Response:", json); // ✅ ini udah kamu punya
      console.log("Chart Data By Fakultas:", json.data.chartDataByFakultas); // ➜ cek ini
      setData({
        fakultasOptions: json.data.fakultasOptions || [],
        chartDataByFakultas: json.data.chartDataByFakultas || {},
        paymentPercentageData: json.data.paymentPercentageData || [],
        correlationData: json.data.correlationData || [],
      });
    })
    .catch((err) => console.error("Error fetching data:", err));
}, []);

  const fakultasOptions = [
    "Semua",
    "Fakultas Tarbiyah dan Keguruan",
    "Fakultas Psikologi",
    "Fakultas Sains dan Teknologi",
    "Fakultas Ushuluddin",
    "Fakultas Syariah dan Hukum",
    "Fakultas Dakwah dan Komunikasi",
    "Fakultas Adab dan Humaniora",
    "Fakultas Ilmu Sosial dan Ilmu Politik",
    "Fakultas Ekonomi dan Bisnis Islam",
  ];

  // eslint-disable-next-line no-unused-vars
  const jurusanByFakultas = {
    Semua: ["Semua"],
    "Fakultas Tarbiyah dan Keguruan": [
      "Semua",
      "Manajemen Pendidikan Islam",
      "Pendidikan Agama Islam",
      "Pendidikan Bahasa Arab",
      "Pendidikan Bahasa Inggris",
      "Pendidikan Matematika",
      "Pendidikan Biologi",
      "Pendidikan Kimia",
      "Pendidikan Fisika",
      "Pendidikan Guru Madrasah Ibtidaiyah",
      "Pendidikan Islam Anak Usia Dini",
    ],
    "Fakultas Psikologi": ["Semua", "Psikologi"],
    "Fakultas Sains dan Teknologi": [
      "Semua",
      "Matematika",
      "Biologi",
      "Fisika",
      "Kimia",
      "Teknik Informatika",
      "Agroteknologi",
      "Teknik Elektro",
    ],
    "Fakultas Ushuluddin": [
      "Semua",
      "Ilmu al-Qur'an dan Tafsir/Tafsir Hadits",
      "Aqidah dan Filsafat Islam",
      "Studi Agama-Agama",
      "Tasawuf Psikoterapi",
      "Ilmu Hadits",
    ],
    "Fakultas Syariah dan Hukum": [
      "Semua",
      "Hukum Keluarga (Ahwal Al-Syakhsiyyah)",
      "Hukum Ekonomi Syariah (Muamalah)",
      "Hukum Tata Negara (Siyasah)",
      "Perbandingan Madzhab",
      "Ilmu Hukum",
      "Hukum Pidana Islam (Jinayah)",
    ],
    "Fakultas Dakwah dan Komunikasi": [
      "Semua",
      "Ilmu Komunikasi",
      "Komunikasi Penyiaran Islam",
      "Bimbingan dan Konseling Islam",
      "Manajemen Dakwah",
      "Pengembangan Masyarakat Islam",
    ],
    "Fakultas Adab dan Humaniora": [
      "Semua",
      "Sejarah Peradaban Islam",
      "Bahasa dan Sastra Arab",
      "Sastra Inggris",
    ],
    "Fakultas Ilmu Sosial dan Ilmu Politik": [
      "Semua",
      "Administrasi Publik",
      "Sosiologi",
      "Ilmu Politik",
    ],
    "Fakultas Ekonomi dan Bisnis Islam": [
      "Semua",
      "Akutansi Syariah",
      "Ekonomi Syariah",
      "Manajemen",
      "Manajemen Keuangan Syariah",
    ],
  };


  const handleFakultasChange = (e) => {
    setSelectedFakultas(e.target.value);
  };

  // Filter data based on selected faculty
  const getFilteredData = (dataArray, fakultasFilter) => {
    let filtered = dataArray || [];

    if (fakultasFilter !== "Semua") {
      filtered = filtered.filter((item) => item.fakultas === fakultasFilter);
    }

    return filtered;
  };

  // Get chart data based on selected faculty and year
  const getChartData = () => {
    const dataByFakultas = data.chartDataByFakultas || {};
    if (selectedFakultas === "Semua") {
      // Gabungkan semua chart data dari semua fakultas
      let combined = [];
      Object.values(dataByFakultas).forEach((fakultasData) => {
        const yearData = fakultasData[selectedYear] || [];
        combined = combined.concat(yearData);
      });
      return combined;
    } else {
      return dataByFakultas[selectedFakultas]?.[selectedYear] || [];
    }
  };


  const filteredPaymentData = getFilteredData(
    data.paymentPercentageData,
    selectedFakultas
  );
  const filteredCorrelationData = getFilteredData(
    data.correlationData,
    selectedFakultas
  );

  return (
    <div className="dashboard-layout">
      <Sidebar isLoggedIn={true} userRole="eksekutif" onLogout={onLogout} />

      <div className="dashboard-content">
        <Header
          isLoggedIn={true}
          userRole="eksekutif"
          onLogout={onLogout}
          isDarkMode={isDarkMode}       // 🔥 ini penting
          toggleDarkMode={toggleDarkMode} // 🔥 ini juga penting
        />

        <main className="dashboard-main">
          <div style={{ marginBottom: "30px" }}>
            <h1 className="dashboard-title">Pembayaran UKT</h1>

            {/* Filter Controls */}
            <div
              style={{
                display: "flex",
                gap: "20px",
                marginBottom: "30px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontSize: "14px",
                    color: isDarkMode ? "#f3f4f6" : "#111827",
                  }}
                >
                  Tahun:
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#333",
                    color: "white",
                    border: "1px solid #555",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                >
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontSize: "14px",
                    color: isDarkMode ? "#f3f4f6" : "#111827",
                  }}
                >
                  Fakultas:
                </label>
                <select
                  value={selectedFakultas}
                  onChange={handleFakultasChange}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#333",
                    color: "white",
                    border: "1px solid #555",
                    borderRadius: "4px",
                    fontSize: "14px",
                    minWidth: "200px",
                  }}
                >
                  {fakultasOptions.map((fakultas) => (
                    <option key={fakultas} value={fakultas}>
                      {fakultas}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div
            style={{
              backgroundColor: "#2a2a2a",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "30px",
              border: "1px solid #444",
            }}
          >
            <h3
              style={{
                marginBottom: "20px",
                textAlign: "center",
                color: "white",
                fontSize: "18px",
              }}
            >
              Persentase Pembayaran UKT Tahun {selectedYear} -{" "}
              {selectedFakultas}
            </h3>
            <div style={{ height: "400px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getChartData()}
                  margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#ffffff", fontSize: 10 }}
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    interval={0}
                  />
                  <YAxis
                    tick={{ fill: "#ffffff" }}
                    domain={[0, 100]}
                    label={{
                      value: "Persentase (%)",
                      angle: -90,
                      position: "insideLeft",
                      style: { textAnchor: "middle", fill: "#ffffff" },
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#333",
                      border: "1px solid #555",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                    formatter={(value) => [
                      `${value}%`,
                      "Persentase Pembayaran",
                    ]}
                  />
                  <Bar dataKey="value" fill="#4A90E2" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tables Section */}
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
{/* Payment Percentage Table */}
<div
  style={{
    backgroundColor: "#2a2a2a",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #444",
    flex: 1,
    minWidth: "400px",
  }}
>
  <h3
    style={{
      marginBottom: "20px",
      color: "white",
      fontSize: "16px",
      textAlign: "center",
    }}
  >
    Persentase Pembayaran UKT Per Jurusan (2021-2025)
  </h3>
  <div
    style={{
      overflowX: "auto",
      maxHeight: "400px",
      overflowY: "auto",
    }}
  >
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        fontSize: "14px",
      }}
    >
      <thead
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "#333",
        }}
      >
        <tr>
          <th
            style={{
              padding: "12px 8px",
              textAlign: "left",
              borderBottom: "1px solid #555",
              color: "white",
            }}
          >
            Jurusan
          </th>
          {[2021, 2022, 2023, 2024, 2025].map((year) => (
            <th
              key={year}
              style={{
                padding: "12px 8px",
                textAlign: "center",
                borderBottom: "1px solid #555",
                color: "white",
              }}
            >
              {year}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredPaymentData.map((row, index) => (
          <tr
            key={index}
            style={{
              backgroundColor: index % 2 === 0 ? "#2a2a2a" : "#333",
            }}
          >
            <td
              style={{
                padding: "10px 8px",
                borderBottom: "1px solid #444",
                color: "white",
              }}
            >
              {row.jurusan}
            </td>
            {[2021, 2022, 2023, 2024, 2025].map((year) => (
              <td
                key={year}
                style={{
                  padding: "10px 8px",
                  textAlign: "center",
                  borderBottom: "1px solid #444",
                  color: "white",
                }}
              >
                {row[year]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

            {/* Correlation Table */}
            <div
              style={{
                backgroundColor: "#2a2a2a",
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #444",
                flex: 1,
                minWidth: "400px",
              }}
            >
              <h3
                style={{
                  marginBottom: "20px",
                  color: "white",
                  fontSize: "16px",
                  textAlign: "center",
                }}
              >
                Korelasi Pembayaran UKT dengan IPK & Jumlah Mahasiswa
              </h3>
              <div
                style={{
                  overflowX: "auto",
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "14px",
                  }}
                >
                  <thead
                    style={{
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#333",
                    }}
                  >
                    <tr>
                      <th
                        style={{
                          padding: "12px 8px",
                          textAlign: "left",
                          borderBottom: "1px solid #555",
                          color: "white",
                        }}
                      >
                        Jurusan
                      </th>
                      <th
                        style={{
                          padding: "12px 8px",
                          textAlign: "center",
                          borderBottom: "1px solid #555",
                          color: "white",
                        }}
                      >
                        % Bayar
                      </th>
                      <th
                        style={{
                          padding: "12px 8px",
                          textAlign: "center",
                          borderBottom: "1px solid #555",
                          color: "white",
                        }}
                      >
                        IPK Rata-rata
                      </th>
                      <th
                        style={{
                          padding: "12px 8px",
                          textAlign: "center",
                          borderBottom: "1px solid #555",
                          color: "white",
                        }}
                      >
                        Jml Mhs
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCorrelationData
                      .sort(
                        (a, b) =>
                          parseInt(b.percentage) - parseInt(a.percentage)
                      )
                      .map((row, index) => (
                        <tr
                          key={index}
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? "#2a2a2a" : "#333",
                          }}
                        >
                          <td
                            style={{
                              padding: "10px 8px",
                              borderBottom: "1px solid #444",
                              color: "white",
                            }}
                          >
                            {row.jurusan}
                          </td>
                          <td
                            style={{
                              padding: "10px 8px",
                              textAlign: "center",
                              borderBottom: "1px solid #444",
                              color: "white",
                            }}
                          >
                            {row.percentage}
                          </td>
                          <td
                            style={{
                              padding: "10px 8px",
                              textAlign: "center",
                              borderBottom: "1px solid #444",
                              color: "white",
                            }}
                          >
                            {row.avgIPK}
                          </td>
                          <td
                            style={{
                              padding: "10px 8px",
                              textAlign: "center",
                              borderBottom: "1px solid #444",
                              color: "white",
                            }}
                          >
                            {row.studentCount}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>

        <Footer isLoggedIn={true} />
      </div>
    </div>
  );
};

export default PembayaranUKT;
