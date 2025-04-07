const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentsController');

router.get('/', controller.getAllStudents);
router.get('/:studentId', controller.getStudentById);
router.get('/:studentId/enrollments', controller.getStudentEnrollments);
router.post('/:studentId/enroll/:courseId', controller.enrollStudentInCourse);
router.delete('/:studentId/drop/:courseId', controller.dropStudentFromCourse);

module.exports = router;
