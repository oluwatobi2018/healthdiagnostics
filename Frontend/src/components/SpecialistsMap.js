import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const SpecialistsMap = ({ state }) => {
    const [specialists, setSpecialists] = useState([]);
    const [ambulances, setAmbulances] = useState([]);
    const mapContainerStyle = { width: '100%', height: '500px' };
    const center = { lat: 9.082, lng: 8.6753 }; // Nigeria default center

    useEffect(() => {
        fetch(`/api/specialists?state=${state}`)
            .then(res => res.json())
            .then(data => setSpecialists(data));
        
        fetch(`/api/ambulances?state=${state}`)
            .then(res => res.json())
            .then(data => setAmbulances(data));
    }, [state]);

    return (
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={6}>
                {specialists.map((spec, index) => (
                    <Marker key={index} position={{ lat: spec.latitude, lng: spec.longitude }} label={spec.name} />
                ))}
                {ambulances.map((amb, index) => (
                    <Marker key={index} position={{ lat: amb.latitude, lng: amb.longitude }} label={amb.name} />
                ))}
            </GoogleMap>
        </LoadScript>
    );
};

export default SpecialistsMap;
