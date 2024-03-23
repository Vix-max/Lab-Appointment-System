import React, { useState, useEffect } from 'react';
import './PatientReview.css';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from './Button';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link,useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function PatientReview({userType}) {


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("submit")
    
    
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const appId = document.getElementById('appId').value;
        const review = document.getElementById('review').value;
    
        // Check for empty fields
        if (!fullName || !appId || !review || !email ) {
          toast.dismiss();
          toast.error("Please fill in all fields", { hideProgressBar: true });
          return;
        }
    
    
    
        // All validations passed, proceed with form submission
        try {
          const formData = { fullName, email, appId, review};
          const response = await axios.post('http://localhost:8080/review/add', formData);
          console.log(response.data);
          toast.dismiss();
          toast.success("Review Submitted Successfully", {
            hideProgressBar: true, // Hide the loading bar
          });
          
          
        } 
        
        catch (error) {
          console.error('Error submiting review:', error);
          toast.error('An error occurred while submiting the review');
        }
      };
    


  return (
    <div>
        
        <ToastContainer />
      <div className='backButtin'>
      <Link className="backBtn" onClick={() => window.location.reload()}>
        <i class="fa-solid fa-arrow-left"></i>
      </Link>
      </div>

      {userType === 'submitreview' && (
      <div className="formContainer">
            <form className='registerForm' onSubmit={handleSubmit} >
              <h2> How was our Service? </h2>
              <div className='line'></div>

              
              <br/>

              <input type="text" placeholder="Full Name" id="fullName" />
                <br />

                <input type="text" placeholder="Your email" id="email" />

                <br/>
                <input type="text" placeholder="Appointment Id" id="appId" />
                <br/>
            
                <textarea rows="10" cols="40" name="review" placeholder="Write your Expereince" id="review"/>
                <br />


              

            
             
              <br/>
            
              <button className='formSubmitAppointment' type="submit">Submit Review</button>
            </form>
          </div>
          )}
      
    </div>
  )
}

export default PatientReview
