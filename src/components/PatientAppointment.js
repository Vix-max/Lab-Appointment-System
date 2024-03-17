import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './PatientAppointment.css';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../AuthContext'; // Import useAuth hook
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from 'react-router-dom';
import AppointmentInvoice from './AppointmentInvoice';





function PatientAppointment({ userType }) {
  const [doctors, setDoctors] = useState([]); // State to store doctors' names
  const [selectedDoctor, setSelectedDoctor] = useState(''); // State to store selected doctor
  const [otherDoctor, setOtherDoctor] = useState(''); // State to store other doctor's name
  const [showOtherDoctorInput, setShowOtherDoctorInput] = useState(false); // State to control visibility of other doctor input
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [selectedTest, setSelectedTest] = useState('');
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  // State variable to hold fetched appointments
  const [appointments, setAppointments] = useState([]);

  const {  username } = useAuth();

  const navigate = useNavigate();
  

  useEffect(() => {
    // Fetch doctors' names from the backend when the component mounts
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {

    
    try {
      const response = await axios.get('http://localhost:8080/doctor/getAll'); // Adjust the URL according to your backend endpoint
      const doctorsData = response.data;

      // Extracting full names of doctors
      const doctorNames = doctorsData.map(doctor => doctor.fullName);

      

      // Update the doctors state with the extracted names
      setDoctors(doctorNames);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      toast.error('An error occurred while fetching doctors');
    }
  };



  const handleDoctorChange = (event) => {
    const selectedValue = event.target.value;
  
    if (selectedValue === 'Other') {
      setShowOtherDoctorInput(true);
      setSelectedDoctor(''); // Reset selectedDoctor when "Other" is chosen
    } else {
      setShowOtherDoctorInput(false);
      setSelectedDoctor(selectedValue);
    }
  };
  

  const handleOtherDoctorChange = (event) => {
    setOtherDoctor(event.target.value);
    setSelectedDoctor(event.target.value); // Update selectedDoctor here
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleTestChange = (event) => {
    setSelectedTest(event.target.value);
  };

  const generateTimeSlots = () => {
    const timeSlots = [];
    let time = new Date();
    time.setHours(8, 30, 0); // Set initial time to 8:30 AM

    while (time.getHours() < 18 || (time.getHours() === 18 && time.getMinutes() === 0)) {
      const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      timeSlots.push(formattedTime);
      time.setMinutes(time.getMinutes() + 30); // Add 15 minutes to the current time
    }

    return timeSlots;
  };

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const timeSlots = generateTimeSlots();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate if required fields are filled
    if (!selectedDate || !selectedTime || !selectedPaymentMethod || !selectedTest || !file) {
      toast.error("Please fill in all fields", { hideProgressBar: true });
      return;
    }

    const reason = document.getElementById('reason').value.trim();
    const description = document.getElementById('description').value.trim();

    try {
      // Create a FormData object
      const formData = new FormData();
      formData.append('selectedTest', selectedTest);
      formData.append('reason', reason);
      formData.append('description', description);
      formData.append('file', file);
      formData.append('selectedDoctor', selectedDoctor);
      formData.append('selectedDate', selectedDate);
      formData.append('selectedTime', selectedTime);
      formData.append('selectedPaymentMethod', selectedPaymentMethod);
      formData.append('username', username);
      formData.append('report', file); // Append the file directly
      formData.append('reportStatus', 'Pending'); // Include the default report status

      // Send the formData to the server
      const response = await axios.post('http://localhost:8080/appointment/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);

      // Display success message
      toast.dismiss();
      toast.success("Appointment Registered Successfully", {
        hideProgressBar: true,
      });

      // Update state with appointment details
      setAppointmentDetails(response.data);

      // Navigate based on payment method
      if (selectedPaymentMethod === 'Cash') {
        navigate('/appointmentinvoice');
      } else if (selectedPaymentMethod === 'Card') {
        // Navigate to payment page
        navigate('/appointmentpayment');
      }
    } catch (error) {
      console.error('Error registering patient:', error);
      toast.error('An error occurred while registering the patient');
    }
};

  
  

  
  
  
  
  

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };
  
  
  
  

  return (
    <div>
        <ToastContainer />

      {userType === 'patientappointment' && (
        <div>
          <div className='backButtin'>
        <Link className="backBtn" onClick={() => window.location.reload()}>
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
      </div>
        <div className="formContainer">
          <form className='registerForm' onSubmit={handleSubmit} >
            <h2> Make an Appointment </h2>
            <div className='line'></div>

            <br />
            <select className='timeSelect' id="test" onChange={handleTestChange} value={selectedTest}>
            <option value="">Select an Medical Test</option>
             <option value="Complete Blood Count (CBC)">Complete Blood Count (CBC)</option>
             <option value="Basic Metabolic Panel (BMP)">Basic Metabolic Panel (BMP)</option>
             <option value="Comprehensive Metabolic Panel (CMP)">Comprehensive Metabolic Panel (CMP)</option>
             <option value="Lipid Panel">Lipid Panel</option>
             <option value="Urinalysis">Urinalysis</option>
             <option value="Blood Glucose Test">Blood Glucose Test</option>
            </select>
            <br/>

            <input type="text" placeholder="Reason for the Appointment" id="reason" />
            <br />
            <br />
            <textarea rows="10" cols="40" name="message" placeholder="Any relevant medical conditions or details (if none leave empty)" id="description"/>
            <br />

            <div className="file-upload">
            <label className='input-text'>Upload Past Medical Reports:</label><br />
            <input className='uploadFile' type="file" id="report" onChange={handleFileChange} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
          </div>

            <br/>

            <select value={showOtherDoctorInput ? 'Other' : selectedDoctor} onChange={handleDoctorChange}>
              <option value="">Recommended Doctor</option>
              {/* Map over the doctors' names and create an option for each */}
              {doctors.map((doctor, index) => (
                <option key={index} value={doctor}>Dr. {doctor}</option> 
              ))}
              <option value="Other">Other</option>
            </select>
            {showOtherDoctorInput && (
              <input type="text" value={otherDoctor} onChange={handleOtherDoctorChange} placeholder="Enter Doctor's Name" />
            )}
            <br />
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              placeholderText="Select Appointment Date"
              minDate={new Date()} // Set minDate to today's date
            /> 
            <br/>
            <select className='timeSelect' value={selectedTime} onChange={handleTimeChange}>
  <option value="">Select an Appointment Time</option>
  {timeSlots.map((timeSlot, index) => (
    <option key={index} value={timeSlot.time} disabled={!timeSlot.available}>{timeSlot.time}</option>
  ))}
</select>
            <br /><br />
            <div>
            <br/>
              <p className='paymentHead'>Select Payment Method:</p>
              <br />
              <div className='paymentInside'>
              <i class="fa-solid fa-credit-card"></i>
              
              <input className='paymentRadio' type="radio" id="creditCard" name="paymentMethod" value="Card" onChange={handlePaymentMethodChange} />
              <label className='paymentLabel' htmlFor="creditCard">Credit / Debit Card</label><br />
              <br/>
              <i class="fa-solid fa-money-bill" ></i>
              <input className='paymentRadio' type="radio" id="cash" name="paymentMethod" value="Cash" onChange={handlePaymentMethodChange} />
              <label className='paymentLabel' htmlFor="cash">Cash</label><br />
              </div>
            </div>
            <br /><br/>
            <button className='formSubmitAppointment' type="submit">Place Appointment</button>
          </form>
        </div>
        
           

                </div>
      )}
      <Footer />
    
    
    
    
    </div>
    
           
    
  )
}

export default PatientAppointment;