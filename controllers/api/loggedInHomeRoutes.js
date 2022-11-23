const router = require('express').Router();
const { User, Post, Comment } = require("../../models");
const sequelize = require('../../config/connection');
const auth = require('../../utils/auth'); 
var colors = require('colors');

// Routes mounted at ('/api/loggedIn')

// GET all posts
router.get("/", auth, async (req, res) => {

    console.log(req.session.user_id);
    try {
            const postData = await Post.findAll({
            
            attributes: [
                'id',
                'title',
                'content',
                // Convert YYYY-MM-DDTHH:MM:SSZ timestamp format to MM-DD-YYYY
                [
                    sequelize.fn ("DATE_FORMAT",
                    sequelize.col("post.created_at"), 
                    "%m/%d/%Y"),
                    "created_at"
                ],
            ],
        });
        
        // Create array of each post retrieved
        const allPosts = postData.map((post) =>

        // Serialize data
        post.get({ plain: true })
        );

        // Render all posts with home.handlebars
        res.render('home', { allPosts, loggedIn: req.session.loggedIn });

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    };
});

// GET Post by ID and its comment(s)
router.get("/post/:id", auth, async (req, res) => {
    try {
        const postData = await Post.findOne({

            // Get post.id, post.title, post.content, and post.created_at
            attributes: [
                'id',
                'title',
                'content',
                [
                    sequelize.fn ("DATE_FORMAT",
                    sequelize.col("post.created_at"), 
                    "%m/%d/%Y"),
                    "created_at"
                ],
            ],
            where: {
                id: req.params.id
            },
            include: [
                 // Include user who wrote the post
                { model: User },

                // Include the post's comments
                { model: Comment,
                    attributes: [
                    'id',
                    'text', 
                    'user_id',
                    [
                        sequelize.fn ("DATE_FORMAT",
                        sequelize.col("comments.created_at"), 
                        "%m/%d/%Y"),
                        "created_at"
                    ],
                    ], 
                    // Include usernames of those who posted comments
                    include: { model: User },
                },
            ],
        });
        // Serialize data retrieved
        const onePost = postData.get({ plain: true });

        // Render data to post.handlebars
        res.render('post', { onePost, session_username: req.session.username });

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    };
});

// POST a comment to a post 
router.post("/post/:id", auth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            text: req.body.text,

            // Post's ID taken from URL
            post_id: req.params.id,

            // User_id pulled from from session
            user_id: req.session.user_id
        });
        res.status(200).json({newComment, message : `Comment added!`});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// UPDATE a comment of a post
router.put("/post/:id", auth, async (req, res) => {
    try {
        const updatedComment = await Comment.update({

            text: req.body.text,
            post_id: req.params.id,

            // Use session info to define the user_id 
            user_id: req.session.user_id
        },
        { where: {
                id: req.body.id
            },
        });
        res.status(200).json({updatedComment, message : `Comment updated!`})
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    };
});

// DELETE a comment of a post
router.delete("/post/:id", auth, async (req, res) => {
    try {
        const deletedComment = await Comment.destroy({
            where: {
                id: req.body.id
            },
        });
        res.status(200).json({deletedComment, message : `Comment deleted!`})
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    };
});

// End session and log user out
router.post('/', (req, res) => {
    if (req.session.loggedIn) {

        // Remove the session variables
        req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
});

module.exports = router;