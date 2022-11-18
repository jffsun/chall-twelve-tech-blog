// Routes at ('/') endpoint
const router = require('express').Router();
const { Post } = require("../models");

// GET all posts
router.get("/", async (req, res) => {
    try {
        console.log('Logged in?-----------');

        console.log(req.session.loggedIn);
        
        const postData = await Post.findAll({
            attributes: [
                'id',
                'title',
                'content'
            ],
        });

        // Create array with each post retrieved
        const allPosts = postData.map((post) =>

        // Serialize each post's data
        post.get({ plain: true })
        );

        // Render all posts with home.handlebars
        res.render('home', { allPosts, loggedIn: req.session.loggedIn });
    
    // Handles errors
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    };
});

module.exports = router;