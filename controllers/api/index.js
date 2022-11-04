const router = require('express').Router();

// Import home-routes.js router file
const loggedInRoutes = require('./logged-in-routes');

// Endpoint of 'api/logged-in'
router.use('/logged-in', loggedInRoutes);

module.exports = router;
