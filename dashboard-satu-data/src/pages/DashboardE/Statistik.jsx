import React, { useState } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
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
    LineElement
} from 'chart.js';
import '../../styles/Statistik.css';
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

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

const Statistik = ({ onLogout }) => {
    // Separate state for Academic Risk section
    const [selectedFakultasRisiko, setSelectedFakultasRisiko] = useState('Semua');
    const [selectedJurusanRisiko, setSelectedJurusanRisiko] = useState('Semua');
    
    // Separate state for Graduation Percentage section
    const [selectedFakultasKelulusan, setSelectedFakultasKelulusan] = useState('Semua');

    const fakultasOptions = [
        'Semua',
        'Tarbiyah dan Keguruan',
        'Psikologi',
        'FST',
        'Ushuluddin',
        'Syariah dan Hukum',
        'Dakwah dan Komunikasi',
        'Adab dan Humaniora',
        'Ilmu Sosial dan Ilmu Politik',
        'Ekonomi dan Bisnis Islam'
    ];

    const jurusanByFakultas = {
        'Semua': ['Semua'],
        'Tarbiyah dan Keguruan': [
            'Semua',
            'Manajemen Pendidikan Islam',
            'Pendidikan Agama Islam',
            'Pendidikan Bahasa Arab',
            'Pendidikan Bahasa Inggris',
            'Pendidikan Matematika',
            'Pendidikan Biologi',
            'Pendidikan Kimia',
            'Pendidikan Fisika',
            'Pendidikan Guru Madrasah Ibtidaiyah',
            'Pendidikan Islam Anak Usia Dini'
        ],
        'Psikologi': ['Semua', 'Psikologi'],
        'FST': [
            'Semua',
            'Matematika',
            'Biologi',
            'Fisika',
            'Kimia',
            'Teknik Informatika',
            'Agroteknologi',
            'Teknik Elektro'
        ],
        'Ushuluddin': [
            'Semua',
            'Ilmu al-Qur\'an dan Tafsir/Tafsir Hadits',
            'Aqidah dan Filsafat Islam',
            'Studi Agama-Agama',
            'Tasawuf Psikoterapi',
            'Ilmu Hadits'
        ],
        'Syariah dan Hukum': [
            'Semua',
            'Hukum Keluarga (Ahwal Al-Syakhsiyyah)',
            'Hukum Ekonomi Syariah (Muamalah)',
            'Hukum Tata Negara (Siyasah)',
            'Perbandingan Madzhab',
            'Ilmu Hukum',
            'Hukum Pidana Islam (Jinayah)'
        ],
        'Dakwah dan Komunikasi': [
            'Semua',
            'Ilmu Komunikasi',
            'Komunikasi Penyiaran Islam',
            'Bimbingan dan Konseling Islam',
            'Manajemen Dakwah',
            'Pengembangan Masyarakat Islam'
        ],
        'Adab dan Humaniora': [
            'Semua',
            'Sejarah Peradaban Islam',
            'Bahasa dan Sastra Arab',
            'Sastra Inggris'
        ],
        'Ilmu Sosial dan Ilmu Politik': [
            'Semua',
            'Administrasi Publik',
            'Sosiologi',
            'Ilmu Politik'
        ],
        'Ekonomi dan Bisnis Islam': [
            'Semua',
            'Akutansi Syariah',
            'Ekonomi Syariah',
            'Manajemen',
            'Manajemen Keuangan Syaria'
        ]
    };

    // Dynamic data based on selected filters
    const getDynamicRisikoData = () => {
        const dataVariations = {
            'Semua': { optimal: 55, pemantauan: 30, peringatan: 15 },
            'Tarbiyah dan Keguruan': { optimal: 62, pemantauan: 25, peringatan: 13 },
            'Psikologi': { optimal: 58, pemantauan: 28, peringatan: 14 },
            'FST': { optimal: 65, pemantauan: 22, peringatan: 13 },
            'Ushuluddin': { optimal: 52, pemantauan: 33, peringatan: 15 },
            'Syariah dan Hukum': { optimal: 59, pemantauan: 26, peringatan: 15 },
            'Dakwah dan Komunikasi': { optimal: 61, pemantauan: 24, peringatan: 15 },
            'Adab dan Humaniora': { optimal: 56, pemantauan: 29, peringatan: 15 },
            'Ilmu Sosial dan Ilmu Politik': { optimal: 60, pemantauan: 25, peringatan: 15 },
            'Ekonomi dan Bisnis Islam': { optimal: 63, pemantauan: 23, peringatan: 14 }
        };

        const baseData = dataVariations[selectedFakultasRisiko] || dataVariations['Semua'];
        
        // Adjust data slightly for specific jurusan
        if (selectedJurusanRisiko !== 'Semua') {
            const adjustment = Math.random() * 10 - 5; // Random adjustment between -5 and 5
            return {
                optimal: Math.max(0, Math.min(100, baseData.optimal + adjustment)),
                pemantauan: Math.max(0, Math.min(100, baseData.pemantauan - adjustment/2)),
                peringatan: Math.max(0, Math.min(100, baseData.peringatan - adjustment/2))
            };
        }
        
        return baseData;
    };

    const getDynamicTrenData = () => {
        const baseData = getDynamicRisikoData();
        const variation = 5;
        
        return [
            { 
                week: 'Minggu 1', 
                optimal: Math.max(0, baseData.optimal - variation), 
                pemantauan: baseData.pemantauan + variation/2, 
                peringatan: baseData.peringatan + variation/2 
            },
            { 
                week: 'Minggu 2', 
                optimal: Math.max(0, baseData.optimal - variation/2), 
                pemantauan: baseData.pemantauan, 
                peringatan: baseData.peringatan + variation/2 
            },
            { 
                week: 'Minggu 3', 
                optimal: baseData.optimal, 
                pemantauan: baseData.pemantauan, 
                peringatan: baseData.peringatan 
            },
            { 
                week: 'Minggu 4', 
                optimal: Math.min(100, baseData.optimal + variation/2), 
                pemantauan: Math.max(0, baseData.pemantauan - variation/2), 
                peringatan: Math.max(0, baseData.peringatan - variation/2) 
            }
        ];
    };

    // Get current data
    const currentRisikoData = getDynamicRisikoData();
    const currentTrenData = getDynamicTrenData();

    // Doughnut Chart data
    const doughnutData = {
        labels: ['Progres Optimal', 'Pemantauan', 'Peringatan'],
        datasets: [{
            data: [currentRisikoData.optimal, currentRisikoData.pemantauan, currentRisikoData.peringatan],
            backgroundColor: ['#00CA9B', '#00FF51', '#BCFF36'],
            borderColor: ['#00CA9B', '#00FF51', '#BCFF36'],
            borderWidth: 2,
            hoverOffset: 4
        }]
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        size: 12
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.label}: ${context.parsed}%`;
                    }
                }
            }
        },
        cutout: '50%'
    };

    // Line Chart data
    const lineData = {
        labels: currentTrenData.map(item => item.week),
        datasets: [
            {
                label: 'Progres Optimal',
                data: currentTrenData.map(item => item.optimal),
                borderColor: '#10B981',
                backgroundColor: '#10B981',
                tension: 0.3,
                pointRadius: 5,
                pointHoverRadius: 7
            },
            {
                label: 'Pemantauan',
                data: currentTrenData.map(item => item.pemantauan),
                borderColor: '#F59E0B',
                backgroundColor: '#F59E0B',
                tension: 0.3,
                pointRadius: 5,
                pointHoverRadius: 7
            },
            {
                label: 'Peringatan',
                data: currentTrenData.map(item => item.peringatan),
                borderColor: '#EF4444',
                backgroundColor: '#EF4444',
                tension: 0.3,
                pointRadius: 5,
                pointHoverRadius: 7
            }
        ]
    };

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        size: 12
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.parsed.y}%`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    callback: function(value) {
                        return value + '%';
                    }
                }
            }
        }
    };

    // Dynamic graduation data based on faculty
    const getDynamicKelulusanData = () => {
        const kelulusanVariations = {
            'Semua': [85, 88, 90, 92],
            'Tarbiyah dan Keguruan': [87, 89, 91, 93],
            'Psikologi': [89, 91, 93, 95],
            'FST': [82, 85, 88, 90],
            'Ushuluddin': [84, 87, 89, 91],
            'Syariah dan Hukum': [86, 88, 90, 92],
            'Dakwah dan Komunikasi': [85, 87, 89, 91],
            'Adab dan Humaniora': [83, 86, 88, 90],
            'Ilmu Sosial dan Ilmu Politik': [88, 90, 92, 94],
            'Ekonomi dan Bisnis Islam': [90, 92, 94, 96]
        };

        return kelulusanVariations[selectedFakultasKelulusan] || kelulusanVariations['Semua'];
    };

    // Get current graduation data
    const currentKelulusanData = getDynamicKelulusanData();

    // Data kelulusan untuk Chart.js Bar Chart
    const kelulusanData = {
        labels: ['2022', '2023', '2024', '2025'],
        datasets: [{
            label: 'Persentase Kelulusan (%)',
            data: currentKelulusanData,
            backgroundColor: '#3b82f6',
            borderColor: '#3b82f6',
            borderWidth: 1
        }]
    };

    // Chart.js options similar to PopulationChart
    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.parsed.y}%`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    callback: function (value) {
                        return value + '%';
                    }
                }
            }
        }
    };

    // Dynamic table data based on selected faculty for Graduation section
    const getDynamicTableData = () => {
        const jurusanList = jurusanByFakultas[selectedFakultasKelulusan].filter(j => j !== 'Semua');
        
        // Base graduation rates for different majors (with some variation)
        const generateGraduationRates = (year, baseRate) => {
            return jurusanList.map((_, index) => {
                const variation = (Math.sin(index * 2.5) * 5) + (Math.random() * 4 - 2);
                return Math.max(70, Math.min(98, Math.round(baseRate + variation)));
            });
        };

        const tableData = [
            { 
                tahun: '2022', 
                rates: generateGraduationRates(2022, currentKelulusanData[0])
            },
            { 
                tahun: '2023', 
                rates: generateGraduationRates(2023, currentKelulusanData[1])
            },
            { 
                tahun: '2024', 
                rates: generateGraduationRates(2024, currentKelulusanData[2])
            },
            { 
                tahun: '2025', 
                rates: generateGraduationRates(2025, currentKelulusanData[3])
            }
        ];

        return { jurusanList, tableData };
    };

    const { jurusanList, tableData } = getDynamicTableData();

    const handleFakultasRisikoChange = (e) => {
        const fakultas = e.target.value;
        setSelectedFakultasRisiko(fakultas);
        setSelectedJurusanRisiko('Semua');
    };

    const handleFakultasKelulusanChange = (e) => {
        const fakultas = e.target.value;
        setSelectedFakultasKelulusan(fakultas);
    };

    return (
        <div className="statistik-container">
            <Sidebar isLoggedIn={true} userRole="eksekutif" onLogout={onLogout} />
            <div className="statistik-layout">
                <Header isLoggedIn={true} user="eksekutif" onLogout={onLogout} />
                <main className="statistik-main">
                    <div className="statistik-chart-wrapper">
                        <h1 className="statistik-title">Statistik Akademik Mahasiswa</h1>

                        {/* Status Mahasiswa Section */}
                        <div className="statistik-card wide">
                            <div className="chart-header">
                                <h2>Status Mahasiswa</h2>
                                <div className="year-filter-wrapper">
                                    <select
                                        className="year-filter"
                                        value={selectedFakultasRisiko}
                                        onChange={handleFakultasRisikoChange}
                                    >
                                        {fakultasOptions.map((fakultas) => (
                                            <option key={fakultas} value={fakultas}>{fakultas}</option>
                                        ))}
                                    </select>
                                    <select
                                        className="year-filter"
                                        value={selectedJurusanRisiko}
                                        onChange={(e) => setSelectedJurusanRisiko(e.target.value)}
                                    >
                                        {jurusanByFakultas[selectedFakultasRisiko].map(jurusan => (
                                            <option key={jurusan} value={jurusan}>{jurusan}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="chart-grid">
                                {/* Interactive Doughnut Chart */}
                                <div className="statistik-card chart-centered">
                                    <h3>Risiko Akademik Mahasiswa</h3>
                                    <div style={{ height: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <div style={{ width: '300px', height: '300px' }}>
                                            <Doughnut data={doughnutData} options={doughnutOptions} />
                                        </div>
                                    </div>
                                </div>

                                {/* Interactive Line Chart */}
                                <div className="statistik-card chart-centered">
                                    <h3>Tren Status per Waktu</h3>
                                    <div style={{ height: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <div style={{ width: '100%', height: '300px' }}>
                                            <Line data={lineData} options={lineOptions} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Kelulusan Section */}
                        <div className="statistik-card wide">
                            <div className="chart-header">
                                <h2>Persentase Kelulusan</h2>
                                <div className="year-filter-wrapper">
                                    <select
                                        className="year-filter"
                                        value={selectedFakultasKelulusan}
                                        onChange={handleFakultasKelulusanChange}
                                    >
                                        {fakultasOptions.map((fakultas) => (
                                            <option key={fakultas} value={fakultas}>{fakultas}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Bar Chart */}
                            <div className="statistik-card">
                                <h3>Grafik Persentase Kelulusan - {selectedFakultasKelulusan}</h3>
                                <div style={{ height: '400px' }}>
                                    <Bar data={kelulusanData} options={barOptions} />
                                </div>
                            </div>

                            {/* Table */}
                            <div className="table-section">
                                <h3>Kelulusan per Jurusan - {selectedFakultasKelulusan}</h3>
                                <div className="table-wrapper">
                                    <table className="data-table">
                                        <thead className="table-head">
                                            <tr>
                                                <th className="table-header">Tahun</th>
                                                {jurusanList.map((jurusan, index) => (
                                                    <th key={index} className="table-header" style={{ minWidth: '120px' }}>
                                                        {jurusan.length > 20 ? `${jurusan.substring(0, 17)}...` : jurusan}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tableData.map((row, i) => (
                                                <tr key={i} className="table-row">
                                                    <td className="table-cell">{row.tahun}</td>
                                                    {row.rates.map((rate, index) => (
                                                        <td key={index} className="table-cell">{rate}%</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer isLoggedIn={true} />
            </div>
        </div>
    );
};

export default Statistik;