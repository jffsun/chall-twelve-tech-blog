const router = require('express').Router();
const loginRoute = require('./loginRoute')
const homeRoute = require('./homeRoute');
const apiRoutes = require('./api');
var colors = require('colors');

router.use('/', homeRoute);
router.use('/login', loginRoute);
router.use('/api', apiRoutes);

module.exports = router;