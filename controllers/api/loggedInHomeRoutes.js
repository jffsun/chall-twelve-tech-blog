const router = require('express').Router();
const { User, Post, Comment } = require("../../models");
var colors = require('colors');
// Routes mounted at ('/api/loggedIn')

// GET all posts
// TO DO: ADD - Require Authorization; 
router.get("/", async (req, res) => {
    try {
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

        res.status(200).json(allPosts);

        // TO DO: Render data to front end using all.handlebars
        // res.render('all', { allPosts });

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    };
});

// GET Post by ID and its comment(s)
// TO DO: ADD - Require Authorization
router.get("/post/:id", async (req, res) => {

    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id
            },
            include: [
                { model: Comment },
                { model: User},
            ],
            attributes: [
                'id',
                'title',
                'content',
                // Specify created date since user is logged in
                // TO DO: Format to show shorthand date  
                'created_at'
            ],
        });

        // Serialize data retrieved
        const onePost = postData.get({ plain: true });

        res.status(200).json(onePost);

        //  TO DO: Render post data to front end using single-post.handlebars
        // res.render('post', { OnePost });

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    };
});

// POST a comment to a post 
// TO DO: ADD - Require Authorization
router.post("/post/:id", async (req, res) => {
    try {
        const newComment = await Comment.create({

            // Define body of POST request
            text: req.body.text,

            // Id taken from URL
            post_id: req.params.id,

            // Use session info to define the user_id 
            user_id: req.session.user_id
        })
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


module.exports = router;