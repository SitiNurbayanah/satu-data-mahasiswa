import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";

// Dashboard Umum
import DashboardUmum from "./pages/DashboardU/Dashboard-umum";
import About from "./pages/DashboardU/about";
import StudentPopulationPage from "./pages/DashboardU/PopulationChart";
import GraduationChart from "./pages/DashboardU/GraduationChart";
import JobDistribution from "./pages/DashboardU/JobDistribution";

// Dashboard Mahasiswa
import DashboardMahasiswa from "./pages/DashboardM/Dashboard-mahasiswa";
import AboutMahasiswa from "./pages/DashboardM/about";
import KinerjaAkademik from "./pages/DashboardM/kinerja_akademik";
import MyStatistik from "./pages/DashboardM/my-statistik";
import CourseHistoryChart from "./pages/DashboardM/CourseHistoryChart";

// Dashboard Eksekutif/Dosen
import DashboardEksekutif from "./pages/DashboardE/Dashboard-eksekutif";
import AboutEksekutif from "./pages/DashboardE/about";
import Statistik from "./pages/DashboardE/Statistik";
import KinerjaDosen from "./pages/DashboardE/kinerja_dosen";
import PembayaranUKT from "./pages/DashboardE/PembayaranUKT";

// Profile Pages
import ProfileEksekutif from "./pages/DashboardE/Profile";
import ProfileMahasiswa from "./pages/DashboardM/Profile";

import "./App.css";
import "./Dark-mode.css";

// Komponen pembungkus untuk Router
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
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      document.body.classList.toggle("dark-mode", newMode);
      return newMode;
    });
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
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
        {/* Dashboard Umum */}
        <Route
          path="/"
          element={
            <DashboardUmum
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
          }
        />
        <Route
          path="/about"
          element={
            <About
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
          }
        />
        <Route
          path="/population-chart"
          element={
            <StudentPopulationPage
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
          }
        />
        <Route
          path="/graduation-chart"
          element={
            <GraduationChart
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
          }
        />
        <Route
          path="/job-distribution"
          element={
            <JobDistribution
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={
            <Login
              setIsAuthenticated={setIsAuthenticated}
              setUserRole={setUserRole}
              setCurrentUser={setCurrentUser}
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
          }
        />

        {/* Dashboard Role-based */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              userRole === "mahasiswa" ? (
                <DashboardMahasiswa
                  user={currentUser}
                  onLogout={handleLogout}
                  isDarkMode={isDarkMode}
                  toggleDarkMode={toggleDarkMode}
                />
              ) : userRole === "eksekutif" || userRole === "dosen" ? (
                <DashboardEksekutif
                  user={currentUser}
                  onLogout={handleLogout}
                  isDarkMode={isDarkMode}
                  toggleDarkMode={toggleDarkMode}
                />
              ) : (
                <Navigate to="/" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* About Mahasiswa & Eksekutif */}
        <Route
          path="/about-mahasiswa"
          element={
            <ProtectedRoute allowedRoles={["mahasiswa"]}>
              <AboutMahasiswa
                user={currentUser}
                onLogout={handleLogout}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about-eksekutif"
          element={
            <ProtectedRoute allowedRoles={["eksekutif", "dosen"]}>
              <AboutEksekutif
                user={currentUser}
                onLogout={handleLogout}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
              />
            </ProtectedRoute>
          }
        />

        {/* Mahasiswa */}
        <Route
          path="/kinerja-akademik"
          element={
            <ProtectedRoute allowedRoles={["mahasiswa"]}>
              <KinerjaAkademik
                user={currentUser}
                onLogout={handleLogout}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-statistik"
          element={
            <ProtectedRoute allowedRoles={["mahasiswa"]}>
              <MyStatistik
                user={currentUser}
                onLogout={handleLogout}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/riwayat-mata-kuliah"
          element={
            <ProtectedRoute allowedRoles={["mahasiswa"]}>
              <CourseHistoryChart
                user={currentUser}
                onLogout={handleLogout}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-mahasiswa/profile"
          element={
            <ProtectedRoute allowedRoles={["mahasiswa"]}>
              <ProfileMahasiswa
                user={currentUser}
                onLogout={handleLogout}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
              />
            </ProtectedRoute>
          }
        />

        {/* Eksekutif/Dosen */}
        <Route
          path="/statistik"
          element={
            <ProtectedRoute allowedRoles={["eksekutif", "dosen"]}>
              <Statistik
                user={currentUser}
                onLogout={handleLogout}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kinerja-dosen"
          element={
            <ProtectedRoute allowedRoles={["eksekutif", "dosen"]}>
              <KinerjaDosen
                user={currentUser}
                onLogout={handleLogout}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pembayaran-ukt"
          element={
            <ProtectedRoute allowedRoles={["eksekutif", "dosen"]}>
              <PembayaranUKT
                user={currentUser}
                onLogout={handleLogout}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-eksekutif/profile"
          element={
            <ProtectedRoute allowedRoles={["eksekutif", "dosen"]}>
              <ProfileEksekutif
                user={currentUser}
                onLogout={handleLogout}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
              />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default AppWrapper;
