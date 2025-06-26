import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import DashboardMahasiswa from "./pages/DashboardM/Dashboard-mahasiswa";
import DashboardEksekutif from "./pages/DashboardE/Dashboard-eksekutif";
import DashboardUmum from "./pages/DashboardU/Dashboard-umum";
import StudentPopulationPage from "./pages/DashboardU/PopulationChart";
import GraduationChart from "./pages/DashboardU/GraduationChart";
import JobDistribution from "./pages/DashboardU/JobDistribution";
import Statistik from "./pages/DashboardE/Statistik";
import KinerjaDosen from "./pages/DashboardE/kinerja_dosen";
import PembayaranUKT from "./pages/DashboardE/PembayaranUKT";
import "./App.css";

// Komponen pembungkus agar bisa akses useLocation di luar Router
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Re-sync setiap route berubah
  useEffect(() => {
    const auth = localStorage.getItem("user");
    const role = localStorage.getItem("role");

    if (auth && role) {
      setIsAuthenticated(true);
      setUserRole(role);
      setCurrentUser(JSON.parse(auth));
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
      setCurrentUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserRole(null);
    setCurrentUser(null);
  };

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (allowedRoles && !allowedRoles.includes(userRole))
      return <Navigate to="/" replace />;
    return children;
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DashboardUmum />} />
        <Route path="/population-chart" element={<StudentPopulationPage />} />
        <Route path="/graduation-chart" element={<GraduationChart />} />
        <Route path="/job-distribution" element={<JobDistribution />} />

        <Route
          path="/login"
          element={
            <Login
              setIsAuthenticated={setIsAuthenticated}
              setUserRole={setUserRole}
              setCurrentUser={setCurrentUser}
            />
          }
        />

        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              userRole === "mahasiswa" ? (
                <DashboardMahasiswa
                  user={currentUser}
                  onLogout={handleLogout}
                />
              ) : userRole === "eksekutif" || userRole === "dosen" ? (
                <DashboardEksekutif
                  user={currentUser}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/statistik"
          element={
            <ProtectedRoute allowedRoles={["eksekutif", "dosen"]}>
              <Statistik user={currentUser} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kinerja-dosen"
          element={
            <ProtectedRoute allowedRoles={["eksekutif", "dosen"]}>
              <KinerjaDosen user={currentUser} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pembayaran-ukt"
          element={
            <ProtectedRoute allowedRoles={["eksekutif", "dosen"]}>
              <PembayaranUKT user={currentUser} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default AppWrapper;
