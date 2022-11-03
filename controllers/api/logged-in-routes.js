const router = require('express').Router();
const { User, Post, Comment } = require("../models");

// At '/logged-in' endpoint
// TO DO: ADD - Require Authorization
router.get("/", async (req, res) => {
    try {
        // Get all records from Post table with comments and User who posted
        const postData = await Post.findAll({
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

// router.get("/dashboard", auth, async (req, res) => {
//     try {    
//         const myPostData = await Post.findAll({
//             include: { model: Comment },
//             attributes: [
//                 'title',
//                 'content',
//                 // Specify created date since user is logged in
//                 // TO DO: Format to only show date  
//                 'created_at'
//             ],
//             where: {
//                 user_id: req.session.
//             }
//         });

//         // Create array of each post retrieved
//         const allPosts = postData.map((post) =>

//         // Serialize data
//         post.get({ plain: true })
//         );

//         res.status(200).json(allPosts);

//         // Render data to front end using all.handlebars
//         // res.render('all', { allPosts });
//     } catch (err) {
//         console.log(err)
//         res.status(500).json(err)
//     };
// });

module.exports = router;