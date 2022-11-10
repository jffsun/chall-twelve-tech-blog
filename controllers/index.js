const router = require('express').Router();
const loginRoutes = require('./loginRoutes')
const homeRoute = require('./homeRoute');
const apiRoutes = require('./api');
var colors = require('colors');

router.use('/', homeRoute);
router.use('/login', loginRoutes);
router.use('/api', apiRoutes);

module.exports = router;