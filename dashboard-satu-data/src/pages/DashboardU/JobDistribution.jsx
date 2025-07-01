import React, { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom'
import '../../styles/JobDistribution.css'

ChartJS.register(ArcElement, Tooltip, Legend)

const JobDistribution = ({ isDarkMode, toggleDarkMode }) => {
  const navigate = useNavigate()
  const [jobFields, setJobFields] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/view/statistik-alumni-perbidang')
        const data = await response.json()
        
        if (data.status === 'success' && Array.isArray(data.data)) {
          const total = data.data.reduce((sum, item) => sum + parseInt(item.total_alumni), 0)
          const formattedData = data.data.map(item => ({
            name: item.bidang_kerja_terkelompok,
            total: parseInt(item.total_alumni),
            percentage: Math.round((parseInt(item.total_alumni) / total) * 100)
          }))
          
          setJobFields(formattedData)
        } else {
          setError("Data format tidak valid")
        }
      } catch (err) {
        setError("Gagal memuat data: " + err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const backgroundColors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
    '#9966FF', '#FF9F40', '#00A36C', '#C71585',
    '#6B8E23', '#20B2AA', '#FFD700', '#6495ED',
    '#FFB6C1', '#90EE90', '#DDA0DD', '#FA8072',
    '#FF7F50', '#B0C4DE', '#00CED1', '#F08080'
  ]

  const chartData = {
    labels: jobFields.map(field => field.name),
    datasets: [{
      data: jobFields.map(field => field.total),
      backgroundColor: backgroundColors.slice(0, jobFields.length),
      borderWidth: 1,
      borderColor: isDarkMode ? '#374151' : '#f3f4f6'
    }]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: isDarkMode ? '#f0f0f0' : '#1f2937',
          font: {
            size: 12
          },
          padding: 12,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || ''
            const value = context.raw || 0
            const total = context.dataset.data.reduce((a, b) => a + b, 0)
            const percentage = Math.round((value / total) * 100)
            return `${label}: ${value} alumni (${percentage}%)`
          }
        }
      }
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  }

  if (isLoading) {
    return (
      <div className={`job-page ${isDarkMode ? 'dark-mode' : ''}`}>
        <Sidebar isLoggedIn={false} userRole="general" />
        <div className="job-layout">
          <Header
            isLoggedIn={false}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <main className="job-main">
            <div className="job-wrapper">
              <div className="loading-spinner">
                <div className="spinner"></div>
                <p className="loading-text">Memuat data...</p>
              </div>
            </div>
          </main>
          <Footer isLoggedIn={false} />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`job-page ${isDarkMode ? 'dark-mode' : ''}`}>
        <Sidebar isLoggedIn={false} userRole="general" />
        <div className="job-layout">
          <Header
            isLoggedIn={false}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <main className="job-main">
            <div className="job-wrapper">
              <div className="error-message">
                <p>{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="retry-button"
                >
                  Coba Lagi
                </button>
              </div>
            </div>
          </main>
          <Footer isLoggedIn={false} />
        </div>
      </div>
    )
  }

  return (
    <div className={`job-page ${isDarkMode ? 'dark-mode' : ''}`}>
      <Sidebar isLoggedIn={false} userRole="general" />

      <div className="job-layout">
        <Header
          isLoggedIn={false}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <main className="job-main">
          <div className="job-wrapper">
            <button
              onClick={() => navigate('/')}
              className="back-button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="back-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Kembali ke Dashboard
            </button>

            <h1 className="job-title">
              Grafik Persebaran Bidang Kerja Alumni
            </h1>

            <div className="pie-chart-container">
              {jobFields.length > 0 ? (
                <Pie 
                  data={chartData} 
                  options={options}
                />
              ) : (
                <p className="no-data">Tidak ada data yang tersedia</p>
              )}
            </div>

            <div className="job-fields-section">
              <h2 className="job-fields-title">Detail Bidang Kerja</h2>
              <div className="job-fields-list">
                {jobFields.map((field, index) => (
                  <div key={index} className="job-field-item">
                    <div
                      className="job-field-color"
                      style={{ backgroundColor: backgroundColors[index % backgroundColors.length] }}
                    ></div>
                    <span className="job-field-text">
                      {field.name}: {field.total} alumni ({field.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        <Footer isLoggedIn={false} />
      </div>
    </div>
  )
}

export default JobDistribution