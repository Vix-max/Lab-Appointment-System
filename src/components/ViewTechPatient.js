import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import './ViewTechPatient.css';
import { Link, useNavigate } from 'react-router-dom';


function ViewTechPatient({userType}) {

    const [techs, setTechs] = useState([]);
      const [searchQuery, setSearchQuery] = useState('');
      const [filteredTechs, setFilteredTechs] = useState([]);
      const [shiftsForView, setShiftsForView] = useState([]);
      const [selectedTechId, setSelectedTechId] = useState(null);
      const [isOnShift, setIsOnShift] = useState(false);


    useEffect(() => {
        async function fetchData() {
          try {
            const response = await axios.get('http://localhost:8080/tech/getAll');
            
            // Extract specific data fields from the response
            const formattedTechs = response.data.map(tech => ({
                id: tech.id,
                fullName: tech.fullName, // Corrected property name
                empNumber: tech.empNumber,
                age: tech.age,
                gender: tech.gender,
                special: tech.special,
                mobileNumber: tech.mobileNumber, // Corrected property name
                email: tech.email,
              }));
            
            setTechs(formattedTechs);
            setFilteredTechs(formattedTechs); 
          } catch (error) {
            console.error('Error fetching Technicians:', error);
          }
        }
      
        fetchData();
      }, []);

      const handleViewShifts = async (id) => {
        try {
          const response = await axios.get(`http://localhost:8080/shift/getByTechId/${id}`);
          const formattedShifts = response.data.map(shift => ({
            date: shift.date,
            startTime: shift.startTime,
            endTime: shift.endTime,
          }));
          setShiftsForView(formattedShifts);
          setSelectedTechId(id);
          

          //Check the shift status
          const now = new Date();
      const currentTime = now.getHours() * 100 + now.getMinutes(); // Convert current time to HHmm format
          console.log("Time", currentTime)
          const onShift = formattedShifts.some(shift => {
            // Parse the start and end times into hours and minutes
            const startParts = shift.startTime.split(':');
            const endParts = shift.endTime.split(':');
        
            // Convert hours and minutes into a single number (HHmm format)
            const start = parseInt(startParts[0]) * 100 + parseInt(startParts[1]);
            const end = parseInt(endParts[0]) * 100 + parseInt(endParts[1]);
        
            // Check if the current time is within the shift's start and end time
            return currentTime >= start && currentTime <= end;
        });
        

      setIsOnShift(onShift);


        } catch (error) {
          console.error('Error fetching shifts:', error);
          toast.error('An error occurred while fetching shifts');
        }
      };

      const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = techs.filter(tech =>
          tech.id.toString().includes(query) || tech.fullName.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredTechs(filtered);
      };

      const handleCloseShiftTable = () => {
        setSelectedTechId(null);
        setShiftsForView([]);
        setIsOnShift(false);
      };


  return (
    <div>
        <div className='backButtin'>
        <Link className="backBtn" onClick={() => window.location.reload()}>
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
      </div>
        {userType === 'viewtechpatient' && (
            
        <div className='tableContainer'>
        
        <table className='patienttable'>
          <thead>
          <tr>
        <th  className="tableHeading" colSpan="8" ><h2>Available Technicians</h2>
        
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
              <th>Gender</th>
              <th>Specialization</th>
              <th>Mobile Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTechs.map(tech => (
              <tr key={tech.id}>
                <td>{tech.id}</td>
                <td>{tech.fullName}</td> {/* Corrected property name */}
                <td>{tech.gender}</td>
                <td>{tech.special}</td>
                <td>{tech.mobileNumber}</td> {/* Corrected property name */}
                <td>{tech.email}</td>
                
                <td>
                <button className='viewShiftsButton' onClick={() => handleViewShifts(tech.id)}>View Availability</button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {shiftsForView.length > 0 && (
    <div className='shiftTablediv'>
      
      <table className='shiftTable'>
        
        <thead>
        <tr>
      <th className="tableHeading" colSpan="6" ><h2>Shift Details</h2></th>
      </tr>
      <tr>
        <th colSpan="6"><div className='line'></div></th>
        </tr>
          
        </thead>
        <tr>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        <tbody>
          {shiftsForView.map((shift, index) => (
            <tr key={index}>
              <td>{shift.date}</td>
              <td>{shift.startTime}</td>
              <td>{shift.endTime}</td>
            </tr>
          ))}
        </tbody>
        <tr>
            <td colSpan="8">
            <p className={isOnShift ? 'onShift' : 'notOnShift'}>
            {isOnShift ? 'The Technician is Available at the moment.' : 'Sorry, the Technician is currently on Unavailable.'}
        </p>
            </td>
        </tr>
      </table>
      <button className='shiftCloseButton' onClick={handleCloseShiftTable}>Close Shifts</button>
      
    </div>
  )}
      </div>
      )}
    </div>
  )
}

export default ViewTechPatient
