import React, { useState } from 'react';
import './Login.css';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic for UserType1
    console.log('UserType1 login submitted:', { username, password });
  };

  return (
    <div className="formContainer">
    <form className='adminLogForm' onSubmit={handleSubmit}>
      <h2>Admin Login</h2>

      <div className='line'></div>
      
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
      
      <br/>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
      <br></br>
      <button type="submit">Login</button>
    </form>
    </div>
  );
}

export default AdminLogin;
