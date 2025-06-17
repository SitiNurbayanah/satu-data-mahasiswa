import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import DashboardMahasiswa from "./pages/DashboardM/Dashboard-mahasiswa";
import DashboardUmum from "./pages/DashboardU/Dashboard-umum";
import StudentPopulationPage from "./pages/DashboardU/PopulationChart";
import GraduationChart from "./pages/DashboardU/GraduationChart";
import JobDistribution from "./pages/DashboardU/JobDistribution";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Halaman default langsung ke DashboardUmum */}
          <Route path="/" element={<DashboardUmum />} />
          
          {/* Route untuk halaman-halaman khusus */}
          <Route path="/population-chart" element={<StudentPopulationPage />} />
          <Route path="/graduation-chart" element={<GraduationChart />} />
          <Route path="/job-distribution" element={<JobDistribution />} />
          
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <DashboardMahasiswa />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          
          {/* Fallback route untuk handle 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;