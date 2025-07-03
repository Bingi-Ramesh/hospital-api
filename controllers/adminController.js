const Admin = require('../models/admin.js');
const bcrypt = require('bcryptjs');

async function signUpAdmin(req, res) {
  try {
    const { fullname, age, email, password } = req.body;

    const existing = await Admin.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Admin already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const admin = new Admin({ fullname, age, email, password: hashed });

    await admin.save();
    res.status(201).json({ message: 'Admin registered', id: admin._id });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

module.exports = { signUpAdmin };
