/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

const KinerjaDosen = ({ onLogout, isDarkMode, toggleDarkMode }) => {
  const [selectedFakultas, setSelectedFakultas] = useState("Semua");
  const [selectedJurusan, setSelectedJurusan] = useState("Semua");
  const [selectedStatus, setSelectedStatus] = useState("Semua");
  const [dosenData, setDosenData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/view/kinerja-dosen");
        const result = await res.json();
      if (result.status === "success") {
        setDosenData(result.data);
      } else {
        setError("Gagal memuat data dosen");
      }

      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data dosen");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  useEffect(() => {
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
  }, [isDarkMode]);


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


  const statusOptions = ["Semua", "Sangat Baik", "Baik", "Cukup"];

  const jurusanByFakultas = {
    Semua: ["Semua"],
    "Tarbiyah dan Keguruan": [
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
    Psikologi: ["Semua", "Psikologi"],
    FST: [
      "Semua",
      "Matematika",
      "Biologi",
      "Fisika",
      "Kimia",
      "Teknik Informatika",
      "Agroteknologi",
      "Teknik Elektro",
    ],
    Ushuluddin: [
      "Semua",
      "Ilmu al-Qur'an dan Tafsir/Tafsir Hadits",
      "Aqidah dan Filsafat Islam",
      "Studi Agama-Agama",
      "Tasawuf Psikoterapi",
      "Ilmu Hadits",
    ],
    "Syariah dan Hukum": [
      "Semua",
      "Hukum Keluarga (Ahwal Al-Syakhsiyyah)",
      "Hukum Ekonomi Syariah (Muamalah)",
      "Hukum Tata Negara (Siyasah)",
      "Perbandingan Madzhab",
      "Ilmu Hukum",
      "Hukum Pidana Islam (Jinayah)",
    ],
    "Dakwah dan Komunikasi": [
      "Semua",
      "Ilmu Komunikasi",
      "Komunikasi Penyiaran Islam",
      "Bimbingan dan Konseling Islam",
      "Manajemen Dakwah",
      "Pengembangan Masyarakat Islam",
    ],
    "Adab dan Humaniora": [
      "Semua",
      "Sejarah Peradaban Islam",
      "Bahasa dan Sastra Arab",
      "Sastra Inggris",
    ],
    "Ilmu Sosial dan Ilmu Politik": [
      "Semua",
      "Administrasi Publik",
      "Sosiologi",
      "Ilmu Politik",
    ],
    "Ekonomi dan Bisnis Islam": [
      "Semua",
      "Akutansi Syariah",
      "Ekonomi Syariah",
      "Manajemen",
      "Manajemen Keuangan Syaria",
    ],
  };

const filteredDosenData = useMemo(() => {
  return dosenData.filter((dosen) => {
    const fakultasMatch =
      selectedFakultas === "Semua" || dosen.fakultas === selectedFakultas;
    const statusMatch =
      selectedStatus === "Semua" || dosen.kategori === selectedStatus;
    return fakultasMatch && statusMatch;
  });
}, [dosenData, selectedFakultas, selectedStatus]);

  const chartData = useMemo(() => {
    const sangatBaik = filteredDosenData.filter(
      (d) => d.kategori === "Sangat Baik"
    ).length;
    const baik = filteredDosenData.filter((d) => d.kategori === "Baik").length;
    const cukup = filteredDosenData.filter(
      (d) => d.kategori === "Cukup"
    ).length;
    const total = filteredDosenData.length;

      return {
        sangat_baik: total > 0 ? Math.round((sangatBaik / total) * 100) : 0,
        baik: total > 0 ? Math.round((baik / total) * 100) : 0,
        cukup: total > 0 ? Math.round((cukup / total) * 100) : 0,
        counts: { sangatBaik, baik, cukup, total },
        totalPersen: total > 0 ? 100 : 0, // <-- Tambahkan ini
      };

  }, [filteredDosenData]);

  const handleFakultasChange = (fakultas) => {
    setSelectedFakultas(fakultas);
    setSelectedJurusan("Semua");
  };

  const totalPersen = chartData.sangat_baik + chartData.baik + chartData.cukup;
  const sangatBaikAngle = totalPersen > 0 ? (chartData.sangat_baik / totalPersen) * 360 : 0;
  const baikAngle = totalPersen > 0 ? (chartData.baik / totalPersen) * 360 : 0;
  const cukupAngle = totalPersen > 0 ? (chartData.cukup / totalPersen) * 360 : 0;
  const isFiltered = selectedFakultas !== 'Semua' || selectedStatus !== 'Semua';


  if (loading) {
    return <div style={{ color: "white", padding: "2rem" }}>Memuat data...</div>;
  }

  if (error) {
    return <div style={{ color: "red", padding: "2rem" }}>{error}</div>;
  }

  return (
    <div className={`dashboard-layout ${isDarkMode ? "dark-mode" : ""}`}>
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
          <h1 className="dashboard-title">Kinerja Dosen</h1>
          {/* Filter Section */}
          <div
            className="filter-section"
            style={{
              backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
              padding: "24px",
              borderRadius: "12px",
              marginBottom: "24px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            <div className="filter-group">
              <label style={{ color: isDarkMode ? "#e5e7eb" : "#111827" }}>Fakultas:</label>
              <select
                value={selectedFakultas}
                onChange={(e) => handleFakultasChange(e.target.value)}
                className="filter-select"
                style={{
                  backgroundColor: isDarkMode ? "#374151" : "#ffffff",
                  color: isDarkMode ? "#f9fafb" : "#111827",
                  border: "1px solid #d1d5db",
                  padding: "8px 12px",
                  borderRadius: "6px",
                }}
              >
                {fakultasOptions.map((fakultas) => (
                  <option key={fakultas} value={fakultas}>
                    {fakultas}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label style={{ color: isDarkMode ? "#e5e7eb" : "#111827" }}>Status:</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="filter-select"
                style={{
                  backgroundColor: isDarkMode ? "#374151" : "#ffffff",
                  color: isDarkMode ? "#f9fafb" : "#111827",
                  border: "1px solid #d1d5db",
                  padding: "8px 12px",
                  borderRadius: "6px",
                }}
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="charts-grid">
            {/* Chart Section with Dark Theme Style */}
            <div
              style={{
                backgroundColor: "#1f2937",
                borderRadius: "12px",
                padding: "24px",
                marginBottom: "24px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "40px",
                  flexWrap: "wrap",
                }}
              >
                {/* Donut Chart */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
<svg width="200" height="200" viewBox="0 0 200 200">
  {chartData.counts.total === 0 ? (
    <circle
      cx="100"
      cy="100"
      r="80"
      fill="none"
      stroke="#6b7280"
      strokeWidth="30"
      strokeDasharray="502.65"
      transform="rotate(-90 100 100)"
    />
  ) : (
    <>
      {/* Segmen sangat baik */}
      <circle
        cx="100"
        cy="100"
        r="80"
        fill="none"
        stroke={chartData.sangat_baik === 0 ? "#6b7280" : "#10b981"}
        strokeWidth="30"
        strokeDasharray={`${
          chartData.sangat_baik === 0 ? 0.5 : (sangatBaikAngle / 360) * 502.65
        } 502.65`}
        strokeDashoffset="0"
        transform="rotate(-90 100 100)"
      />
      {/* Baik */}
      <circle
        cx="100"
        cy="100"
        r="80"
        fill="none"
        stroke={chartData.baik === 0 ? "#6b7280" : "#22c55e"}
        strokeWidth="30"
        strokeDasharray={`${
          chartData.baik === 0 ? 0.5 : (baikAngle / 360) * 502.65
        } 502.65`}
        strokeDashoffset={`-${(sangatBaikAngle / 360) * 502.65}`}
        transform="rotate(-90 100 100)"
      />
      {/* Cukup */}
      <circle
        cx="100"
        cy="100"
        r="80"
        fill="none"
        stroke={chartData.cukup === 0 ? "#6b7280" : "#84cc16"}
        strokeWidth="30"
        strokeDasharray={`${
          chartData.cukup === 0 ? 0.5 : (cukupAngle / 360) * 502.65
        } 502.65`}
        strokeDashoffset={`-${
          ((sangatBaikAngle + baikAngle) / 360) * 502.65
        }`}
        transform="rotate(-90 100 100)"
      />
    </>
  )}

  {/* Persentase teks */}
  {isFiltered ? (
    <text
      x="100"
      y="110"
      textAnchor="middle"
      style={{
        fontSize: "20px",
        fontWeight: "bold",
        fill: "#ffffff",
      }}
    >
      {chartData.totalPersen}%
    </text>
  ) : (
    <>
      {chartData.sangat_baik > 0 && (
        <text
          x="100"
          y="90"
          textAnchor="middle"
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            fill: "#ffffff",
          }}
        >
          {chartData.sangat_baik}%
        </text>
      )}
      {chartData.baik > 0 && (
        <text
          x="100"
          y="110"
          textAnchor="middle"
          style={{
            fontSize: "14px",
            fill: "#22c55e",
            fontWeight: "bold",
          }}
        >
          {chartData.baik}%
        </text>
      )}
      {chartData.cukup > 0 && (
        <text
          x="100"
          y="125"
          textAnchor="middle"
          style={{
            fontSize: "14px",
            fill: "#9ca3af",
          }}
        >
          {chartData.cukup}%
        </text>
      )}
    </>
  )}
</svg>
                  <div
                    style={{
                      color: "#9ca3af",
                      fontSize: "14px",
                      textAlign: "center",
                    }}
                  >
                    Total: {chartData.counts.total} Dosen
                  </div>
                </div>

                {/* Legend */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor: "#10b981",
                      }}
                    ></div>
                    <span
                      style={{
                        color: "#ffffff",
                        fontSize: "14px",
                      }}
                    >
                      Sangat Baik ({chartData.counts.sangatBaik})
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor: "#22c55e",
                      }}
                    ></div>
                    <span
                      style={{
                        color: "#ffffff",
                        fontSize: "14px",
                      }}
                    >
                      Baik ({chartData.counts.baik})
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor: "#84cc16",
                      }}
                    ></div>
                    <span
                      style={{
                        color: "#ffffff",
                        fontSize: "14px",
                      }}
                    >
                      Cukup ({chartData.counts.cukup})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Table Section with Dark Theme Style */}
          <div
            style={{
              backgroundColor: "#1f2937",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                overflowX: "auto",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
              <thead>
                <tr
                  style={{
                    borderBottom: "1px solid #374151",
                  }}
                >
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      color: "#9ca3af",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Nama Dosen
                  </th>
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      color: "#9ca3af",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Fakultas
                  </th>
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      color: "#9ca3af",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Skor Evaluasi
                  </th>
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      color: "#9ca3af",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Kategori
                  </th>
                </tr>
              </thead>

                <tbody>
                  {filteredDosenData.length > 0 ? (
                    filteredDosenData.map((dosen, index) => (
                      <tr
                        key={index}
                        style={{
                          borderBottom: "1px solid #374151",
                        }}
                      >
                        <td
                          style={{
                            padding: "12px 16px",
                            color: "#ffffff",
                            fontSize: "14px",
                          }}
                        >
                          {dosen.nama_dosen}
                        </td>
                       {/* <td
                          style={{
                            padding: "12px 16px",
                            color: "#9ca3af",
                            fontSize: "14px",
                          }}
                        >
                          {dosen.jurusan}
                        </td>*/}
                        <td
                          style={{
                            padding: "12px 16px",
                            fontSize: "14px",
                            fontWeight: "500",
                            color:
                              dosen.kategori === "Sangat Baik"
                                ? "#10b981"
                                : dosen.kategori === "Baik"
                                ? "#22c55e"
                                : "#84cc16",
                          }}
                        >
                          {dosen.skor_evaluasi !== null ? dosen.skor_evaluasi : "-"}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            color: "#9ca3af",
                            fontSize: "14px",
                          }}
                        >
                          {dosen.kategori}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        style={{
                          padding: "24px 16px",
                          textAlign: "center",
                          color: "#9ca3af",
                          fontSize: "14px",
                        }}
                      >
                        Tidak ada data dosen untuk filter yang dipilih
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              marginTop: "24px",
            }}
          ></div>
        </main>
        <Footer isLoggedIn={true} />
      </div>
    </div>
  );
};

export default KinerjaDosen;
