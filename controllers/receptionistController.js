const Receptionist = require('../models/receptionist.js');
const bcrypt = require('bcryptjs');

async function signUpReceptionist(req, res) {
  try {
    const { fullname, age, email, password,mobile} = req.body;

    const existing = await Receptionist.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Receptionist already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const receptionist = new Receptionist({ fullname, age, email, password: hashed,mobile });

    await receptionist.save();
    res.status(201).json({ message: 'Receptionist registered', id: receptionist._id });
  } catch (err) {
    CSSConditionRule.log(err)
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}

module.exports = { signUpReceptionist };
