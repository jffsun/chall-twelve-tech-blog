const { Comment } = require('../models');

const commentData = [
    {
        text: 'I am studying MVC in my bootcamp right now... Still getting the hang of it',
        // Comment under MVC post
        post_id: 1,
        // Comment posted by user Taylor Manning 
        user_id: 3,
    },
    {
        text: 'Thanks for this clarification! I had been using authentification and authorization interchangably which I now know is wrong.',
        // Comment under Authentification post
        post_id: 2,
        // Comment posted by user Sue Cortez
        user_id: 2,
    },
    {
        text: 'Wish this went a little further in-depth and also gave some ORM examples  ',
        // Comment under ORM post
        post_id: 2,
        // Comment posted by user Emilio Sanders
        user_id: 2,
    },
];

// Creates comment seed data for Comment table
const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;