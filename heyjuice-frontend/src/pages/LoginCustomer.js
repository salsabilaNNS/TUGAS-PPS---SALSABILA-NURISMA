import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext"; // Import UserContext
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./LoginCustomer.css";
import heyjuiceImage from "../assets/heyjuice.jpeg";

function LoginCustomer() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUsername: setGlobalUsername } = useContext(UserContext); // Dapatkan fungsi dari context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`http://localhost:3001/authCustomer/login/${username}/${password}`);
      const data = await response.json();

      if (response.ok) {
        setGlobalUsername(username); // Simpan username ke context
        navigate("/dashboard"); // Pindah ke dashboard
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Terjadi kesalahan saat login. Silakan coba lagi.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-form-container">
        <div className="login-content">
          <img
            src={heyjuiceImage}
            style={{ height: "210px" }}
            alt="Heyjuice Logo"
            className="form-image"
          />
          <h5 className="login-title">LOGIN</h5>
          <p className="login-subtitle">HeyJuice!</p>
          

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Masukkan Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="warning" type="submit" className="login-button">
              Login
            </Button>
          </Form>

          {error && <p className="error-message">{error}</p>}

          <p className="signup-text">
          Belum punya akun? <a href="/register" className="signup-link">Daftar di sini</a>
         </p>
          
        </div>
      </div>
    </div>
  );
}

export default LoginCustomer;
