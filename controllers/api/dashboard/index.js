const router = require('express').Router();

// Import dashBoardRoutes router file
const dashboardRoutes = require('./dashboardRoutes');

// Application mounted to ('/api/loggedIn/dashboard')
router.use('/', dashboardRoutes);

module.exports = router;
