const router = require('express').Router();
const { User, Post, Comment } = require("../../../models");
const sequelize = require('../../../config/connection');
const auth = require('../../../utils/auth'); 
var colors = require('colors');

// Routes mounted at ('/api/loggedIn/dashboard') 

// GET all posts from User logged in
router.get("/", auth, async (req, res) => {
    try {    
        console.log(req.session.user_id);
        console.log(req.session);

        const myPostData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: { model: Comment },
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
        });

        // Create array of each post retrieved
        const allMyPosts = myPostData.map((post) =>

        // Serialize data
        post.get({ plain: true })
        );

        // TO DO: Render data to front end using dashboard.handlebars
        res.render('dashboard', { allMyPosts, user_id: req.session.user_id });

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    };
});

// POST a new post 
router.post("/", auth, async (req, res) => {
    try {
        const newPost = await Post.create({

            // Define body of POST request
            title: req.body.title,
            content: req.body.content,

            // Use session info to define the user_id 
            user_id: req.body.user_id
        });
        res.status(200).json({newPost, message : `Post added!`})

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    };
});


// GET a post from dashboard by ID
router.get("/mypost/:id", auth, async (req, res) => {
    try {
        const dashboardPostData = await Post.findOne({

            where: {
                id: req.params.id
            },
            include: [
                { model: Comment },
            ],
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
        });

        // Serialize data retrieved
        const dashboardPost = dashboardPostData.get({ plain: true });

        //  Render dashboard post data to front end using dashboard-post.handlebars
        res.render('dashboard-post', { dashboardPost });

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    };
});

// Update a post from user's dashboard 
router.put("/mypost/:id", auth, async (req, res) => {
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

// Delete a post from user's dashboard
router.delete("/mypost/:id", auth, async (req, res) => {
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



module.exports = router;