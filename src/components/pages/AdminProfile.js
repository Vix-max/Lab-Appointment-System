import React, {  useEffect, useState } from 'react';
import { useLocation, useNavigate,useParams } from 'react-router-dom';
import './AdminProfile.css';
import Footer from '../Footer';
import EditAccount from '../EditAccount';
import AdminSettings from '../AdminSettings';
import PatientSettings from '../PatientSettings';
import DoctorSettings from '../DoctorSettings';
import AppointmentSettings from '../AppointmentSettings';
import {Link} from 'react-router-dom'
import { Button } from '../Button';
import { useAuth } from '../../AuthContext'; // Import useAuth hook
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import TechSettings from '../TechSettings';
import ViewQueries from '../ViewQueries';
import GenerateReports from '../GenerateReports';


 function AdminProfile(){
    useEffect(() => {
        window.scrollTo(0, 400); 
      }, []); 


      const { username: username, userType: isLoggedUserType, isLoggedIn, logout } = useAuth(); // Get the username and userType from AuthContext
      console.log('Logged In Username:', username); // Check if logged in username is retrieved
      console.log('User Type:', isLoggedUserType); // Check if user type is retrieved
      console.log('Is Logged:', isLoggedIn); // Check if user type is retrieved

      const navigate = useNavigate();

      const handleLogout = () => {
        setTimeout(() => {
          logout();
          navigate('/'); // Navigate to home page
          window.location.reload(); // Refresh the page
        }, 1000); // Adjust the delay as needed
      };


     const [selectedUserType, setSelectedUserType] = useState(null);
     
   
     const handleUserTypeSelect = (userType, event) => {
       event.preventDefault();
       setSelectedUserType(userType);
     };



    return (
        <div>
            <div className='hero'>

            <h1 className='hero_h1'> Admin Profile</h1>
            <p className='hero_p'>User : {username}</p>
            

            </div>
            {!selectedUserType && (    
  <div>
      
      <div className='card_btn3'>
    <Button className='btns' buttonStyle='btn-outline-drblue' buttonSize='btn--small'>
          User Settings
      </Button>
      </div>
      
      <div className='cards__container3'>
      <div className='cards__wrapper3'>

      <ul className='cards__items3'>  



<li className='cards__item3'>
  <Link className='cards__item__link3' to="/" onClick={(event) => handleUserTypeSelect('editaccount', event)}>
  <figure className='cards__item__pic-wrap3' >
      <img
        className='cards__item__img3'
        alt='Travel Image'
        src="../images/user-pen-solid.png"
      />
    </figure>
    <div className='cards__item__info3'>
      <h5 className='cards__item__text3'>Edit Account</h5>
      <p className='cards__item__text__p3'>View or Edit your personal account</p>
    </div>
  </Link>
</li>



<li className='cards__item3'>
  <Link className='cards__item__link3' to="/" onClick={(event) => handleUserTypeSelect('generatereport', event)}>
  <figure className='cards__item__pic-wrap3' >
      <img
        className='cards__item__img3'
        alt='Travel Image'
        src="../images/file-invoice-solid.png"
      />
    </figure>
    <div className='cards__item__info3'>
      <h5 className='cards__item__text3'>Generate Reports</h5>
      <p className='cards__item__text__p3'>Generate reports based on Database data</p>
    </div>
  </Link>
</li>

<li className='cards__item3'>
  <Link className='cards__item__link3' to="/" onClick={(event) => handleUserTypeSelect('viewqueries', event)}>
  <figure className='cards__item__pic-wrap3' >
      <img
        className='cards__item__img3'
        alt='Travel Image'
        src="../images/question-solid.png"
      />
    </figure>
    <div className='cards__item__info3'>
      <h5 className='cards__item__text3'>Queries</h5>
      <p className='cards__item__text__p3'>View/Delete/Answer patient queries.</p>
    </div>
  </Link>
</li>


<li className='cards__item3'>
  <Link className='cards__item__link3' to="/" onClick={(event) => handleUserTypeSelect('appointmentsettings', event)}>
  <figure className='cards__item__pic-wrap3' >
      <img
        className='cards__item__img3'
        alt='Travel Image'
        src="../images/calendar-check-solid.png"
      />
    </figure>
    <div className='cards__item__info3'>
    <h5 className='cards__item__text3'>Appointment Settings</h5>
      <p className='cards__item__text__p3'>View and Edit Patient appointments</p>
    </div>
  </Link>
</li>     
</ul>
      
      <ul className='cards__items3'>  

      <li className='cards__item3'>
      <Link className='cards__item__link' to="/" onClick={(event) => handleUserTypeSelect('adminsettings', event)}>
      <figure className='cards__item__pic-wrap3' >

          <img
            className='cards__item__img3'
            alt='Travel Image'
            src="../images/user-gear-solid (1).png"
          />
        </figure>
        <div className='cards__item__info3'>
          <h5 className='cards__item__text3'>Admin Settings</h5>
          <p className='cards__item__text__p3'>Add or Delete Admin Users from the Application</p>
        </div>
      </Link>
    </li>



    <li className='cards__item3'>
      <Link className='cards__item__link3' to="/" onClick={(event) => handleUserTypeSelect('doctorsettings', event)}>
      <figure className='cards__item__pic-wrap3' >
          <img
            className='cards__item__img3'
            alt='Travel Image'
            src="../images/user-doctor-solid (3).png"
          />
        </figure>
        <div className='cards__item__info3'>
          <h5 className='cards__item__text3'>Doctor Settings</h5>
          <p className='cards__item__text__p3'>Add or Delete Doctor Users from the Application</p>
        </div>
      </Link>
    </li>



    <li className='cards__item3'>
      <Link className='cards__item__link3' to="/" onClick={(event) => handleUserTypeSelect('techsettings', event)}>
      <figure className='cards__item__pic-wrap3' >
          <img
            className='cards__item__img3'
            alt='Travel Image'
            src="../images/user-nurse-solid (1).png"
          />
        </figure>
        <div className='cards__item__info3'>
          <h5 className='cards__item__text3'>Technician Settings</h5>
          <p className='cards__item__text__p3'>Add or Delete Technician Users from the Application</p>
        </div>
      </Link>
    </li>

    <li className='cards__item3'>
      <Link className='cards__item__link3' to="/" onClick={(event) => handleUserTypeSelect('patientsettings', event)}>
      <figure className='cards__item__pic-wrap3' >
          <img
            className='cards__item__img3'
            alt='Travel Image'
            src="../images/users-solid (6).png"
          />
        </figure>
        <div className='cards__item__info3'>
          <h5 className='cards__item__text3'>Patient Settigs</h5>
          <p className='cards__item__text__p3'>Add or Delete Patient Users from the Application</p>
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
        {selectedUserType === 'editaccount' && <EditAccount userType={selectedUserType}/>}
        {selectedUserType === 'adminsettings' && <AdminSettings userType={selectedUserType}/>}
        {selectedUserType === 'patientsettings' && <PatientSettings userType={selectedUserType}/>}
        {selectedUserType === 'doctorsettings' && <DoctorSettings userType={selectedUserType}/>}
        {selectedUserType === 'techsettings' && <TechSettings userType={selectedUserType}/>}
        {selectedUserType === 'appointmentsettings' && <AppointmentSettings userType={selectedUserType}/>}
        {selectedUserType === 'viewqueries' && <ViewQueries userType={selectedUserType}/>}
        {selectedUserType === 'generatereport' && <GenerateReports userType={selectedUserType}/>}
      </>
    )}




            <Footer />
        </div>
        );
}

export default AdminProfile;