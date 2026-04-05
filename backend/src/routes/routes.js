const express = require('express');
const router = express.Router();
const {
  analyseReport,
  getDemoReport,
  createFeature,
  deleteFeature,
  getVipsContent,
  updateVipsContent,
  getMainPageContent,
  updateMainPageContent,
} = require('../controllers/controllers');
const { requireAdmin } = require("../middleware/adminAuth");

// POST /api/analyse  — main analysis endpoint
router.post('/analyse', analyseReport);
router.get('/demo', getDemoReport);
router.get('/vips-content', getVipsContent);
router.get('/main-page-content', getMainPageContent);
router.put('/vips-content', requireAdmin, updateVipsContent);
router.put('/main-page-content', requireAdmin, updateMainPageContent);

// admin-only example
router.post("/feature", requireAdmin, createFeature);
router.delete("/feature/:id", requireAdmin, deleteFeature);

module.exports = router;
