const Room = require('../models/Room');

// GET: all rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET: specific room
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST: create a new room
exports.createRoom = async (req, res) => {
  const { name, capacity, building, resources } = req.body;

  try {
    const newRoom = new Room({
      name,
      capacity,
      building,
      resources
    });

    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH: update room details
exports.updateRoom = async (req, res) => {
  const { name, capacity, building, resources } = req.body;

  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.roomId,
      { name, capacity, building, resources },
      { new: true }
    );

    if (!updatedRoom) return res.status(404).json({ message: 'Room not found' });

    res.json(updatedRoom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE: remove room
exports.deleteRoom = async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.roomId);

    if (!deletedRoom) return res.status(404).json({ message: 'Room not found' });

    res.json({ message: 'Room deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
