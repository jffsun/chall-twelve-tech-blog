// Import models
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment")

// Association between Post and its comments
Comment.belongsTo(Post);

Post.hasMany(Comment, {
    foreignKey: 'post_id'    
});

// Association between User and their posts
Post.belongsTo(User)

User.hasMany(Post, {
    foreignKey: 'user_id'
});

// Association between User and their comments
Comment.belongsTo(User);

User.hasMany(Comment, {
    foreignKey: 'user_id'    
});

module.exports = { User, Post, Comment };
