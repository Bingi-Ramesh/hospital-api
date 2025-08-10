const express = require('express');
const router = express.Router();
const createUpload = require('../middlewares/upload');
const { signUpAdmin } = require('../controllers/adminController');
const { signUpPatient,updatePatientProfileImg, patientForgotPassword, updatePatientPassword } = require('../controllers/patientController');
const { signUpReceptionist } = require('../controllers/receptionistController');
const { signUpDoctor, getDoctors } = require('../controllers/doctorController');
const { login } = require('../controllers/login');
const {registerAppointment, getAllAppointments, deleteAppointment}= require('../controllers/appointments');
const { generateBill, getBill } = require('../controllers/bill');
const { addReview, getAllReviews, deleteReview } = require('../controllers/review');
// Signup routes
const upload = createUpload('patients'); // Save under uploads/patients
router.post('/signup/admin', signUpAdmin);
router.post('/signup/patient', signUpPatient);
router.post('/signup/receptionist', signUpReceptionist);
router.post('/signup/doctor', signUpDoctor);
router.post('/login',login)
router.get('/getDoctors',getDoctors)
router.post('/register-appointment',registerAppointment)
router.get('/get-all-appointments',getAllAppointments)
router.post('/cancel-appointment',deleteAppointment)
router.post('/generate-bill',generateBill)
router.get('/get-bills',getBill)
router.post('/add-review',addReview)
router.get('/get-all-reviews',getAllReviews)
router.post('/delete-review',deleteReview)
router.post('/patient-forgot-password',patientForgotPassword)
router.post('/update-patient-password',updatePatientPassword)

router.post('/update-profile-img', upload.single('profileImg'), updatePatientProfileImg);
module.exports = router;
