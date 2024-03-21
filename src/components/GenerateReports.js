import React, {  useEffect, useState } from 'react';
import { useLocation, useNavigate,useParams } from 'react-router-dom';
import './GenerateReports.css';
import Footer from './Footer';
import { Button } from './Button';
import { useAuth } from '../AuthContext'; // Import useAuth hook
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom'
import axios from 'axios';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';




const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });
  
  // Component to render PDF document
  const MyDocument = ({ data }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Generated Report</Text>
          {data.map((item, index) => (
            <View key={index}>
              <Text>{item.id}</Text>
              <Text>{item.fullName}</Text>
              <Text>{item.email}</Text>
              {/* Add other fields as needed */}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
  
  function GenerateReports({ userType }) {
    const generatePDF = async (endpoint) => {
      try {
        const response = await axios.get(endpoint);
        const data = response.data;
  
        // Generate PDF document
        const pdfData = <MyDocument data={data} />;
        const pdfBlob = await pdf(pdfData).toBlob();
  
        // Save PDF to file and trigger download
        saveAs(pdfBlob, 'report.pdf');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  

 

  return (
    <div>
        <div className='backButtin'>
        <Link className="backBtn" onClick={() => window.location.reload()}>
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
      </div>
        {userType === 'generatereport' && (
        <div className='inner_div_report'>
          <ul className='cards__items3'>  



<li className='cards__item4'>
  <Link className='cards__item__link4'  onClick={() => generatePDF('http://localhost:8080/admin/getAll')}>
  <figure className='cards__item__pic-wrap3' >
      <img
        className='cards__item__img3'
        alt='Travel Image'
        src="../images/user-gear-solid (1).png"
      />
    </figure>
    <div className='cards__item__info3'>
      <h5 className='cards__item__text3'>Generate Admin Report</h5>
      <p className='cards__item__text__p3'>Generate a Database Report with all the Available Admins in the  Database</p>
    </div>
  </Link>
</li>



<li className='cards__item4'>
  <Link className='cards__item__link4'  onClick={() => generatePDF('http://localhost:8080/tech/getAll')}>
  <figure className='cards__item__pic-wrap3' >
      <img
        className='cards__item__img3'
        alt='Travel Image'
        src="../images/user-nurse-solid (1).png"
      />
    </figure>
    <div className='cards__item__info3'>
      <h5 className='cards__item__text3'>Generate Technician Report</h5>
      <p className='cards__item__text__p3'>Generate a Database Report with all the Available Technicians in the  Database</p>
    </div>
  </Link>
</li>



<li className='cards__item4'>
  <Link className='cards__item__link4'  onClick={() => generatePDF('http://localhost:8080/doctor/getAll')}>
  <figure className='cards__item__pic-wrap3' >
      <img
        className='cards__item__img3'
        alt='Travel Image'
        src="../images/user-doctor-solid (3).png"
      />
    </figure>
    <div className='cards__item__info3'>
    <h5 className='cards__item__text3'>Generate Doctor Report</h5>
      <p className='cards__item__text__p3'>Generate a Database Report with all the Available Doctors in the  Database</p>
    </div>
  </Link>
</li> 

<li className='cards__item4'>
  <Link className='cards__item__link4'  onClick={() => generatePDF('http://localhost:8080/patient/getAll')}>
  <figure className='cards__item__pic-wrap3' >
      <img
        className='cards__item__img3'
        alt='Travel Image'
        src="../images/users-solid (6).png"
      />
    </figure>
    <div className='cards__item__info3'>
    <h5 className='cards__item__text3'>Generate Patient Report</h5>
      <p className='cards__item__text__p3'>Generate a Database Report with all the Available Patients in the  Database</p>
    </div>
  </Link>
</li> 
</ul>
</div>
        )}
    </div>
  )
}

export default GenerateReports
