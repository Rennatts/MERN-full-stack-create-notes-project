const router = require('express').Router();
let Post = require('./../models/post_model');
const {check, validationResult} = require("express-validator");
const { runInContext } = require('vm');


router.post('/add', 
[
    check("textOfThePost", "Text is required").not().isEmpty(),
    check("titleOfThePost", "Title is required").not().isEmpty()
],
(req, res) => {
    let {textOfThePost} = req.body;
    let {titleOfThePost} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty())  
       return res.status(400).json({errors: errors.array( )});
    try {
        let newPost = new Post({
            textOfThePost,
            titleOfThePost,
            date: Date.parse(req.body.date),
        });

        newPost.save();
        res.json("Post is created");

    } catch(error) {
        console.error(error);
        return res.status(500).json("Server Error");
    }
});



router.get('/', async(req, res) => {
    try{
        let posts = await Post.find();
        res.json(posts);
    }catch(error) {
        console.error(error);
        return res.status(500).json("Server Error");
    }
});




router.get("/:id", async (req, res)=> {
    try{
        let posts = await Post.findById(req.params.id);
        res.json(posts);

    }catch(error){
        console.error(error);
        return res.status(500).json("Server Error");
    }
});



router.post("/update/:id", 
[
    check("textOfThePost", "Text is required").not().isEmpty(),
    check("titleOfThePost", "TItle is required").not().isEmpty()

],
(req, res)=> {
    Post.findById(req.params.id)
    .then(post => {
        post.textOfThePost = req.body.textOfThePost;
        post.titleOfThePost = req.body.titleOfThePost;
        post.date = Date.parse(req.body.date);

        post.save()
        .then(()=> res.json("Post updated!"))
        .catch(err => res.status(400).json('error: ' + err));
    })
    .catch(err => res.status(400).json('error: ' + err));
    
});





router.delete("/delete_post/:id", async(req, res) => {
    try{
        let post = await Post.findById(req.params.id);
        if(!post) return res.status(400).json("post not found");

        await post.remove();

        res.json("post deleted");

    }catch(error){
        console.error(error);
        return res.status(500).json("server error");
    }
});



module.exports = router;