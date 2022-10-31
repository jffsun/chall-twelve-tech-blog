const sequelize = require('../config/connection');

const user = require('./user-seeds');
const post = require('./post-seeds');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await user();
  await post();

  process.exit(0);
};

seedAll();