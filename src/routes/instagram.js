const router = require('express').Router();
const Post = require('../models/Instagram');
const Weekpost = require('../models/Weekpost');
const multer = require('multer');
const multerConfig = require('../config/multer');

router.get('/posts', async (req, res) => {
    const posts = await Post.find();

    return res.json(posts);
})

router.post('/posts', multer(multerConfig).single('file'), async (req, res) => {
    const { originalname: name, size, key, location: url = '' } = req.file;
    
    const post = await Post.create({
        name,
        size,
        key,
        url
    })
    return res.json(post);
})

router.delete('/posts/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);

    await post.remove();

    return res.send();
})

//Week Router

router.get('/weekposts', async (req, res) => {
    const posts = await Weekpost.find();

    return res.json(posts);
})

router.post('/weekposts', multer(multerConfig).single('file'), async (req, res) => {
    const { originalname: name, size, key, location: url = '' } = req.file;
    
    const post = await Weekpost.create({
        name,
        size,
        key,
        url
    })
    return res.json(post);
})

router.delete('/weekposts/:id', async (req, res) => {
    const post = await Weekpost.findById(req.params.id);

    await post.remove();

    return res.send();
})





module.exports = router;