const router = require('express').Router();
const { Post, Comment } = require("../models");

// At '/' endpoint GET all posts
router.get("/", async (req, res) => {
    try {
        // Get all records from Post table
        const postData = await Post.findAll({
            include: { model: Comment },
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

        res.status(200).json(allPosts);

        // Render data to front end using all.handlebars
        // res.render('all', { allPosts });
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    };
});

module.exports = router;