import React from 'react';
import CardItem from './CardItem2';
import './Cards2.css';
import { Button } from './Button';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';


function Cards2() {

    const { isLoggedIn, login, userType } = useAuth();
    const navigate = useNavigate();

    const handleClick = (path) => {
        if (!isLoggedIn) {
          console.log("User not logged in, redirecting to signup page");
          navigate('/signup');
        } else {
          console.log("User logged in, redirecting to profile page");
          navigate(`/${userType}profile`);
        }
      };
    
 
     


  return (
    <div className='cards2'>
      <div className='card_btn2'>
      <Button className='btns' buttonStyle='btn-outline-drblue' buttonSize='btn--small'>
            LABORATORY TESTS
        </Button>
        </div>
      <div className='cards__container'>
        <div className='cards__wrapper'>
            <ul className='cards__items'>
                <CardItem 
                src='../images/image1.jpg'
                text='Complete Blood Count (CBC): '
                para='Checks blood cells (red, white, platelets) for issues like anemia or infection'
                label='Blood Tests'
                onClick={() => handleClick('/')}
                

                />
                <CardItem 
                src='../images/image2.png'
                text='Basic Metabolic Panel (BMP):'
                para='Measures electrolytes, kidney and liver function for overall health check.'
                label='Body Fluid Tests'
                onClick={() => handleClick('/')}
                />
                <CardItem 
                src='../images/image3.jpg'
                text='Lipid Panel:'
                para='Checks cholesterol and triglycerides for heart disease risk.'
                label='Body Fluid Tests'
                onClick={() => handleClick('/')}
                
                />

                <CardItem 
                src='../images/image10.png'
                text='HIV Test:'
                para='Detects HIV antibodies or antigens for HIV infection.'
                label='Infectious Disease Tests'
                onClick={() => handleClick('/')}
            />
                
            </ul>

            <ul className='cards__items'>
                <CardItem 
                src='../images/image4.jpg'
                text='Urinalysis:'
                para='Analyzes urine for infections, kidney problems, or diabetes.'
                label='Body Fluid Tests'
                onClick={() => handleClick('/')}

                />
                <CardItem 
                src='../images/image5.jpeg'
                text='Throat Culture:'
                para='Swab to identify bacterial throat infections.'
                label='Infectious Disease Tests'
                onClick={() => handleClick('/')}
                />
                <CardItem 
                src='../images/image6.jpg'
                text='Blood Culture:'
                para='Detects bacteria in blood for infections.'
                label='Blood Tests'
                path='/'
                />
                 <CardItem 
                src='../images/image11.jpg'
                text='Hepatitis Panel:'
                para='Screens for hepatitis viruses A, B, and C infections.'
                label='Infectious Disease Tests'
                onClick={() => handleClick('/')}
            />
            </ul>

            <ul className='cards__items'>
            {/* Blood Tests */}
            <CardItem 
                src='../images/image12.jpg'
                text='Thyroid Function Tests:'
                para='Measures thyroid hormone levels for thyroid disorders.'
                label='Blood Tests'
                onClick={() => handleClick('/')}
            />
            <CardItem 
                src='../images/image13.jpg'
                text='Hemoglobin A1c (HbA1c):'
                para='Evaluates long-term blood sugar control for diabetes.'
                label='Blood Tests'
                onClick={() => handleClick('/')}
            />
            <CardItem 
                src='../images/image13.png'
                text='Cerebrospinal Fluid (CSF) Analysis:'
                para='Examines fluid surrounding the brain and spinal cord for infections or other issues.'
                label='Body Fluid Tests'
                onClick={() => handleClick('/')}
            />
            <CardItem 
                src='../images/image14.png'
                text='Synovial Fluid Analysis:'
                para='Assesses fluid from joints for conditions like arthritis or infection.'
                label='Body Fluid Tests'
                onClick={() => handleClick('/')}
            />
        </ul>

     

        </div>
      </div>
    </div>
  )
}

export default Cards2
