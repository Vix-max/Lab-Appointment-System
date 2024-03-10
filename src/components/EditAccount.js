import React, { useState, useEffect } from 'react';
import './EditAccount.css';
import { Button } from './Button';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';


function EditAccount({ userType }) {



    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
  return (
    <div>
      <div>
      <ToastContainer />
      <div className="formContainer">
      <Link className="backBtn" onClick={() => window.location.reload()}>
        <i class="fa-solid fa-arrow-left"></i>
                </Link>
        {userType === 'admin' && (
          <form className='patientUsernameEdit' >
            <h2>Update Username</h2>
            <div className='line'></div>
            <label>
              
              <input type="text" value={username} placeholder="New Username" onChange={(e) => setUsername(e.target.value)} />
            </label>
            
            <br></br>
            <button className='adminSubmit' type="submit">Update Username</button>
            <button className='backButton'  type="button">Back</button>
          </form>

          
        )}
        
      </div>

      <div className="formContainer">
        {userType === 'admin' && (
          <form className='patientPasswordEdit' >
            <h2>Update Password</h2>
            <div className='line'></div>
            <label>
              
              <input type="password" value={username} placeholder="New Password" onChange={(e) => setUsername(e.target.value)} />
            </label>
            <br />
            <label>
         
              <input type="password" value={password} placeholder="Confirm Password " onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br></br>
            <button className='adminSubmit' type="submit">Update Password</button>
            <button className='backButton' onClick={() => window.location.reload()} type="button">Back</button>
          </form>
          

        
        )}
        
        
      </div>


      
    </div>
    </div>
  )
}

export default EditAccount
