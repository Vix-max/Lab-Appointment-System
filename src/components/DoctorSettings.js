import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './DoctorSettings.css';

function DoctorSettings({userType}) {

    const specializations = [
        "Cardiology (Heart-related conditions)",
        "Dermatology (Skin disorders)",
        "Endocrinology (Hormonal disorders)",
        "Gastroenterology (Digestive system disorders)",
        "Hematology (Blood disorders)",
        "Neurology (Nervous system disorders)",
        "Oncology (Cancer treatment)",
        "Pediatrics (Child healthcare)",
        "Psychiatry (Mental health)",
        "Rheumatology (Autoimmune diseases and joint disorders)"
      ];

      const [doctors, setDoctors] = useState([]);
      const [searchQuery, setSearchQuery] = useState('');
      const [filteredDoctors, setFilteredDoctors] = useState([]);

      //Get all Doctors
      useEffect(() => {
        async function fetchData() {
          try {
            const response = await axios.get('http://localhost:8080/doctor/getAll');
            
            // Extract specific data fields from the response
            const formattedDoctors = response.data.map(doctor => ({
                id: doctor.id,
                fullName: doctor.fullName, // Corrected property name
                age: doctor.age,
                mobileNumber: doctor.mobileNumber, // Corrected property name
                email: doctor.email,
                hospital: doctor.hospital,
                special: doctor.special,
              }));
            
            // Update the state with the formatted doctors data
            setDoctors(formattedDoctors);
            setFilteredDoctors(formattedDoctors); // Initialize filtered doctors with all doctors
          } catch (error) {
            console.error('Error fetching doctors:', error);
          }
        }
      
        fetchData();
      }, []);


      //Search Doctor
      const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = doctors.filter(doctor =>
          doctor.id.toString().includes(query) || doctor.fullName.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredDoctors(filtered);
      };



      //Add doctor
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const fullName = document.getElementById('fullName').value;
        const mobileNumber = document.getElementById('mobileNumber').value;
        const email = document.getElementById('email').value;
        const hospital = document.getElementById('hospital').value;
        const special = document.getElementById('special').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmpassword').value;
    
        // Check for empty fields
        if (!fullName || !hospital || !special || !mobileNumber || !email || !username || !password || !confirmPassword) {
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
          const formData = { fullName, mobileNumber, email, hospital, special,username, password };
          const response = await axios.post('http://localhost:8080/doctor/add', formData);
          console.log(response.data);
          toast.dismiss();
          toast.success("Doctor Registered Successfully", {
            hideProgressBar: true, // Hide the loading bar
          });

        } 
        
        catch (error) {
          console.error('Error Registering the Doctor user:', error);
          toast.error('An error occurred while registering the doctor');
        }
      };


      //Delete Doctor
      const handleDeleteDoctor = async (id) => {
        try {
          // Make an HTTP DELETE request to delete the doctor by ID
          await axios.delete(`http://localhost:8080/doctor/delete/${id}`);
          
          // After successfully deleting, update the patient list
          setDoctors(doctors.filter(doctor => doctor.id !== id));
    
          // Show success toast
          toast.success('Doctor Deleted Successfully', {
            hideProgressBar: true,
          });
        } catch (error) {
          console.error('Error deleting doctor:', error);
          // Show error toast
          toast.error('An error occurred while deleting the doctor');
        }
      };


  return (
    <div>
        <div className='backButtin'>
        <Link className="backBtn" onClick={() => window.location.reload()}>
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
      </div>
        <ToastContainer />
        {userType === 'doctorsettings' && (
            <div>
      <div className="formContainer" >
          <form className='registerForm' onSubmit={handleSubmit}>
          <h2>Doctor Register</h2>
          <div className='line'></div>

          <input type="text" placeholder="Full Name" id="fullName" />
          <br />
          <input type="text" placeholder="Mobile Number" id="mobileNumber"  />
          <br />
          <input type="text" placeholder="Email" id="email" />
          <br />
          <input type="text" placeholder="Hospital/Clinic Affiliation" id="hospital"  />
          <br />
          <select id="special">
              <option value="">Select Specialization</option>
              {specializations.map((specialization, index) => (
                <option key={index} value={specialization}>{specialization}</option>
              ))}
            </select>
          <br />
          <input type="text" placeholder="Username" id="username" />
          <br />
          <input type="password" placeholder="Password" id="password" />
          <br />
          <input type="password" placeholder="Confirm Password" id="confirmpassword" />
          <br></br>
          <button className='formDoctorSubmit' type="submit">Add new Doctor</button>
        </form>
        </div>

        

        <div className='tableContainer'>
            <table className='patienttable'>
              <thead>
              <tr>
            <th  className="tableHeading" colSpan="8" ><h2>Available Doctors</h2>
            
                  {/* Search bar */}
        <input
              type="text"
              placeholder="Search by ID or Name"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            
            </th>
          </tr>
          <tr>
            <th colSpan="8"><div className='line'></div></th>
            </tr>
            <tr>
            
            </tr>
                <tr class="margin-bottom">
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Mobile Number</th>
                  <th>Email</th>
                  <th>Hospital/Clinic</th>
                  <th>Specialization</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.map(doctor => (
                  <tr key={doctor.id}>
                    <td>{doctor.id}</td>
                    <td>{doctor.fullName}</td> {/* Corrected property name */}
                    <td>{doctor.mobileNumber}</td> {/* Corrected property name */}
                    <td>{doctor.email}</td>
                    <td>{doctor.hospital}</td>
                    <td>{doctor.special}</td>
                    <td>
                      <button className='doctorDeleteSubmit' onClick={() => handleDeleteDoctor(doctor.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        
      </div>

      )}
    </div>
  )
}

export default DoctorSettings
