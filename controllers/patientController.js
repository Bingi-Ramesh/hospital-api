const Patient = require('../models/patient');
const Doctor = require('../models/doctor.js');
const Receptionist = require('../models/receptionist.js');
const Admin = require('../models/admin.js');
const bcrypt = require('bcryptjs');

// Patient Signup
async function signUpPatient(req, res) {
  try {
    const { fullname, age, email, password } = req.body;

    const existing = await Patient.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Patient already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const patient = new Patient({ fullname, age, email, password: hashed });

    await patient.save();
    res.status(201).json({ message: 'Patient registered', id: patient._id });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

// Profile Image Upload Handler (uses multer from middleware)
async function updatePatientProfileImg(req, res) {
  try {
    const { id } = req.body;
    const profileImgPath = `/uploads/patients/${req.file.filename}`;

    if (!id || !profileImgPath) {
      return res.status(400).json({ message: 'Patient ID and image file are required' });
    }

    const updatedPatient = await Patient.findByIdAndUpdate(
      id,
      { profileImg: profileImgPath },
      { new: true }
    );
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { profileImg: profileImgPath },
      { new: true }
    );
    const updatedReceptionist = await Receptionist.findByIdAndUpdate(
      id,
      { profileImg: profileImgPath },
      { new: true }
    );
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { profileImg: profileImgPath },
      { new: true }
    );

    const updatedUser = updatedPatient || updatedDoctor || updatedReceptionist || updatedAdmin;

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile image updated successfully',
      user: updatedUser // ✅ send updated user back
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

module.exports = {
  signUpPatient,
  updatePatientProfileImg,
};
