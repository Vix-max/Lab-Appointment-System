import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Login.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';

function AdminLogin({ userType }) {

  useEffect(() => {
    window.scrollTo(0, 300); 
  }, []); 

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userDetails, setUserDetails] = useState(null); // State to store user details
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/admin/login', { password, username });
      if (response.status === 200) {
        console.log(response.data);
        setUserDetails(userDetails);
        toast.dismiss();
        toast.success("Login Success", {
          hideProgressBar: true, // Hide the loading bar
        });
        setIsLoggedIn(true);
        setTimeout(() => {
          navigate('/adminprofile', { state: { userDetails: username } }); // Pass userDetails as state
        }, 2000);
      } else {
        console.error('Login failed:', response.data);
        toast.dismiss();
        toast.error("Login failed. Please try again.", {
          hideProgressBar: true, // Hide the loading bar
        });
        
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.dismiss();
      toast.error("Login failed. Please try again.", {
        hideProgressBar: true, // Hide the loading bar
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="formContainer">
        {userType === 'admin' && (
          <form className='adminLogForm' onSubmit={handleSubmit}>
            <h2>Admin Login</h2>
            <div className='line'></div>
            <label>
              Username:
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <br />
            <label>
              Password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br></br>
            <button className='adminSubmit' type="submit">Login</button>
            <button className='backButton' onClick={() => window.location.reload()} type="button">Back</button>
          </form>
        )}
        {userType === 'doctor' && (
          <h2>Doctor Login</h2>
        )}
        {userType === 'patient' && (
          <h2>Patient Login</h2>
        )}
        {userType === 'tech' && (
          <h2>Technician Login</h2>
        )}
      </div>
    </div>
  );
}

export default AdminLogin;
