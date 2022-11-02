const router = require('express').Router();
const { Post } = require("../models");

// At '/' endpoint GET all posts
router.get("/", async (req, res) => {
    try {

        console.log('Posts retrieved'.red);
        // Get all records from Post table
        const postData = await Post.findAll();

        // Create array of each post retrieved
        const allPosts = postData.map((post) =>
        post.get({ plain: true })
        );
        res.render('all', { allPosts });
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    };
});

module.exports = router;