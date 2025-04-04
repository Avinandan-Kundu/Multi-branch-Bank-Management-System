 // backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

const customerRoutes = require('./routes/customers');
const branchRoutes = require('./routes/branches');
const transactionRoutes = require('./routes/transactions');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();

//CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length'],
  credentials: true
}));


app.options('*', cors());


// Middleware
app.use(cors());

app.use(express.json());
app.use(errorHandler);

// Routes
app.use('/api/customers', customerRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/auth', authRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    const PORT = process.env.PORT || 5005;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
