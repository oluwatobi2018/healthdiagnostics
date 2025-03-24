const Specialist = require('/models/Specialist');

// Get specialists by state and optional specialty
exports.getSpecialists = async (req, res) => {
    const { state, specialty } = req.query;
    
    let query = { state };
    if (specialty) query.specialty = specialty;

    try {
        const specialists = await Specialist.find(query);
        res.json(specialists);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching specialists' });
    }
};