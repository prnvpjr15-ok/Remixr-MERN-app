const express = require('express');
const router = express.Router();
const { generateRemix } = require('../controllers/remixController');

router.post('/generate', generateRemix);

module.exports = router;