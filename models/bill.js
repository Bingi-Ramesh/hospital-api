const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Appointment',
    unique: true,
  },
  appointmentFee: {
    type: Number,
    required: true,
    default: 0,
  },
  doctorFee: {
    type: Number,
    required: true,
    default: 0,
  },
  ambulanceCharges: {
    type: Number,
    required: true,
    default: 0,
  },
  labCharges: {
    type: Number,
    required: true,
    default: 0,
  },
  bedCharges: {
    type: Number,
    required: true,
    default: 0,
  },
  xrayCharges: {
    type: Number,
    required: true,
    default: 0,
  },
  medicineCharges: {
    type: Number,
    required: true,
    default: 0,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required:false
    
  },
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
