import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './TechSettings.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function TechSettings({userType}) {
  
  const [fullName, setFullName] = useState('');
  const [empNumber, setEmpNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [shifts, setShifts] = useState({
    monday: { clockIn: '', clockOut: '' },
    tuesday: { clockIn: '', clockOut: '' },
    wednesday: { clockIn: '', clockOut: '' },
    thursday: { clockIn: '', clockOut: '' },
    friday: { clockIn: '', clockOut: '' },
    saturday: { clockIn: '', clockOut: '' }
  });
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleClockChange = (day, type, value) => {
    setShifts(prevState => ({
      ...prevState,
      [day]: { ...prevState[day], [type]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!fullName || !empNumber || !age || !gender || !mobileNumber || !email || !username || !password || !confirmPassword) {
      toast.error("Please fill in all fields", { hideProgressBar: true });
      return;
    }

    // Validate mobile number
    const mobileNumberPattern = /^[0-9]{10}$/;
    if (!mobileNumberPattern.test(mobileNumber)) {
      toast.error("Please enter a valid 10-digit mobile number", { hideProgressBar: true });
      return;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address", { hideProgressBar: true });
      return;
    }

    // Validate password
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long", { hideProgressBar: true });
      return;
    }
    if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      toast.error("Password must contain at least one letter and one number", { hideProgressBar: true });
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", { hideProgressBar: true });
      return;
    }

    try {
      // Save personal details
      const personalData = {
        fullName,
        empNumber,
        age,
        gender,
        mobileNumber,
        email,
        username,
        password
      };
      const response = await axios.post('http://localhost:8080/tech/add', personalData);

const latestShiftResponse = await axios.get('http://localhost:8080/tech/latestId');
const technicianId = latestShiftResponse.data;

console.log("Saved Shift ID:", technicianId);

    // Save shift details for each day
    const shiftDataPromises = Object.keys(shifts).map(async (day) => {
      const shift = shifts[day];
      // Convert clock in and clock out times to string
      const shiftRecord = {
        date: day,
        startTime: shift.clockIn, // Send clock in time as startTime
        endTime: shift.clockOut, // Send clock out time as endTime
        techId: technicianId // Convert technicianId to string
      };
      console.log('Shift Record:', shiftRecord);
      return axios.post('http://localhost:8080/shift/add', shiftRecord);
    });

    await Promise.all(shiftDataPromises);

    toast.success("Technician Registered Successfully", {
      hideProgressBar: true,
    });
  } catch (error) {
    console.error('Error Registering the Technician:', error);
    toast.error('An error occurred while registering the technician');
  }
};



  return (
    <div>
        <div className='backButtin'>
        <Link className="backBtn" onClick={() => window.location.reload()}>
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
      </div>
        <ToastContainer />
        {userType === 'techsettings' && (
            <div>
      <div className="formContainer" >
          <form className='registerForm2'onSubmit={handleSubmit}>
          <h2>Technician Register</h2>
          <div className='line'></div>

          <input type="text" placeholder="Full Name" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
<br />
<input type="text" placeholder="Employee Number" id="empNumber" value={empNumber} onChange={(e) => setEmpNumber(e.target.value)} />
<br />
<select value={age} onChange={(e) => setAge(e.target.value)} id="age">
<option value="">Select Age</option>
{Array.from({ length: 150 }, (_, index) => (
  <option key={index + 1} value={index + 1}>
    {index + 1}
  </option>
))}
</select>
<br /><br/>

<div className='gender-div'>
<p className='gender-para' >Select a Gender</p>
<div style={{ display: 'inline-block' }}>
<label>
  <input className='gender-input'
    type="radio"
    value="male"
    checked={gender === 'male'}
    onChange={(e) => setGender(e.target.value)}
  />
  Male
</label>
</div>
<div style={{ display: 'inline-block' }}>
<label>
  <input className='gender-input'
    type="radio"
    value="female"
    checked={gender === 'female'}
    onChange={(e) => setGender(e.target.value)}
  />
  Female
</label>
</div>
</div>

<br />
<input type="text" placeholder="Mobile Number" id="mobileNumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
<br />
<input type="text" placeholder="Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          

          <br></br><br/><br></br><br/>

          <h2>Shift Details</h2>
          <div className='line'></div>

          
            <div>
                  <div className='shift-div'>
                    <label className='shift-label'>Monday Shift</label>
                    <label> Clock In: 
                      <input type="time" value={shifts.monday.clockIn}
                        onChange={(e) => handleClockChange('monday', 'clockIn', e.target.value)}
                      />
                    </label>
                    <label> Clock Out: 
                      <input type="time" value={shifts.monday.clockOut}
                        onChange={(e) => handleClockChange('monday', 'clockOut', e.target.value)}
                      />
                    </label>
                  </div>

                  <div className='shift-div'>
                    <label className='shift-label'>Tuesday Shift</label>
                    <label> Clock In: 
                      <input type="time" value={shifts.tuesday.clockIn}
                        onChange={(e) => handleClockChange('tuesday', 'clockIn', e.target.value)}
                      />
                    </label>
                    <label> Clock Out: 
                      <input type="time" value={shifts.tuesday.clockOut}
                        onChange={(e) => handleClockChange('tuesday', 'clockOut', e.target.value)}
                      />
                    </label>
                  </div>

                  <div className='shift-div'>
                    <label className='shift-label'>Wednesday Shift</label>
                    <label> Clock In: 
                      <input type="time" value={shifts.wednesday.clockIn}
                        onChange={(e) => handleClockChange('wednesday', 'clockIn', e.target.value)}
                      />
                    </label>
                    <label> Clock Out: 
                      <input type="time" value={shifts.wednesday.clockOut}
                        onChange={(e) => handleClockChange('wednesday', 'clockOut', e.target.value)}
                      />
                    </label>
                  </div>

                  <div className='shift-div'>
                    <label className='shift-label'>Thursday Shift</label>
                    <label> Clock In: 
                      <input type="time" value={shifts.thursday.clockIn}
                        onChange={(e) => handleClockChange('thursday', 'clockIn', e.target.value)}
                      />
                    </label>
                    <label> Clock Out: 
                      <input type="time" value={shifts.thursday.clockOut}
                        onChange={(e) => handleClockChange('thursday', 'clockOut', e.target.value)}
                      />
                    </label>
                  </div>

                  <div className='shift-div'>
                    <label className='shift-label'>Friday Shift</label>
                    <label> Clock In: 
                      <input type="time" value={shifts.friday.clockIn}
                        onChange={(e) => handleClockChange('friday', 'clockIn', e.target.value)}
                      />
                    </label>
                    <label> Clock Out: 
                      <input type="time" value={shifts.friday.clockOut}
                        onChange={(e) => handleClockChange('friday', 'clockOut', e.target.value)}
                      />
                    </label>
                  </div>

                  <div className='shift-div'>
                    <label className='shift-label'>Saturday Shift</label>
                    <label> Clock In: 
                      <input type="time" value={shifts.saturday.clockIn}
                        onChange={(e) => handleClockChange('saturday', 'clockIn', e.target.value)}
                      />
                    </label>
                    <label> Clock Out: 
                      <input type="time" value={shifts.saturday.clockOut}
                        onChange={(e) => handleClockChange('saturday', 'clockOut', e.target.value)}
                      />
                    </label>
                  </div>
              </div>
              <br/><br/><br/><br/>

              <h2>Login Details</h2>
          <div className='line'></div>

              <br />
              <input type="text" placeholder="Username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <br />
              <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <br />
              <input type="password" placeholder="Confirm Password" id="confirmpassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />






          <br/><br/>
          <button className='formTechSubmit' type="submit">Add new Technician</button>
          <br/><br/>
        </form>
        </div>

        
      </div>

      )}
    </div>
  )
}

export default TechSettings
