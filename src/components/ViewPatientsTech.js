import React, { useState, useEffect } from 'react';
import './ViewPatientsTech.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

function ViewPatientTech({ userType }) {
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


  return (
    <div>
      <div className='backButtin'>
        <Link className="backBtn" onClick={() => window.location.reload()}>
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
      </div>

      <ToastContainer />
      {userType === 'viewpatientstech' && (
        <div>




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

export default ViewPatientTech;
