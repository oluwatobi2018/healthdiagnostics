import React, { useEffect, useState } from 'react';
import UserService from '../../services/user';
import HospitalService from '../../services/hospital';
import AppointmentService from '../../services/appointment';
import SpecialistService from '../../services/specialists';
import PaymentService from '../../services/payment';
import AmbulanceService from '../../services/ambulance';

const DashboardPage = () => {
    const [state, setState] = useState('');
    const [ambulances, setAmbulances] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [specialists, setSpecialists] = useState([]);
    const [payments, setPayments] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (state) {
                    setAmbulances(await AmbulanceService.getAmbulanceData(state));
                    setHospitals(await HospitalService.getHospitals(state));
                    setSpecialists(await SpecialistService.getSpecialists(state));
                }
                setAppointments(await AppointmentService.getAppointments());
                setPayments(await PaymentService.getPayments());
                setUsers(await UserService.getUsers());
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, [state]);

    return (
        <div>
            <h1>Dashboard</h1>
            <label>
                Select State:
                <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
            </label>
            
            <h2>Hospitals</h2>
            <ul>
                {hospitals.map((hospital, index) => (
                    <li key={index}>{hospital.name} - {hospital.address}</li>
                ))}
            </ul>
            
            <h2>Ambulance Services</h2>
            <ul>
                {ambulances.map((ambulance, index) => (
                    <li key={index}>{ambulance.name} - {ambulance.contact}</li>
                ))}
            </ul>
            
            <h2>Specialists</h2>
            <ul>
                {specialists.map((specialist, index) => (
                    <li key={index}>{specialist.name} - {specialist.specialty}</li>
                ))}
            </ul>
            
            <h2>Appointments</h2>
            <ul>
                {appointments.map((appointment, index) => (
                    <li key={index}>{appointment.patientName} - {appointment.date}</li>
                ))}
            </ul>
            
            <h2>Payments</h2>
            <ul>
                {payments.map((payment, index) => (
                    <li key={index}>{payment.user} - {payment.amount} NGN</li>
                ))}
            </ul>
            
            <h2>Users</h2>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>{user.name} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default DashboardPage;

