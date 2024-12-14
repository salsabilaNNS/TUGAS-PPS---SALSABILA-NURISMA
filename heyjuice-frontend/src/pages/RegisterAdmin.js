import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./RegisterAdmin.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate dari react-router-dom

function RegisterAdmin() {
  const [formData, setFormData] = useState({
    nama: "",
    nohp: "",
    alamat: "",
    email: "",
    username: "",
    password: "",
    konfirmasiPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:3001/authAdmin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message); // Tampilkan pesan sukses
        setFormData({
          nama: "",
          nohp: "",
          alamat: "",
          email: "",
          username: "",
          password: "",
          konfirmasiPassword: "",
        }); // Reset form

        // Redirect ke halaman Login setelah registrasi berhasil
        setTimeout(() => {
          navigate("/LoginAdmin"); // Arahkan ke halaman Login
        }, 2000); // Delay 2 detik sebelum navigasi
      } else {
        setError(data.message); // Tampilkan pesan error
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError("Terjadi kesalahan saat registrasi. Silakan coba lagi.");
    }
  };

  return (
    <div className="register-container">
      <h2>Register Admin HeyJuice</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formNama">
          <Form.Label column sm={2}>
            Nama
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Masukkan nama"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formNohp">
          <Form.Label column sm={2}>
            No HP
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Masukkan nomor HP"
              name="nohp"
              value={formData.nohp}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formAlamat">
          <Form.Label column sm={2}>
            Alamat
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Masukkan alamat"
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formEmail">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="email"
              placeholder="Masukkan email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formUsername">
          <Form.Label column sm={2}>
            Username
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Masukkan username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPassword">
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="password"
              placeholder="Masukkan password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formKonfirmasiPassword">
          <Form.Label column sm={2}>
            Konfirmasi Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="password"
              placeholder="Konfirmasi password"
              name="konfirmasiPassword"
              value={formData.konfirmasiPassword}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}
        {success && <p className="success-message" style={{ color: "green" }}>{success}</p>}

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button variant="primary" type="submit">
              Daftar
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default RegisterAdmin;
