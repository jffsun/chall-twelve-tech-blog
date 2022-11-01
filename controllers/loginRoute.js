const router = require('express').Router();
const { User } = require("../models");

// Render login handlebars
router.post('/', async (req, res) => {
     try {
          // Find the parent who matches with the email in the database
          const loginCheck = await User.findOne({where: {email:  req.body.email, password: req.body.password}});
  
          // If there is no match with the username, send a incorrect message to the user and have them retry
          if (!loginCheck) {
               res.status(401).json({ message: 'Incorrect email or password, please try again.' });
               return; 
          }

          req.session.save(() => {
          req.session.logged_in = true;
          res.json('Logged in successfully!');
          });
          
      } catch (err) {
          res.render('404')
      }
});