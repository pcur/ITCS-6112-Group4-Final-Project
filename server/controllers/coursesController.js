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
    const { professorId, ...courseData } = req.body;

    // Create the course
    const newCourse = new Course(courseData);
    await newCourse.save();

    // Add the course to the professor's enrolledCourses
    const professor = await User.findById(professorId);
    if (professor) {
      professor.enrolledCourses.push(newCourse._id);
      await professor.save();
    }

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
    const { professorId, ...courseData } = req.body;

    // Find the course and update it
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // If the professor changes, remove the course from the old professor's enrolledCourses
    if (professorId && professorId !== course.professor.toString()) {
      const oldProfessor = await User.findById(course.professor);
      if (oldProfessor) {
        oldProfessor.enrolledCourses = oldProfessor.enrolledCourses.filter(
          (courseId) => courseId.toString() !== course._id.toString()
        );
        await oldProfessor.save();
      }

      // Add the course to the new professor's enrolledCourses
      const newProfessor = await User.findById(professorId);
      if (newProfessor) {
        newProfessor.enrolledCourses.push(course._id);
        await newProfessor.save();
      }
    }

    // Update the course details
    Object.assign(course, courseData);

    await course.save();
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE: course
exports.deleteCourse = async (req, res) => {
  try {
    // Find the course to delete
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Remove the course from the professor's enrolledCourses
    const professor = await User.findById(course.professor);
    if (professor) {
      professor.enrolledCourses = professor.enrolledCourses.filter(
        (courseId) => courseId.toString() !== course._id.toString()
      );
      await professor.save();
    }

    // Delete the course
    await course.remove();

    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
