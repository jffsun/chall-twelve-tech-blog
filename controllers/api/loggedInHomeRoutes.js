const router = require('express').Router();
const { User, Post, Comment } = require("../../models");
const sequelize = require('../../config/connection');
const auth = require('../../utils/auth'); 
var colors = require('colors');

// Routes mounted at ('/api/loggedIn')

// GET all posts with data created
router.get("/", auth, async (req, res) => {
    try {
           const postData = await Post.findAll({
            
            attributes: [
                'id',
                'title',
                'content',
                // GET timestamp of post creation since user is logged in
                [
                    sequelize.fn
                    (
                      // Convert YYYY-MM-DDTHH:MM:SSZ timestamp format to MM-DD-YYYY
                      "DATE_FORMAT", 
                      sequelize.col("created_at"), 
                      "%m/%d/%Y"
                    ),
                    "created_at",
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

        console.log('User ID?-----------');

        console.log(req.session.user_id);

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
                 // Include User who wrote the post
                { model: User },
                { 
                    // Include the post's comments
                    model: Comment,
                     // Include comments.text, comments.user_id, and comments.created_at
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
                    include: [{
                        // Include usernames of those who posted comments
                        model: User
                    }],
                },
            ],
        });

        // Serialize data retrieved
        const onePost = postData.get({ plain: true });

        console.log(onePost);

        console.log(req.session.username);

        res.render('post', { onePost, session_username: req.session.username });

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    };
});

// POST a comment to a post 
// TO DO: ADD - Require Authorization
router.post("/post/:id", async (req, res) => {
    try {

        console.log('User ID ------------');
        console.log(req.session.user_id);

        const newComment = await Comment.create({

            // Define body of POST request
            text: req.body.text,

            // Id taken from URL
            post_id: req.params.id,

            // Use session info to define the user_id 
            user_id: req.session.user_id
        })

        console.log(newComment);
        
        res.status(200).json({newComment, message : `Comment added!`})

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    };
});

// UPDATE a comment of a post
// TO DO: ADD - Require Authorization
router.put("/post/:id", async (req, res) => {
    try {
        const updatedComment = await Comment.update({

            // Define body of POST request
            text: req.body.text,

            // Updating the comment of the post ID in the URL
            post_id: req.params.id,

            // Use session info to define the user_id 
            user_id: req.session.user_id
        },
        {
            // Will target the comment that user clicks on (FRONT END
            // FE: Give each comment a container ID, get ID upon click, include that ID in req.body of fetch request
            // 
            where: {
                id: req.body.id
            },
        }
        )
        res.status(200).json({updatedComment, message : `Comment updated!`})

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