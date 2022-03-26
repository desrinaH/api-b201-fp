const express = require('express')
const router = express.Router();
const Post = require('../model/Posts');
const verify = require('./verifytoken');


//GET ALL POSTS
router.get('/', verify, async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).send({message: "Content not found"});
    }
});

//SUBMIT POSTS
router.post('/', verify, async (req, res) => {
    if(!req.body){
        res.status(400).send({message: "Content can not be empty or invalid"});
        return;
    }
    const post = new Post({
        kind: req.body.kind,
        country: req.body.country,
        etag: req.body.etag,
        kindItem: req.body.kindItem,
        etagItem: req.body.etagItem,
        id: req.body.id,
        channelId: req.body.channelId,
        title: req.body.title,
        assignable: req.body.assignable
    });
    try {
        const savePost = await post.save();
        res.status(201).json(savePost);
    } catch (error) {
        res.status(500).json({message: "Error occured"});
        
    }
});

//GET SPECIFIC POST
router.get('/:postId', verify,  async (req, res) => {
    const post = await Post.findById(req.params.postId);
    if(!post){
        return res.status(404).json({message: "Content not found"});
    } else {
        try{
           res.status(200).json(post);
        } catch (error){
          res.status(500).json({message: "Error occured"});
        }
    }
});

router.get('/country/:country', verify, async (req,res) => {
    const where = await Post.find( {country: req.params.country} );
    if(!where){
        return res.status(404).json({message: "Content not found"});
       
    } else {
     try{ 
           res.status(200).json(where);
     } catch (error){
            res.status(500).json({message: "Error occured"});
        }
    }
});  

router.get('/id/:id', verify, async (req,res) => {
    const item = await Post.find( {id: req.params.id} );
    //const item = await where.find({id: req.params.id});
    if(!item){
        return res.status(404).json({message: "Content not found"});
       
    } else {
     try{ 
           res.status(200).json(item);
     } catch (error){
            res.status(500).json({message: "Error occured"});
        }
    }
}); 

//DELETE A POST
router.delete('/:postId/', verify, async (req, res) => {
   
        const removePost = await Post.remove({_id: req.params.postId});
        if(!removePost){
           return res.status(404).send({message: "Content not found"});
        } else{
            try {
                res.status(200).json(removePost);
            } catch (error) {
                res.status(500).send({message: "Error occured"});
            }
        }
            
});

// router.delete('/etagItem/:etagItem', async (req,res) => { 
//         const removeItem = await Post.findOneAndDelete( {etagItem: req.params.etagItem} );
//         if(!removeItem){
//             return res.status(404).send({message: "Content not found"});
//         } else {
//             try{ 
//             res.status(200).json(removeItem);
//             } catch (error){
//                 res.status(500).send({message: "Error occured"});
//             }
//         }
        

// });  

//UPDATE DATA
router.patch('/country/:postId', verify, async (req, res) => {
    if(!req.body){
        return res.status(400).send({message: "Content to update can not be empty"});
    } else{
    try{
        const updatePostCountry = await Post.updateOne({_id: req.params.postId},
            {$set: {country: req.body.country}}
            );
        res.status(200).json(updatePostCountry);
    } catch (error){
        res.status(500).json({message: "Error occured"});
    }
    }
});

router.patch('/id/:postId', verify, async (req, res) => {
    if(!req.body){
        return res.status(400).send({message: "Content to update can not be empty"});
    } else{
    try{
        const updatePostId = await Post.updateOne({_id: req.params.postId},
            {$set: {id: req.body.id}}
            );
        res.status(200).json(updatePostId);
    } catch (error){
        res.status(500).json({message: "Error occured"});
    }
    }
});



module.exports = router;
