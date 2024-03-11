import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem('isLoggedIn') === 'true'
    );
    const [username, setUsername] = useState(
        localStorage.getItem('username') || ''
    );
    const [userType, setUserType] = useState(
        localStorage.getItem('userType') || ''
    );

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            // Check if the page is being closed
            if (event.returnValue === undefined) {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('username');
                localStorage.removeItem('userType');
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const login = (username, userType) => {
        setIsLoggedIn(true);
        setUsername(username);
        setUserType(userType);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('userType', userType);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUsername('');
        setUserType('');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        localStorage.removeItem('userType');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, userType, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
