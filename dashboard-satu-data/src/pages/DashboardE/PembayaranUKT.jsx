import React, { useState } from "react";
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

const PembayaranUKT = ({ onLogout }) => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedFakultas, setSelectedFakultas] = useState("Semua");
  const [selectedJurusan, setSelectedJurusan] = useState("Semua");

  const fakultasOptions = [
    "Semua",
    "Tarbiyah dan Keguruan",
    "Psikologi",
    "FST",
    "Ushuluddin",
    "Syariah dan Hukum",
    "Dakwah dan Komunikasi",
    "Adab dan Humaniora",
    "Ilmu Sosial dan Ilmu Politik",
    "Ekonomi dan Bisnis Islam",
  ];

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
      "Manajemen Keuangan Syariah",
    ],
  };

  // Data untuk chart - berdasarkan fakultas
  const chartData = [
    { name: "Teknik Informatika", value: 95 },
    { name: "Biologi", value: 87 },
    { name: "Matematika", value: 92 },
    { name: "Teknik Elektro", value: 89 },
  ];

  // Data untuk tabel persentase pembayaran
  const paymentPercentageData = [
    { jurusan: "Teknik Informatika", 2022: "90%", 2023: "93%", 2024: "95%" },
    { jurusan: "Biologi", 2022: "85%", 2023: "84%", 2024: "87%" },
    { jurusan: "Agroteknologi", 2022: "87%", 2023: "86%", 2024: "87%" },
    { jurusan: "Teknik Elektro", 2022: "89%", 2023: "87%", 2024: "82%" },
  ];

  // Data untuk tabel korelasi pembayaran UKT dan rata-rata IPK
  const correlationData = [
    { jurusan: "Teknik Informatika", percentage: "89%", avgIPK: "3.65" },
    { jurusan: "Biologi", percentage: "84%", avgIPK: "3.48" },
    { jurusan: "Agroteknologi", percentage: "88%", avgIPK: "3.50" },
    { jurusan: "Teknik Elektro", percentage: "67%", avgIPK: "3.45" },
  ];

  const handleFakultasChange = (e) => {
    const fakultas = e.target.value;
    setSelectedFakultas(fakultas);
    setSelectedJurusan("Semua"); // Reset jurusan when fakultas changes
  };

  return (
    <div className="dashboard-layout">
      <Sidebar isLoggedIn={true} userRole="eksekutif" onLogout={onLogout} />

      <div className="dashboard-content">
        <Header isLoggedIn={true} user="eksekutif" onLogout={onLogout} />

        <main className="dashboard-main">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Pembayaran UKT</h1>

            {/* Filter Controls */}
            <div className="filter-controls">
              <div className="filter-group">
                <label htmlFor="year-select">Tahun:</label>
                <select
                  id="year-select"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="filter-select"
                >
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="fakultas-select">Fakultas:</label>
                <select
                  id="fakultas-select"
                  value={selectedFakultas}
                  onChange={handleFakultasChange}
                  className="filter-select"
                >
                  {fakultasOptions.map((fakultas) => (
                    <option key={fakultas} value={fakultas}>
                      {fakultas}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="jurusan-select">Jurusan:</label>
                <select
                  id="jurusan-select"
                  value={selectedJurusan}
                  onChange={(e) => setSelectedJurusan(e.target.value)}
                  className="filter-select"
                >
                  {jurusanByFakultas[selectedFakultas]?.map((jurusan) => (
                    <option key={jurusan} value={jurusan}>
                      {jurusan}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="chart-container">
            <div className="chart-card">
              <h3 className="chart-title">Tahun {selectedYear}</h3>
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "#ffffff", fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={100}
                    />
                    <YAxis tick={{ fill: "#ffffff" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#333",
                        border: "1px solid #555",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                    />
                    <Bar dataKey="value" fill="#4A90E2" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="chart-subtitle">Fakultas Sains dan Teknologi</p>
            </div>
          </div>

          {/* Tables Section */}
          <div className="tables-section">
            {/* Payment Percentage Table */}
            <div className="table-card">
              <h3 className="table-title">
                List Persentase Pembayaran UKT Setiap Jurusan
              </h3>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Jurusan</th>
                      <th>2022</th>
                      <th>2023</th>
                      <th>2024</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentPercentageData.map((row, index) => (
                      <tr key={index}>
                        <td>{row.jurusan}</td>
                        <td>{row[2022]}</td>
                        <td>{row[2023]}</td>
                        <td>{row[2024]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Correlation Table */}
            <div className="table-card">
              <h3 className="table-title">
                Korelasi Pembayaran UKT dan Rata-rata IPK
              </h3>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Jurusan</th>
                      <th>Persentase Pembayaran</th>
                      <th>IPK Rata-rata</th>
                    </tr>
                  </thead>
                  <tbody>
                    {correlationData.map((row, index) => (
                      <tr key={index}>
                        <td>{row.jurusan}</td>
                        <td>{row.percentage}</td>
                        <td>{row.avgIPK}</td>
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
