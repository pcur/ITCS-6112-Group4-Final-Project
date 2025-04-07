const express = require('express');
const router = express.Router();
const courseController = require('../controllers/coursesController');

router.get('/', courseController.getAllCourses);
router.get('/:courseId', courseController.getCourseById);
router.get('/:courseId/students', courseController.getCourseStudents);
router.get('/:courseId/preferences', courseController.getCoursePreferences);

router.post('/', courseController.createCourse);

router.patch('/:courseId/preferences', courseController.updateCoursePreferences);
router.patch('/:courseId', courseController.updateCourse);

router.delete('/:courseId', courseController.deleteCourse);

module.exports = router;
