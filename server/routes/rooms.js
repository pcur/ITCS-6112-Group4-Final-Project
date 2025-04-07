const express = require('express');
const router = express.Router();
const controller = require('../controllers/roomsController');

// GET all rooms
router.get('/', controller.getAllRooms);

// GET specific room by ID
router.get('/:roomId', controller.getRoomById);

// POST: create new room
router.post('/', controller.createRoom);

// PATCH: update room details
router.patch('/:roomId', controller.updateRoom);

// DELETE: remove room
router.delete('/:roomId', controller.deleteRoom);

module.exports = router;
