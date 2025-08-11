const Doctor = require('../models/doctor.js');
const bcrypt = require('bcryptjs');

async function signUpDoctor(req, res) {
  try {
    const { fullname, age, email, password,mobile } = req.body;

    const existing = await Doctor.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Doctor already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const doctor = new Doctor({ fullname, age, email, password: hashed,mobile });

    await doctor.save();
    res.status(201).json({ message: 'Doctor registered', id: doctor._id });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}


const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().select('-password'); // Exclude password
    res.status(200).json({ doctors });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Failed to fetch doctors' });
  }
};
module.exports = { signUpDoctor,getDoctors };

