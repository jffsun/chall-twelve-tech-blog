const router = require('express').Router();
const { User } = require("../models");
const bcrypt = require('bcrypt');

// Routes mounted to ('/login') 

// Render login page
router.get('/', async (req, res) => {
     try {
          res.render('login');
          
      } catch (err) {
          console.log(err);
          res.status(500).json(err);
      };
});

// User logs in
router.post('/', async (req, res) => {
     try {
          // Find the user who matches with the email in the database
          const userData = await User.findOne({ where: { email:  req.body.email } });
  
          // If user's email can't be found send invalid message to user
          if (!userData) {
               res.status(401).json({ message: 'Invalid credentials. Please try again.' });
               return; 
          }
          
          // Use bcrypt compare method to compare the provided password against hashed password
          const validPassword = await bcrypt.compare(
               req.body.password,
               userData.password
          );
            
           // If they do not match, return error message
          if (!validPassword) {
               res.status(400).json({ message: 'Login failed. Please try again!' });
               return;
          };
  
          // If password matches, serialize retrieved user data
          const currentUser = userData.get({ plain: true });

          // Save user's session
          req.session.save(() => {
          req.session.logged_in = true;

          // Save the user's id to the session
          req.session.user_id = currentUser.id;
          });

          res.json('Logged in successfully!');
      } catch (err) {
          console.log(err)
          res.status(500).json(err)
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


        console.log(newUser);

        // Save user's session
        req.session.save(() => {
        req.session.logged_in = true;

        // Save the user's id to the session
        req.session.user_id = newUser.id;
        });

        res.status(200).json({newUser, message : 'Account created!'});
      } catch (err) {
          console.log(err)
          res.status(500).json(err)
      };
});

module.exports = router; 