import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './PatientRegister.css';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';

function RegisterForms( ) {

  const [age, setAge] = useState('');
  const [userDetails, setUserDetails] = useState(null); // State to store user details
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const age = document.getElementById('age').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmpassword').value;

    // Check for empty fields
    if (!fullName || !age || !mobileNumber || !email || !username || !password || !confirmPassword) {
      toast.dismiss();
      toast.error("Please fill in all fields", { hideProgressBar: true });
      return;
    }

    // Validate mobile number
    const mobileNumberPattern = /^[0-9]{10}$/;
    if (!mobileNumberPattern.test(mobileNumber)) {
      toast.error("Please enter a valid 10-digit mobile number", { hideProgressBar: true });
      return;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address", { hideProgressBar: true });
      return;
    }

    // Validate password
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long", { hideProgressBar: true });
      return;
    }
    if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      toast.error("Password must contain at least one letter and one number", { hideProgressBar: true });
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", { hideProgressBar: true });
      return;
    }

    // All validations passed, proceed with form submission
    try {
      const formData = { fullName, age, mobileNumber, email, username, password };
      const response = await axios.post('http://localhost:8080/patient/add', formData);
      console.log(response.data);
      setUserDetails(userDetails);
      toast.dismiss();
      toast.success("Patient Registered Successfully", {
        hideProgressBar: true, // Hide the loading bar
      });
      setIsLoggedIn(true);
      setTimeout(() => {
        navigate('/patientprofile', { state: { userDetails: username } }); // Pass userDetails as state
      }, 2000);
    } 
    
    catch (error) {
      console.error('Error registering patient:', error);
      toast.error('An error occurred while registering the patient');
    }
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };



  return (
    <div>

      <div className='hero'>

      <h1 className='hero_h1'> New Patient Register</h1>
      <p className='hero_p'>Home / Signup / Register</p>



      </div>

      <ToastContainer />
      <div className="formContainer">
          <form className='registerForm' onSubmit={handleSubmit}>
          <h2>Patient Register</h2>
          <div className='line'></div>

          <input type="text" placeholder="Full Name" id="fullName" />
          <br />
          <select value={age} onChange={handleAgeChange} id="age">
          <option value="">Select Age</option>
          {Array.from({ length: 150 }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
          </select>
          <br />
          <input type="text" placeholder="Mobile Number" id="mobileNumber"  />
          <br />
          <input type="text" placeholder="Email" id="email" />
          <br />
          <input type="text" placeholder="Username" id="username" />
          <br />
          <input type="password" placeholder="Password" id="password" />
          <br />
          <input type="password" placeholder="Confirm Password" id="confirmpassword" />
          <br></br>
          <button className='formSubmit' type="submit">Register</button>
          <button className='backButton'  type="button">Back</button>
        </form>
        
      </div>

      <Footer />
    </div>
  );
}

export default RegisterForms;
