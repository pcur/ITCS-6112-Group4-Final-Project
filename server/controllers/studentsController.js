const User = require('../models/User');
const Course = require('../models/Course');

// GET: all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }); // Assuming roles
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET: specific student
exports.getStudentById = async (req, res) => {
  try {
    const student = await User.findById(req.params.studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET: student enrollments
exports.getStudentEnrollments = async (req, res) => {
  try {
    const student = await User.findById(req.params.studentId).populate('enrolledCourses');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student.enrolledCourses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST: enroll student in course
exports.enrollStudentInCourse = async (req, res) => {
  const { studentId, courseId } = req.params;

  try {
    const student = await User.findById(studentId);
    const course = await Course.findById(courseId);

    if (!student || !course) {
      return res.status(404).json({ message: 'Student or Course not found' });
    }

    // Prevent duplicates
    if (student.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: 'Already enrolled' });
    }

    // Check course capacity
    if (course.enrolledStudents.length >= course.capacity) {
      return res.status(400).json({ message: 'Course is full' });
    }

    student.enrolledCourses.push(courseId);
    course.enrolledStudents.push(studentId);

    await student.save();
    await course.save();

    res.json({ message: 'Enrollment successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE: drop student from course
exports.dropStudentFromCourse = async (req, res) => {
  const { studentId, courseId } = req.params;

  try {
    const student = await User.findById(studentId);
    const course = await Course.findById(courseId);

    if (!student || !course) {
      return res.status(404).json({ message: 'Student or Course not found' });
    }

    student.enrolledCourses = student.enrolledCourses.filter(
      (id) => id.toString() !== courseId
    );
    course.enrolledStudents = course.enrolledStudents.filter(
      (id) => id.toString() !== studentId
    );

    await student.save();
    await course.save();

    res.json({ message: 'Dropped from course' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
