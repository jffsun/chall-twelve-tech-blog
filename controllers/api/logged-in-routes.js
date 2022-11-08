const router = require('express').Router();
const { User, Post, Comment } = require("../../models");
var colors = require('colors');

// At '/api/logged-in/' endpoint GET all posts
// TO DO: ADD - Require Authorization; 
router.get("/", async (req, res) => {
    try {
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

        res.status(200).json(allPosts);

        // TO DO: Render data to front end using all.handlebars
        // res.render('all', { allPosts });

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    };
});

// At 'api/logged-in/:id' endpoint GET Post and its comments that user clicks
// TO DO: ADD - Require Authorization
router.get("/:id", async (req, res) => {

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
                'title',
                'content',
                // Specify created date since user is logged in
                // TO DO: Format to only show date  
                'created_at'
            ],
        });

        // console.log(postData);

        // Serialize data retrieved
        // const onePost = postData.get({ plain: true });

        // console.log(onePost);
        res.status(200).json(postData);

        //  TO DO: Render post data to front end using single-post.handlebars
        // res.render('post', { OnePost });

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    };
});

// At 'api/logged-in/:id' endpoint POST a comment to current Post
// TO DO: ADD - Require Authorization
router.post("/:id", async (req, res) => {
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

// At 'api/logged-in/dashboard' endpoint GET all posts from User logged in
// TO DO: ADD - Require Authorization
router.get("/dashboard", async (req, res) => {
    try {    
        console.log('dashboard endpoint reached'.green);

        const myPostData = await Post.findAll({
            where: {
                user_id: 1
            },
            include: { model: Comment },
            attributes: [
                'title',
                'content',
                // Specify created date since user is logged in
                // TO DO: Format to only show date  
                'created_at'
            ]
        });

        // console.log(req.session.user_id.red);

        // console.log(myPostData.green);

        // // // // Create array of each post retrieved
        // const allMyPosts = myPostData.map((post) =>

        // // Serialize data
        // post.get({ plain: true })
        // );

        res.status(200).json(myPostData);

        // TO DO: Render data to front end using dashboard.handlebars
        // res.render('dashboard', { allMyPosts });

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    };
});

module.exports = router;