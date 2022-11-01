// At '/' endpoint GET all posts
router.get("/", auth, async (req, res) => {
    try {
        // Get all records from Post table
        const postData = await Post.findAll();

        // Create array of each post retrieved
        const allPosts = postData.map((post) =>
        post.get({ plain: true })
        );
        res.render('posts', { allPosts });

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    };
})