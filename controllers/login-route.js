const router = require('express').Router();
const { User } = require("../models");

// At '/login' endpoint
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

module.exports = router; 