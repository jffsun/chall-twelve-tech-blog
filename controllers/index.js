const router = require('express').Router();
// const loginRoute = require('./loginRoute.js')
const homeRoutes = require('./home-routes');
const apiRoutes = require('./api');
var colors = require('colors');

// TO DO: If user clicks navigation bar 'Login' res.render('login')
// router.use('/login', loginRoute);

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;