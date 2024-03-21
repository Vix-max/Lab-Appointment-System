import React from "react";
import './About.css';
import { Button } from '../Button';
import Footer from '../Footer';

function About(){

    return (
      <div>

        <div className='hero'>
          <h1 className='hero_h1'>Our Story</h1>
          <p className='hero_p'>Home / About</p>
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
              <h1>EMPOWERING HEALTHCARE WITH PRECISION</h1>
            </div>

            <div className='section3_bottom'>
              <div className='subSection3'>
                <i class="fa-solid fa-vials"></i>
                <h1>Pioneering Laboratory Solutions</h1>
                <p>Experience our tailored laboratory services with precision and care. Our advanced facilities and technology ensure accurate results, meeting your needs efficiently and with top-notch quality.</p>
              </div>

              <div className='subSection4'>
                <i class="fa-solid fa-hospital-user"></i>
                <h1>Patient-Centered Laboratory Standards</h1>
                <p>
                Our client-focused approach delivers personalized laboratory solutions for optimal outcomes. Committed to quality,
                 we exceed expectations with tailored services and top-tier support.

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
                  EXPLORE OUR HISTORY
                </Button>
              </div>
              <br/>
              <h1>UNVEILING OUR JOURNEY: A LEGACY OF INNOVATION</h1>
            </div>

            <div className='section4_bottom'>
              <br/>
              <div className='sub2Section2'>
                <p>Trace our footsteps through decades of innovation, from our modest beginnings to becoming a beacon of excellence in laboratory services. Our journey is characterized by a relentless pursuit of innovation and excellence, driven by a commitment to advancing healthcare and improving patient outcomes. We have continuously evolved and adapted to meet the changing needs of our clients and the healthcare industry, embracing new technologies and methodologies to enhance our capabilities and deliver superior results. Our legacy is built on a foundation of innovation, integrity, and dedication, and we remain steadfast in our mission to revolutionize healthcare through cutting-edge laboratory services.</p>
              </div>
            </div>
          </div>  

          <div className="section4_img"></div>
        </div>

        <div className='section5'>
          <div className='section4_right'>
            <div className='section4_top'>
              <div className='card_btn'>
                <Button className='btns' buttonStyle='btn-outline-drblue' buttonSize='btn--small'>
                  DISCOVER OUR COMMITMENT
                </Button>
              </div>
              <div className="section4_img"></div>
              <br/>
              <h1>UNVEILING LABORATORY LEGACY: EXPLORING A PATH OF INNOVATION</h1>
            </div>
            <div className='section4_bottom'>
              <br/>
              <div className='sub2Section2'>
                <p>Embark on an enriching expedition as we unveil the layers of growth and innovation defining our unwavering commitment to unparalleled healthcare excellence. 
                    
                    We are constantly pushing the boundaries of scientific discovery and technological advancement to provide our 
                    clients with the highest quality laboratory services. Our team of experts is dedicated to delivering accurate, 
                    reliable, and timely results, ensuring that healthcare providers can make informed decisions and deliver the best 
                    possible care to their patients. With a focus on innovation, integrity, and excellence, we are proud to be at the 
                    forefront of laboratory medicine, shaping the future of healthcare one breakthrough at a time.</p>
              </div>
              <br/><br/><br/><br/><br/><br/>
              
            </div>
          </div>  
        </div>
        <Footer />
      </div>
    );
}

export default About;
