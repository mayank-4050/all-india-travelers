// server.js
const express = require('express');
const http = require('http'); // needed for socket.io
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const userRoutes = require('./routes/UserRoute');
const offerRoutes = require('./routes/OfferRoute');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app); // wrap express
const io = new Server(server, {
  cors: {
    origin: "*", // adjust to your frontend URL for security
    methods: ["GET", "POST"]
  }
});

app.set('io', io); // ✅ store io so routes can emit events

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const authRoutes = require('./routes/authRoutes');
const distanceRoutes = require('./routes/distanceRoutes');
const bookingRoutes = require('./routes/bookingroute');

app.use('/api/auth', authRoutes);
app.use('/api/distance', distanceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/offers', offerRoutes);

// socket.io connection
io.on('connection', (socket) => {
  console.log("🔌 Admin connected:", socket.id);

  socket.on('disconnect', () => {
    console.log("❌ Admin disconnected:", socket.id);
  });
});

app.get('/', (req, res) => {
  res.send('API is running...');
});

server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
