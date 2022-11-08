const router = require('express').Router();
const loginRoute = require('./login-route')
const homeRoutes = require('./home-routes');
const apiRoutes = require('./api');
var colors = require('colors');

router.use('/', homeRoutes);
router.use('/login', loginRoute);
router.use('/api', apiRoutes);

module.exports = router;