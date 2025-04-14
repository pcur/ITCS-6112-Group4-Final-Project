const Assignment = require('../models/Assignment');
const Course = require('../models/Course');
const Room = require('../models/Room');

// 🔧 Placeholder: Generate auto-assignments, prioritizing largest courses first
exports.generateAssignments = async (req, res) => {
  try {
    const courses = await Course.find();
    const rooms = await Room.find();
    const assignments = [];

    // Sort courses by capacity descending (largest first)
    const sortedCourses = courses.sort((a, b) => b.capacity - a.capacity);

    // Simple matching: assign any available room with enough capacity
    const usedRoomIds = new Set(); // Prevent double-assigning rooms

    for (const course of sortedCourses) {
      const room = rooms.find(r => 
        r.capacity >= course.capacity && !usedRoomIds.has(r._id.toString())
      );

      if (room) {
        const assignment = new Assignment({
          course: course._id,
          room: room._id,
          assignedTime: course.preferredTimes[0] || 'TBD'
        });
        await assignment.save();
        assignments.push(assignment);

        // Mark room as used
        usedRoomIds.add(room._id.toString());

        // Optionally update course with assigned room
        course.assignedRoom = room._id;
        await course.save();
      }
    }

    res.status(201).json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET all assignments
exports.getAllAssignments = async (req, res) => {
  try {
    const all = await Assignment.find().populate('course room');
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET assignment by course ID
exports.getAssignmentByCourse = async (req, res) => {
  try {
    const assignment = await Assignment.findOne({ course: req.params.courseId }).populate('room');
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all assignments for a room
exports.getAssignmentsByRoom = async (req, res) => {
  try {
    const assignments = await Assignment.find({ room: req.params.roomId }).populate('course');
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH: manually update a course's assignment
exports.updateAssignment = async (req, res) => {
  try {
    const updated = await Assignment.findOneAndUpdate(
      { course: req.params.courseId },
      req.body,
      { new: true }
    ).populate('room course');
    if (!updated) return res.status(404).json({ message: 'Assignment not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE: remove assignment for course
exports.deleteAssignment = async (req, res) => {
  try {
    const deleted = await Assignment.findOneAndDelete({ course: req.params.courseId });
    if (!deleted) return res.status(404).json({ message: 'Assignment not found' });

    // Optionally clear assigned room on Course model
    await Course.findByIdAndUpdate(req.params.courseId, { assignedRoom: null });

    res.json({ message: 'Assignment deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
