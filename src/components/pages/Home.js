import React, {  useEffect } from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import Cards from '../Cards';
import Footer from '../Footer';
import { Button } from '../Button';


function Home() {
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []); 
  return (
    <>
      <HeroSection />
      <Cards />

      <div className='section2'>

        <div className='patients'>
          <h1>5000+</h1>
          <p>Satisfied patients</p>
        </div>
        <div className='labservices'>
          <h1>30+</h1>
          <p>Specialized services</p>
        </div>
        <div className='staff'>
        <h1>20+</h1>
        <p>Trained staff</p>
        </div>
        <div className='emergency'>
        <h1>24/7</h1>
        <p>Emergency care</p>
        </div>
      </div>

      <div className='section3'>
        <div className="section3_img"></div>

      <div className='section3_left'>
        <div className='section3_top'>
        <div className='card_btn'>
      <Button className='btns' buttonStyle='btn-outline-drblue' buttonSize='btn--small'>
            WHY CHOOSE US
        </Button>
        </div>

        <br/>
        <h1>WE DELIVER UNPARALLELED DIAGNOSTIC PRECISION AT ABC LABORATORIES</h1>
        </div>


        <div className='section3_bottom'>
          <div className='subSection1'>
          <i class="fa-solid fa-vials"></i>
          <h1>Comprehensive Laboratory Solutions</h1>
          <p>Our laboratory offers a diverse array of services, routine tests, specialized analyses, 
            and prompt emergency diagnostics, ensuring all your laboratory needs are met with precision and care.
            </p>
          </div>

          <div className='subSection2'>
          <i class="fa-solid fa-hospital-user"></i>
          <h1>Client-Focused Laboratory Services</h1>
          <p>Our team of experts is dedicated to providing 
            client-centered laboratory solutions tailored to meet your specific requirements and ensure optimal outcomes.
            </p>
          </div>
        </div>

        </div>  


      </div>

      <div className='section4'>
        

      <div className='section4_right'>
        <div className='section4_top'>
        <div className='card_btn'>
      <Button className='btns' buttonStyle='btn-outline-drblue' buttonSize='btn--small'>
            EXPERIENCE
        </Button>
        </div>

        <br/>
        <h1>DECADES OF EXCELLENCE: A JOURNEY THROUGH INNOVATION IN LABORATORY SERVICES</h1>
        </div>


        <div className='section4_bottom'>
          <br/>
          <div className='sub2Section1'>
          <p>Embark on a Visual Journey: Witness the Milestones Defining Our Laboratory. 
            From Modest Origins to State-of-the-Art Facilities, Delve Deep into Our Evolutionary Progress, 
            Unraveling the Layers of Growth and Innovation That Define Our Unwavering Commitment to Unmatched 
            Patient Care Excellence.
            </p>
          </div>
        </div>

        </div>  

        <div className="section4_img"></div>


      </div>


      <Footer />
    </>
  );
}

export default Home;