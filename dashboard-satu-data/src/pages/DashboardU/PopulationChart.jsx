import React, { useState, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import '../../styles/PopulationChart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler);

const StudentPopulationPage = ({ isDarkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const [selectedDepartmentYear, setSelectedDepartmentYear] = useState('2025');
  const [genderDataAPI, setGenderDataAPI] = useState([0, 0]);

  useEffect(() => {
    fetch("http://localhost:5000/view/perbandingan-gender")
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success" && Array.isArray(data.data)) {
          const male = data.data.find(d => d.jenis_kelamin === "L")?.jumlah || 0;
          const female = data.data.find(d => d.jenis_kelamin === "P")?.jumlah || 0;
          setGenderDataAPI([male, female]);
        }
      })
      .catch((err) => console.error("Fetch gender data error:", err));
  }, []);

  const departmentDataByYear = {
    '2020': [
      400, 380, 350, 320, 330, 800, 780, 760, 740, 850, 830, 810, 790, 770, 750,
      500, 480, 470, 460, 450, 440, 520, 510, 500, 490, 480, 460, 450, 440, 900, 880, 870, 850, 860, 890, 830, 800,
      420, 400, 390, 380, 370, 360, 350
    ],
    '2021': [
      500, 480, 450, 420, 430, 1000, 950, 920, 900, 1100, 1050, 1020, 980, 940, 910,
      600, 580, 570, 550, 540, 530, 620, 600, 590, 580, 570, 560, 540, 530, 1200, 1150, 1100, 1080, 1120, 1170, 1050, 1020,
      620, 600, 590, 580, 570, 560, 550
    ],
    '2022': [
      600, 580, 550, 500, 520, 1200, 1150, 1100, 1080, 1300, 1250, 1220, 1180, 1140, 1100,
      700, 680, 670, 650, 640, 630, 720, 700, 690, 680, 670, 660, 640, 630, 1400, 1350, 1300, 1280, 1320, 1370, 1250, 1220,
      720, 700, 690, 680, 670, 660, 650
    ],
    '2023': [
      700, 680, 650, 600, 620, 1400, 1350, 1300, 1280, 1500, 1450, 1420, 1380, 1340, 1300,
      800, 780, 770, 750, 740, 730, 820, 800, 790, 780, 770, 760, 740, 730, 1600, 1550, 1500, 1480, 1520, 1570, 1450, 1420,
      820, 800, 790, 780, 770, 760, 750
    ],
    '2024': [
      750, 720, 690, 640, 660, 1500, 1450, 1400, 1380, 1700, 1650, 1600, 1550, 1500, 1450,
      850, 830, 820, 800, 790, 780, 870, 850, 840, 830, 820, 810, 790, 780, 1800, 1750, 1700, 1680, 1720, 1770, 1650, 1620,
      870, 850, 840, 830, 820, 810, 800
    ],
    '2025': [
      800, 750, 600, 500, 550, 1600, 1500, 1400, 1350, 1800, 1750, 1700, 1650, 1450, 1300,
      900, 850, 870, 820, 830, 810, 950, 920, 910, 890, 880, 760, 740, 700, 2000, 1850, 1900, 1700, 1800, 1950, 1650, 1600,
      820, 780, 760, 720, 740, 730, 710
    ]
  };


  const departmentLabels = [
    'Ilmu al-Qur’an dan Tafsir/Tafsir Hadits', 'Aqidah dan Filsafat Islam', 'Studi Agama-Agama', 'Tasawuf Psikoterapi', 'Ilmu Hadits',
    'Manajemen Pendidikan Islam', 'Pendidikan Agama Islam', 'Pendidikan Bahasa Arab', 'Pendidikan Bahasa Inggris', 'Pendidikan Matematika',
    'Pendidikan Biologi', 'Pendidikan Kimia', 'Pendidikan Fisika', 'Pendidikan Guru Madrasah Ibtidaiyah', 'Pendidikan Islam Anak Usia Dini',
    'Hukum Keluarga', 'Hukum Ekonomi Syariah', 'Hukum Tata Negara', 'Perbandingan Madzhab', 'Ilmu Hukum', 'Hukum Pidana Islam', 'Ilmu Komunikasi',
    'Komunikasi Penyiaran Islam', 'Bimbingan & Konseling Islam', 'Manajemen Dakwah', 'Pengembangan Masyarakat Islam', 'Sejarah Peradaban Islam',
    'Bahasa & Sastra Arab', 'Sastra Inggris', 'Psikologi', 'Matematika', 'Biologi', 'Fisika', 'Kimia', 'Teknik Informatika', 'Agroteknologi',
    'Teknik Elektro', 'Administrasi Publik', 'Sosiologi', 'Ilmu Politik', 'Akuntansi Syariah', 'Ekonomi Syariah', 'Manajemen', 'Manajemen Keuangan Syaria'
  ];

  const departmentData = {
    labels: departmentLabels,
    datasets: [{
      label: `Jumlah Mahasiswa Tahun ${selectedDepartmentYear}`,
      data: departmentDataByYear[selectedDepartmentYear],
      backgroundColor: '#3b82f6'
    }]
  };

  const genderData = {
    labels: ['Laki-laki', 'Perempuan'],
    datasets: [{
      data: genderDataAPI,
      backgroundColor: ['#60a5fa', '#f472b6']
    }]
  };

  const growthData = {
    labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
    datasets: [{
      label: 'Jumlah Mahasiswa Aktif',
      data: [50000, 58000, 65000, 71000, 76000, 79420],
      borderColor: '#4ade80',
      backgroundColor: 'rgba(74, 222, 128, 0.2)',
      tension: 0.4,
      fill: true
    }]
  };

  const facultyData = {
    labels: ['F. Ushuluddin', 'FTK', 'F. SyarKum', 'F. DaKom', 'FAH', 'F. Psikologi', 'FST', 'FISIP', 'FEBI'],
    datasets: [{
      label: 'Jumlah Mahasiswa',
      data: [1200, 3200, 2100, 1800, 1500, 3200, 3000, 3100, 2300],
      borderColor: '#38bdf8',
      backgroundColor: 'rgba(56, 189, 248, 0.2)',
      tension: 0.3,
      fill: true
    }]
  };

  return (
    <div className={`student-population-page ${isDarkMode ? "dark-mode" : ""}`}>
      <Sidebar isLoggedIn={false} userRole="general" />

      <div className="population-layout">
        <Header
          isLoggedIn={false}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <main className="population-main">
          <div className="population-chart-wrapper p-4 space-y-6">

            <button onClick={() => navigate('/')} className="back-button flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="back-icon w-5 h-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Kembali ke Dashboard
            </button>

            <h1 className="population-title text-gray-800 dark:text-gray-100 text-xl font-semibold">
              Data Populasi Mahasiswa/i Aktif UIN New York
            </h1>

            <div className="population-card bg-gray-50 dark:bg-gray-800 shadow rounded-lg p-4">
              <div className="chart-header flex justify-between items-center mb-2">
                <h2 className="text-lg font-medium">
                  Data Mahasiswa/i Per Jurusan Tahun {selectedDepartmentYear}
                </h2>
                <select
                  className="year-filter bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 rounded p-1"
                  value={selectedDepartmentYear}
                  onChange={(e) => setSelectedDepartmentYear(e.target.value)}
                >
                  {[2020, 2021, 2022, 2023, 2024, 2025].map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div className="h-96"><Bar data={departmentData} /></div>
            </div>

            <div className="chart-two-column grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="population-card bg-gray-50 dark:bg-gray-800 shadow rounded-lg p-4">
                <h3 className="text-lg font-medium">Persentase Jumlah Laki-laki dan Perempuan</h3>
                <Pie data={genderData} />
                <p className="note text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Data dari API lokal UIN New York
                </p>
              </div>

              <div className="space-y-4">
                <div className="line-card population-card bg-gray-50 dark:bg-gray-800 shadow rounded-lg p-4">
                  <h3 className="text-lg font-medium">Grafik Jumlah Mahasiswa Aktif 2020–2025</h3>
                  <Line data={growthData} />
                </div>

                <div className="line-card population-card bg-gray-50 dark:bg-gray-800 shadow rounded-lg p-4">
                  <h3 className="text-lg font-medium">Grafik Jumlah Mahasiswa Aktif per Fakultas 2025</h3>
                  <Line data={facultyData} />
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer isLoggedIn={false} />
      </div>
    </div>
  );
};

export default StudentPopulationPage;
