import React, { useState, useEffect } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import './Navbar.css'; 
import {Button} from './Button';
import { useAuth } from '../AuthContext';


function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const { isLoggedIn, userType: isLoggedUserType } = useAuth(); // Get isLoggedIn from the AuthContext
    const navigate = useNavigate(); // Get navigate function

    const handleProfileClick = () => {
        if (!isLoggedIn) {
            // If not logged in, navigate to signup
            navigate('/signup');
        } else {
            // If logged in, navigate to profile
            navigate(`/${isLoggedUserType}profile`);
        }
    };

    

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960){
            setButton(false);
        } else{
            setButton(true);
        }
    };

    useEffect( () => {
        showButton()
    }, []);

    window.addEventListener('resize', showButton);

   
  return (
    <>
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                <i class='fa-solid fa-flask' />
                    ABC Labs
                    
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                <i className={click ? 'fa-solid fa-xmark' : 'fas fa-bars'} />
                </div> 
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/tests' className='nav-links' onClick={closeMobileMenu}>
                            Lab Tests
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/about' className='nav-links' onClick={closeMobileMenu}>
                            About
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/contact' className='nav-links' onClick={closeMobileMenu}>
                            Conatact
                        </Link>
                    </li>
                    <li className='nav-item'>
                        
                    </li>
                </ul> 
                 {/* Conditionally render Sign Up or Profile button based on isLoggedIn */}
                 {button && (
                    <Button buttonStyle='btn--primary' onClick={handleProfileClick}>
                        {isLoggedIn ? 'Profile' : 'Sign Up'}
                    </Button>
                )}
            </div>
        </nav>
    </>
  )
}

export default Navbar;
