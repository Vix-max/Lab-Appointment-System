import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Contact.css';
import Footer from '../Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../AuthContext'; // Import useAuth hook

import { useNavigate } from 'react-router-dom';

function Contact(){
    const [age, setAge] = useState('');

    const handleAgeChange = (e) => {
        setAge(e.target.value);
      };


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("submit")
    
    
        const fullName = document.getElementById('fullName').value;
        const type = document.getElementById('type').value;
        const head = document.getElementById('head').value;
        const subject = document.getElementById('email').value;
        const email = document.getElementById('subject').value;
    
        // Check for empty fields
        if (!fullName || !type || !head || !email || !subject) {
          toast.dismiss();
          toast.error("Please fill in all fields", { hideProgressBar: true });
          return;
        }
    
    
    
        // All validations passed, proceed with form submission
        try {
          const formData = { fullName, type, head, subject, email};
          const response = await axios.post('http://localhost:8080/inquiry/add', formData);
          console.log(response.data);
          toast.dismiss();
          toast.success("Inquiry Submitted Successfully", {
            hideProgressBar: true, // Hide the loading bar
          });
          
          
        } 
        
        catch (error) {
          console.error('Error submiting inquiry:', error);
          toast.error('An error occurred while submiting the inquiry');
        }
      };


    return (


        <div>
            <ToastContainer />
            <div className='hero'>

            <h1 className='hero_h1'> Contact us</h1>
            <p className='hero_p'>Home / Contact</p>
            </div>
            <div className="formContainer">
            <form className='registerForm' onSubmit={handleSubmit} >
              <h2> Submit Inquiry </h2>
              <div className='line'></div>

              
              <br/>

              <input type="text" placeholder="Full Name" id="fullName" />
                <br />

                <input type="text" placeholder="Your email" id="email" />

                <select id="type" onChange={handleAgeChange}>
                <option value="">Issue Type</option>
                <option value="technical">Technical Inquiry</option>
                <option value="medical">Medical Inquiry</option>
                </select>
                <br />
                <input type="text" placeholder="Inquiry Head" id="head" />
                <br />
                <textarea rows="10" cols="40" name="message" placeholder="Inquiry Subject" id="subject"/>
                <br />


              

            
             
              <br/>
            
              <button className='formSubmitAppointment' type="submit">Submit Inquiry</button>
            </form>
          </div>




            <Footer />
        </div>

    )
}

export default Contact;