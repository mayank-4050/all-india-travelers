// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const connectDB = require('./config/db');

dotenv.config({ path: path.join(__dirname, '.env') });
connectDB();

const app = express();
const server = http.createServer(app);

// ==============================
// 🔥 SOCKET.IO SETUP
// ==============================
const io = new Server(server, {
  cors: {
    origin: "*", // ⚠ production me specific frontend URL use karo
    methods: ["GET", "POST"]
  }
});

app.set('io', io);

const PORT = process.env.PORT || 5001;

// ==============================
// 🔥 MIDDLEWARE
// ==============================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ==============================
// 🔥 ROUTES
// ==============================
const authRoutes = require('./routes/authRoutes');
const distanceRoutes = require('./routes/distanceRoutes');
const bookingRoutes = require('./routes/bookingRoutes'); // ✅ FIXED NAME
const userRoutes = require('./routes/UserRoute');
const offerRoutes = require('./routes/OfferRoute');
const adminRoutes = require('./routes/adminRoutes');
const marriageRoutes = require('./routes/marriageBookingRoutes') 


app.use('/api/auth', authRoutes);
app.use('/api/distance', distanceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/admin', adminRoutes);
app.use("/api/marriage", marriageRoutes);


// ==============================
// 🔥 SOCKET CONNECTION
// ==============================
io.on('connection', (socket) => {
  console.log("🔌 Client connected:", socket.id);

  socket.on('disconnect', () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// ==============================
// 🔥 DEFAULT ROUTE
// ==============================
app.get('/', (req, res) => {
  res.send('🚀 API is running...');
});

// ==============================
// 🔥 START SERVER
// ==============================
server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
