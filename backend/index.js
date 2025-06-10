const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);    

const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:5173',    
    methods: ['GET', 'POST'],
    credentials: true
  }
});

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// DB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profile'); 
const productRoutes = require('./routes/productRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const brandRoutes = require('./routes/brandRoutes');
const productChartRoutes = require('./routes/productChartRoutes');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const sellerRoutes = require('./routes/sellerRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes); 
app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/categories', categoryRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/product-charts', productChartRoutes);
app.use('/api/employees', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/sellers', sellerRoutes);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('send-message', (message) => {
    io.emit('receive-message', message); // Broadcast to all
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
