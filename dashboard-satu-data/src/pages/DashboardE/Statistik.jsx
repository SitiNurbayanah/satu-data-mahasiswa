import React, { useState, useEffect } from 'react';
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

const Statistik = ({ onLogout, isDarkMode, toggleDarkMode }) => {
    const [trackingData, setTrackingData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Separate state for Academic Risk section
    const [selectedFakultasRisiko, setSelectedFakultasRisiko] = useState('Semua');
    const [selectedJurusanRisiko, setSelectedJurusanRisiko] = useState('Semua');
    
    // Separate state for Graduation Percentage section
    const [selectedFakultasKelulusan, setSelectedFakultasKelulusan] = useState('Semua');

    useEffect(() => {
        const fetchTrackingData = async () => {
            try {
                const response = await fetch('http://localhost:5000/view/tracking-mahasiswa');
                if (!response.ok) {
                    throw new Error('Gagal mengambil data');
                }
                const data = await response.json();
                console.log("DEBUG fetched data:", data);
                setTrackingData(Array.isArray(data) ? data : (data?.data ?? []));

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTrackingData();
    }, []);

    const fakultasOptions = [
        'Semua',
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

    const jurusanByFakultas = {
        'Semua': ['Semua'],
        'Fakultas Tarbiyah dan Keguruan': [
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
        'Fakultas Psikologi': ['Semua', 'Psikologi'],
        'Fakultas Sains dan Teknologi': [
            'Semua',
            'Matematika',
            'Biologi',
            'Fisika',
            'Kimia',
            'Teknik Informatika',
            'Agroteknologi',
            'Teknik Elektro'
        ],
        'Fakultas Ushuluddin': [
            'Semua',
            'Ilmu al-Qur\'an dan Tafsir',
            'Aqidah dan Filsafat Islam',
            'Studi Agama-Agama',
            'Tasawuf Psikoterapi',
            'Ilmu Hadits'
        ],
        'Fakultas Syariah dan Hukum': [
            'Semua',
            'Hukum Keluarga (Ahwal Al-Syakhsiyyah)',
            'Hukum Ekonomi Syariah (Muamalah)',
            'Hukum Tata Negara (Siyasah)',
            'Perbandingan Madzhab',
            'Ilmu Hukum',
            'Hukum Pidana Islam (Jinayah)'
        ],
        'Fakultas Dakwah dan Komunikasi': [
            'Semua',
            'Ilmu Komunikasi',
            'Komunikasi Penyiaran Islam',
            'Bimbingan dan Konseling Islam',
            'Manajemen Dakwah',
            'Pengembangan Masyarakat Islam'
        ],
        'Fakultas Adab dan Humaniora': [
            'Semua',
            'Sejarah Peradaban Islam',
            'Bahasa dan Sastra Arab',
            'Sastra Inggris'
        ],
        'Fakultas Ilmu Sosial dan Ilmu Politik': [
            'Semua',
            'Administrasi Publik',
            'Sosiologi',
            'Ilmu Politik'
        ],
        'Fakultas Ekonomi dan Bisnis Islam': [
            'Semua',
            'Akutansi Syariah',
            'Ekonomi Syariah',
            'Manajemen',
            'Manajemen Keuangan Syariah'
        ]
    };

    // Dynamic data based on selected filters
    const getDynamicRisikoData = () => {
        if (!Array.isArray(trackingData) || trackingData.length === 0) {
            return { optimal: 0, pemantauan: 0, peringatan: 0 };
        }

        // Filter berdasarkan fakultas & jurusan
        let filteredData = trackingData;
        if (selectedFakultasRisiko !== 'Semua') {
            filteredData = filteredData.filter(item => item.nama_fakultas === selectedFakultasRisiko);
        }
        if (selectedJurusanRisiko !== 'Semua') {
            filteredData = filteredData.filter(item => item.nama_prodi === selectedJurusanRisiko);
        }

        // Hitung jumlah masing-masing kategori
        const total = filteredData.length;
        const optimal = filteredData.filter(item => 
            item.kategori_risiko === 'Progres Normal' || 
            item.kategori_risiko === 'Progress Optimal'
        ).length;
        const pemantauan = filteredData.filter(item => 
            item.kategori_risiko === 'Pemantauan' || 
            item.kategori_risiko === 'Pennantauan'
        ).length;
        const peringatan = filteredData.filter(item => 
            item.kategori_risiko === 'Peringatan' || 
            item.kategori_risiko === 'Penngatan'
        ).length;

        return {
            optimal: total ? (optimal / total * 100) : 0,
            pemantauan: total ? (pemantauan / total * 100) : 0,
            peringatan: total ? (peringatan / total * 100) : 0
        };
    };

    const generateCompleteWeekData = (filteredData) => {
        const weekData = [];
        
        for (let i = 1; i <= 7; i++) {
            const weekName = `Minggu ${i}`;
            const weekItems = filteredData.filter(item => 
                (item.minggu === weekName) || 
                (item.week_number === i)
            );
            
            const total = weekItems.length;
            const optimal = weekItems.filter(item => 
                item.kategori_risiko === 'Progres Normal' || 
                item.kategori_risiko === 'Progress Optimal'
            ).length;
            const pemantauan = weekItems.filter(item => 
                item.kategori_risiko === 'Pemantauan' || 
                item.kategori_risiko === 'Pennantauan'
            ).length;
            const peringatan = weekItems.filter(item => 
                item.kategori_risiko === 'Peringatan' || 
                item.kategori_risiko === 'Penngatan'
            ).length;
            
            weekData.push({
                week: weekName,
                optimal: total ? (optimal / total * 100) : 0,
                pemantauan: total ? (pemantauan / total * 100) : 0,
                peringatan: total ? (peringatan / total * 100) : 0
            });
        }
        
        return weekData;
    };

    const getDynamicTrenData = () => {
        if (!Array.isArray(trackingData) || trackingData.length === 0) {
            // Return complete dummy data for all weeks
            return [
                { week: 'Minggu 1', optimal: 75, pemantauan: 15, peringatan: 10 },
                { week: 'Minggu 2', optimal: 72, pemantauan: 18, peringatan: 10 },
                { week: 'Minggu 3', optimal: 70, pemantauan: 20, peringatan: 10 },
                { week: 'Minggu 4', optimal: 68, pemantauan: 22, peringatan: 10 },
                { week: 'Minggu 5', optimal: 65, pemantauan: 25, peringatan: 10 },
                { week: 'Minggu 6', optimal: 63, pemantauan: 27, peringatan: 10 },
                { week: 'Minggu 7', optimal: 60, pemantauan: 30, peringatan: 10 },
            ];
        }

        let filteredData = trackingData;
        if (selectedFakultasRisiko !== 'Semua') {
            filteredData = filteredData.filter(item => item.nama_fakultas === selectedFakultasRisiko);
        }
        if (selectedJurusanRisiko !== 'Semua') {
            filteredData = filteredData.filter(item => item.nama_prodi === selectedJurusanRisiko);
        }

        // Generate complete week data (1-7)
        return generateCompleteWeekData(filteredData);
    };

    const currentTrenData = getDynamicTrenData();
    console.log("DEBUG isi trackingData:", trackingData.slice(0, 5)); // tampilkan 5 pertama
    const currentRisikoData = getDynamicRisikoData();

    const doughnutData = {
        labels: ['Progress Optimal', 'Pemantauan', 'Peringatan'],
        datasets: [{
            data: [currentRisikoData.optimal, currentRisikoData.pemantauan, currentRisikoData.peringatan],
            backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
            borderColor: ['#10B981', '#F59E0B', '#EF4444'],
            borderWidth: 2,
            hoverOffset: 4
        }]
    };

    const lineData = {
        labels: currentTrenData.map(item => item.week),
        datasets: [
            {
                label: 'Progress Optimal',
                data: currentTrenData.map(item => item.optimal),
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.3,
                pointRadius: 5,
                pointHoverRadius: 7,
                borderWidth: 2,
                fill: true
            },
            {
                label: 'Pemantauan',
                data: currentTrenData.map(item => item.pemantauan),
                borderColor: '#F59E0B',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                tension: 0.3,
                pointRadius: 5,
                pointHoverRadius: 7,
                borderWidth: 2,
                fill: true
            },
            {
                label: 'Peringatan',
                data: currentTrenData.map(item => item.peringatan),
                borderColor: '#EF4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.3,
                pointRadius: 5,
                pointHoverRadius: 7,
                borderWidth: 2,
                fill: true
            }
        ]
    };

    // Dynamic graduation data based on faculty
    const getDynamicKelulusanData = () => {
        const kelulusanVariations = {
            'Semua': [85, 88, 90, 92],
            'Fakultas Tarbiyah dan Keguruan': [87, 89, 91, 93],
            'Fakultas Psikologi': [89, 91, 93, 95],
            'Fakultas Sains dan Teknologi': [82, 85, 88, 90],
            'Fakultas Ushuluddin': [84, 87, 89, 91],
            'Fakultas Syariah dan Hukum': [86, 88, 90, 92],
            'Fakultas Dakwah dan Komunikasi': [85, 87, 89, 91],
            'Fakultas Adab dan Humaniora': [83, 86, 88, 90],
            'Fakultas Ilmu Sosial dan Ilmu Politik': [88, 90, 92, 94],
            'Fakultas Ekonomi dan Bisnis Islam': [90, 92, 94, 96]
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
                <Header
                    isLoggedIn={true}
                    userRole="eksekutif"
                    onLogout={onLogout}
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                />
                <main className="statistik-main">
                    <div className="statistik-chart-wrapper"
                        style={{
                            backgroundColor: isDarkMode ? "#2a2a2a" : "white",
                            color: isDarkMode ? "white" : "black",
                        }}>
                        <h1 className="statistik-title"
                            style={{
                                backgroundColor: isDarkMode ? "#2a2a2a" : "white",
                                color: isDarkMode ? "white" : "#202937",
                            }}
                        >Statistik Akademik Mahasiswa
                        </h1>

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
                                        disabled={!selectedFakultasRisiko || selectedFakultasRisiko === 'Semua'}
                                    >
                                        {(jurusanByFakultas[selectedFakultasRisiko] || ['Semua']).map(jurusan => (
                                            <option key={jurusan} value={jurusan}>{jurusan}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="chart-grid">
                                {/* Doughnut Chart */}
                                <div className="statistik-card chart-centered">
                                    <h3>Risiko Akademik Mahasiswa</h3>
                                    {loading ? (
                                        <div className="loading-indicator">Memuat data...</div>
                                    ) : error ? (
                                        <div className="error-message">Error: {error}</div>
                                    ) : (
                                        <div style={{ height: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <div style={{ width: '300px', height: '300px' }}>
                                                <Doughnut data={doughnutData}/>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Line Chart - Tren Status per Waktu */}
                                <div className="statistik-card chart-centered">
                                    <h3 style={{ color: isDarkMode ? 'white' : 'white' }}>Tren Status per Waktu</h3>
                                    {loading ? (
                                        <div className="loading-indicator">Memuat data...</div>
                                    ) : error ? (
                                        <div className="error-message">Error: {error}</div>
                                    ) : (
                                        <>
                                            <div style={{ 
                                                height: '350px', 
                                                display: 'flex', 
                                                justifyContent: 'center', 
                                                alignItems: 'center',
                                                color: isDarkMode ? 'white' : '#333' // Warna teks default
                                            }}>
                                                <div style={{ width: '100%', height: '300px' }}>
                                                    <Line 
                                                        data={{
                                                            labels: lineData.labels || ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4', 'Minggu 5', 'Minggu 6', 'Minggu 7'],
                                                            datasets: lineData.datasets || [
                                                                {
                                                                    label: 'Aman',
                                                                    data: [65, 59, 80, 81, 56, 55, 40],
                                                                    borderColor: '#4ade80',
                                                                    backgroundColor: 'rgba(74, 222, 128, 0.2)',
                                                                    tension: 0.3
                                                                },
                                                                {
                                                                    label: 'Peringatan',
                                                                    data: [28, 48, 40, 19, 86, 27, 90],
                                                                    borderColor: '#fbbf24',
                                                                    backgroundColor: 'rgba(251, 191, 36, 0.2)',
                                                                    tension: 0.3
                                                                },
                                                                {
                                                                    label: 'Bahaya',
                                                                    data: [7, 13, 20, 10, 8, 18, 20],
                                                                    borderColor: '#f87171',
                                                                    backgroundColor: 'rgba(248, 113, 113, 0.2)',
                                                                    tension: 0.3
                                                                }
                                                            ]
                                                        }} 
                                                        options={{
                                                            responsive: true,
                                                            maintainAspectRatio: false,
                                                            plugins: {
                                                                legend: {
                                                                    position: 'top',
                                                                    labels: {
                                                                        usePointStyle: true,
                                                                        padding: 20,
                                                                        color: isDarkMode ? 'white' : '#666',
                                                                        font: {
                                                                            size: 12
                                                                        }
                                                                    }
                                                                },
                                                                tooltip: {
                                                                    callbacks: {
                                                                        label: function(context) {
                                                                            return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}%`;
                                                                        }
                                                                    },
                                                                    backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                                                                    titleColor: isDarkMode ? 'white' : '#333',
                                                                    bodyColor: isDarkMode ? 'white' : '#666',
                                                                    borderColor: isDarkMode ? '#374151' : '#e5e7eb',
                                                                    borderWidth: 1
                                                                }
                                                            },
                                                            scales: {
                                                                y: {
                                                                    beginAtZero: true,
                                                                    max: 100,
                                                                    ticks: {
                                                                        color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                                                                        callback: function(value) {
                                                                            return value + '%';
                                                                        },
                                                                        font: {
                                                                            size: 12
                                                                        }
                                                                    },
                                                                    grid: {
                                                                        color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                                                                    }
                                                                },
                                                                x: {
                                                                    grid: {
                                                                        display: false
                                                                    },
                                                                    ticks: {
                                                                        color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                                                                        font: {
                                                                            size: 12
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            elements: {
                                                                point: {
                                                                    radius: 4,
                                                                    hoverRadius: 6
                                                                }
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="chart-note" style={{ color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : '#666' }}>
                                                <p>Perkembangan status akademik mahasiswa selama 7 minggu terakhir</p>
                                            </div>
                                        </>
                                    )}
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