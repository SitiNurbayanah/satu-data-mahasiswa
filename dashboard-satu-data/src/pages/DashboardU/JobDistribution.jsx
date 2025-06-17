import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom'
import '../../styles/JobDistribution.css'

ChartJS.register(ArcElement, Tooltip, Legend)

const JobDistribution = () => {
  const navigate = useNavigate()

  const jobFields = [
    { name: 'Pendidikan', percentage: 21 },
    { name: 'Wirausaha', percentage: 11 },
    { name: 'Perbankan Syariah', percentage: 27 },
    { name: 'Media dan Komunikasi', percentage: 41 }
  ]

  const chartData = {
    labels: jobFields.map(field => field.name),
    datasets: [{
      data: jobFields.map(field => field.percentage),
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0'
      ],
      borderWidth: 1
    }]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Persebaran Bidang Kerja (%)',
        font: {
          size: 18
        }
      }
    }
  }

  return (
    <div className="job-distribution-container">
      <Sidebar />
      <div className="job-distribution-content">
        <Header />
        <main className="job-distribution-main">
          <div className="job-distribution-wrapper">
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

            <h1 className="job-distribution-title">Grafik Persebaran Bidang Kerja</h1>
            
            {/* Pie Chart */}
            <div className="pie-chart-container">
              <Pie data={chartData} options={options} />
            </div>

            {/* Job Field List */}
            <div className="job-fields-section">
              <h2 className="job-fields-title">Bidang Kerja</h2>
              <div className="job-fields-list">
                {jobFields.map((field, index) => (
                  <div key={index} className="job-field-item">
                    <div 
                      className="job-field-color" 
                      style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }}
                    ></div>
                    <span className="job-field-text">{field.name}: {field.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default JobDistribution