const express = require('express')
const router = express.Router();
const Post = require('../model/Posts');

//GET ALL POSTS
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).send({message: "Content not found"});
    }
});

//SUBMIT POSTS
router.post('/', async (req, res) => {
    if(!req.body.country || !req.body.kind || !req.body.etag || !req.body.items){
        res.status(400).send({message: "Content can not be empty or invalid"});
        return;
    }
    const post = new Post({
        kind: req.body.kind,
        country: req.body.country,
        etag: req.body.etag,
        items: req.body.items
    });
    try {
        const savePost = await post.save();
        res.status(201).json(savePost);
    } catch (error) {
        res.status(500).json({message: "Error occured"});
        
    }
});

//GET SPECIFIC POST
router.get('/:postId/:index', async (req, res) => {
    try{
        const post = await Post.findById(req.params.postId);
        res.status(200).json(post);
    } catch (error){
        res.status(404).json({message: "Content not found"});
    }
});

router.get('/country/:country', async (req,res) => {
    try{ 
        const where = await Post.find( {country: req.params.country} );
        res.status(200).json(where);
    } catch (error){
        res.status(404).json({message: "Content not found"});
    }
});  

//DELETE A POST
router.delete('/:postId/', async (req, res) => {
    try{
        const removePost = await Post.remove({_id: req.params.postId});
       // if(!removePost){
     //       res.status(404).send({message: "Content not found"});
   //     } else {
            res.status(200).json(removePost);
 //       }

    } catch (error){
        res.status(500).send({message: "Error occured"});
    }
});

router.delete('/country/:country', async (req,res) => {
    try{ 
        const removeCountry = await Post.remove( {country: req.params.country} );
        if(!removeCountry){
            res.status(404).send({message: "Content not found"});
        } else {
            res.status(200).json(removeCountry);
        }
        
    } catch (error){
        res.status(500).send({message: "Error occured"});
    }
});  

//UPDATE DATA
router.patch('/:postId', async (req, res) => {
    if(!req.body){
        return res.status(400).send({message: "Content to update can not be emppty"});
    }
    try{
        const updatePostCountry = await Post.updateOne({_id: req.params.postId},
            {$set: {country: req.body.country}}
            );
        res.status(200).json(updatePostCountry);
    } catch (error){
        res.json({message: error});
    }
});



module.exports = router;
