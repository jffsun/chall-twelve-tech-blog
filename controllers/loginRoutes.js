const router = require('express').Router();
const { User } = require("../models");

// Routes mounted at ('/login') endpoint

// Render login page
router.get('/', async (req, res) => {
     try {
          res.render('login');
          
      } catch (err) {
          console.log(err)
          res.status(500).json(err)
      }
});

// User logs in
router.post('/', async (req, res) => {
     try {
          // Find the user who matches with the email in the database
          const loginCheck = await User.findOne({where: {email:  req.body.email, password: req.body.password}});
  
          // If username or password wrong, send a incorrect message to the user
          if (!loginCheck) {
               res.status(401).json({ message: 'Incorrect email or password, please try again.' });
               return; 
          }

          // Serialize retrieved User's data
          const currentUser = loginCheck.get({ plain: true });

          req.session.save(() => {
          req.session.logged_in = true;

          // Save current User's ID to the session
          req.session.user_id = currentUser.id;

          res.json('Logged in successfully!');
          // TO DO: Redirect them to logged in homepage

          });
          
      } catch (err) {
          res.render('404')
      }
});

// Render registration page
router.get('/register', async (req, res) => {
     try {
          res.render('register');
          
      } catch (err) {
          console.log(err)
          res.status(500).json(err)
      }
});

// User registers a new account
router.post('/register', async (req, res) => {
     try {
          // Create a new user
          const newUser = await User.create({
               
               username: req.body.username,
               email: req.body.email, 
               password: req.body.password
          });
          
          res.status(200).json({newUser, message : `User created! You may now login.`});
          // Refresh form and have user login.

      } catch (err) {
          console.log(err)
          res.status(500).json(err)
      }
});

module.exports = router; 