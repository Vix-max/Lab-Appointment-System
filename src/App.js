import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import './App.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Tests from './components/pages/Tests';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Signup from './components/pages/Signup';
import AdminProfile from './components/pages/AdminProfile';
import PatientRegister from './components/PatientRegister';
import PatientProfile from './components/pages/PatientProfile';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import AppointmentPayment from './components/pages/AppointmentPayment';
import AppointmentInvoice from './components/AppointmentInvoice';
import DoctorProfile from './components/pages/DoctorProfile';
import TechnicianProfile from './components/pages/TechnicianProfile';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/tests' exact element={<Tests/>} />
          <Route path='/about' exact element={<About/>} />
          <Route path='/contact' exact element={<Contact/>} />
          <Route path='/signup' exact element={<Signup/>} />
          <Route path='/adminprofile' exact element={<AdminProfile/>} />
          <Route path='/patientregister' exact element={<PatientRegister/>} />
          <Route path='/patientProfile' exact element={<PatientProfile/>} />
          <Route path='/doctorprofile' exact element={<DoctorProfile/>} />
          <Route path='/techprofile' exact element={<TechnicianProfile/>} />
          <Route path='/appointmentpayment' exact element={<AppointmentPayment/>} />
          <Route path='/appointmentinvoice' exact element={<AppointmentInvoice/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
