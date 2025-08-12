const express  = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors     = require('cors');
const path     = require('path');
const authRoutes = require('./routes/userRoutes.js');
const chatRoutes = require("./routes/chat");

const app  = express();
const PORT = process.env.PORT || 5000;
const uri  = process.env.MONGO_URI;

/* ── middleware ─────────────────────────────── */
app.use(cors());
app.use(express.json());

/*  Serve all uploaded files */
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/* ── routes ─────────────────────────────────── */
app.use('/api', authRoutes);
app.use('/api/messages', chatRoutes);

/* ── Serve React frontend ───────────────────── */
app.use(express.static(path.join(__dirname, 'client', 'build')));

/* ── Socket.IO setup ─────────────────────────── */
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', // You can restrict this to your frontend domain in production
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('🟢 A user connected:', socket.id);

  socket.on('joinRoom', ({ doctorId, patientId }) => {
    const roomId = `${doctorId}-${patientId}`;
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on('sendMessage', ({ doctorId, patientId, message }) => {
    const roomId = `${doctorId}-${patientId}`;
    io.to(roomId).emit('receiveMessage', { message });
  });

  socket.on('disconnect', () => {
    console.log('🔴 A user disconnected:', socket.id);
  });
});

/* ── start ──────────────────────────────────── */
mongoose.connect(uri)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    server.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
