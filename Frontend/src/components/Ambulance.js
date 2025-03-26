import { useState, useEffect } from 'react';
import axios from 'axios';

const Ambulance = () => {
    const [state, setState] = useState('');
    const [ambulances, setAmbulances] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const fetchAmbulances = async () => {
        if (!state) return alert('Please select a state');
        setLoading(true);
        try {
            const response = await axios.get(`/api/ambulance/${state}`);
            setAmbulances(response.data);
        } catch (error) {
            console.error('Error fetching ambulances:', error);
            alert('Failed to fetch ambulance services');
        }
        setLoading(false);
    };
    
    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Find Ambulance Services</h2>
            <input 
                className="w-full p-2 border rounded-lg" 
                type="text" 
                placeholder="Enter State" 
                value={state} 
                onChange={(e) => setState(e.target.value)}
            />
            <button 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" 
                onClick={fetchAmbulances} 
                disabled={loading}
            >
                {loading ? 'Searching...' : 'Find Ambulances'}
            </button>
            {ambulances.length > 0 && (
                <ul className="mt-4">
                    {ambulances.map((ambulance, index) => (
                        <li key={index} className="p-2 border-b">{ambulance.name} - {ambulance.phone}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Ambulance;
