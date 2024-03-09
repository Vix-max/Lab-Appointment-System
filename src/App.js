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
import AdminLogin from './components/AdminLogin';

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
