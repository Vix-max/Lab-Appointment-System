import React, { useState, useEffect } from 'react';
import './Signup.css';
import AdminLogin from '../AdminLogin';
import Footer from '../Footer';
import {Link} from 'react-router-dom'
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';

function Signup(){

  useEffect(() => {
    window.scrollTo(0, 300); 
  }, []); 

  const [selectedUserType, setSelectedUserType] = useState(null);
  const navigate = useNavigate();

  const handleUserTypeSelect = (userType, event) => {
    event.preventDefault();
    setSelectedUserType(userType);
  };

  const handleLogout = () => {
    setSelectedUserType(null);
  };
 
    return(
        <>

        <div className='hero'>

          <h1 className='hero_h1'> Sign up</h1>
          <p className='hero_p'>Home / Signup</p>



        </div>

      <br/>
      <br/>
      {!selectedUserType && (
      <div>
      
        <div className='card_btn2'>
      <Button className='btns' buttonStyle='btn-outline-drblue' buttonSize='btn--small'>
            USER TYPES
        </Button>
        </div>
        
        <div className='cards__container2'>
        <div className='cards__wrapper2'>
        
        <ul className='cards__items2'>

        

        <li className='cards__item2'>
        <Link className='cards__item__link' to="/" onClick={(event) => handleUserTypeSelect('admin', event)}>
        <figure className='cards__item__pic-wrap2' >

            <img
              className='cards__item__img2'
              alt='Travel Image'
              src="../images/admin.png"
            />
          </figure>
          <div className='cards__item__info2'>
            <h5 className='cards__item__text2'>Admin</h5>
            <p className='cards__item__text__p2'>Admin Login</p>
          </div>
        </Link>
      </li>


      



    

      

      <li className='cards__item2'>
        <Link className='cards__item__link2' to="/" onClick={(event) => handleUserTypeSelect('doctor', event)}>
        <figure className='cards__item__pic-wrap2' >
            <img
              className='cards__item__img2'
              alt='Travel Image'
              src="../images/doctor.png"
            />
          </figure>
          <div className='cards__item__info2'>
            <h5 className='cards__item__text2'>Doctor</h5>
            <p className='cards__item__text__p2'>Doctor Login</p>
          </div>
        </Link>
      </li>



      <li className='cards__item2'>
        <Link className='cards__item__link2' to="/" onClick={(event) => handleUserTypeSelect('tech', event)}>
        <figure className='cards__item__pic-wrap2' >
            <img
              className='cards__item__img2'
              alt='Travel Image'
              src="../images/tech.png"
            />
          </figure>
          <div className='cards__item__info2'>
            <h5 className='cards__item__text2'>Technician</h5>
            <p className='cards__item__text__p2'>Technician Login</p>
          </div>
        </Link>
      </li>

      <li className='cards__item2'>
        <Link className='cards__item__link2' to="/" onClick={(event) => handleUserTypeSelect('patient', event)}>
        <figure className='cards__item__pic-wrap2' >
            <img
              className='cards__item__img2'
              alt='Travel Image'
              src="../images/patient.png"
            />
          </figure>
          <div className='cards__item__info2'>
            <h5 className='cards__item__text2'>Patient</h5>
            <p className='cards__item__text__p2'>Patients Login / New Patients Register</p>
          </div>
        </Link>
      </li>
      


      
      </ul>
      


      </div>
      </div>
      
  
  </div>
  )}
  {selectedUserType && (
        <>
          {selectedUserType === 'admin' && <AdminLogin userType={selectedUserType} />}
          {selectedUserType === 'doctor' && <AdminLogin userType={selectedUserType} />}
          {selectedUserType === 'patient' && <AdminLogin userType={selectedUserType} />}
          {selectedUserType === 'tech' && <AdminLogin userType={selectedUserType} />}
        </>
      )}


  <div>



  </div>


        <Footer />

        </>
    );
}

export default Signup;