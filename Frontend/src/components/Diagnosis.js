import { useState } from 'react';
import axios from 'axios';

const Diagnosis = () => {
    const [symptoms, setSymptoms] = useState('');
    const [diagnosis, setDiagnosis] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleDiagnose = async () => {
        if (!symptoms) {
            alert('Please enter symptoms');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post('/api/diagnose', { symptoms });
            setDiagnosis(response.data.diagnosis);
        } catch (error) {
            console.error('Error getting diagnosis:', error);
            alert('Failed to get diagnosis');
        }
        setLoading(false);
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">AI Symptom Diagnosis</h2>
            <textarea
                className="w-full p-2 border rounded"
                rows="4"
                placeholder="Enter your symptoms..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
            ></textarea>
            <button 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleDiagnose} 
                disabled={loading}
            >
                {loading ? 'Processing...' : 'Get Diagnosis'}
            </button>
            {diagnosis && (
                <div className="mt-4 p-4 bg-gray-100 rounded">
                    <h3 className="font-bold">Diagnosis Result:</h3>
                    <p>{diagnosis}</p>
                </div>
            )}
        </div>
    );
};

export default Diagnosis;