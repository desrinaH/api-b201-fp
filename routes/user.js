const express = require('express');
const Users = require('../model/Users');
const router = express.Router();
const User =  require('../model/Users');

//GET ALL USERS
router.get('/', async (req, res) => {
    try {
        const posts = await User.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({message: "Data Not Found"});
    }
});

//SUBMIT USER
router.post('/register', async (req, res) => {
    const post = new Users({
        username: req.body.username,
        password: req.body.password,

    });
    try {
        const savePost = await post.save();
        res.json(savePost);
    } catch (error) {
        res.json({message: error});
        
    }
});

//GET SPECIFIC USER
router.get('/:postId', async (req, res) => {
    try{
        const post = await User.findById(req.params.postId);
        res.json(post);
    } catch (error){
        res.json({message: error});
    }
});

router.get('/username/:username', async (req,res) => {
    try{ 
        const getUsername = await User.find( {username: req.params.username} );
        res.json(getUsername);
    } catch (error){
        res.json({message: error});
    }
});

//DELETE USER


module.exports = router;