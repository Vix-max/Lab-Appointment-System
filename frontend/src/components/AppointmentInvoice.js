import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AppointmentInvoice.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

import { toast } from 'react-toastify';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AppointmentInvoice() {
    const [patientDetails, setPatientDetails] = useState({});
    const navigate = useNavigate();
    const [appointmentDetails, setAppointmentDetails] = useState({
        test: '',
        id: '',
        reason: '',
        doctor: '',
        date: '',
        time: '',
        payment: ''
    });
    const { username } = useAuth();

    useEffect(() => {
        fetchLatestAppointment();
        fetchPatientDetails();
    }, []);

    const fetchLatestAppointment = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/appointment/latest`);
            setAppointmentDetails(response.data);
        } catch (error) {
            console.error('Error fetching latest appointment:', error);
        }
    };

    const fetchPatientDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/patient/getByUsername/${username}`);
            setPatientDetails(response.data);
        } catch (error) {
            console.error('Error fetching patient details:', error);
        }
    };

    const handleDownloadInvoice = () => {
        const input = document.getElementById('appointment-table');
        if (!input) {
            console.error('Element with ID "registerForminvoice" not found.');
            return;
        }

        input.style.margin = '20px';
        input.style.padding = '10px';

        html2canvas(input, {
            scale: 1,
            width: 1200,
            height: 1200
        })
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'px',
                    format: [canvas.width, canvas.height]
                });
                pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
                pdf.save('registerForminvoice.pdf');
            })
            .catch((error) => {
                console.error('Error capturing HTML element:', error);
            });

        input.style.margin = '';
        input.style.padding = '';
    };

    
    
    const handleSendEmail = async () => {
        try {
            const patientEmail = patientDetails.email;
            const mailStructure = {
                subject: `${appointmentDetails.test} Appointment Confirmation`,
                message: `
                    Your appointment has been confirmed.
                    Please find the details below:
                    
                        Test: ${appointmentDetails.test}
                        Appointment ID: ${appointmentDetails.id}
                        Full Name: ${patientDetails.fullName}
                        Patient ID: ${patientDetails.id}
                        Reason for the Test: ${appointmentDetails.reason}
                        Recommended Doctor: ${appointmentDetails.doctor}
                        Appointment Date: ${parsedDate ? parsedDate.toLocaleDateString() : ''}
                        Appointment Time: ${appointmentDetails.time}
                        Payment Method: ${appointmentDetails.payment}
                        Payment Status: ${getPaymentStatus()}
                        Sub Total: Rs. 2000/=
                    
                    Thank you.
                `,
            };
    
            const response = await axios.post(`http://localhost:8080/mail/send/${patientEmail}`, mailStructure);
            console.log(response.data);
            toast.dismiss();
            toast.success("Appointment Placed Successfully!", { hideProgressBar: true });
            setTimeout(() => {
                navigate('/patientprofile'); 
              }, 2000);

        } catch (error) {
            toast.dismiss();
            toast.error("Error, placing the appointment", { hideProgressBar: true });
            console.error('Error sending email:', error);
        }
    };
    
    
    
      
      

    const parsedDate = new Date(appointmentDetails.date);

    const getPaymentStatus = () => {
        return appointmentDetails.payment.toLowerCase() === 'cash' ? 'Pending' : 'Paid';
    };

    return (
        <div>
            <div>
            <ToastContainer />
                <br /><br />
                <div className='registerForminvoice' id='registerForminvoice'>
                    <h2>Appointment Invoice</h2><br />
                    <div className='line' />
                    <table className='appointment-table' id='appointment-table'>
                        <tbody>
                            <tr>
                                <th>Medical Test:</th>
                                <th>{appointmentDetails.test}</th>
                            </tr>
                            <tr>
                                <td>Appointment Id:</td>
                                <td>{appointmentDetails.id}</td>
                            </tr>
                            <tr>
                                <td>Full Name:</td>
                                <td>{patientDetails.fullName}</td>
                            </tr>
                            <tr>
                                <td>Patient Id:</td>
                                <td>{patientDetails.id}</td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>{patientDetails.email}</td>
                            </tr>
                            <tr>
                                <td>Reason for the Test:</td>
                                <td>{appointmentDetails.reason}</td>
                            </tr>
                            <tr>
                                <td>Recommended Doctor:</td>
                                <td>{appointmentDetails.doctor}</td>
                            </tr>
                            <tr>
                                <td>Appointment Date:</td>
                                <td>{parsedDate ? parsedDate.toLocaleDateString() : ''}</td>
                            </tr>
                            <tr>
                                <td>Appointment Time:</td>
                                <td>{appointmentDetails.time}</td>
                            </tr>
                            <tr>
                                <td>Payment Method:</td>
                                <td>{appointmentDetails.payment}</td>
                            </tr>
                            <tr>
                                <td>Payment Status:</td>
                                <td
                  className={
                    appointmentDetails.payment.toLowerCase() === 'cash'
                      ? 'pending'
                      : 'paid'
                  }
                >
                  {getPaymentStatus()}
                </td>
                            </tr>
                            <tr>
                                <td>Sub Total:</td>
                                <td>Rs. 2000/=</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <button className='downloadBtn' onClick={handleDownloadInvoice}>Download Invoice</button><br/><br/>
                    <button className='proceedBtn' onClick={handleSendEmail}>Proceed</button>

                </div>
                <br /><br />
                
            </div>
        </div>
    );
}

export default AppointmentInvoice;
