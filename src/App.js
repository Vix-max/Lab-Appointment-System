import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import './App.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Tests from './components/pages/Tests';
import About from './components/pages/About';
import Contact from './components/pages/Contact';

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
