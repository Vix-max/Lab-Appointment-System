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
      // Added new state to hold availability status for each technician
      const [availabilityStatus, setAvailabilityStatus] = useState({});


      useEffect(() => {
        async function fetchData() {
          try {
            const response = await axios.get('http://localhost:8080/tech/getAll');
            const formattedTechs = response.data.map(tech => ({
              id: tech.id,
              fullName: tech.fullName,
              gender: tech.gender,
              special: tech.special,
              mobileNumber: tech.mobileNumber,
              email: tech.email,
              shifts: [], // Initialize shifts array for each technician
            }));
      
            setTechs(formattedTechs);
            setFilteredTechs(formattedTechs);
      
            // Fetch shifts for all technicians
            const shiftDataPromises = formattedTechs.map(async tech => {
              try {
                const response = await axios.get(`http://localhost:8080/shift/getByTechId/${tech.id}`);
                const formattedShifts = response.data.map(shift => ({
                  date: shift.date, // Convert date string to Date object
                  startTime: shift.startTime,
                  endTime: shift.endTime,
                }));
                return { id: tech.id, shifts: formattedShifts };
              } catch (error) {
                console.error('Error fetching shifts:', error);
                toast.error(`An error occurred while fetching shifts for technician ${tech.id}`);
                return { id: tech.id, shifts: [] }; // Return empty shifts array in case of error
              }
            });
      
            const shiftData = await Promise.all(shiftDataPromises);
            const techsWithShifts = formattedTechs.map(tech => {
              const correspondingShiftData = shiftData.find(data => data.id === tech.id);
              return {
                ...tech,
                shifts: correspondingShiftData ? correspondingShiftData.shifts : [], // Assign shifts to each technician
              };
            });
      
            setTechs(techsWithShifts);


            const today = new Date();
            const dayOfWeek = today.getDay();

            const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
            const todayName = daysOfWeek[dayOfWeek];


            console.log("Date", todayName)

      
            const availabilityStatusData = techsWithShifts.map(tech => {
              const shiftsToday = tech.shifts.filter(shift => shift.date === todayName);
              console.log("Shift", shiftsToday)
              // Check if there are any shifts today
              if (shiftsToday.length > 0) {
                const now = new Date();
                const currentTime = now.getHours() * 100 + now.getMinutes(); // Convert current time to HHmm format
      
                // Check if the current time falls within any shift today
                const onShift = shiftsToday.some(shift => {
                  const startParts = shift.startTime.split(':');
                  const endParts = shift.endTime.split(':');
                  const start = parseInt(startParts[0]) * 100 + parseInt(startParts[1]);
                  const end = parseInt(endParts[0]) * 100 + parseInt(endParts[1]);
                  return currentTime >= start && currentTime <= end;
                });
      
                return { id: tech.id, availability: onShift ? 'Available' : 'Unavailable' };
              } else {
                return { id: tech.id, availability: 'Unavailable' }; // No shifts today
              }
            });
      
            // Update availability status state
            const availabilityStatus = availabilityStatusData.reduce((acc, { id, availability }) => {
              acc[id] = availability;
              return acc;
            }, {});
      
            setAvailabilityStatus(availabilityStatus);
          } catch (error) {
            console.error('Error fetching Technicians:', error);
          }
        }
      
        fetchData();
      }, []);
      
      
    

      const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = techs.filter(tech =>
          tech.id.toString().includes(query) || tech.fullName.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredTechs(filtered);
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
              <th>Availability</th>
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
                <td className={availabilityStatus[tech.id] === 'Available' ? 'available' : 'unavailable'}>
      {availabilityStatus[tech.id]}
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

export default ViewTechPatient
