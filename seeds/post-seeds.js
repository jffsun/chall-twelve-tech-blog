const { Post } = require('../models');

const postData = [
    {
        title: 'What is MVC?',
        content: 'In the MVC architecture, developing different view components for your model component is easily achievable. It empowers you to develop different view components, thus limiting code duplication as it separates data and business logic.'
    },
    {
        title: 'Authorization vs. Authentification',
        content: 'Authentication and authorization are two vital information security processes that administrators use to protect systems and information. Authentication verifies the identity of a user or service, and authorization determines their access rights.'
    },
    {
        title: 'Object-Relational Mapping',
        content: 'Object-relational mapping is a programming technique for converting data between type systems using object-oriented programming languages. This creates, a "virtual object database" that can be used from within the programming language.'
    },
];

// Creates sample post seed data for Post table
const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;