const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cleanliness: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  management: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  payment: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  accomodation: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  ambulanceFacilities: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  parking: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  patientCare: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  treatment: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  reviewmsg: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);
