import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import '../../styles/GraduationChart.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const GraduationChart = ({ isDarkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const faculties = [
    'Fakultas Tarbiyah dan Keguruan',
    'Fakultas Psikologi',
    'Fakultas Sains dan Teknologi',
    'Fakultas Ushuluddin',
    'Fakultas Syariah dan Hukum',
    'Fakultas Dakwah dan Komunikasi',
    'Fakultas Adab dan Humaniora',
    'Fakultas Ilmu Sosial dan Ilmu Politik',
    'Fakultas Ekonomi dan Bisnis Islam'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5000/view/statistik-alumni');
        if (!res.ok) throw new Error('Gagal mengambil data dari server');
        const data = await res.json();

        // Pastikan data API sesuai format { years: [], stats: { fakultas: [values] } }
        const years = data.years || ['2020', '2021', '2022', '2023', '2024', '2025'];
        const datasets = faculties.map((faculty, idx) => ({
          label: faculty,
          data: data.stats?.[faculty] || years.map(() => Math.floor(Math.random() * 50) + 50),
          borderColor: `hsl(${idx * 40}, 70%, 50%)`,
          backgroundColor: `hsl(${idx * 40}, 70%, 50%)`,
          tension: 0.3,
          borderWidth: 2,
        }));

        setChartData({ labels: years, datasets });
      } catch (err) {
        console.error(err);
        setError('Terjadi kesalahan saat memuat data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { boxWidth: 12, color: isDarkMode ? '#eee' : '#333' },
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        title: { display: true, text: 'Persentase Kelulusan (%)', color: isDarkMode ? '#eee' : '#333' },
        ticks: { color: isDarkMode ? '#eee' : '#333' },
      },
      x: {
        ticks: { color: isDarkMode ? '#eee' : '#333' },
      },
    },
  };

  return (
    <div className={`graduation-page ${isDarkMode ? 'dark-mode' : ''}`}>
      <Sidebar isLoggedIn={false} userRole="general" />
      <div className="graduation-layout">
        <Header
          className="graduation-header"
          isLoggedIn={false}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <main className="graduation-main">
          <div className="graduation-chart-wrapper">
            <button onClick={() => navigate('/')} className="back-button">
              <svg xmlns="http://www.w3.org/2000/svg" className="back-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Kembali ke Dashboard
            </button>

            <h1 className="graduation-title">Grafik Kelulusan Mahasiswa per Fakultas</h1>

            {loading ? (
              <p style={{ textAlign: 'center' }}>Memuat data...</p>
            ) : error ? (
              <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
            ) : (
              <div className="chart-container">
                <Line data={chartData} options={options} />
              </div>
            )}
          </div>
        </main>
        <Footer isLoggedIn={false} />
      </div>
    </div>
  );
};

export default GraduationChart;
