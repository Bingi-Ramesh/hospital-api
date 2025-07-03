// models/appointment.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const appointmentSchema = new Schema({
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor', // optional: replace with your doctor model name
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  patientId: {
    type: Schema.Types.ObjectId,
    ref: 'Patient', // optional: replace with your patient model name
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  dateOfAppointment: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default:"Bill not generated",
    required: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Appointment', appointmentSchema);
