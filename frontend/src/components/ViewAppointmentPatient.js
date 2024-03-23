import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './ViewAppointmentPatient.css';

function ViewAppointmentPatient({userType}) {

    
  const { username } = useAuth();
  const [appointment, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAppointment, setFilteredAppointment] = useState([]);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:8080/appointment/username/${username}`);
        
        // Extract specific data fields from the response
        const formattedPatients = response.data.map(appointment => ({
            id: appointment.id,
            test: appointment.test,
            date: new Date(appointment.date).toLocaleDateString(), // Corrected property name
            time: appointment.time,
            doctor: appointment.doctor,
            description: appointment.description,
            payment: appointment.payment,
            result: appointment.reportStatus
          }));
        
        // Update the state with the formatted patient data
        setAppointments(formattedPatients);
        setFilteredAppointment(formattedPatients); // Initialize filtered patients with all patients
      } catch (error) {
        console.error('Error fetching Appointment:', error);
      }
    }
  
    fetchData();
  }, []);

  function getClassByResult(result) {
    switch (result.toLowerCase()) {
      case 'pending':
        return 'pending-status';
      case 'in progress':
        return 'in-progress-status';
      case 'completed':
        return 'completed-status';
      default:
        return '';
    }
  }


  const handleDownloadResult = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/appointment/result/${id}`, {
            responseType: 'blob'
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Test_${id}-Result.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading result report:', error);
        toast.error('An error occurred while downloading the result report');
    }
};


  return (
    <div>
      <div className='backButtin'>
        <Link className="backBtn" onClick={() => window.location.reload()}>
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
      </div>
        {userType === 'viewAppointment' && (
      <div className='tableContainer'>
            <table className='patienttable'>
              <thead>
              <tr>
            <th className="tableHeading" colSpan="8" ><h2>Your Appointment</h2>
            
            </th>
          </tr>
          <tr>
            <th colSpan="8"><div className='line'></div></th>
            </tr>
                <tr class="margin-bottom">
                  <th>ID</th>
                  <th>Medical Test</th>
                  <th>Appointment Date</th>
                  <th>Appointment Time</th>
                  <th>Recommended by</th>
                  <th>Payment Status</th>
                  <th>Test Result Status</th>
                  <th>Test Report</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointment.map(appointment => (
                  <tr key={appointment.id}>
                    <td>{appointment.id}</td>
                    <td>{appointment.test}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td>Dr. {appointment.doctor}</td> {/* Corrected property name */}
                    <td>{appointment.payment}</td>
                    <td className={getClassByResult(appointment.result)}>{appointment.result}</td>
                    <td>
  {(appointment.result && (appointment.result.toLowerCase() !== "pending" && appointment.result.toLowerCase() !== "in progress")) ? (
    <button className='pdfDownload' onClick={() => handleDownloadResult(appointment.id)} >
      Download Test Result
    </button>
  ) : "In process"}
</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </div>
  )
}

export default ViewAppointmentPatient
