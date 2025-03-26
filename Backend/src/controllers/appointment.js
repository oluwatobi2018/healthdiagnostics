const Appointment = require('/models/appointment');
const User = require('/models/user');
const Specialist = require('../models/specialist');

// Book an appointment
exports.bookAppointment = async (req, res) => {
    try {
        const { userId, specialistId, date, time, reason } = req.body;
        if (!userId || !specialistId || !date || !time || !reason) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const user = await User.findById(userId);
        const specialist = await Specialist.findById(specialistId);

        if (!user || !specialist) {
            return res.status(404).json({ error: 'User or Specialist not found' });
        }

        const appointment = new Appointment({
            user: userId,
            specialist: specialistId,
            date,
            time,
            reason,
            status: 'Pending'
        });

        await appointment.save();
        res.status(201).json({ message: 'Appointment booked successfully', appointment });
    } catch (error) {
        res.status(500).json({ error: 'Failed to book appointment' });
    }
};

// Get appointments for a user
exports.getUserAppointments = async (req, res) => {
    try {
        const { userId } = req.params;
        const appointments = await Appointment.find({ user: userId }).populate('specialist');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
};

// Get appointments for a specialist
exports.getSpecialistAppointments = async (req, res) => {
    try {
        const { specialistId } = req.params;
        const appointments = await Appointment.find({ specialist: specialistId }).populate('user');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
};

// Update appointment status
exports.updateAppointmentStatus = async (req, res) => {
    try {
        const { appointmentId, status } = req.body;
        if (!appointmentId || !status) {
            return res.status(400).json({ error: 'Appointment ID and status are required' });
        }

        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        appointment.status = status;
        await appointment.save();
        res.json({ message: 'Appointment status updated', appointment });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update appointment status' });
    }
};
