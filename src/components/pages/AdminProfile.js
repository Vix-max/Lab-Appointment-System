import React, {  useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './AdminProfile.css';
import Footer from '../Footer';


 function AdminProfile(){
    useEffect(() => {
        window.scrollTo(0, 0); 
      }, []); 

      //Accessing the username from the login page
      const location = useLocation();
     const userDetails = location.state.userDetails;
    return (
        <div>
            <div className='hero'>

            <h1 className='hero_h1'> Admin Profile</h1>
            <p className='hero_p'>User : {userDetails}</p>

            </div>

            <Footer />
        </div>
        );
}

export default AdminProfile;