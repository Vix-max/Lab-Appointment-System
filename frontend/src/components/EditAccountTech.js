import React, { useState, useEffect } from 'react';
import './EditAccountTech.css';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from './Button';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link,useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function EditAccountTech({userType}) {

    const { login, username:currentusername, logout } = useAuth();
    const [age, setAge] = useState('');

    const [techDetails, setTechDetails] = useState({
        id: '',
        fullName: '',
        empNumber: '',
        special: '',
        age: '',
        email: '',
        mobileNumber: ''
    });

    const { isLoggedIn, username: currentUsername } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Function to retrieve patient details from the database
        const fetchTechDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/tech/getByUsername/${currentUsername}`);
                if (response.status === 200) {
                    setTechDetails(response.data);
                } else {
                    toast.error("Failed to fetch Technician details.", { hideProgressBar: true });
                }
            } catch (error) {
                toast.error("An error occurred while fetching technician details. Please try again.", { hideProgressBar: true });
                console.error(error);
            }
        };

        fetchTechDetails();
    }, [currentUsername]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTechDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    

    const idDelete = techDetails.id;

    const specializations = [
        "Clinical Chemistry",
        "Hematology",
        "Microbiology",
        "Immunology/Serology",
        "Histotechnology",
        "Cytotechnology",
        "Phlebotomy",
        "Molecular Diagnostics",
        "Toxicology"
      ];

    const handleDelete = async (id) => {
        // Ask for confirmation before deleting the account
        const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");

        if (!confirmDelete) {
            return; // If user cancels, do nothing
        }

        try {
            // Make an HTTP DELETE request to delete the patient by ID
            await axios.delete(`http://localhost:8080/tech/delete/${idDelete}`);

            // Show success toast
            toast.success('Technician Deleted Successfully', {
                hideProgressBar: true,
            });
            logout();
            navigate('/'); // Navigate to home page
            window.location.reload();
        } catch (error) {
            console.error('Error deleting Technician:', error);
            // Show error toast
            toast.error('An error occurred while deleting the technician');
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Empty field validation
        for (const key in techDetails) {
            if (!techDetails[key]) {
                toast.error("Please fill in all fields", { hideProgressBar: true });
                return;
            }
        }

        // Mobile number validation
        

        try {
            const response = await axios.put(`http://localhost:8080/tech/update/${techDetails.id}`, techDetails);
            if (response.status === 200) {
                toast.success("technician details updated successfully!", { hideProgressBar: true });
            } else {
                toast.error("Failed to update technician details.", { hideProgressBar: true });
            }
        } catch (error) {
            toast.error("An error occurred while updating technician details. Please try again.", { hideProgressBar: true });
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
      const response = await axios.put('http://localhost:8080/tech/updateUsername', {
        username: currentusername,
        newUsername: newUsername
      });

      if (response.status === 200) {
        const isLoggedUserType = "tech";
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
        const response = await axios.put('http://localhost:8080/tech/updatePassword', {
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
      {userType === 'editaccounttech' && (
      <div className="formContainer">
      <form className="updateForm" onSubmit={handleSubmit}>
        <h2>Update Personal Details</h2>
        <div className="line"></div>
        <br />
        <br />
        <div className="center-div">
        <div className="form-group">
          <label htmlFor="id">ID:</label>
          <input type="text" name="id" value={techDetails.id} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={techDetails.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="empNumber">Employee Number: </label>
          <input
            type="text"
            name="empNumber"
            value={techDetails.empNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="special">Specialization:</label>
          <select id="special" name="special" value={techDetails.special} onChange={handleChange}>
    <option value="">Select Specialization</option>
    {specializations.map((specialization, index) => (
        <option key={index} value={specialization}>
            {specialization}
        </option>
    ))}
</select>

        </div>
        <div className="form-group">
          <label htmlFor="age">Age: </label>
          <select value={techDetails.age} onChange={(e) => {
            setTechDetails(prevState => ({
                ...prevState,
                age: e.target.value
            }));
            }}>
            <option value="">Select Age</option>
            {Array.from({ length: 150 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                {index + 1}
                </option>
            ))}
            </select>


        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            value={techDetails.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="text"
            name="mobileNumber"
            value={techDetails.mobileNumber}
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
      
        {userType === 'editaccounttech' && (
          <form className='techUsernameEdit' onSubmit={handleSubmitUsername}>
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
        {userType === 'editaccounttech' && (
          <form className='techPasswordEdit' onSubmit={handleSubmitPassword} >
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

export default EditAccountTech
