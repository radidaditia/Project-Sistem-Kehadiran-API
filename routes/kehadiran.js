const express = require('express');
const router = express.Router();

const { createAttendance, getAttendance, updateAttendance, percentase, findStudent } = require('../controllers/KehadiranController');
const auth = require('../Middleware/authentication');

router.get('/', auth, getAttendance);
router.post('/create', auth, createAttendance);
router.patch('/:kelas/:absen/update', auth, updateAttendance);
router.get('/:kelas/:absen/show', auth, findStudent);
router.get('/:kelas/:absen/persentase', auth, percentase);

module.exports = router;