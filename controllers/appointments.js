// controllers/appointmentController.js

const mongoose = require('mongoose');
const Appointment = require('../models/appointment');

const registerAppointment = async (req, res) => {
  try {
    const { doctorId, doctorName, patientId, patientName, dateOfAppointment } = req.body;

    if (!doctorId || !doctorName || !patientId || !patientName || !dateOfAppointment) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    const newAppointment = new Appointment({
      doctorId: new mongoose.Types.ObjectId(doctorId),
      doctorName,
      patientId: new mongoose.Types.ObjectId(patientId),
      patientName,
      dateOfAppointment: new Date(dateOfAppointment),
    });

    await newAppointment.save();

    res.status(201).json({
      msg: 'Appointment booked successfully',
      appointment: newAppointment,
    });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ dateOfAppointment: 1 });
    res.status(200).json({ appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};


const deleteAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);

    if (!deletedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
module.exports = {
  registerAppointment,
  getAllAppointments,
  deleteAppointment
};
