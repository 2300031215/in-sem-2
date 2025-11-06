const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, appointmentController.createAppointment);
router.get('/', authMiddleware, appointmentController.getAllAppointments);
router.get('/my-appointments', authMiddleware, appointmentController.getUserAppointments);
router.get('/doctor/:doctorId', authMiddleware, appointmentController.getDoctorAppointments);
router.get('/:id', authMiddleware, appointmentController.getAppointmentById);
router.put('/:id', authMiddleware, appointmentController.updateAppointment);
router.patch('/:id/status', authMiddleware, appointmentController.updateAppointmentStatus);
router.delete('/:id', authMiddleware, appointmentController.deleteAppointment);

module.exports = router;
