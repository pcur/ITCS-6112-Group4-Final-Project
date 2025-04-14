const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: String,
  code: String,
  capacity: Number,
  professor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  preferredBuildings: [String],
  preferredTimes: [String],
  assignedRoom: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', default: null },
});

module.exports = mongoose.model('Course', courseSchema);
