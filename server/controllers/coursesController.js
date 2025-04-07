const Course = require('../models/Course');
const User = require('../models/User');

// GET: all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET: course details
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).populate('assignedRoom');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET: students in course
exports.getCourseStudents = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).populate('enrolledStudents');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course.enrolledStudents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET: course preferences
exports.getCoursePreferences = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({
      preferredBuildings: course.preferredBuildings,
      preferredTimes: course.preferredTimes,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST: create a course
exports.createCourse = async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PATCH: update course preferences
exports.updateCoursePreferences = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const { preferredBuildings, preferredTimes } = req.body;

    if (preferredBuildings) course.preferredBuildings = preferredBuildings;
    if (preferredTimes) course.preferredTimes = preferredTimes;

    await course.save();
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PATCH: update general course details
exports.updateCourse = async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE: course
exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.courseId);
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
