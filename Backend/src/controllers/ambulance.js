const Ambulance = require('/models/Ambulance');

// Get nearest ambulance services by state
exports.getAmbulances = async (req, res) => {
    const { state } = req.query;
    
    try {
        const ambulances = await Ambulance.find({ state });
        res.json(ambulances);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching ambulances' });
    }
};
