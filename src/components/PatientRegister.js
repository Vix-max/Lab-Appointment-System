import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './PatientRegister.css';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';

function RegisterForms( ) {

  return (
    <div>

      <div className='hero'>

      <h1 className='hero_h1'> New Patient Register</h1>
      <p className='hero_p'>Home / Signup / Register</p>



      </div>

      <ToastContainer />
      <div className="formContainer">
          <form className='registerForm' >
          <h2>Patient Register</h2>
          <div className='line'></div>

          <input type="text" placeholder="Full Name" id="fullName" />
          <br />
          <input type="text" placeholder="Age" id="age"  />
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
          <button className='formSubmit' type="submit">Login</button>
          <button className='backButton'  type="button">Back</button>
        </form>
        
      </div>

      <Footer />
    </div>
  );
}

export default RegisterForms;
