import React, { useState, useEffect } from 'react';
import './EditAccount.css';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link,useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';


function EditAccount({ userType }) {

    const queryParams = new URLSearchParams(window.location.search);
    const [currentusername, setCurrentUsername] = useState(queryParams.get('username')); // Define currentUsername state and its setter function

    const [newUsername, setNewUsername] = useState('');

    

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { isLoggedIn, login } = useAuth();

    const navigate = useNavigate(); // Get navigate function

  const handleSubmitUsername = async (e) => {
    e.preventDefault();

    if (!newUsername) {
      toast.dismiss();
      toast.error("Please fill in all fields", { hideProgressBar: true });
      return;
    }

    try {
      const response = await axios.put('http://localhost:8080/admin/updateUsername', {
        username: currentusername,
        newUsername: newUsername
      });

      if (response.status === 200) {
        const isLoggedUserType = "admin";
        toast.dismiss();
        toast.success("Username updated successfully!", { hideProgressBar: true });
        setCurrentUsername(newUsername); // Update the currentusername state
        setNewUsername(''); // Clear the newUsername state for next update
        login(newUsername, isLoggedUserType); // Call the login function with the username
        
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('username', newUsername);
        navigate(`${window.location.pathname}?${searchParams.toString()}`);

      } else {
        toast.dismiss();
        toast.error("Failed to update username.", { hideProgressBar: true });
      }
    } catch (error) {
      toast.dismiss();
        toast.error("An error occurred. Please try again.", { hideProgressBar: true });
      console.error(error);
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.dismiss();
      toast.error("Please fill in all fields", { hideProgressBar: true });
      return;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match.", { hideProgressBar: true });
        return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long", { hideProgressBar: true });
      return;
    }
    if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      toast.error("Password must contain at least one letter and one number", { hideProgressBar: true });
      return;
    }

    // Add any password validation logic here

    try {
        const response = await axios.put('http://localhost:8080/admin/updatePassword', {
            username: currentusername,
            newPassword: password
        });

        if (response.status === 200) {
            toast.dismiss();
            toast.success("Password updated successfully!", { hideProgressBar: true });
            setPassword('');
            setConfirmPassword('');
        } else {
            toast.dismiss();
            toast.error("Failed to update password.", { hideProgressBar: true });
        }
    } catch (error) {
        toast.dismiss();
        toast.error("An error occurred. Please try again.", { hideProgressBar: true });
        console.error(error);
    }
};
  
  return (
    <div>
      <div>
      <ToastContainer />
      <div className='backButtin'>
      <Link className="backBtn" onClick={() => window.location.reload()}>
        <i class="fa-solid fa-arrow-left"></i>
      </Link>
      </div>
      
      <div className="formContainer">
      
        {userType === 'editaccount' && (
          <form className='patientUsernameEdit' onSubmit={handleSubmitUsername}>
            <h2>Update Username</h2>
            <div className='line'></div>
            <label>
              
              <input type="text" value={newUsername} placeholder="New Username" onChange={(e) => setNewUsername(e.target.value)} />
            </label>
            
            <br></br>
            <button className='adminNameSubmit' type="submit">Update Username</button>
          </form>

          
        )}
        
      </div>

      <div className="formContainer">
        {userType === 'editaccount' && (
          <form className='patientPasswordEdit' onSubmit={handleSubmitPassword} >
            <h2>Update Password</h2>
            <div className='line'></div>
            <label>
              
              <input type="password" value={password} placeholder="New Password" onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <label>
         
              <input type="password" value={confirmPassword} placeholder="Confirm Password " onChange={(e) => setConfirmPassword(e.target.value)} />
            </label>
            <br></br>
            <button className='adminPassSubmit' type="submit">Update Password</button>
            
          </form>
          

        
        )}
        
        
      </div>


      
    </div>
    </div>
  )
}

export default EditAccount
