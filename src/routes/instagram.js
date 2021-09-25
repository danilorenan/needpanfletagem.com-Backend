const router = require('express').Router();
const Post = require('../models/Instagram');
const Weekpost = require('../models/Weekpost');
const User = require('../models/User');
const multer = require('multer');
const multerConfig = require('../config/multer');
const bcrypt = require('bcrypt');

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


//---------------------USER-----------------//

router.get('/user', async (req, res) => {
    const users = await User.find();

    return res.json(users)
})

router.post('/user', async (req, res) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const users = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    return res.json(users)
})

router.post('/login', async(req, res) => {
    
        const user = await User.findOne({email:req.body.email})
        
        if (user == null){
            return res.json('Senha ou email não cadastrado')
        }
        try {
            if(await bcrypt.compare(req.body.password, user.password)){
                return res.send('Success')
            }else{
                return res.send('Not allowed')
            }
        }catch (err) {
            res.json(err)
            console.log(err)
        }

})


module.exports = router;