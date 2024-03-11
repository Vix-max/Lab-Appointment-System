import React from 'react';
import './Button.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const STYLES = ['btn--primary', 'logoutBtn', 'btn--outline', 'btn-outline-white', 'btn-full-white', 'btn-outline-drblue'];
const SIZES = ['btn--medium', 'btn--large', 'btn--small'];

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
    const { isLoggedIn, userType: isLoggedUserType } = useAuth();
    const navigate = useNavigate();

    const handleProfileClick = () => {
        if (!isLoggedIn) {
            // If not logged in, navigate to signup
            navigate('/signup');
        } else {
            // If logged in, navigate to profile
            navigate(`/${isLoggedUserType}profile`);
        }
    };

    return (
        <button
            className={`btn ${checkButtonStyle} ${checkButtonSize}`}
            onClick={onClick || handleProfileClick}
            type={type}
        >
            {children}
        </button>
    );
};
