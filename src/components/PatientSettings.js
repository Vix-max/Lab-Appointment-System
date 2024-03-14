import React, { useState, useEffect } from 'react';
import './PatientSettings.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

function PatientSettings({ userType }) {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8080/patient/getAll');
        
        // Extract specific data fields from the response
        const formattedPatients = response.data.map(patient => ({
            id: patient.id,
            fullName: patient.fullName, // Corrected property name
            age: patient.age,
            mobileNumber: patient.mobileNumber, // Corrected property name
            email: patient.email,
          }));
        
        // Update the state with the formatted patient data
        setPatients(formattedPatients);
        setFilteredPatients(formattedPatients); // Initialize filtered patients with all patients
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    }
  
    fetchData();
  }, []);

  const handleDeletePatient = async (id) => {
    try {
      // Make an HTTP DELETE request to delete the patient by ID
      await axios.delete(`http://localhost:8080/patient/delete/${id}`);
      
      // After successfully deleting, update the patient list
      setPatients(patients.filter(patient => patient.id !== id));
      setFilteredPatients(filteredPatients.filter(patient => patient.id !== id));

      // Show success toast
      toast.success('Patient Deleted Successfully', {
        hideProgressBar: true,
      });
    } catch (error) {
      console.error('Error deleting patient:', error);
      // Show error toast
      toast.error('An error occurred while deleting the patient');
    }
  };

  // Function to handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = patients.filter(patient =>
      patient.id.toString().includes(query) || patient.fullName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPatients(filtered);
  };

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
      <div className='backButtin'>
        <Link className="backBtn" onClick={() => window.location.reload()}>
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
      </div>

      <ToastContainer />
      {userType === 'patientsettings' && (
        <div>

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



          <div className='tableContainer'>
            <table className='patienttable'>
              <thead>
              <tr>
            <th className="tableHeading" colSpan="6" ><h2>Available Patients</h2>
            <input
            type="text"
            placeholder="Search by ID or Name"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
            </th>
          </tr>
          <tr>
            <th colSpan="6"><div className='line'></div></th>
            </tr>
                <tr class="margin-bottom">
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Age</th>
                  <th>Mobile Number</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map(patient => (
                  <tr key={patient.id}>
                    <td>{patient.id}</td>
                    <td>{patient.fullName}</td> {/* Corrected property name */}
                    <td>{patient.age}</td>
                    <td>{patient.mobileNumber}</td> {/* Corrected property name */}
                    <td>{patient.email}</td>
                    <td>
                      <button className='patientDeleteSubmit' onClick={() => handleDeletePatient(patient.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default PatientSettings;
