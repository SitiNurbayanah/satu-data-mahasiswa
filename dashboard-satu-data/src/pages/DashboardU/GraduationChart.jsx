import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import '../../styles/GraduationChart.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const GraduationChart = () => {
    const navigate = useNavigate()

    const faculties = [
        'Tarbiyah dan Keguruan',
        'Psikologi',
        'FST',
        'Ushuluddin',
        'Syariah dan Hukum',
        'Dakwah dan Komunikasi',
        'Adab dan Humaniora',
        'Ilmu Sosial dan Ilmu Politik',
        'Ekonomi dan Bisnis Islam'
    ]

    const years = ['2020', '2021', '2022', '2023', '2024', '2025']

    const generateFacultyData = () => {
        return years.map(() => Math.floor(Math.random() * 50) + 50)
    }

    const chartData = {
        labels: years,
        datasets: faculties.map((faculty, idx) => ({
        label: faculty,
        data: generateFacultyData(),
        borderColor: `hsl(${idx * 40}, 70%, 50%)`,
        backgroundColor: `hsl(${idx * 40}, 70%, 50%)`,
        tension: 0.3,
        borderWidth: 2
        }))
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
        legend: {
            position: 'bottom',
            labels: { boxWidth: 12 }
        }
        },
        scales: {
        y: {
            min: 50,
            max: 100,
            title: { display: true, text: 'Persentase Kelulusan (%)' }
        }
        }
    }

    return (
        <div className="graduation-chart-container">
            <Sidebar />
            <div className="graduation-chart-content">
                <Header />
                <main className="graduation-chart-main">
                    <div className="graduation-chart-wrapper">
                        <button 
                            onClick={() => navigate('/')}
                            className="back-button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="back-icon" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            Kembali ke Dashboard
                        </button>

                        <h1 className="graduation-chart-title">Grafik Kelulusan Mahasiswa per Fakultas Tahun 2020-2025</h1>
                        
                        <div className="chart-container">
                            <Line data={chartData} options={options} />
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default GraduationChart