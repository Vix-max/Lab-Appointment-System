import React, {  useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './AdminProfile.css';
import Footer from '../Footer';
import {Link} from 'react-router-dom'
import { Button } from '../Button';


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
  <Link className='cards__item__link3' to="/" >
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
  <Link className='cards__item__link3' to="/" >
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
  <Link className='cards__item__link3' to="/" >
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
  <Link className='cards__item__link3' to="/" >
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
      <Link className='cards__item__link' to="/" >
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
      <Link className='cards__item__link3' to="/" >
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
      <Link className='cards__item__link3' to="/" >
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
      <Link className='cards__item__link3' to="/" >
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
    </div>
    

</div>




            <Footer />
        </div>
        );
}

export default AdminProfile;