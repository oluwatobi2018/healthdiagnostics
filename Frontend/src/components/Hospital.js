import { useEffect, useState } from 'react';
import axios from 'axios';

const Hospital = () => {
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const response = await axios.get('/api/hospitals');
                setHospitals(response.data);
            } catch (err) {
                setError('Failed to fetch hospitals');
            }
            setLoading(false);
        };
        fetchHospitals();
    }, []);

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Hospitals Near You</h2>
            {loading && <p>Loading hospitals...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <ul>
                {hospitals.map((hospital) => (
                    <li key={hospital._id} className="border-b p-2">
                        <h3 className="font-bold">{hospital.name}</h3>
                        <p>{hospital.address}</p>
                        <p>{hospital.state}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Hospital;
