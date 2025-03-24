const express = require('express');
const router = express.Router();
const { getSpecialists } = require('../controllers/specialistController');
router.get('/specialists', getSpecialists);

module.exports = router;

