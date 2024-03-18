import React, {  useEffect, useState } from 'react';
import { useLocation, useNavigate,useParams } from 'react-router-dom';
import './DoctorProfile.css';
import Footer from '../Footer';
import { Button } from '../Button';
import { useAuth } from '../../AuthContext'; // Import useAuth hook
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom'
import EditAccountDoctor from '../EditAccountDoctor';
import ViewAppointmentsDoctor from '../ViewAppointmentsDoctor';
import ViewPatientDoctor from '../ViewPatientDoctor';



 function DoctorProfile(){

    const [selectedUserType, setSelectedUserType] = useState(null);
     
   
     const handleUserTypeSelect = (userType, event) => {
       event.preventDefault();
       setSelectedUserType(userType);
     };

    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0); 
      }, []); 

      const { username: username, userType: isLoggedUserType, isLoggedIn, logout } = useAuth(); // Get the username and userType from AuthContext

      const handleLogout = () => {
        setTimeout(() => {
          logout();
          navigate('/'); // Navigate to home page
          window.location.reload(); // Refresh the page
        }, 1000); // Adjust the delay as needed
      };
      
    return (
        <div>
            <div className='hero'>

            <h1 className='hero_h1'> Doctor Profile</h1>
            <p className='hero_p'>User : {username}</p>

            </div>
            {!selectedUserType && (    
            <div>
            <div className='cards__container3'>
      <div className='cards__wrapper3'>

      <ul className='cards__items3'>  



<li className='cards__item4'>
  <Link className='cards__item__link4' to="/" onClick={(event) => handleUserTypeSelect('editaccountdoctor', event)}>
  <figure className='cards__item__pic-wrap3' >
      <img
        className='cards__item__img3'
        alt='Travel Image'
        src="../images/user-pen-solid.png"
      />
    </figure>
    <div className='cards__item__info3'>
      <h5 className='cards__item__text3'>Edit Account</h5>
      <p className='cards__item__text__p3'>View, Edit or Delete your Personal account and Personal details</p>
    </div>
  </Link>
</li>



<li className='cards__item4'>
  <Link className='cards__item__link4' to="/" onClick={(event) => handleUserTypeSelect('viewappointmentdoctor', event)}>
  <figure className='cards__item__pic-wrap3' >
      <img
        className='cards__item__img3'
        alt='Travel Image'
        src="../images/calendar-check-regular.png"
      />
    </figure>
    <div className='cards__item__info3'>
      <h5 className='cards__item__text3'>View Appointments</h5>
      <p className='cards__item__text__p3'>View Patient appointments under your name and Download Test results</p>
    </div>
  </Link>
</li>



<li className='cards__item4'>
  <Link className='cards__item__link4' to="/" onClick={(event) => handleUserTypeSelect('viewpatientdoctor', event)}>
  <figure className='cards__item__pic-wrap3' >
      <img
        className='cards__item__img3'
        alt='Travel Image'
        src="../images/hospital-user-solid.png"
      />
    </figure>
    <div className='cards__item__info3'>
    <h5 className='cards__item__text3'>View Patients</h5>
      <p className='cards__item__text__p3'>View Patients and thier details</p>
    </div>
  </Link>
</li>     
</ul>
      
      
    


    </div>
    <Button buttonStyle='logoutBtn' onClick={handleLogout}>
          Logout
      </Button>
    </div>
            </div>
            )}
            {selectedUserType && (
                  <>
                    {selectedUserType === 'editaccountdoctor' && <EditAccountDoctor userType={selectedUserType}/>}
                    {selectedUserType === 'viewappointmentdoctor' && <ViewAppointmentsDoctor userType={selectedUserType}/>}
                    {selectedUserType === 'viewpatientdoctor' && <ViewPatientDoctor userType={selectedUserType}/>}
                    
                  </>
                )}

            <Footer />
        </div>
        );
}

export default DoctorProfile;