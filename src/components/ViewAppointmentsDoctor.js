import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './ViewAppointmentsDoctor.css';

function ViewAppointmentsDoctor({ userType }) {
    const { username } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointment, setFilteredAppointment] = useState([]);
    const [patientsName, setPatientsName] = useState({});
    const [DrfullName, setDrFullName] = useState('');

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/appointment/getAll`);

            // Extract specific data fields from the response
            const formattedAppointments = response.data.map(async appointment => {
                // Fetch patient details by username
                const patientDetailsResponse = await axios.get(`http://localhost:8080/patient/getByUsername/${appointment.username}`);
                const patientFullName = patientDetailsResponse.data.fullName;

                return {
                    id: appointment.id,
                    test: appointment.test,
                    reason: appointment.reason,
                    date: new Date(appointment.date).toLocaleDateString(),
                    time: appointment.time,
                    doctor: appointment.doctor,
                    description: appointment.description,
                    payment: appointment.payment,
                    report: appointment.report,
                    result: appointment.reportStatus,
                    fullName: patientFullName
                };
            });

            // Wait for all async operations to complete
            const formattedAppointmentsData = await Promise.all(formattedAppointments);

            // Update the state with the formatted appointment data
            setAppointments(formattedAppointmentsData);
            setFilteredAppointment(formattedAppointmentsData); // Initialize filtered appointments with all appointments
        } catch (error) {
            console.error('Error fetching Appointment:', error);
        }
    };
    
    useEffect(() => {
        // Call fetchData function
        fetchData();
        
        // Fetch full name using username
        const fetchFullName = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/doctor/getByUsername/${username}`);
                setDrFullName(response.data.fullName);
            } catch (error) {
                console.error('Error fetching full name:', error);
                toast.error('An error occurred while fetching full name');
            }
        };
        
        fetchFullName();
    }, [username]);
      

    function getClassByResult(result) {
        switch ((result || '').toLowerCase()) {
            case 'pending':
                return 'pending-status';
            case 'in progress':
                return 'in-progress-status';
            case 'completed':
                return 'completed-status';
            default:
                return '';
        }
    }

    const handleDownloadReport = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/appointment/report/${id}`, {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `appointment_${id}_report.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading report:', error);
            toast.error('An error occurred while downloading the report');
        }
    };

    const handleUploadResult = async (id) => {
        const fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.addEventListener('change', async (event) => {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append('file', file);

            try {
                await axios.post(`http://localhost:8080/appointment/${id}/uploadResult`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                
                toast.success('Test result uploaded successfully');

                fetchData();
            } catch (error) {
                console.error('Error uploading test result:', error);
                toast.error('An error occurred while uploading the test result');
            }
        });
        fileInput.click();
    };

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filteredAppointments = appointments.filter(appointment => {
            const idMatch = appointment.id.toString().includes(query.toLowerCase());
            const patientMatch = (appointment.fullName || '').toLowerCase().includes(query.toLowerCase()); // Handling undefined fullName
            const testMatch = appointment.test.toLowerCase().includes(query.toLowerCase());
            return idMatch || patientMatch || testMatch;
        });
        setFilteredAppointment(filteredAppointments);
    };

    const handleDownloadResult = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/appointment/result/${id}`, {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Test_${id}-Result.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading result report:', error);
            toast.error('An error occurred while downloading the result report');
        }
    };

    return (
        <div>
            <div className='backButtin'>
                <Link className="backBtn" onClick={() => window.location.reload()}>
                    <i className="fa-solid fa-arrow-left"></i>
                </Link>
            </div>
            {userType === 'viewappointmentdoctor' && (
                <div className='tableContainer'>
                    <table className='patienttable'>
                        <thead>
                            <tr>
                                <th className="tableHeading" colSpan="11" ><h2>All Appointments under Your Name</h2>
                                <input
                                    type="text"
                                    placeholder="Search by ID, Patient Name, or Medical Test"
                                    value={searchQuery}
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                                </th>
                            </tr>
                            <tr>
                                <th colSpan="11"><div className='line'></div></th>
                            </tr>
                            <tr className="margin-bottom">
                                <th>ID</th>
                                <th>Medical Test</th>
                                <th>Patient Name</th>
                                <th>Appointment Date</th>
                                <th>Appointment Time</th>
                                <th>Past Medical <br />Report</th>
                                <th>Recommended by</th>
                                <th>Payment Status</th>
                                <th>Test Status</th>
                                <th>Test Result Report</th>
                            </tr>
                        </thead>
                        <tbody>
                        {filteredAppointment
    .filter(appointment => {
        console.log("DrfullName:", DrfullName);
        console.log("appointment.doctor:", appointment.doctor);
        return appointment.doctor === DrfullName;
    })
    .map(appointment => (
        <tr key={appointment.id}>
                                        <td>{appointment.id}</td>
                                        <td>{appointment.test}</td>
                                        <td>{appointment.fullName}</td>
                                        <td>{appointment.date}</td>
                                        <td>{appointment.time}</td>
                                        <td>
                                            <button className='pdfDownload' onClick={() => handleDownloadReport(appointment.id)}>
                                                Download Past Report
                                            </button>
                                        </td>
                                        <td>Dr. {appointment.doctor}</td>
                                        <td>{appointment.payment}</td>
                                        <td className={getClassByResult(appointment.result)}>{appointment.result}</td>
                                        <td>
                                            {(appointment.result && (appointment.result.toLowerCase() !== "pending" && appointment.result.toLowerCase() !== "in progress")) ? (
                                                <button className='pdfDownload' onClick={() => handleDownloadResult(appointment.id)} >
                                                    Download Test Result
                                                </button>
                                            ) : "In process"}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default ViewAppointmentsDoctor;
