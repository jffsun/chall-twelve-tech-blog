const router = require('express').Router();

// Import loggedInHomeRoutes router file
const loggedInHomeRoutes = require('./loggedInHomeRoutes');

// Import dashboardRoutes router directory
const dashboardRoutes = require('./dashboard');

// Mount application to ('/api/loggedIn')
router.use('/loggedIn', loggedInHomeRoutes);

// Mount application to ('/api/loggedIn/dashboard')
router.use('/loggedIn/dashboard', dashboardRoutes);

module.exports = router;
