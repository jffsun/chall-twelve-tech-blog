const { User } = require('../models');

const userData = [
  {
    username: 'eSanders',
    email: 'emilio.sanders@gmail.com',
    password: 'emilio123',
  },
  {
    username: 'sCortez',
    email: 'sue.cortez@yahoo.com',
    password: 'sue123',
  },  
  {
    username: 'tManning',
    email: 'taylor.manning@outlook.com',
    password: 'taylor123',
  },
];

// Creates sample post seed data for User table
const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;