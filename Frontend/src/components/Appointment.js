import { useState, useEffect } from 'react';
import axios from 'axios';

const Appointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/appointments');
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            alert('Failed to load appointments');
        }
        setLoading(false);
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Appointments</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {appointments.map((appointment) => (
                        <li key={appointment._id} className="p-2 border-b">
                            {appointment.patientName} - {appointment.date} - {appointment.status}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Appointment;