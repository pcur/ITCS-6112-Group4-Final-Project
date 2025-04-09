const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },
  capacity: { type: Number, required: true },
  building: { type: String, required: true },
  resources: { type: [String], default: [] }, // E.g., ["Projector", "Whiteboard"]
});

module.exports = mongoose.model('Room', roomSchema);
