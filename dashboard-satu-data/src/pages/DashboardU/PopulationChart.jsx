import React, { useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import '../../styles/PopulationChart.css';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
);

const StudentPopulationPage = () => {
    const navigate = useNavigate()
    const [selectedDepartmentYear, setSelectedDepartmentYear] = useState('2025');
    const [selectedGenderYear, setSelectedGenderYear] = useState('2025');

    const departmentDataByYear = {
        '2020': new Array(45).fill(0).map(() => Math.floor(Math.random() * 1000) + 500),
        '2021': new Array(45).fill(0).map(() => Math.floor(Math.random() * 1200) + 600),
        '2022': new Array(45).fill(0).map(() => Math.floor(Math.random() * 1300) + 700),
        '2023': new Array(45).fill(0).map(() => Math.floor(Math.random() * 1400) + 800),
        '2024': new Array(45).fill(0).map(() => Math.floor(Math.random() * 1500) + 900),
        '2025': [
            800, 750, 600, 500, 550, 1600, 1500, 1400, 1350, 1800, 1750, 1700, 1650, 1450, 1300,
            900, 850, 870, 820, 830, 810, 950, 920, 910, 890, 880,
            760, 740, 700, 2000, 1850, 1900, 1700, 1800, 1950, 1650, 1600,
            820, 780, 760, 720, 740, 730, 710
        ]
    };

    const departmentLabels = [
        'Ilmu al-Qur’an dan Tafsir/Tafsir Hadits',
        'Aqidah dan Filsafat Islam',
        'Studi Agama-Agama',
        'Tasawuf Psikoterapi',
        'Ilmu Hadits',
        'Manajemen Pendidikan Islam',
        'Pendidikan Agama Islam',
        'Pendidikan Bahasa Arab',
        'Pendidikan Bahasa Inggris',
        'Pendidikan Matematika',
        'Pendidikan Biologi',
        'Pendidikan Kimia',
        'Pendidikan Fisika',
        'Pendidikan Guru Madrasah Ibtidaiyah',
        'Pendidikan Islam Anak Usia Dini',
        'Hukum Keluarga (Ahwal Al-Syakhsiyyah)',
        'Hukum Ekonomi Syariah (Muamalah)',
        'Hukum Tata Negara (Siyasah)',
        'Perbandingan Madzhab',
        'Ilmu Hukum',
        'Hukum Pidana Islam (Jinayah)',
        'Ilmu Komunikasi',
        'Komunikasi Penyiaran Islam',
        'Bimbingan dan Konseling Islam',
        'Manajemen Dakwah',
        'Pengembangan Masyarakat Islam',
        'Sejarah Peradaban Islam',
        'Bahasa dan Sastra Arab',
        'Sastra Inggris',
        'Psikologi',
        'Matematika',
        'Biologi',
        'Fisika',
        'Kimia',
        'Teknik Informatika',
        'Agroteknologi',
        'Teknik Elektro',
        'Administrasi Publik',
        'Sosiologi',
        'Ilmu Politik',
        'Akutansi Syariah',
        'Ekonomi Syariah',
        'Manajemen',
        'Manajemen Keuangan Syaria'
    ];

    const departmentData = {
        labels: departmentLabels,
        datasets: [{
            label: `Jumlah Mahasiswa Tahun ${selectedDepartmentYear}`,
            data: departmentDataByYear[selectedDepartmentYear],
            backgroundColor: '#3b82f6'
        }]
    };

    const genderDataByYear = {
        '2020': [42, 58],
        '2021': [44, 56],
        '2022': [43, 57],
        '2023': [45, 55],
        '2024': [41, 59],
        '2025': [40, 60]
    };

    const genderData = {
        labels: ['Laki-laki', 'Perempuan'],
        datasets: [{
            data: genderDataByYear[selectedGenderYear],
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
        labels: [
            'F. Ushuluddin',
            'FTK',
            'F. SyarKum',
            'F. DaKom',
            'FAH',
            'F. Psikologi',
            'FST',
            'FISIP',
            'FEBI',
        ],
        datasets: [{
            label: 'Jumlah Mahasiswa',
            data: [1200, 3200, 2100, 1800, 1500, 3200, 3000, 3100, 2300, 1000],
            borderColor: '#38bdf8',
            backgroundColor: 'rgba(56, 189, 248, 0.2)',
            tension: 0.3,
            fill: true
        }]
    };

    const barOptions = { responsive: true, plugins: { legend: { display: false } } };
    const pieOptions = { responsive: true, plugins: { legend: { position: 'bottom' } } };
    const lineOptions = {
        responsive: true,
        plugins: { legend: { display: false } },
        maintainAspectRatio: false
    };
    const lineFacultyOptions = { responsive: true, plugins: { legend: { display: false } } };

    return (
        <div className="student-population-page">
            <Sidebar />
            <div className="population-layout">
                <Header className="population-header" isLoggedIn={false} />
                <main className="population-main">
                    <div className="population-chart-wrapper">
                        {/* Back Button */}
                        <button
                            onClick={() => navigate('/')}
                            className="back-button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="back-icon" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            Kembali ke Dashboard
                        </button>
                        <h1 className="population-title">Data Populasi Mahasiswa/i Aktif UIN New York</h1>

                        <div className="population-card wide">
                            <div className="chart-header">
                                <h2>Data Mahasiswa/i Per Jurusan Tahun {selectedDepartmentYear}</h2>
                                <div className="year-filter-wrapper">
                                    <select
                                        className="year-filter"
                                        value={selectedDepartmentYear}
                                        onChange={(e) => setSelectedDepartmentYear(e.target.value)}
                                    >
                                        {[2020, 2021, 2022, 2023, 2024, 2025].map((year) => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <Bar data={departmentData} options={barOptions} />
                        </div>

                        <div className="chart-two-column">
                            <div className="left-card">
                                <div className="population-card">
                                    <h3>Persentase Jumlah Laki-laki dan Perempuan Tahun {selectedGenderYear}</h3>
                                    <div className="year-filter-wrapper">
                                        <select
                                            className="year-filter"
                                            value={selectedGenderYear}
                                            onChange={(e) => setSelectedGenderYear(e.target.value)}
                                        >
                                            {[2020, 2021, 2022, 2023, 2024, 2025].map((year) => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <Pie data={genderData} options={pieOptions} />
                                    <p className="note">Dengan total <strong>79.420 Mahasiswa/i</strong> di UIN New York</p>
                                </div>
                            </div>

                            <div className="right-card">
                                <div className="line-card population-card">
                                    <h3>Grafik Jumlah Mahasiswa Aktif UIN New York Tahun 2020–2025</h3>
                                    <Line
                                        data={growthData}
                                        options={{
                                            ...lineOptions,
                                            scales: {
                                                y: {
                                                    min: 0,
                                                    max: 80000,
                                                    ticks: {
                                                        stepSize: 20000,
                                                        callback: value => new Intl.NumberFormat('id-ID').format(value)
                                                    }
                                                }
                                            }
                                        }}
                                    />
                                </div>

                                <div className="line-card population-card">
                                    <h3>Grafik Jumlah Mahasiswa Aktif per Fakultas Tahun 2025</h3>
                                    <Line data={facultyData} options={lineFacultyOptions} />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer isLoggedIn={true}/>
            </div>
        </div>
    );
};

export default StudentPopulationPage;