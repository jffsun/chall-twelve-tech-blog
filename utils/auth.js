// If the user has not logged in, redirect to the homepage page
const auth = (req, res, next) => {
    if (!req.session.loggedIn) {
      res.redirect('/');
      next();
    // Else go to the next instance
    } else {
      next();
    }
  };
  
  module.exports = auth;
  