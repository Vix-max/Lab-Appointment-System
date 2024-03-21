import React, { useState, useEffect } from 'react';
import './Test.css';
import AdminLogin from '../AdminLogin';
import Footer from '../Footer';
import {Link} from 'react-router-dom'
import { Button } from '../Button';
import Cards2 from '../Cards2';
import { useNavigate } from 'react-router-dom';

function Tests(){
    

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

          <h1 className='hero_h1'> Laboratory Tests</h1>
          <p className='hero_p'>Home / Lab tests</p>



        </div>

      <br/>
      <br/>
      <div>
      
      <Cards2 />
        
        
      
  
  </div>
 

  <div>



  </div>


        <Footer />

        </>
    );
}

export default Tests;