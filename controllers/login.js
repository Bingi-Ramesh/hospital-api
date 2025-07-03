const bcrypt = require('bcryptjs');

const Admin        = require('../models/admin');
const Patient      = require('../models/patient');
const Receptionist = require('../models/receptionist');
const Doctor       = require('../models/doctor');

/**
 * POST /api/login
 * Body: { email, password }
 */
async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required'});
    }

    // Check in Admin
    const admin = await Admin.findOne({ email });
    if (admin && await bcrypt.compare(password, admin.password)) {
      const user = admin.toObject();
      delete user.password;
      return res.status(200).json({ message: 'Login successful', role: 'admin', user });
    }

      // Check in Receptionist
      const receptionist = await Receptionist.findOne({ email });
      if (receptionist && await bcrypt.compare(password, receptionist.password)) {
        const user = receptionist.toObject();
        delete user.password;
        return res.status(200).json({ message: 'Login successful', role: 'receptionist', user });
      }
        // Check in Doctor
    const doctor = await Doctor.findOne({ email });
    if (doctor && await bcrypt.compare(password, doctor.password)) {
      const user = doctor.toObject();
      delete user.password;
      return res.status(200).json({ message: 'Login successful', role: 'doctor', user });
    }
    // Check in Patient
    const patient = await Patient.findOne({ email });
    if (patient && await bcrypt.compare(password, patient.password)) {
      const user = patient.toObject();
      delete user.password;
      return res.status(200).json({ message: 'Login successful', role: 'patient', user });
    }

  

  

    // If not found in any collection
    return res.status(404).json({ message: 'User not found or password incorrect' });

  } catch (err) {
    console.error('Login Error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}

module.exports = { login };
