const Patient = require('../models/patient');
const Doctor = require('../models/doctor.js');
const Receptionist = require('../models/receptionist.js');
const Admin = require('../models/admin.js');
const bcrypt = require('bcryptjs');
const { createMail } = require('../mail.js'); // Import the createMail function
require('dotenv').config(); 
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



const patientForgotPassword = async (req, res) => {
  try {
    const { email,} = req.body;
    

   
    if (!email) {
      return res.status(200).json({ error: 'Email is required!' });
    }

    // Check if student with the email already exists
    const existingPatient = await Patient.findOne({ email });
    if (!existingPatient) {
      return res.status(200).json({ error: 'A Patient with this email does not exists!' });
    }

    // Generate OTP
    const random6DigitNumber = Math.floor(100000 + Math.random() * 900000);

    // Create the email content
    const mail = createMail();
    mail.setTo(email);
    mail.setSubject('Email verification');
    mail.setText(`please  verify your details /n Name: ${existingPatient.fullname} and Your OTP to verify your email is ${random6DigitNumber}. Please do not share it with anyone. This OTP is valid for few minutes only you can enter this otp and reset your password.`);

    // Send email and handle possible errors
    try {
      await mail.send();
    } catch (mailError) {
      console.error("Error sending email:", mailError);
      return res.status(500).json({ error: 'Failed to send OTP. Please try again later.' });
    }

    // If email is sent successfully, respond with success
    res.status(200).json({
      message: 'OTP sent to the student successfully.',
      otp: {
      
        otp: random6DigitNumber, // Returning the OTP in case the client needs it
      },
    });
  } catch (err) {
    // Handle unexpected errors
    console.error(err);
    res.status(500).json({ error: 'Error sending email', message: err.message });
  }
};



const updatePatientPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if patient exists
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Hash the new password
    const hashed = await bcrypt.hash(password, 10);

    // Update patient's password
    patient.password = hashed;
    await patient.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  signUpPatient,
  updatePatientProfileImg,
  patientForgotPassword,
  updatePatientPassword
};
