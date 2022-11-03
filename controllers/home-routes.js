const router = require('express').Router();
const { Post } = require("../models");
var colors = require('colors');

// At '/' endpoint GET all posts
router.get("/", async (req, res) => {
    try {
        // Get all records from Post table
        const postData = await Post.findAll({
            attributes: [
                'title',
                'content'
            ],
        });

        // Create array of each post retrieved
        const allPosts = postData.map((post) =>

        // Serialize data
        post.get({ plain: true })
        );

        console.log(allPosts.green);

        // Render data to front end using all.handlebars
        res.render('all', { allPosts });
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    };
});

module.exports = router;