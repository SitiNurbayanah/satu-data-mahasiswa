import React, { useState, useMemo } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

const KinerjaDosen = ({ onLogout }) => {
  const [selectedTab, setSelectedTab] = useState("Status Dosen");
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
      "Manajemen Keuangan Syaria",
    ],
  };

  // Sample data dosen dengan fakultas dan jurusan
  const dosenData = [
    {
      nama: "Dr. Ahmad Fauzi, M.Pd",
      fakultas: "Tarbiyah dan Keguruan",
      jurusan: "Pendidikan Matematika",
      skor: "95%",
      kategori: "Sangat Baik",
      catatan: "Pengabdian rutin & Mengajar sesuai standar",
    },
    {
      nama: "Prof. Siti Nurhaliza, Ph.D",
      fakultas: "FST",
      jurusan: "Biologi",
      skor: "88%",
      kategori: "Baik",
      catatan: "Aktif menulis jurnal internasional",
    },
    {
      nama: "Dr. Muhammad Rizki, M.Kom",
      fakultas: "FST",
      jurusan: "Teknik Informatika",
      skor: "92%",
      kategori: "Sangat Baik",
      catatan: "Penelitian konsisten & disiplin",
    },
    {
      nama: "Dr. Fatimah Az-Zahra, M.A",
      fakultas: "Ushuluddin",
      jurusan: "Aqidah dan Filsafat Islam",
      skor: "85%",
      kategori: "Baik",
      catatan: "Aktif dalam kegiatan akademik",
    },
    {
      nama: "Drs. Abdul Rahman, M.H",
      fakultas: "Syariah dan Hukum",
      jurusan: "Hukum Ekonomi Syariah (Muamalah)",
      skor: "87%",
      kategori: "Baik",
      catatan: "Pembimbing skripsi terbaik",
    },
    {
      nama: "Dr. Aisyah Mardiyah, M.Psi",
      fakultas: "Psikologi",
      jurusan: "Psikologi",
      skor: "90%",
      kategori: "Sangat Baik",
      catatan: "Inovasi metode pembelajaran",
    },
    {
      nama: "Dr. Hassan Al-Banna, M.A",
      fakultas: "Dakwah dan Komunikasi",
      jurusan: "Komunikasi Penyiaran Islam",
      skor: "83%",
      kategori: "Baik",
      catatan: "Aktif dalam kegiatan sosial",
    },
    {
      nama: "Prof. Aminah Wadud, Ph.D",
      fakultas: "Adab dan Humaniora",
      jurusan: "Bahasa dan Sastra Arab",
      skor: "94%",
      kategori: "Sangat Baik",
      catatan: "Peneliti terkemuka bidang sastra",
    },
    {
      nama: "Dr. Budi Santoso, M.Si",
      fakultas: "Ilmu Sosial dan Ilmu Politik",
      jurusan: "Sosiologi",
      skor: "86%",
      kategori: "Baik",
      catatan: "Aktif dalam penelitian masyarakat",
    },
    {
      nama: "Dr. Khadijah, M.E.I",
      fakultas: "Ekonomi dan Bisnis Islam",
      jurusan: "Ekonomi Syariah",
      skor: "89%",
      kategori: "Baik",
      catatan: "Konsultan ekonomi syariah",
    },
    {
      nama: "Dr. Ali Imron, M.Pd",
      fakultas: "Tarbiyah dan Keguruan",
      jurusan: "Pendidikan Agama Islam",
      skor: "78%",
      kategori: "Cukup",
      catatan: "Perlu peningkatan kualitas mengajar",
    },
    {
      nama: "Drs. Yusuf Abdullah, M.A",
      fakultas: "Ushuluddin",
      jurusan: "Ilmu Hadits",
      skor: "80%",
      kategori: "Cukup",
      catatan: "Fokus pada pengembangan kurikulum",
    },
  ];

  // Filter data berdasarkan fakultas dan jurusan yang dipilih
  const filteredDosenData = useMemo(() => {
    return dosenData.filter((dosen) => {
      const fakultasMatch =
        selectedFakultas === "Semua" || dosen.fakultas === selectedFakultas;
      const jurusanMatch =
        selectedJurusan === "Semua" || dosen.jurusan === selectedJurusan;
      return fakultasMatch && jurusanMatch;
    });
  }, [selectedFakultas, selectedJurusan]);

  // Hitung statistik berdasarkan data yang difilter
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
    };
  }, [filteredDosenData]);

  // Handle perubahan fakultas
  const handleFakultasChange = (fakultas) => {
    setSelectedFakultas(fakultas);
    setSelectedJurusan("Semua"); // Reset jurusan ketika fakultas berubah
  };

  // Menghitung sudut untuk donut chart
  const total = chartData.sangat_baik + chartData.baik + chartData.cukup;
  const sangatBaikAngle = total > 0 ? (chartData.sangat_baik / 100) * 360 : 0;
  const baikAngle = total > 0 ? (chartData.baik / 100) * 360 : 0;
  const cukupAngle = total > 0 ? (chartData.cukup / 100) * 360 : 0;

  return (
    <div className="dashboard-layout">
      <Sidebar isLoggedIn={true} userRole="eksekutif" onLogout={onLogout} />

      <div className="dashboard-content">
        <Header isLoggedIn={true} user="eksekutif" onLogout={onLogout} />

        <main className="dashboard-main">
          <h1 className="dashboard-title">Kinerja Dosen</h1>

          {/* Filter Section */}
          <div className="filter-section">
            <div className="filter-group">
              <label>Fakultas:</label>
              <select
                value={selectedFakultas}
                onChange={(e) => handleFakultasChange(e.target.value)}
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
              <label>Jurusan:</label>
              <select
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

          <div className="charts-grid">
            {/* Chart Section */}
            <div className="chart-card">
              <div className="donut-chart-container">
                <svg width="200" height="200" viewBox="0 0 200 200">
                  {total > 0 ? (
                    <>
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="30"
                        strokeDasharray={`${
                          (sangatBaikAngle / 360) * 502.65
                        } 502.65`}
                        strokeDashoffset="0"
                        transform="rotate(-90 100 100)"
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="30"
                        strokeDasharray={`${(baikAngle / 360) * 502.65} 502.65`}
                        strokeDashoffset={`-${
                          (sangatBaikAngle / 360) * 502.65
                        }`}
                        transform="rotate(-90 100 100)"
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="#84cc16"
                        strokeWidth="30"
                        strokeDasharray={`${
                          (cukupAngle / 360) * 502.65
                        } 502.65`}
                        strokeDashoffset={`-${
                          ((sangatBaikAngle + baikAngle) / 360) * 502.65
                        }`}
                        transform="rotate(-90 100 100)"
                      />
                    </>
                  ) : (
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#6b7280"
                      strokeWidth="30"
                    />
                  )}
                  <text
                    x="100"
                    y="90"
                    textAnchor="middle"
                    className="chart-percentage"
                  >
                    {chartData.sangat_baik}%
                  </text>
                  <text
                    x="100"
                    y="110"
                    textAnchor="middle"
                    className="chart-label"
                  >
                    {chartData.cukup}%
                  </text>
                  <text
                    x="100"
                    y="125"
                    textAnchor="middle"
                    className="chart-sublabel"
                  >
                    {chartData.baik}%
                  </text>
                </svg>
                <div className="chart-info">
                  <div className="total-dosen">
                    Total: {chartData.counts.total} Dosen
                  </div>
                </div>
              </div>

              <div className="legend">
                <div className="legend-item">
                  <div
                    className="legend-color"
                    style={{ backgroundColor: "#10b981" }}
                  ></div>
                  <span>Sangat Baik ({chartData.counts.sangatBaik})</span>
                </div>
                <div className="legend-item">
                  <div
                    className="legend-color"
                    style={{ backgroundColor: "#22c55e" }}
                  ></div>
                  <span>Baik ({chartData.counts.baik})</span>
                </div>
                <div className="legend-item">
                  <div
                    className="legend-color"
                    style={{ backgroundColor: "#84cc16" }}
                  ></div>
                  <span>Cukup ({chartData.counts.cukup})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="chart-card">
            <div className="table-tabs">
              <button
                className={`tab ${
                  selectedTab === "Status Dosen" ? "active" : ""
                }`}
                onClick={() => setSelectedTab("Status Dosen")}
              >
                Status Dosen
              </button>
              <button
                className={`tab ${selectedTab === "Fakultas" ? "active" : ""}`}
                onClick={() => setSelectedTab("Fakultas")}
              >
                Fakultas
              </button>
            </div>

            <div className="data-table">
              <table>
                <thead>
                  <tr>
                    <th>Nama Dosen</th>
                    <th>Fakultas</th>
                    <th>Jurusan</th>
                    <th>Skor</th>
                    <th>Catatan</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDosenData.length > 0 ? (
                    filteredDosenData.map((dosen, index) => (
                      <tr key={index}>
                        <td>{dosen.nama}</td>
                        <td>{dosen.fakultas}</td>
                        <td>{dosen.jurusan}</td>
                        <td
                          className={`skor skor-${dosen.kategori
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {dosen.skor}
                        </td>
                        <td className="catatan">{dosen.catatan}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="no-data">
                        Tidak ada data dosen untuk filter yang dipilih
                      </td>
                    </tr>
                  )}
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

export default KinerjaDosen;
