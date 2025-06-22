import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Login = ({ setIsAuthenticated, onLogin, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    nim: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error saat user mulai mengetik
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.nim || !formData.password) {
      setError("Mohon isi NIM/NIP dan Password");
      setLoading(false);
      return;
    }

    // Gunakan fungsi login dari App.js
    const result = onLogin(formData.nim, formData.password);
    
    if (result.success) {
      setIsAuthenticated(true);
      navigate("/dashboard-umum");
    } else {
      setError(result.message || "Login gagal");
    }
    
    setLoading(false);
  };

  // Data demo accounts
  // const demoMahasiswa = [
  //   { nim: "20210001", password: "mahasiswa123", name: "Ahmad Rizky Pratama" },
  //   { nim: "20210002", password: "student456", name: "Siti Nurhaliza" },
  //   { nim: "20220015", password: "rizky2022", name: "Rizky Ramadhan" }
  // ];

  // const demoEksekutif = [
  //   { nip: "198501012010121001", password: "rektor2024", name: "Prof. Dr. H. Bambang Sutrisno" },
  //   { nip: "197803152005012002", password: "warek123", name: "Prof. Dr. Sri Wahyuni" },
  //   { nip: "198012102008011003", password: "dekan456", name: "Dr. Agus Setiawan" }
  // ];

  return (
    <div className="login-page">
      <Header isLoggedIn={false}/>

      <main className="login-main">
        <div className="login-container">
          <div className="login-card">
            <h1 className="login-title">Login</h1>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="nim" className="form-label">
                  NIM/NIP
                </label>
                <input
                  type="text"
                  id="nim"
                  name="nim"
                  value={formData.nim}
                  onChange={handleInputChange}
                  placeholder="Masukkan NIM/NIP"
                  className="form-input"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Masukkan Password"
                  className="form-input"
                  required
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              <button type="submit" className="login-button" disabled={loading}>
                {loading ? "Memproses..." : "Masuk"}
              </button>

              <div className="login-info">
                <span>• Masuk menggunakan akun salam</span>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default Login;