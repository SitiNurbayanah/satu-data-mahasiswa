import React, { useState, useMemo } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

const KinerjaDosen = ({ onLogout }) => {
  const [selectedTab, setSelectedTab] = useState("Status Dosen");
  const [selectedFakultas, setSelectedFakultas] = useState("Semua");
  const [selectedJurusan, setSelectedJurusan] = useState("Semua");
  const [selectedStatus, setSelectedStatus] = useState("Semua");

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

  // Rich sample data dosen dengan lebih banyak variasi
  const dosenData = [
    {
      nama: "Prof. Dr. Ahmad Fauzi, M.Pd",
      fakultas: "Tarbiyah dan Keguruan",
      jurusan: "Pendidikan Matematika",
      skor: "95%",
      kategori: "Sangat Baik",
      catatan: "Pengabdian rutin & Mengajar sesuai standar",
      nidn: "0123456789",
      jabatan: "Professor",
      pendidikan: "S3 Pendidikan Matematika",
      pengalamanMengajar: 25,
      penelitian: 15,
      pengabdian: 8,
    },
    {
      nama: "Prof. Dr. Siti Nurhaliza, Ph.D",
      fakultas: "FST",
      jurusan: "Biologi",
      skor: "88%",
      kategori: "Baik",
      catatan: "Aktif menulis jurnal internasional",
      nidn: "0123456790",
      jabatan: "Professor",
      pendidikan: "S3 Biologi Molekuler",
      pengalamanMengajar: 20,
      penelitian: 25,
      pengabdian: 5,
    },
    {
      nama: "Dr. Muhammad Rizki, M.Kom",
      fakultas: "FST",
      jurusan: "Teknik Informatika",
      skor: "92%",
      kategori: "Sangat Baik",
      catatan: "Penelitian konsisten & disiplin",
      nidn: "0123456791",
      jabatan: "Lektor Kepala",
      pendidikan: "S3 Informatika",
      pengalamanMengajar: 12,
      penelitian: 18,
      pengabdian: 6,
    },
    {
      nama: "Dr. Fatimah Az-Zahra, M.A",
      fakultas: "Ushuluddin",
      jurusan: "Aqidah dan Filsafat Islam",
      skor: "85%",
      kategori: "Baik",
      catatan: "Aktif dalam kegiatan akademik",
      nidn: "0123456792",
      jabatan: "Lektor",
      pendidikan: "S3 Studi Islam",
      pengalamanMengajar: 10,
      penelitian: 8,
      pengabdian: 7,
    },
    {
      nama: "Drs. Abdul Rahman, M.H",
      fakultas: "Syariah dan Hukum",
      jurusan: "Hukum Ekonomi Syariah (Muamalah)",
      skor: "87%",
      kategori: "Baik",
      catatan: "Pembimbing skripsi terbaik",
      nidn: "0123456793",
      jabatan: "Lektor",
      pendidikan: "S2 Hukum Islam",
      pengalamanMengajar: 15,
      penelitian: 6,
      pengabdian: 10,
    },
    {
      nama: "Dr. Aisyah Mardiyah, M.Psi",
      fakultas: "Psikologi",
      jurusan: "Psikologi",
      skor: "90%",
      kategori: "Sangat Baik",
      catatan: "Inovasi metode pembelajaran",
      nidn: "0123456794",
      jabatan: "Lektor Kepala",
      pendidikan: "S3 Psikologi Klinis",
      pengalamanMengajar: 14,
      penelitian: 12,
      pengabdian: 9,
    },
    {
      nama: "Dr. Hassan Al-Banna, M.A",
      fakultas: "Dakwah dan Komunikasi",
      jurusan: "Komunikasi Penyiaran Islam",
      skor: "83%",
      kategori: "Baik",
      catatan: "Aktif dalam kegiatan sosial",
      nidn: "0123456795",
      jabatan: "Lektor",
      pendidikan: "S3 Komunikasi",
      pengalamanMengajar: 11,
      penelitian: 7,
      pengabdian: 12,
    },
    {
      nama: "Prof. Dr. Aminah Wadud, Ph.D",
      fakultas: "Adab dan Humaniora",
      jurusan: "Bahasa dan Sastra Arab",
      skor: "94%",
      kategori: "Sangat Baik",
      catatan: "Peneliti terkemuka bidang sastra",
      nidn: "0123456796",
      jabatan: "Professor",
      pendidikan: "S3 Sastra Arab",
      pengalamanMengajar: 22,
      penelitian: 20,
      pengabdian: 6,
    },
    {
      nama: "Dr. Budi Santoso, M.Si",
      fakultas: "Ilmu Sosial dan Ilmu Politik",
      jurusan: "Sosiologi",
      skor: "86%",
      kategori: "Baik",
      catatan: "Aktif dalam penelitian masyarakat",
      nidn: "0123456797",
      jabatan: "Lektor",
      pendidikan: "S3 Sosiologi",
      pengalamanMengajar: 13,
      penelitian: 10,
      pengabdian: 8,
    },
    {
      nama: "Dr. Khadijah, M.E.I",
      fakultas: "Ekonomi dan Bisnis Islam",
      jurusan: "Ekonomi Syariah",
      skor: "89%",
      kategori: "Baik",
      catatan: "Konsultan ekonomi syariah",
      nidn: "0123456798",
      jabatan: "Lektor Kepala",
      pendidikan: "S3 Ekonomi Islam",
      pengalamanMengajar: 16,
      penelitian: 14,
      pengabdian: 11,
    },
    {
      nama: "Dr. Ali Imron, M.Pd",
      fakultas: "Tarbiyah dan Keguruan",
      jurusan: "Pendidikan Agama Islam",
      skor: "78%",
      kategori: "Cukup",
      catatan: "Perlu peningkatan kualitas mengajar",
      nidn: "0123456799",
      jabatan: "Asisten Ahli",
      pendidikan: "S3 Pendidikan Islam",
      pengalamanMengajar: 8,
      penelitian: 4,
      pengabdian: 5,
    },
    {
      nama: "Drs. Yusuf Abdullah, M.A",
      fakultas: "Ushuluddin",
      jurusan: "Ilmu Hadits",
      skor: "80%",
      kategori: "Cukup",
      catatan: "Fokus pada pengembangan kurikulum",
      nidn: "0123456800",
      jabatan: "Lektor",
      pendidikan: "S2 Ilmu Hadits",
      pengalamanMengajar: 18,
      penelitian: 5,
      pengabdian: 7,
    },
    {
      nama: "Dr. Mariam Sholehah, M.Pd",
      fakultas: "Tarbiyah dan Keguruan",
      jurusan: "Pendidikan Bahasa Inggris",
      skor: "91%",
      kategori: "Sangat Baik",
      catatan: "Ahli linguistik terapan",
      nidn: "0123456801",
      jabatan: "Lektor Kepala",
      pendidikan: "S3 Applied Linguistics",
      pengalamanMengajar: 17,
      penelitian: 16,
      pengabdian: 8,
    },
    {
      nama: "Prof. Dr. Ibrahim Nasution, M.A",
      fakultas: "Ushuluddin",
      jurusan: "Ilmu al-Qur'an dan Tafsir/Tafsir Hadits",
      skor: "96%",
      kategori: "Sangat Baik",
      catatan: "Pakar tafsir kontemporer",
      nidn: "0123456802",
      jabatan: "Professor",
      pendidikan: "S3 Ilmu Al-Quran dan Tafsir",
      pengalamanMengajar: 28,
      penelitian: 22,
      pengabdian: 15,
    },
    {
      nama: "Dr. Nurcholis Madjid, M.Si",
      fakultas: "FST",
      jurusan: "Matematika",
      skor: "84%",
      kategori: "Baik",
      catatan: "Spesialis matematika murni",
      nidn: "0123456803",
      jabatan: "Lektor",
      pendidikan: "S3 Matematika",
      pengalamanMengajar: 9,
      penelitian: 11,
      pengabdian: 4,
    },
    {
      nama: "Dr. Zainab Al-Ghazali, M.Psi",
      fakultas: "Psikologi",
      jurusan: "Psikologi",
      skor: "87%",
      kategori: "Baik",
      catatan: "Terapis keluarga bersertifikat",
      nidn: "0123456804",
      jabatan: "Lektor",
      pendidikan: "S3 Psikologi Keluarga",
      pengalamanMengajar: 11,
      penelitian: 9,
      pengabdian: 13,
    },
    {
      nama: "Dr. Hamka Hasan, M.H",
      fakultas: "Syariah dan Hukum",
      jurusan: "Hukum Keluarga (Ahwal Al-Syakhsiyyah)",
      skor: "82%",
      kategori: "Baik",
      catatan: "Mediator hukum keluarga",
      nidn: "0123456805",
      jabatan: "Lektor",
      pendidikan: "S3 Hukum Keluarga",
      pengalamanMengajar: 12,
      penelitian: 8,
      pengabdian: 14,
    },
    {
      nama: "Dr. Sukarno Wibowo, M.Kom",
      fakultas: "FST",
      jurusan: "Teknik Informatika",
      skor: "88%",
      kategori: "Baik",
      catatan: "Developer aplikasi mobile",
      nidn: "0123456806",
      jabatan: "Lektor",
      pendidikan: "S3 Computer Science",
      pengalamanMengajar: 10,
      penelitian: 13,
      pengabdian: 6,
    },
    {
      nama: "Prof. Dr. Azyumardi Azra, M.A",
      fakultas: "Adab dan Humaniora",
      jurusan: "Sejarah Peradaban Islam",
      skor: "97%",
      kategori: "Sangat Baik",
      catatan: "Sejarawan Islam terkemuka",
      nidn: "0123456807",
      jabatan: "Professor",
      pendidikan: "S3 Islamic History",
      pengalamanMengajar: 30,
      penelitian: 35,
      pengabdian: 20,
    },
    {
      nama: "Dr. Riska Andriani, M.E.I",
      fakultas: "Ekonomi dan Bisnis Islam",
      jurusan: "Manajemen",
      skor: "85%",
      kategori: "Baik",
      catatan: "Konsultan manajemen strategis",
      nidn: "0123456808",
      jabatan: "Lektor",
      pendidikan: "S3 Manajemen Strategis",
      pengalamanMengajar: 8,
      penelitian: 7,
      pengabdian: 9,
    },
    {
      nama: "Dr. Ahmad Syafii Maarif, M.A",
      fakultas: "Dakwah dan Komunikasi",
      jurusan: "Manajemen Dakwah",
      skor: "89%",
      kategori: "Baik",
      catatan: "Praktisi dakwah berpengalaman",
      nidn: "0123456809",
      jabatan: "Lektor Kepala",
      pendidikan: "S3 Islamic Studies",
      pengalamanMengajar: 19,
      penelitian: 11,
      pengabdian: 16,
    },
    {
      nama: "Dr. Nursyam Ridwan, M.Sos",
      fakultas: "Ilmu Sosial dan Ilmu Politik",
      jurusan: "Ilmu Politik",
      skor: "81%",
      kategori: "Baik",
      catatan: "Analis politik kontemporer",
      nidn: "0123456810",
      jabatan: "Lektor",
      pendidikan: "S3 Ilmu Politik",
      pengalamanMengajar: 14,
      penelitian: 12,
      pengabdian: 7,
    },
    {
      nama: "Dr. Miftahul Huda, M.Pd",
      fakultas: "Tarbiyah dan Keguruan",
      jurusan: "Pendidikan Biologi",
      skor: "86%",
      kategori: "Baik",
      catatan: "Inovator pembelajaran sains",
      nidn: "0123456811",
      jabatan: "Lektor",
      pendidikan: "S3 Pendidikan Biologi",
      pengalamanMengajar: 12,
      penelitian: 10,
      pengabdian: 8,
    },
    {
      nama: "Dr. Sarah Qonita, M.A",
      fakultas: "Adab dan Humaniora",
      jurusan: "Sastra Inggris",
      skor: "83%",
      kategori: "Baik",
      catatan: "Kritikus sastra modern",
      nidn: "0123456812",
      jabatan: "Lektor",
      pendidikan: "S3 English Literature",
      pengalamanMengajar: 13,
      penelitian: 9,
      pengabdian: 6,
    },
    {
      nama: "Dr. Wahyu Nugroho, M.Si",
      fakultas: "FST",
      jurusan: "Fisika",
      skor: "79%",
      kategori: "Cukup",
      catatan: "Peneliti fisika teoretis",
      nidn: "0123456813",
      jabatan: "Asisten Ahli",
      pendidikan: "S3 Fisika Teoretis",
      pengalamanMengajar: 6,
      penelitian: 8,
      pengabdian: 3,
    },
  ];

  // Filter data berdasarkan fakultas dan jurusan yang dipilih
  const filteredDosenData = useMemo(() => {
    return dosenData.filter((dosen) => {
      const fakultasMatch =
        selectedFakultas === "Semua" || dosen.fakultas === selectedFakultas;
      const jurusanMatch =
        selectedJurusan === "Semua" || dosen.jurusan === selectedJurusan;
      const statusMatch =
        selectedStatus === "Semua" || dosen.kategori === selectedStatus;
      return fakultasMatch && jurusanMatch && statusMatch;
    });
  }, [selectedFakultas, selectedJurusan, selectedStatus]);

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
    setSelectedJurusan("Semua");
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

            <div className="filter-group">
              <label>Status:</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="filter-select"
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
                          strokeDasharray={`${
                            (baikAngle / 360) * 502.65
                          } 502.65`}
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
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        fill: "#ffffff",
                      }}
                    >
                      {chartData.sangat_baik}%
                    </text>
                    <text
                      x="100"
                      y="110"
                      textAnchor="middle"
                      style={{
                        fontSize: "14px",
                        fill: "#9ca3af",
                      }}
                    >
                      {chartData.baik}%
                    </text>
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
                      Jurusan
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
                      Skor
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
                      Catatan
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
                          {dosen.nama}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            color: "#9ca3af",
                            fontSize: "14px",
                          }}
                        >
                          {dosen.jurusan}
                        </td>
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
                          {dosen.skor}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            color: "#9ca3af",
                            fontSize: "14px",
                          }}
                        >
                          {dosen.catatan}
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
