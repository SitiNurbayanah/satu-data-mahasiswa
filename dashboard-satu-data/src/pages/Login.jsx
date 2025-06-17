import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginHeader from "../components/LoginHeader";

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    nim: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulasi login - ganti dengan logic authentication sebenarnya
    if (formData.nim && formData.password) {
      setIsAuthenticated(true);
      navigate("/dashboard");
    } else {
      alert("Mohon isi NIM/NIP dan Password");
    }
  };

  return (
    <div className="login-page">
      <LoginHeader />

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
                />
              </div>

              <button type="submit" className="login-button">
                Masuk
              </button>

              <div className="login-info">
                <span>• Masuk menggunakan akun salam</span>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="login-footer">
        <span>2025 SALAM</span>
      </footer>
    </div>
  );
};

export default Login;
