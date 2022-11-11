const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Set up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Instance of Express handlebars
const hbs = exphbs.create({ });

// Define session attributes
const sess = {
    secret: 'Super secret secret',
    cookie: {
      // Cookie lifetime set to one day
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

  app.use(session(sess));

  // Set Handlebars as the default template engine
  app.engine('handlebars', hbs.engine);
  app.set('view engine', 'handlebars');
  
  // Middleware to parse requests
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Serve static files in 'public' directory
  app.use(express.static(path.join(__dirname, 'public')));

  // Mount application to routes in 'controllers' directory
  app.use(routes);
  
  sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });