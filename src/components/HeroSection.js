import React from 'react';
import { Button } from './Button';
import './HeroSection.css';
import '../App.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='../images/home-bg.mp4' autoPlay loop muted />
      
      
      <h1>Secure Your Lab Appointment <br/> Through Online Today!</h1>
      <br/>
      <p>
        Embrace a life of vitality and optimal health. At ABC Laboratories, we are dedicated to 
        providing personalized  care that addresses your  unique needs and goals.<br/>  Our team of 
        experienced and compassionate professionals is here to guide you on your wellness 
        journey, offering a comprehensive range of services<br/>  to support your physical, mental, 
        and emotional well-being.
      </p>
      <div className='hero-btn'>
        <Button className='btns' buttonStyle='btn-full-white' buttonSize='btn--large'>
            Book an Appointment
        </Button>
        <Button className='btns' buttonStyle='btn-outline-white' buttonSize='btn--large'>
            Sign Up
        </Button>
      </div>
    </div>
  );
}

export default HeroSection
