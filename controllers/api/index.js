const router = require('express').Router();

// Import home-routes.js router file
const homeRoutes = require('./home-routes');

// Endpoint of '/'
router.use('/', homeRoutes);

module.exports = router;
