import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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

// Data dummy untuk login
const DUMMY_USERS = [
  // Data Mahasiswa (menggunakan NIM)
  {
    id: 1,
    nim: "20210001",
    password: "mahasiswa123",
    role: "mahasiswa",
    name: "Ahmad Rizky Pratama",
    fakultas: "Teknik Informatika",
    semester: 6,
    ipk: 3.75,
  },
  {
    id: 2,
    nim: "20210002",
    password: "student456",
    role: "mahasiswa",
    name: "Siti Nurhaliza",
    fakultas: "Manajemen",
    semester: 6,
    ipk: 3.82,
  },
  {
    id: 3,
    nim: "20220015",
    password: "rizky2022",
    role: "mahasiswa",
    name: "Rizky Ramadhan",
    fakultas: "Akuntansi",
    semester: 4,
    ipk: 3.65,
  },
  {
    id: 4,
    nim: "20230008",
    password: "maya2023",
    role: "mahasiswa",
    name: "Maya Sari Dewi",
    fakultas: "Psikologi",
    semester: 2,
    ipk: 3.9,
  },
  {
    id: 5,
    nim: "20210025",
    password: "budi123",
    role: "mahasiswa",
    name: "Budi Santoso",
    fakultas: "Hukum",
    semester: 6,
    ipk: 3.55,
  },

  // Data Eksekutif/Staff (menggunakan NIP)
  {
    id: 6,
    nip: "198501012010121001",
    password: "rektor2024",
    role: "eksekutif",
    name: "Prof. Dr. H. Bambang Sutrisno, M.A.",
    jabatan: "Rektor",
    unit: "Rektorat",
  },
  {
    id: 7,
    nip: "197803152005012002",
    password: "warek123",
    role: "eksekutif",
    name: "Prof. Dr. Sri Wahyuni, M.Pd.",
    jabatan: "Wakil Rektor Bidang Akademik",
    unit: "Rektorat",
  },
  {
    id: 8,
    nip: "198012102008011003",
    password: "dekan456",
    role: "eksekutif",
    name: "Dr. Agus Setiawan, S.T., M.T.",
    jabatan: "Dekan Fakultas Teknik",
    unit: "Fakultas Teknik",
  },
  {
    id: 9,
    nip: "197705252003122004",
    password: "kabag789",
    role: "eksekutif",
    name: "Dra. Rina Permatasari, M.M.",
    jabatan: "Kepala Bagian Akademik",
    unit: "Bagian Akademik",
  },
  {
    id: 10,
    nip: "198506182010011005",
    password: "admin123",
    role: "eksekutif",
    name: "Drs. Ahmad Fauzi, M.Si.",
    jabatan: "Kepala Pusat Data dan Informasi",
    unit: "Pusat Data dan Informasi",
  },
];

function App() {
  // Initialize state from sessionStorage if available
  const [isAuthenticated, setIsAuthenticated] = React.useState(() => {
    const saved = sessionStorage.getItem("isAuthenticated");
    return saved ? JSON.parse(saved) : false;
  });

  const [userRole, setUserRole] = React.useState(() => {
    const saved = sessionStorage.getItem("userRole");
    return saved ? JSON.parse(saved) : null;
  });

  const [currentUser, setCurrentUser] = React.useState(() => {
    const saved = sessionStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  // Save to sessionStorage whenever state changes
  React.useEffect(() => {
    sessionStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  React.useEffect(() => {
    sessionStorage.setItem("userRole", JSON.stringify(userRole));
  }, [userRole]);

  React.useEffect(() => {
    sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  // Fungsi untuk handle login
  const handleLogin = (nimNip, password) => {
    const user = DUMMY_USERS.find(
      (u) => (u.nim === nimNip || u.nip === nimNip) && u.password === password
    );

    if (user) {
      setIsAuthenticated(true);
      setUserRole(user.role);
      setCurrentUser(user);
      return { success: true, user };
    }

    return { success: false, message: "NIM/NIP atau password salah" };
  };

  // Fungsi untuk handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setCurrentUser(null);
    // Clear sessionStorage
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("userRole");
    sessionStorage.removeItem("currentUser");
  };

  // Protected Route Component
  const ProtectedRoute = ({ children, allowedRoles }) => {
    console.log("ProtectedRoute - isAuthenticated:", isAuthenticated);
    console.log("ProtectedRoute - userRole:", userRole);
    console.log("ProtectedRoute - allowedRoles:", allowedRoles);

    if (!isAuthenticated) {
      console.log("Not authenticated, redirecting to login");
      return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
      console.log("User role not allowed, redirecting to home");
      return <Navigate to="/" replace />;
    }

    return children;
  };

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

          {/* Login Route */}
          <Route
            path="/login"
            element={
              <Login
                setIsAuthenticated={setIsAuthenticated}
                onLogin={handleLogin}
                isAuthenticated={isAuthenticated}
              />
            }
          />

          {/* Dashboard Route - redirect berdasarkan role */}
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                userRole === "mahasiswa" ? (
                  <DashboardMahasiswa
                    user={currentUser}
                    onLogout={handleLogout}
                  />
                ) : userRole === "eksekutif" ? (
                  <DashboardEksekutif
                    user={currentUser}
                    onLogout={handleLogout}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/statistik"
            element={
              <ProtectedRoute allowedRoles={["eksekutif"]}>
                <Statistik user={currentUser} onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />

          {/* Route for KinerjaDosen */}
          <Route
            path="/kinerja-dosen"
            element={
              <ProtectedRoute allowedRoles={["eksekutif"]}>
                <KinerjaDosen user={currentUser} onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />

          {/* Route for PembayaranUKT */}
          <Route
            path="/pembayaran-ukt"
            element={
              <ProtectedRoute allowedRoles={["eksekutif"]}>
                <PembayaranUKT user={currentUser} onLogout={handleLogout} />
              </ProtectedRoute>
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
