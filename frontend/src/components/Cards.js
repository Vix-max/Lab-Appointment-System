import React from 'react';
import CardItem from './CardItem';
import './Cards.css';
import { Button } from './Button';

function Cards() {
  return (
    <div className='cards'>
      <div className='card_btn'>
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
                path='/'

                />
                <CardItem 
                src='../images/image2.png'
                text='Basic Metabolic Panel (BMP):'
                para='Measures electrolytes, kidney and liver function for overall health check.'
                label='Body Fluid Tests'
                path='/'
                />
                <CardItem 
                src='../images/image3.jpg'
                text='Lipid Panel:'
                para='Checks cholesterol and triglycerides for heart disease risk.'
                label='Body Fluid Tests'
                path='/'
                />
            </ul>

            <ul className='cards__items'>
                <CardItem 
                src='../images/image4.jpg'
                text='Urinalysis:'
                para='Analyzes urine for infections, kidney problems, or diabetes.'
                label='Body Fluid Tests'
                path='/'

                />
                <CardItem 
                src='../images/image5.jpeg'
                text='Throat Culture:'
                para='Swab to identify bacterial throat infections.'
                label='Infectious Disease Tests'
                path='/'
                />
                <CardItem 
                src='../images/image6.jpg'
                text='Blood Culture:'
                para='Detects bacteria in blood for infections.'
                label='Blood Tests'
                path='/'
                />
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Cards
