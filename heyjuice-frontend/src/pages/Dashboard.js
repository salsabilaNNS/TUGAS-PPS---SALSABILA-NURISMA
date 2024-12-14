import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { UserContext } from "../UserContext"; // Import UserContext
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
import "./Dashboard.css"; // Import file CSS

function Dashboard() {
  const { username, setUsername } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUsername(null); // Menghapus username dari context
    localStorage.removeItem("userSession"); // Menghapus sesi pengguna
    navigate("/Login"); // Mengarahkan ke halaman LoginAdmin
  };

  return (
    <div>
      {/* Navbar */}
      <header className="custom-navbar">
        <div className="navbar-container">
          <a href="#home" className="navbar-brand">HeyJuice</a>
          <nav className="custom-nav">
            <a href="#home" className="nav-link">Home</a>
            <a href="#menu" className="nav-link">Menu</a>
            <button onClick={handleLogout} className="nav-link nav-logout">Logout</button>
          </nav>
        </div>
      </header>

      {/* Konten Dashboard */}
      <div className="dashboard-content">
       <h1 style={{ color: "coklat" }}>Selamat Datang {username} di HeyJuice!</h1>
      </div>
    </div>
  );
}

export default Dashboard;
