import React, { useState, useEffect } from 'react';
import './EditAccountPatient.css';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from './Button';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link,useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function EditAccountPatient({userType}) {

    const { login, username:currentusername, logout } = useAuth();

    const [patientDetails, setPatientDetails] = useState({
        id: '',
        fullName: '',
        age: '',
        mobileNumber: '',
        email: ''
    });

    const { isLoggedIn, username: currentUsername } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Function to retrieve patient details from the database
        const fetchPatientDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/patient/getByUsername/${currentUsername}`);
                if (response.status === 200) {
                    setPatientDetails(response.data);
                } else {
                    toast.error("Failed to fetch patient details.", { hideProgressBar: true });
                }
            } catch (error) {
                toast.error("An error occurred while fetching patient details. Please try again.", { hideProgressBar: true });
                console.error(error);
            }
        };

        fetchPatientDetails();
    }, [currentUsername]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatientDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const idDelete = patientDetails.id;

    const handleDelete = async (id) => {
        // Ask for confirmation before deleting the account
        const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");

        if (!confirmDelete) {
            return; // If user cancels, do nothing
        }

        try {
            // Make an HTTP DELETE request to delete the patient by ID
            await axios.delete(`http://localhost:8080/patient/delete/${idDelete}`);

            // Show success toast
            toast.success('Patient Deleted Successfully', {
                hideProgressBar: true,
            });
            logout();
            navigate('/'); // Navigate to home page
            window.location.reload();
        } catch (error) {
            console.error('Error deleting patient:', error);
            // Show error toast
            toast.error('An error occurred while deleting the patient');
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Empty field validation
        for (const key in patientDetails) {
            if (!patientDetails[key]) {
                toast.error("Please fill in all fields", { hideProgressBar: true });
                return;
            }
        }

        // Mobile number validation
        const mobileRegex = /^[0-9]{10}$/;
        if (!mobileRegex.test(patientDetails.mobileNumber)) {
            toast.error("Please enter a valid 10-digit mobile number", { hideProgressBar: true });
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8080/patient/update/${patientDetails.id}`, patientDetails);
            if (response.status === 200) {
                toast.success("Patient details updated successfully!", { hideProgressBar: true });
            } else {
                toast.error("Failed to update patient details.", { hideProgressBar: true });
            }
        } catch (error) {
            toast.error("An error occurred while updating patient details. Please try again.", { hideProgressBar: true });
            console.error(error);
        }
    };

    
    const [newUsername, setNewUsername] = useState('');

    

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    

    


  const handleSubmitUsername = async (e) => {
    e.preventDefault();

    if (!newUsername) {
      toast.dismiss();
      toast.error("Please fill in all fields", { hideProgressBar: true });
      return;
    }

    try {
      const response = await axios.put('http://localhost:8080/patient/updateUsername', {
        username: currentusername,
        newUsername: newUsername
      });

      if (response.status === 200) {
        const isLoggedUserType = "patient";
        toast.dismiss();
        toast.success("Username updated successfully!", { hideProgressBar: true });
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
        const response = await axios.put('http://localhost:8080/patient/updatePassword', {
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
      {userType === 'editaccountpatient' && (
      <div className="formContainer">
      <form className="updateForm" onSubmit={handleSubmit}>
        <h2>Update Personal Details</h2>
        <div className="line"></div>
        <br />
        <br />
        <div className="center-div">
        <div className="form-group">
          <label htmlFor="id">ID:</label>
          <input type="text" name="id" value={patientDetails.id} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={patientDetails.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="text"
            name="age"
            value={patientDetails.age}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="text"
            name="mobileNumber"
            value={patientDetails.mobileNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            value={patientDetails.email}
            onChange={handleChange}
          />
        </div>
        </div>
        <button className="adminPassSubmit" type="submit">
          Update Details
        </button>
      </form>
    </div>

            )}
      
      <div className="formContainer">
      
        {userType === 'editaccountpatient' && (
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
        {userType === 'editaccountpatient' && (
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
      
      <div className="center-div">
      <Button className="deleteAccBtn" buttonStyle='logoutBtn' onClick={handleDelete}>
          Delete Account
      </Button>
      </div>
      
    </div>
    </div>
  )
}

export default EditAccountPatient
