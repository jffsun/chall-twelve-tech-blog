const router = require('express').Router();
// const loginRoute = require('./loginRoute.js')

const homeRoutes = require('./home-routes');
var colors = require('colors');

// '/' endpoint renders home page
// router.get('/', (req, res) => {
//     console.log('home page reached'.green);

//     // TO DO: Render main.handlebars with all.handlebars content
// });

// TO DO: If user clicks navigation bar 'Login' res.render('login')
// router.use('/login', loginRoute);

router.use('/', homeRoutes);

module.exports = router;