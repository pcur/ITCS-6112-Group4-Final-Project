const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const roomRoutes = require('./routes/rooms');
const studentRoutes = require('./routes/students');
const assignmentRoutes = require('./routes/assignments');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const dbUri = process.env.MONGO_URI || 'mongodb://localhost:27017/room_assignment_demo';
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB: ', err));

// Use routes
app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);
app.use('/rooms', roomRoutes);
app.use('/students', studentRoutes);
app.use('/assignments', assignmentRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
