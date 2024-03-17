import React, {  useEffect, useState } from 'react';
import { useLocation, useNavigate,useParams } from 'react-router-dom';
import './PatientProfile.css';
import Footer from '../Footer';
import { Button } from '../Button';
import { useAuth } from '../../AuthContext'; // Import useAuth hook
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom'
import EditAccountPatient from '../EditAccountPatient';
import ViewTechPatient from '../ViewTechPatient';
import PatientAppointment from '../PatientAppointment';
import ViewAppointmentPatient from '../ViewAppointmentPatient';


 function PatientProfile(){

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

            <h1 className='hero_h1'> Patient Profile</h1>
            <p className='hero_p'>User : {username}</p>
            <p className='hero_p'>User type : {isLoggedUserType}</p>

            </div>
            {!selectedUserType && (    
            <div>
            <div className='cards__container3'>
      <div className='cards__wrapper3'>

      <ul className='cards__items3'>  



<li className='cards__item4'>
  <Link className='cards__item__link4' to="/" onClick={(event) => handleUserTypeSelect('editaccountpatient', event)}>
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
  <Link className='cards__item__link4' to="/" onClick={(event) => handleUserTypeSelect('patientappointment', event)}>
  <figure className='cards__item__pic-wrap3' >
      <img
        className='cards__item__img3'
        alt='Travel Image'
        src="../images/calendar-check-regular.png"
      />
    </figure>
    <div className='cards__item__info3'>
      <h5 className='cards__item__text3'>Place Appointments</h5>
      <p className='cards__item__text__p3'>Place your personal Medical Test Appointments</p>
    </div>
  </Link>
</li>



<li className='cards__item4'>
  <Link className='cards__item__link4' to="/" onClick={(event) => handleUserTypeSelect('viewAppointment', event)}>
  <figure className='cards__item__pic-wrap3' >
      <img
        className='cards__item__img3'
        alt='Travel Image'
        src="../images/clock-rotate-left-solid.png"
      />
    </figure>
    <div className='cards__item__info3'>
    <h5 className='cards__item__text3'>View Past Test/Appointments</h5>
      <p className='cards__item__text__p3'>View and Download past appointments and test results</p>
    </div>
  </Link>
</li>     
</ul>
      
      <ul className='cards__items3'>  

      <li className='cards__item4'>
      <Link className='cards__item__link4' to="/" onClick={(event) => handleUserTypeSelect('viewtechpatient', event)}>
      <figure className='cards__item__pic-wrap3' >

          <img
            className='cards__item__img3'
            alt='Travel Image'
            src="../images/user-nurse-solid (1).png"
          />
        </figure>
        <div className='cards__item__info3'>
          <h5 className='cards__item__text3'>View Technicians</h5>
          <p className='cards__item__text__p3'>View all the technicians and thier availability in the ABC laboratories</p>
        </div>
      </Link>
    </li>



    <li className='cards__item4'>
      <Link className='cards__item__link4' to="/" onClick={(event) => handleUserTypeSelect('doctorsettings', event)}>
      <figure className='cards__item__pic-wrap3' >
          <img
            className='cards__item__img3'
            alt='Travel Image'
            src="../images/circle-question-regular.png"
          />
        </figure>
        <div className='cards__item__info3'>
          <h5 className='cards__item__text3'>Inquiries / Questions</h5>
          <p className='cards__item__text__p3'>Send or submit your questions or Inquiries</p>
        </div>
      </Link>
    </li>



    <li className='cards__item4'>
      <Link className='cards__item__link4' to="/" onClick={(event) => handleUserTypeSelect('techsettings', event)}>
      <figure className='cards__item__pic-wrap3' >
          <img
            className='cards__item__img3'
            alt='Travel Image'
            src="../images/comments-solid.png"
          />
        </figure>
        <div className='cards__item__info3'>
          <h5 className='cards__item__text3'>Feedback & Reviews</h5>
          <p className='cards__item__text__p3'>Give us your experience with ABC Laboratories</p>
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
                    {selectedUserType === 'editaccountpatient' && <EditAccountPatient userType={selectedUserType}/>}
                    {selectedUserType === 'viewtechpatient' && <ViewTechPatient userType={selectedUserType}/>}
                    {selectedUserType === 'patientappointment' && <PatientAppointment userType={selectedUserType}/>}
                    {selectedUserType === 'viewAppointment' && <ViewAppointmentPatient userType={selectedUserType}/>}
                    
                  </>
                )}

            <Footer />
        </div>
        );
}

export default PatientProfile;