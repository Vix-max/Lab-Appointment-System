import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';
import './AppointmentPayment.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AppointmentPayment() {
  const [appointmentDetails, setAppointmentDetails] = useState({
    test: '',
    id: '',
    reason: '',
    doctor: '',
    date: '',
    time:'',
    payment:''
  });
  const [isFetchingAppointment, setIsFetchingAppointment] = useState(true);
  const [isFormEnabled, setIsFormEnabled] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchLatestAppointment();
  }, []);

  const fetchLatestAppointment = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/appointment/latest`);
      setAppointmentDetails(response.data);
      setIsFormEnabled(true); // Enable the form once appointment details are fetched
    } catch (error) {
      console.error('Error fetching latest appointment:', error);
    } finally {
      setIsFetchingAppointment(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    let number = document.getElementById('cardnumber').value;
    const expiry = document.getElementById('expiry').value;
    const cvc = document.getElementById('cvc').value;

    number = number.replace(/\s/g, '');

    console.log("ID: ", appointmentDetails.id);

    // Check for empty fields
    if (!name || !number || !expiry || !cvc) {
      toast.dismiss();
      toast.error("Please fill in all fields", { hideProgressBar: true });
      return;
    }

    // All validations passed, proceed with form submission
    try {
      const formData = { name, number, expiry, cvc, appointmentId: appointmentDetails.id };
      const response = await axios.post('http://localhost:8080/payment/add', formData);
      console.log(response.data);
      toast.dismiss();
      toast.success("Payment Successful", {
        hideProgressBar: true, // Hide the loading bar
      });

      setTimeout(() => {
        navigate('/appointmentinvoice'); // Pass userDetails as state
      }, 1000);
    } catch (error) {
      console.error('Error Proceeding with the Payment:', error);
      toast.error('An error occurred while proceeding with the Payment');
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="formContainerPay">
        <form className='registerFormpay' onSubmit={handleSubmit}>
          <h2> Appointment Payment </h2>
          <div className='line'></div>
          <br/>
          <div className='inner_div2'>
            <label className='input-text'>Card Holder: </label><br/>
            <div className='input-container'>
              <input className='input-with-icon1' type="text" placeholder="'John Smith'" id="name" required />
            </div>

            <br />
            <label className='input-text'>Card Number:</label><br />
            <div className='input-container'>
              <InputMask
                mask="9999 9999 9999 9999"
                maskChar=" "
                className='input-with-icon2'
                type="text"
                placeholder="0000 0000 0000 0000"
                id="cardnumber"
                required
              />
            </div>
          </div>

          <br />
          <div className='expiry'>
            <label className='input-text'>Expiry:</label><br />
            <div className='input-container'>
              <input className='input-with-icon3' type="text" placeholder="12/26" id="expiry" pattern="(0[1-9]|1[0-2])\/([0-9]{2})" inputMode="numeric" required />
            </div>
          </div>
          <div className='cvc'>
            <label className='input-text'>CVC:</label><br />
            <div className='input-container'>
              <input className='input-with-icon4' type="text" placeholder="167" id="cvc" pattern="\d{3,4}" inputMode="numeric" required />
            </div>
          </div>
          <div>
            <button className='formSubmitAppointment' type="submit" disabled={!isFormEnabled || isFetchingAppointment}>Pay</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AppointmentPayment;
