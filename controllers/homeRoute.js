const router = require('express').Router();
const { Post } = require("../models");

// At '/' endpoint
router.get("/", async (req, res) => {
    try {
        // GET all Posts from Post table
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
        
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    };
});



module.exports = router;