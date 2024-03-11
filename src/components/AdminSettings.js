import React, { useState, useEffect } from 'react';
import './AdminSettings.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link,useNavigate } from 'react-router-dom';

function AdminSettings({userType}) {

    useEffect(() => {
        window.scrollTo(0, 300); 
      }, []); 
    

  const [age, setAge] = useState('');
  const [userDetails, setUserDetails] = useState(null); // State to store user details
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmpassword').value;

    // Check for empty fields
    if ( !username || !password || !confirmPassword) {
      toast.dismiss();
      toast.error("Please fill in all fields", { hideProgressBar: true });
      return;
    }
    

    // Validate password
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long", { hideProgressBar: true });
      return;
    }
    if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      toast.error("Password must contain at least one letter and one number", { hideProgressBar: true });
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", { hideProgressBar: true });
      return;
    }

    // All validations passed, proceed with form submission
    try {
      const formData = { username, password };
      const response = await axios.post('http://localhost:8080/admin/add', formData);
      console.log(response.data);
      setUserDetails(userDetails);
      toast.dismiss();
      toast.success("Admin Registered Successfully", {
        hideProgressBar: true, // Hide the loading bar
      });
      setTimeout(() => {
        navigate('/adminprofile', { state: { userDetails: username } }); // Pass userDetails as state
      }, 2000);
    } 
    
    catch (error) {
      console.error('Error registering Admin:', error);
      toast.error('An error occurred while registering the Admin');
    }
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };



  return (
    <div>

    <div className='backButtin'>
      <Link className="backBtn" onClick={() => window.location.reload()}>
        <i class="fa-solid fa-arrow-left"></i>
      </Link>
    </div>

      <ToastContainer />
      {userType === 'adminsettings' && (
      <div className="formContainer">
          <form className='registerForm' onSubmit={handleSubmit}>
          <h2>Admin Register</h2>
          <div className='line'></div>

          <input type="text" placeholder="Username" id="username" />
          <br />
          <input type="password" placeholder="Password" id="password" />
          <br />
          <input type="password" placeholder="Confirm Password" id="confirmpassword" />
          <br></br>
          <button className='adminAddSubmit' type="submit">Add Admin</button>
        </form>
        
      </div>
      )}

      <Footer />
    </div>
  );
}

export default AdminSettings
