// controllers/patientController.js
const Patient = require('../models/patient.js'); 
const Doctor = require('../models/doctor.js'); 
const Receptionist = require('../models/receptionist.js'); 
const Admin = require('../models/admin.js'); 
// Update patient profile
const updateProfile = async (req, res) => {
  try {
    const { id, fullname, email, age,mobile} = req.body;

    if (!id) {
      return res.status(400).json({ message: ' ID is required' });
    }

    const updatedPatient = await Patient.findByIdAndUpdate(
      id,
      { fullname, email, age,mobile },
      { new: true, runValidators: true }
    );

    const updatedDoctor = await Doctor.findByIdAndUpdate(
        id,
        { fullname, email, age,mobile },
        { new: true, runValidators: true }
      );

      const updatedReceptionist = await Receptionist.findByIdAndUpdate(
        id,
        { fullname, email, age,mobile },
        { new: true, runValidators: true }
      );

      const updatedAdmin = await Admin.findByIdAndUpdate(
        id,
        { fullname, email, age,mobile },
        { new: true, runValidators: true }
      );

    if (!updatedPatient && !updatedDoctor && !updatedReceptionist && !updatedAdmin) {
      return res.status(404).json({ message: 'User not found' });
    }
let updatedUser=updatedPatient
if(updatedDoctor) updatedUser=updatedDoctor
if(updatedReceptionist) updatedUser=updatedReceptionist
if(updatedAdmin) updatedUser=updatedAdmin
    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { updateProfile };
