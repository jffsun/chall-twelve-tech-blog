const router = require('express').Router();

// Import loggedInHomeRoutes router file
const loggedInHomeRoutes = require('./loggedInHomeRoutes');

// Import dashboardRoutes router directory
const dashboardRoutes = require('./dashboard');

router.use('/loggedIn', loggedInHomeRoutes);
router.use('/loggedIn/dashboard', dashboardRoutes);

module.exports = router;
