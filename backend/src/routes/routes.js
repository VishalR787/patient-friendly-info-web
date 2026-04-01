const express = require('express');
const router = express.Router();
const { analyseReport, getDemoReport } = require('../controllers/controllers');

// POST /api/analyse  — main analysis endpoint
router.post('/analyse', analyseReport);

// GET /api/demo — returns pre-loaded sample for demo mode
router.get('/demo', getDemoReport);

module.exports = router;