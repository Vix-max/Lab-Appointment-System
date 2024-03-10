import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Login.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
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

    // Define backend API endpoints for each user type
    const backendEndpoints = {
      admin: 'http://localhost:8080/admin/login',
      doctor: 'http://localhost:8080/doctor/login',
      patient: 'http://localhost:8080/patient/login',
      tech: 'http://localhost:8080/tech/login'
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendEndpoints[userType], { password, username });
      if (response.status === 200) {
        console.log(response.data);
        toast.dismiss();
        toast.success("Login Success", { hideProgressBar: true });
        setTimeout(() => {
          switch (userType) {
            case 'admin':
              navigate('/adminprofile', { state: { userDetails: username } });
              break;
            case 'doctor':
              navigate('/doctorprofile', { state: { userDetails: username } });
              break;
            case 'patient':
              navigate('/patientprofile', { state: { userDetails: username } });
              break;
            case 'tech':
              navigate('/techprofile', { state: { userDetails: username } });
              break;
            default:
              navigate('/');
              break;
          }
        }, 2000);
      } else {
        console.error('Login failed:', response.data);
        toast.dismiss();
        toast.error("Login failed. Please try again.", { hideProgressBar: true });
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.dismiss();
      toast.error("Login failed. Please try again.", { hideProgressBar: true });
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
          <form className='adminLogForm' onSubmit={handleSubmit}>
          <h2>Doctor Login</h2>
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
        {userType === 'patient' && (
          <form className='adminLogForm' onSubmit={handleSubmit}>
          <h2>Patient Login</h2>
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
          <Link to="/patientregister" className='userRegister'>Register</Link>
          <button className='backButton' onClick={() => window.location.reload()} type="button">Back</button>
        </form>
        )}
        {userType === 'tech' && (
          <form className='adminLogForm' onSubmit={handleSubmit}>
          <h2>Technician Login</h2>
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
      </div>
    </div>
  );
}

export default AdminLogin;
