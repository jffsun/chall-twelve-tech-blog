// Routes at ('/') endpoint
const router = require('express').Router();
const { Post } = require("../models");

// GET all Posts from Post table
router.get("/", async (req, res) => {
    try {
        console.log(req.session);
        
        const postData = await Post.findAll({
            attributes: [
                'id',
                'title',
                'content'
            ],
        });

        // Create array of each post retrieved
        const allPosts = postData.map((post) =>

        // Serialize data
        post.get({ plain: true })
        );

        // Render all posts with home.handlebars
        res.render('home', { allPosts });
    
    // Handles errors
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    };
});

module.exports = router;