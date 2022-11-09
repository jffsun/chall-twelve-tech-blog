const router = require('express').Router();
const { User, Post, Comment } = require("../../../models");
var colors = require('colors');

// Routes mounted at ('/api/loggedIn/dashboard') 

// GET all posts from User logged in
// TO DO: ADD - Require Authorization
router.get("/", async (req, res) => {
    try {    
        console.log(req.session.user_id);

        const myPostData = await Post.findAll({
            // TO DO: Request not picking up session.user_id
            where: {
                user_id: req.session.user_id
            },
            include: { model: Comment },
            attributes: [
                'id',
                'title',
                'content',
                // Specify created date since user is logged in
                // TO DO: Format to only show date  
                'created_at'
            ]
        });

        // Create array of each post retrieved
        const allMyPosts = myPostData.map((post) =>

        // Serialize data
        post.get({ plain: true })
        );

        res.status(200).json(allMyPosts);

        // TO DO: Render data to front end using dashboard.handlebars
        // res.render('dashboard', { allMyPosts });

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    };
});

// POST a post from dashboard 
// TO DO: ADD - Require Authorization
router.post("/", async (req, res) => {
    try {
        const newPost = await Post.create({

            // Define body of POST request
            title: req.body.title,
            content: req.body.content,

            // Use session info to define the user_id 
            user_id: req.session.user_id
        });
        res.status(200).json({newPost, message : `Post added!`})

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    };
});


// GET a post from dashboard by ID
// TO DO: ADD - Require Authorization
router.get("/mypost/:id", async (req, res) => {

    try {

        const dashboardPostData = await Post.findOne({

            // ID will be retrieved with front end JS
            where: {
                id: req.params.id
            },
            include: [
                { model: Comment },
            ],
            attributes: [
                'title',
                'content',
                // Specify created date since user is logged in
                // TO DO: Format to show shorthand date  
                'created_at'
            ],
        });

        // Serialize data retrieved
        const dashboardPost = dashboardPostData.get({ plain: true });

        res.status(200).json(dashboardPost);

        //  TO DO: Render post data to front end using single-post.handlebars
        // res.render('post', { OnePost });

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    };
});

// Delete a post from user's dashboard
// TO DO: ADD - Require Authorization
router.delete("/mypost/:id", async (req, res) => {
    try {

    const deletedPost = await Post.destroy({
        where: {
            id: req.params.id,
        },
    });
    res.status(200).json(deletedPost);

    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// Update a post from user's dashboard 
// TO DO: ADD - Require Authorization
router.put("/mypost/:id", async (req, res) => {
    try {
        const updatePost = await Post.update({
            
            // Define body of PUT request
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        },
        {
            where: {
                id: req.params.id
            },
        });
        res.status(200).json({updatePost, message : `Post Updated!`})

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    };
});

module.exports = router;