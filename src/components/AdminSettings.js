import React, { useState, useEffect } from 'react';
import './AdminSettings.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link,useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function AdminSettings({userType}) {

  const { username: isLoggedUsername, logout } = useAuth(); // Get the username and userType from AuthContext

    useEffect(() => {
        window.scrollTo(0, 300); 
      }, []); 
    

  const [age, setAge] = useState('');
  const [userDetails, setUserDetails] = useState(null); // State to store user details
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAdmins, setFilteredAdmins] = useState([]);

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

  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8080/admin/getAll');
        setAdmins(response.data);
        setFilteredAdmins(response.data);
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    }

    fetchData();
  }, []);

  const handleDeleteAdmin = async (adminUsername) => {
    try {
      // Make an HTTP DELETE request to delete the admin by ID
      await axios.delete(`http://localhost:8080/admin/delete/${adminUsername}`);
      // After successfully deleting, update the admin list
      setAdmins(admins.filter(admin => admin.username !== adminUsername));
      console.log(adminUsername," : User Deleted: ");
      toast.dismiss();
      toast.success("Admin Deleted Successfully", {
        hideProgressBar: true, // Hide the loading bar
      });
      if(isLoggedUsername === adminUsername){
        setTimeout(() => {
          logout();
          navigate('/'); // Navigate to home page
          window.location.reload(); // Refresh the page
        }, 2000);
    }
    } catch (error) {
      toast.dismiss();
      toast.error('An error occurred while Deleting the Admin');
      console.log("error: ",error);
    }
  };

  // Function to handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = admins.filter(admin =>
      admin.username.toLowerCase().includes(query.toLowerCase()) ||
      admin.id.toString().includes(query)
    );
    setFilteredAdmins(filtered);
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
        <div>
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
    <div className='tableContainer'>
    
      <table className='adminTable'>
      
        <thead>
          <tr>
            <th colSpan="3" ><h2>Available Admins</h2>
            {/* Search bar */}
            <input
              type="text"
              placeholder="Search by ID or Username"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            </th>
          </tr>
          <tr>
            <th colSpan="3"><div className='line'></div></th>
            </tr>
            <tr >
                  <th>ID</th>
                  <th>Username</th>
                  <th>Action</th>
                </tr>
          
        </thead>
        <tbody>
          {filteredAdmins.map(admin => (
            <tr key={admin.id}>
              <td>{admin.id}</td>
              <td>{admin.username}</td>
              <td>
                <button className='adminDeleteSubmit' onClick={() => handleDeleteAdmin(admin.username)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
    </div>
      )}

      <Footer />
    </div>
  );
}

export default AdminSettings
