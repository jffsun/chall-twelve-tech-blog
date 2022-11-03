const sequelize = require('../config/connection');

// Import seed files
const user = require('./user-seeds');
const post = require('./post-seeds');
const comment = require('./comment-seeds');

// Asynchronously seed all data 
const seedAll = async () => {
  await sequelize.sync({ force: true });

  await user();
  await post();
  await comment();

  process.exit(0);
};

seedAll();