const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true, unique: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  assignedTime: { type: String, required: true }, // e.g. "Mon 10-11"
});

module.exports = mongoose.model('Assignment', assignmentSchema);
