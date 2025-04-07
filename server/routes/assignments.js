const express = require('express');
const router = express.Router();
const controller = require('../controllers/assignmentsController');

router.post('/generate', controller.generateAssignments);

router.get('/', controller.getAllAssignments);
router.get('/course/:courseId', controller.getAssignmentByCourse);
router.get('/room/:roomId', controller.getAssignmentsByRoom); // Note: could conflict with courseId

router.patch('/course/:courseId', controller.updateAssignment);
router.delete('/course/:courseId', controller.deleteAssignment);

module.exports = router;
