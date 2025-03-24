const express = require('express')
const router = express.Router()


const Post = require('../models/Post')
const verifyToken = require('../verifyToken')

// router.get('/', verifyToken, async(req,res) => {
//     try{
//         const posts = await Post.find()
//         res.send(posts)
//     }catch(err){
//         res.status(400).send({message:err})
//     }
// })

// POST (Create data)
router.post('/', verifyToken, async(req,res)=>{

    const postData = new Post({
        title:req.body.title,
        description:req.body.description,
        likes:req.body.likes || 0,
        createdBy:req.user._id
    })
    // try to insert...
    try{
        const postToSave = await postData.save()
        res.send(postToSave)
    }catch(err){
        res.send({message:err})
    }
})

// GET 1 (Read all)
router.get('/', async(req,res) =>{
    try{
        const getPosts = await Post.find().limit(10);
        res.send(getPosts)
    }catch(err){
        res.send({message:err})
    }
})

// GET 2 (Read by ID)
router.get('/:postId', async(req,res) =>{
    try{
        const getPostById = await Post.findById(req.params.postId);
        if (!getPostById){
            return res.status(404).send({ message: 'Post not found' })
        }
        res.send(getPostById)
    }catch(err){
        res.send({message:err})
    }
})

// PATCH (Update)
router.patch('/:postId', verifyToken, async(req,res) =>{
    try{
        const post = await Post.findById(req.params.postId)

        //check if the post exists
        if (!post) {
            return res.status(404).send({ message: 'Post not found' })
        }

        //check if the authenticated user is the creator of the post
        if (post.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).send({ message: 'Access Denied' })
        }

        //update the post
        const updatePostById = await Post.updateOne(
            {_id:req.params.postId},
            {$set:{
                title:req.body.title,
                description:req.body.description,
                likes:req.body.likes,
                createdBy:req.user._id
                }
            })
        res.send(updatePostById)
    }catch(err){
        res.send({message:err})
    }
})

// DELETE (Delete)
router.delete('/:postId', verifyToken, async(req,res)=>{
    try{
        const post = await Post.findById(req.params.postId)

        //check if the post exists
        if (!post) {
            return res.status(404).send({ message: 'Post not found' })
        }

        //check if the authenticated user is the creator of the post
        if (post.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).send({ message: 'Access Denied' })
        }

        //delete post
        const deletePostById = await Post.deleteOne({_id:req.params.postId})
        res.send(deletePostById)
    }catch(err){
        res.send({message:err})
    }
})

module.exports = router
