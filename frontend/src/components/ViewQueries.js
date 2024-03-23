import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import './ViewQueries.css';
import { Link } from 'react-router-dom';

function ViewQueries({ userType }) {
  const [techs, setTechs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [filteredTechs, setFilteredTechs] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch inquiries
        const inquiryResponse = await axios.get('http://localhost:8080/inquiry/getAll');
        const formattedTechs = inquiryResponse.data.map(inq => ({
          id: inq.id,
          fullName: inq.fullName,
          email: inq.email,
          type: inq.type,
          head: inq.head,
          subject: inq.subject,
        }));
        setTechs(formattedTechs);
        setFilteredTechs(formattedTechs);

        // Fetch reviews
        const reviewResponse = await axios.get('http://localhost:8080/review/getAll');
        const formattedReviews = reviewResponse.data.map(review => ({
          id: review.id,
          fullName: review.fullName,
          email: review.email,
          appId: review.appId,
          review: review.review,
        }));
        setReviews(formattedReviews);
        setFilteredReviews(formattedReviews);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('An error occurred while fetching data');
      }
    }
    fetchData();
  }, []);

  // Function to handle delete inquiry
  const handleDeleteInquiry = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/inquiry/delete/${id}`);
      setTechs(techs.filter(tech => tech.id !== id));
      setFilteredTechs(filteredTechs.filter(tech => tech.id !== id));
      toast.success('Inquiry Deleted Successfully', { hideProgressBar: true });
    } catch (error) {
      console.error('Error deleting Inquiry:', error);
      toast.error('An error occurred while deleting the Inquiry');
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className='backButtin'>
        <Link className="backBtn" onClick={() => window.location.reload()}>
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
      </div>
      {userType === 'viewqueries' && (
        <div>
          <div className='tableContainer'>
            <table className='patienttable'>
              <thead>
                <tr>
                  <th className="tableHeading" colSpan="9"><h2>All the Inquiries</h2></th>
                </tr>
                <tr>
                  <th colSpan="9"><div className='line'></div></th>
                </tr>
                <tr class="margin-bottom">
                  <th>Inquiry ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Inquiry Type</th>
                  <th>Inquiry Head</th>
                  <th>Inquiry Subject</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTechs.map(inq => (
                  <tr key={inq.id}>
                    <td>{inq.id}</td>
                    <td>{inq.fullName}</td>
                    <td>{inq.email}</td>
                    <td>{inq.type}</td>
                    <td>{inq.head}</td>
                    <td>{inq.subject}</td>
                    <td>
                      <button className='patientDeleteSubmit' onClick={() => handleDeleteInquiry(inq.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='tableContainer'>
            <table className='patienttable'>
              <thead>
                <tr>
                  <th className="tableHeading" colSpan="9"><h2>All the Reviews</h2></th>
                </tr>
                <tr>
                  <th colSpan="9"><div className='line'></div></th>
                </tr>
                <tr class="margin-bottom">
                  <th>Review ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Appointment ID</th>
                  <th>Review</th>
                </tr>
              </thead>
              <tbody>
                {filteredReviews.map(review => (
                  <tr key={review.id}>
                    <td>{review.id}</td>
                    <td>{review.fullName}</td>
                    <td>{review.email}</td>
                    <td>{review.appId}</td>
                    <td>{review.review}</td>
                    <td>
                      {/* Add delete button and handler if needed */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewQueries;
