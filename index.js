const express  = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors     = require('cors');
const path     = require('path');
const authRoutes = require('./routes/userRoutes.js');

const app  = express();
const PORT = process.env.PORT || 3000;
const uri  = process.env.MONGO_URI;

/* ── middleware ─────────────────────────────── */
app.use(cors());
app.use(express.json());

/*  Serve all uploaded files – NOTE: static root is **uploads**, 
    *not*  uploads/patients  */
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/* ── routes ─────────────────────────────────── */
app.use('/api', authRoutes);

/* ── start ──────────────────────────────────── */
mongoose.connect(uri)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
