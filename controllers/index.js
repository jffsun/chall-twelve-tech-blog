const router = require('express').Router();
// const loginRoute = require('./loginRoute.js')
const homeRoutes = require('./home-routes');
var colors = require('colors');

// TO DO: If user clicks navigation bar 'Login' res.render('login')
// router.use('/login', loginRoute);

router.use('/', homeRoutes);

module.exports = router;