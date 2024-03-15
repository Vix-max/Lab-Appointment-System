import React from 'react';
import InputMask from 'react-input-mask';
import './AppointmentPayment.css';

function AppointmentPayment() {
  const handleSubmit = (event) => {
    alert("Payment Success")
    event.preventDefault();
    // Add logic for handling form submission here
  };

  return (
    <div>
      <div className="formContainerPay">
        <form className='registerFormpay' onSubmit={handleSubmit}>
          <h2> Appointment Payment </h2>
          <div className='line'></div>
          <br/>
          <div className='inner_div2'>
            <label className='input-text'>Card Holder: </label><br/>
            <div className='input-container'>
              <input className='input-with-icon1' type="text" placeholder="'Jhon Smith'" id="name" required></input>
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
              <input className='input-with-icon3' type="text" placeholder="12/26" id="expiry" pattern="(0[1-9]|1[0-2])\/([0-9]{2})" inputMode="numeric" required></input>
            </div>
          </div>
          <div className='cvc'>
            <label className='input-text'>CVC:</label><br />
            <div className='input-container'>
              <input className='input-with-icon4' type="text" placeholder="167" id="cvc" pattern="\d{3,4}" inputMode="numeric" required></input>
            </div>
          </div>
          <div>
            <button className='formSubmitAppointment' type="submit">Pay</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AppointmentPayment;
