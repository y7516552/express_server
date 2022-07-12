const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

router.get('/', async (req, res) => {
    try{
        const posts = await Post.find()
        res.json(posts)
    }catch(err){
        res.json({ message: err })
    }
})


router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    })

    try {
        const savePost = await post.save()
        res.json(savePost)
    }catch(err){
        res.json({ message: err })
    }
})

router
  .route('/:postId')
  .get(async (req, res) => {
      try{
          const post = await Post.findById(req.params.postId)
          res.json(post)
      }catch(err){
          res.json({ message: err })
      }
  })
  .patch(async (req, res) => {
    try{
        const updatePost = await Post.updateOne(
            {_id: req.params.postId},
            {$set: {
                title: req.body.title,
                content: req.body.content
            }}
        )
        res.json(updatePost)
    }catch(err){
        res.json({ message: err })
    }
  })
  .delete(async (req, res) => {
    try{
        const removedPost = await Post.remove({_id: req.params.postId})
        res.json(removedPost)
    }catch(err){
        res.json({ message: err })
    }
  })


module.exports = router