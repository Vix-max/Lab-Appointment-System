import React from 'react'

function EditAccount() {
  return (
    <div>
      <div>
      <ToastContainer />
      <div className="formContainer">
        {userType === 'admin' && (
          <form className='adminLogForm' onSubmit={handleSubmit}>
            <h2>Admin Login</h2>
            <div className='line'></div>
            <label>
              Username:
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <br />
            <label>
              Password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br></br>
            <button className='adminSubmit' type="submit">Login</button>
            <button className='backButton' onClick={() => window.location.reload()} type="button">Back</button>
          </form>
        )}
        
      </div>
    </div>
    </div>
  )
}

export default EditAccount
