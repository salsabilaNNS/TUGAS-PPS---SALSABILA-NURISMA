import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from "./UserContext"; // Import UserProvider
import LoginCustomer from './pages/LoginCustomer';
import Dashboard from './pages/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterCustomer from './pages/RegisterCustomer';
import LoginAdmin from './pages/LoginAdmin';
import DashboardAdmin from './pages/DashboardAdmin';
import RegisterAdmin from './pages/RegisterAdmin';


function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginCustomer/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/register" element={<RegisterCustomer />} />
          <Route path="/LoginAdmin" element={<LoginAdmin />}></Route>
          <Route path="/DashboardAdmin" element={<DashboardAdmin/>} />
          <Route path="/RegisterAdmin" element={<RegisterAdmin/>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;