import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Login = ({ setIsAuthenticated, setUserRole, setCurrentUser }) => {
  const [nimNip, setNimNip] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const isMahasiswa = /^\d{8,}$/.test(nimNip); // NIM biasanya 8 digit atau lebih
    const endpoint = isMahasiswa ? "/auth/mahasiswa" : "/auth/dosen";

    const payload = isMahasiswa
      ? { nim: nimNip, password }
      : { dosen_id: nimNip, password };

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Login response:", data); // Debug log

      if (response.ok) {
        const userData = data.data; // ✅ perbaikan utama di sini
        let role = userData.role;

        // Ubah role "dosen" menjadi "eksekutif" agar cocok dengan App.jsx
        if (role === "dosen") {
          role = "eksekutif";
        }

        // Simpan ke localStorage
        localStorage.setItem("role", role);
        localStorage.setItem("user", JSON.stringify(userData));

        // Update state di App.jsx (jika props disediakan)
        if (setIsAuthenticated) setIsAuthenticated(true);
        if (setUserRole) setUserRole(role);
        if (setCurrentUser) setCurrentUser(userData);

        // Redirect ke dashboard
        navigate("/dashboard");
      } else {
        setErrorMessage(data.message || "Login gagal. Coba lagi.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Terjadi kesalahan jaringan.");
    }
  };

  return (
    <div className="login-page">
      <Header />
      <main className="login-main">
        <div className="login-container">
          <div className="login-card">
            <h2 className="login-title">Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="nimNip" className="form-label">NIM/NIP</label>
                <input
                  type="text"
                  id="nimNip"
                  value={nimNip}
                  onChange={(e) => setNimNip(e.target.value)}
                  className="form-input"
                  placeholder="Masukkan NIM atau NIP"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="Masukkan password"
                  required
                />
              </div>
              <button type="submit" className="login-button">Masuk</button>
              {errorMessage && (
                <p className="login-info" style={{ color: "red" }}>{errorMessage}</p>
              )}
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
